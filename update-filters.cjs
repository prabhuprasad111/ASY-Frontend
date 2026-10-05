const fs = require('fs');

let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// 1. Insert calculations after "const q = searchQuery.toLowerCase();" block
const calcInsertion = `
  // Helpers
  const parseAmt = (s) => {
    if (typeof s === 'number') return s;
    if (!s) return 0;
    return parseFloat(String(s).replace(/[^0-9.-]+/g, '')) || 0;
  };

  // Executive Tab Calcs
  const calcExecHH = filteredExecutiveTable.reduce((a,c) => a + c.hh, 0);
  const calcExecBen = filteredExecutiveTable.reduce((a,c) => a + c.ben, 0);
  const calcExecVillage = new Set(filteredExecutiveTable.map(c => c.village)).size;
  const calcExecUtil = filteredExecutiveTable.length ? Math.round(filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.util), 0)/filteredExecutiveTable.length) : 0;
  const calcExecRev = filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.inc), 0).toFixed(1);
  const calcExecConv = filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.conv), 0).toFixed(1);

  // SHG Tab Calcs
  const calcShgCount = filteredSHG.length;
  const calcShgMembers = filteredSHG.reduce((a,c) => a + c.members, 0);
  const calcShgST = filteredSHG.reduce((a,c) => a + c.st, 0);
  const calcShgSTPercent = calcShgMembers ? ((calcShgST/calcShgMembers)*100).toFixed(1) : 0;
  const calcShgRev = filteredSHG.reduce((a,c) => a + (c.rev || 0), 0).toFixed(2);
  const calcShgProfit = filteredSHG.reduce((a,c) => a + (c.profit || 0), 0).toFixed(2);

  // Livelihood Tab Calcs
  const calcLivProjects = filteredLivelihood.length;
  const calcLivBen = filteredLivelihood.reduce((a,c) => a + c.ben, 0);
  const calcLivInv = filteredLivelihood.reduce((a,c) => a + parseAmt(c.inv)/100000, 0).toFixed(1);
  const livIncB = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a,c) => a + parseAmt(c.incB), 0) / filteredLivelihood.length) : 0;
  const livIncA = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a,c) => a + parseAmt(c.incA), 0) / filteredLivelihood.length) : 0;
  const livIncSurge = livIncB ? Math.round(((livIncA - livIncB)/livIncB)*100) : 0;
`;

code = code.replace(
  "const filteredExecutiveTable = executiveTableData.filter(row => \n    (divFilter === 'All' || row.div === divFilter) &&\n    (rangeFilter === 'All' || row.range === rangeFilter) &&\n    (q === '' || row.village.toLowerCase().includes(q) || row.month.toLowerCase().includes(q))\n  );",
  "const filteredExecutiveTable = executiveTableData.filter(row => \n    (divFilter === 'All' || row.div === divFilter) &&\n    (rangeFilter === 'All' || row.range === rangeFilter) &&\n    (q === '' || row.village.toLowerCase().includes(q) || row.month.toLowerCase().includes(q))\n  );\n" + calcInsertion
);

// Fallback in case of subtle newline mismatches:
if (!code.includes('calcExecHH')) {
    code = code.replace("const filteredExecutiveTable = executiveTableData.filter", calcInsertion + "\nconst filteredExecutiveTable = executiveTableData.filter");
}

// 2. Replace Executive Tab HTML block
code = code.replace(
  /<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>5,021<\/div>/,
  "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecHH.toLocaleString()}</div>"
);
code = code.replace(
  /<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>20,084<\/div>/,
  "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecBen.toLocaleString()}</div>"
);
code = code.replace(
  /<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>30<\/div>/,
  "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecVillage.toLocaleString()}</div>"
);
code = code.replace(
  /<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>92%<\/div>/,
  "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecUtil}%</div>"
);
code = code.replace(
  /<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>₹1\.26 Cr<\/div>/,
  "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>₹{calcExecRev} L</div>"
);
code = code.replace(
  /<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>₹55\.10 L<\/div>/,
  "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>₹{calcExecConv} L</div>"
);

// 3. Replace SHG Tab HTML block
code = code.replace(
  /<div className="benchmark-metric-val">30<\/div>/g,
  '<div className="benchmark-metric-val">{calcShgCount}</div>'
);
code = code.replace(
  /<div className="benchmark-metric-val">369<\/div>/,
  '<div className="benchmark-metric-val">{calcShgMembers}</div>'
);
code = code.replace(
  /<div className="benchmark-metric-val">369 \(100%\)<\/div>/,
  '<div className="benchmark-metric-val">{calcShgMembers} (100%)</div>'
);
code = code.replace(
  /<div className="benchmark-metric-val">335 \(90\.8%\)<\/div>/,
  '<div className="benchmark-metric-val">{calcShgST} ({calcShgSTPercent}%)</div>'
);
// Make sure to match any weird rupee symbol encoding if present
code = code.replace(
  /<div className="benchmark-metric-val">[^0-9]*11\.33 Cr<\/div>/,
  '<div className="benchmark-metric-val">₹{calcShgRev} L</div>'
);
code = code.replace(
  /<div className="benchmark-metric-val">[^0-9]*136\.5 L<\/div>/,
  '<div className="benchmark-metric-val">₹{calcShgProfit} L</div>'
);

// 4. Replace Livelihood Tab HTML block
// We already replaced "30" with {calcShgCount} globally for benchmark-metric-val, but Livelihood's "30 Projects" might have gotten hit. That's actually correct!
// Actually let's just make sure. {calcShgCount} is for SHG, not livelihood.
// Let's restore livelihood's specifically.
// Let's do string replacement for Livelihood specifically.
const livelHoodHtml = `
              <div className="benchmark-metrics">
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Projects</div><div className="benchmark-metric-val">{calcLivProjects}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Beneficiaries</div><div className="benchmark-metric-val">{calcLivBen}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Investment Support</div><div className="benchmark-metric-val">₹{calcLivInv} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Income Before</div><div className="benchmark-metric-val">₹{livIncB.toLocaleString()} / yr</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Income After</div><div className="benchmark-metric-val">₹{livIncA.toLocaleString()} / yr</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Avg Income Increase</div><div className="benchmark-metric-val" style={{ color: '#10b981' }}>{livIncSurge}%</div></div>
              </div>
`;

code = code.replace(
  /<div className="benchmark-metrics">\s*<div className="benchmark-metric"><div className="benchmark-metric-label">Total Projects<\/div>[\s\S]*?<\/div>\s*<\/div>/,
  livelHoodHtml.trim()
);

// Also need to fix the badge counts on the tabs!
code = code.replace(
  /<span className="badge">30 SHGs<\/span>/,
  '<span className="badge">{calcShgCount} SHGs</span>'
);
code = code.replace(
  /<span className="badge">30 Projects<\/span>/,
  '<span className="badge">{calcLivProjects} Projects</span>'
);

fs.writeFileSync('src/pages/Dashboard.tsx', code);
console.log('Replaced successfully');
