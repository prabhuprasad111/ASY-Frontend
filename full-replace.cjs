const fs = require('fs');

let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// 1. Add calculation block right after "const q = searchQuery.toLowerCase();"
const calcInjection = `
  // Dynamic Global KPIs
  const parseAmt = (s) => {
    if (typeof s === 'number') return s;
    if (!s) return 0;
    return parseFloat(String(s).replace(/[^0-9.-]+/g, '')) || 0;
  };

  // OVERALL KPIs & DIVISION METRICS
  const dataCount = filteredRangeData.length || 1;
  const totalST = filteredRangeData.reduce((acc, curr) => acc + curr.st, 0);
  const totalOther = filteredRangeData.reduce((acc, curr) => acc + curr.other, 0);
  const totalBeneficiaries = totalST + totalOther;
  const stPercentage = totalBeneficiaries ? ((totalST / totalBeneficiaries) * 100).toFixed(1) : 0;
  
  const avgIncomeBefore = Math.round(filteredRangeData.reduce((acc, curr) => acc + curr.incomeBefore, 0) / dataCount);
  const avgIncomeAfter = Math.round(filteredRangeData.reduce((acc, curr) => acc + curr.incomeAfter, 0) / dataCount);
  const incomeSurge = avgIncomeBefore ? Math.round(((avgIncomeAfter - avgIncomeBefore) / avgIncomeBefore) * 100) : 0;
  
  const totalRevenue = filteredRangeData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = filteredRangeData.reduce((acc, curr) => acc + curr.profit, 0);
  const profitMargin = totalRevenue ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;
  
  const totalRevFund = filteredRangeData.reduce((acc, curr) => acc + curr.revolvingFund, 0);
  const totalSavings = filteredRangeData.reduce((acc, curr) => acc + curr.savings, 0);
  const govtSupport = totalRevFund + totalSavings + 28.1;
  
  const totalBankLinkage = filteredRangeData.reduce((acc, curr) => acc + curr.bankLinkage, 0);
  const totalActiveLoans = filteredRangeData.reduce((acc, curr) => acc + curr.activeLoans, 0);

  const calcDivMetrics = (divName) => {
    const data = filteredRangeData.filter(d => d.div === divName);
    if (!data.length) return { units: 0, ben: 0, rev: '0.00', growth: 0 };
    const ben = data.reduce((a,c) => a + c.st + c.other, 0);
    const rev = data.reduce((a,c) => a + c.revenue, 0).toFixed(2);
    const avgB = data.reduce((a,c) => a + c.incomeBefore, 0) / data.length;
    const avgA = data.reduce((a,c) => a + c.incomeAfter, 0) / data.length;
    const growth = avgB ? Math.round(((avgA - avgB)/avgB)*100) : 0;
    return { units: data.reduce((a,c)=>a+c.activeLoans,0), ben, rev, growth };
  };
  const northMetrics = calcDivMetrics('North');
  const southMetrics = calcDivMetrics('South');

  // EXECUTIVE KPIs
  const calcExecHH = filteredExecutiveTable.reduce((a,c) => a + c.hh, 0);
  const calcExecBen = filteredExecutiveTable.reduce((a,c) => a + c.ben, 0);
  const calcExecVillage = new Set(filteredExecutiveTable.map(c => c.village)).size;
  const calcExecUtil = filteredExecutiveTable.length ? Math.round(filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.util), 0)/filteredExecutiveTable.length) : 0;
  const calcExecRev = filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.inc), 0).toFixed(1);
  const calcExecConv = filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.conv), 0).toFixed(1);

  // SHG KPIs
  const calcShgCount = filteredSHG.length;
  const calcShgMembers = filteredSHG.reduce((a,c) => a + c.members, 0);
  const calcShgST = filteredSHG.reduce((a,c) => a + c.st, 0);
  const calcShgSTPercent = calcShgMembers ? ((calcShgST/calcShgMembers)*100).toFixed(1) : 0;
  const calcShgRev = filteredSHG.reduce((a,c) => a + (c.rev || 0), 0).toFixed(2);
  const calcShgProfit = filteredSHG.reduce((a,c) => a + (c.profit || 0), 0).toFixed(2);

  // LIVELIHOOD KPIs
  const calcLivProjects = filteredLivelihood.length;
  const calcLivBen = filteredLivelihood.reduce((a,c) => a + c.ben, 0);
  const calcLivInv = filteredLivelihood.reduce((a,c) => a + parseAmt(c.inv)/100000, 0).toFixed(1);
  const livIncB = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a,c) => a + parseAmt(c.incB), 0) / filteredLivelihood.length) : 0;
  const livIncA = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a,c) => a + parseAmt(c.incA), 0) / filteredLivelihood.length) : 0;
  const livIncSurge = livIncB ? Math.round(((livIncA - livIncB)/livIncB)*100) : 0;
`;

code = code.replace(
  /const q = searchQuery\.toLowerCase\(\);\s*/,
  "const q = searchQuery.toLowerCase();\n" + calcInjection + "\n"
);

// 2. OVERALL TAB TOP 6 KPIs
const overallKpis = `          <div className="kpi-grid-6">
            <div className="kpi-card" style={{ borderTopColor: '#3b82f6' }}>
              <div className="kpi-title">Total Tribal Beneficiaries <Globe size={18} color="#3b82f6" /></div>
              <div className="kpi-val">{totalBeneficiaries}</div>
              <div className="kpi-sub"><span style={{ color: '#10b981' }}>{totalBeneficiaries} Women</span> across 30 Villages</div>
            </div>
            <div className="kpi-card" style={{ borderTopColor: '#10b981' }}>
              <div className="kpi-title">Average Income Surge <LineChart size={18} color="#10b981" /></div>
              <div className="kpi-val">+{incomeSurge}%</div>
              <div className="kpi-sub" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>₹{avgIncomeBefore.toLocaleString('en-IN')} Before</span> <span>→</span> <span style={{ color: '#10b981' }}>₹{avgIncomeAfter.toLocaleString('en-IN')} After</span>
              </div>
            </div>
            <div className="kpi-card" style={{ borderTopColor: '#f59e0b' }}>
              <div className="kpi-title">Total Revenue Generated <PiggyBank size={18} color="#f59e0b" /></div>
              <div className="kpi-val">₹{(totalRevenue > 100 ? (totalRevenue / 100).toFixed(2) + ' Cr' : totalRevenue.toFixed(2) + ' L')}</div>
              <div className="kpi-sub">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Net Profit: <strong style={{ color: '#f59e0b' }}>₹{totalProfit.toFixed(1)} Lakhs ({profitMargin}% margin)</strong></span>
                </div>
              </div>
            </div>
            <div className="kpi-card" style={{ borderTopColor: '#8b5cf6' }}>
              <div className="kpi-title">Govt Investment & Support <IndianRupee size={18} color="#8b5cf6" /></div>
              <div className="kpi-val">₹{govtSupport.toFixed(2)} L</div>
              <div className="kpi-sub"><span style={{ color: '#8b5cf6' }}>Revolving Fund: ₹{totalRevFund.toFixed(1)} Lakhs</span></div>
            </div>
            <div className="kpi-card" style={{ borderTopColor: '#06b6d4' }}>
              <div className="kpi-title">Institutional Credit Linkage <Briefcase size={18} color="#06b6d4" /></div>
              <div className="kpi-val">₹{totalBankLinkage.toFixed(2)} L</div>
              <div className="kpi-sub">Active Bank Loans: <span style={{ color: '#06b6d4' }}>{totalActiveLoans} Accounts</span></div>
            </div>
            <div className="kpi-card" style={{ borderTopColor: '#f43f5e' }}>
              <div className="kpi-title">Tribal & Gender Inclusion <Users size={18} color="#f43f5e" /></div>
              <div className="kpi-val">100% Women</div>
              <div className="kpi-sub" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#10b981' }}>{stPercentage}% ST Membership</span> <span>({totalST} ST Members)</span>
              </div>
            </div>
          </div>`;
code = code.replace(/<div className="kpi-grid-6">[\s\S]*?<\/div>\s*<\/div>\s*<div className="grid-8"/, overallKpis + "\n          <div className=\"grid-8\"");

// 3. DIVISION CARDS
const divCards = `          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <div className="division-card north span-6" style={{ padding: '16px 20px', border: '2px solid #3b82f6', borderRadius: '12px', background: '#fff' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>Northern Division</span>
                <h3 style={{ margin: '4px 0 2px 0', fontSize: '1.1rem', color: '#0f172a' }}>Similipal North Wildlife Division</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Ranges: Pithabata North, Nawana North, Barehipani, Gudgudia, Talabandha</p>
              </div>
              <div className="div-metrics" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Field Units</div><div className="div-metric-val" style={{ fontSize: '1.1rem' }}>{northMetrics.units}</div></div>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Beneficiaries</div><div className="div-metric-val" style={{ fontSize: '1.1rem' }}>{northMetrics.ben}</div></div>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Revenue Gen.</div><div className="div-metric-val" style={{ fontSize: '1.1rem' }}>₹{northMetrics.rev} L</div></div>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Avg Growth</div><div className="div-metric-val" style={{ color: '#10b981', fontSize: '1.1rem' }}>+{northMetrics.growth}%</div></div>
              </div>
            </div>

            <div className="division-card south span-6" style={{ padding: '16px 20px', border: '2px solid #f59e0b', borderRadius: '12px', background: '#fff' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ background: '#fffbeb', color: '#f59e0b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>Southern Division</span>
                <h3 style={{ margin: '4px 0 2px 0', fontSize: '1.1rem', color: '#0f172a' }}>Similipal South Wildlife Division</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Ranges: Pithabata South, Dukura, Podadiha, Kendumundi, Thakurmunda</p>
              </div>
              <div className="div-metrics" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Field Units</div><div className="div-metric-val" style={{ fontSize: '1.1rem' }}>{southMetrics.units}</div></div>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Beneficiaries</div><div className="div-metric-val" style={{ fontSize: '1.1rem' }}>{southMetrics.ben}</div></div>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Revenue Gen.</div><div className="div-metric-val" style={{ fontSize: '1.1rem' }}>₹{southMetrics.rev} L</div></div>
                <div className="div-metric"><div className="div-metric-label" style={{ fontSize: '0.65rem' }}>Avg Growth</div><div className="div-metric-val" style={{ color: '#10b981', fontSize: '1.1rem' }}>+{southMetrics.growth}%</div></div>
              </div>
            </div>
          </div>`;
code = code.replace(/<div className="grid-12" style={{ marginBottom: '24px' }}>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*}\)/, divCards + "\n        </div>\n      )}");


// 4. EXECUTIVE TAB
code = code.replace(/<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>5,021<\/div>/, "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecHH.toLocaleString()}</div>");
code = code.replace(/<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>20,084<\/div>/, "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecBen.toLocaleString()}</div>");
code = code.replace(/<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>30<\/div>/, "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecVillage.toLocaleString()}</div>");
code = code.replace(/<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>92%<\/div>/, "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{calcExecUtil}%</div>");
code = code.replace(/<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>₹1\.26 Cr<\/div>/, "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>₹{calcExecRev} L</div>");
code = code.replace(/<div style={{ fontSize: '1\.15rem', fontWeight: 800 }}>₹55\.10 L<\/div>/, "<div style={{ fontSize: '1.15rem', fontWeight: 800 }}>₹{calcExecConv} L</div>");

// 5. SHG TAB
const shgHtml = `              <div className="benchmark-metrics">
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total SHGs</div><div className="benchmark-metric-val">{calcShgCount}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Members</div><div className="benchmark-metric-val">{calcShgMembers}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Women Members</div><div className="benchmark-metric-val">{calcShgMembers} (100%)</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">ST Members</div><div className="benchmark-metric-val">{calcShgST} ({calcShgSTPercent}%)</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Revenue</div><div className="benchmark-metric-val">₹{calcShgRev} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Profit</div><div className="benchmark-metric-val">₹{calcShgProfit} L</div></div>
              </div>`;
code = code.replace(/<div className="benchmark-metrics">[\s\S]*?<div className="benchmark-metric"><div className="benchmark-metric-label">Total SHGs<\/div>[\s\S]*?<\/div>\s*<\/div>/, shgHtml);

// 6. LIVELIHOOD TAB
const livelHoodHtml = `              <div className="benchmark-metrics">
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Projects</div><div className="benchmark-metric-val">{calcLivProjects}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Beneficiaries</div><div className="benchmark-metric-val">{calcLivBen}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Investment Support</div><div className="benchmark-metric-val">₹{calcLivInv} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Income Before</div><div className="benchmark-metric-val">₹{livIncB.toLocaleString()} / yr</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Income After</div><div className="benchmark-metric-val">₹{livIncA.toLocaleString()} / yr</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Avg Income Increase</div><div className="benchmark-metric-val" style={{ color: '#10b981' }}>{livIncSurge}%</div></div>
              </div>`;
code = code.replace(/<div className="benchmark-metrics">[\s\S]*?<div className="benchmark-metric"><div className="benchmark-metric-label">Total Projects<\/div>[\s\S]*?<\/div>\s*<\/div>/, livelHoodHtml);

// Badges
code = code.replace(/<span className="badge">30 SHGs<\/span>/g, '<span className="badge">{calcShgCount} SHGs</span>');
code = code.replace(/<span className="badge">30 Projects<\/span>/g, '<span className="badge">{calcLivProjects} Projects</span>');


fs.writeFileSync('src/pages/Dashboard.tsx', code);
console.log('Replaced successfully');
