const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// 1. DYNAMIC CALCULATIONS INJECTION
const injection = `
  // Dynamic Global KPIs
  const parseAmt = (s) => {
    if (typeof s === 'number') return s;
    if (!s) return 0;
    return parseFloat(String(s).replace(/[^0-9.-]+/g, '')) || 0;
  };

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

  const calcExecHH = filteredExecutiveTable.reduce((a,c) => a + c.hh, 0);
  const calcExecBen = filteredExecutiveTable.reduce((a,c) => a + c.ben, 0);
  const calcExecVillage = new Set(filteredExecutiveTable.map(c => c.village)).size;
  const calcExecUtil = filteredExecutiveTable.length ? Math.round(filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.util), 0)/filteredExecutiveTable.length) : 0;
  const calcExecRev = filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.inc), 0).toFixed(1);
  const calcExecConv = filteredExecutiveTable.reduce((a,c) => a + parseAmt(c.conv), 0).toFixed(1);

  const calcShgCount = filteredSHG.length;
  const calcShgMembers = filteredSHG.reduce((a,c) => a + (parseInt(c.mem) || 0), 0);
  const calcShgST = filteredSHG.reduce((a,c) => a + c.st, 0);
  const calcShgSTPercent = calcShgMembers ? ((calcShgST/calcShgMembers)*100).toFixed(1) : 0;
  const calcShgRev = filteredSHG.reduce((a,c) => a + parseAmt(c.rev), 0).toFixed(2);
  const calcShgProfit = filteredSHG.reduce((a,c) => a + parseAmt(c.prof), 0).toFixed(2);

  const calcLivProjects = filteredLivelihood.length;
  const calcLivBen = filteredLivelihood.reduce((a,c) => a + c.ben, 0);
  const calcLivInv = filteredLivelihood.reduce((a,c) => a + parseAmt(c.inv)/100000, 0).toFixed(1);
  const livIncB = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a,c) => a + parseAmt(c.incB), 0) / filteredLivelihood.length) : 0;
  const livIncA = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a,c) => a + parseAmt(c.incA), 0) / filteredLivelihood.length) : 0;
  const livIncSurge = livIncB ? Math.round(((livIncA - livIncB)/livIncB)*100) : 0;
`;

content = content.replace(/return \(\s*<div>\s*<KPIDetailModal/, injection + '\n  return (\n    <div>\n      <KPIDetailModal');

// 2. REWRITE EXECUTIVE BENCHMARK TO MATCH LIVELIHOOD
// We find the block starting with "Official Executive Dashboard KPI Benchmarks"
const execHtml = `<div className="benchmark-bar" style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #064e3b 100%)' }}>
              <div className="benchmark-title">
                <h3><Activity size={20} /> Official Executive Dashboard KPI Benchmarks</h3>
                <p>Verified with Field Monitoring Records (Excel Sheet: Executive Dashboard)</p>
              </div>
              <div className="benchmark-metrics">
                <div className="benchmark-metric"><div className="benchmark-metric-label">Households</div><div className="benchmark-metric-val">{calcExecHH.toLocaleString()}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Beneficiaries</div><div className="benchmark-metric-val">{calcExecBen.toLocaleString()}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Convergence</div><div className="benchmark-metric-val">₹{calcExecConv} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Income Gen</div><div className="benchmark-metric-val">₹{calcExecRev} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">NTFP Revenue</div><div className="benchmark-metric-val">₹202.2 L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Tourists</div><div className="benchmark-metric-val">7,265</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Fund Util</div><div className="benchmark-metric-val">{calcExecUtil}%</div></div>
              </div>
            </div>`;

// Replace via regex (safely grabbing the bloated block)
content = content.replace(
  /<div className="benchmark-bar" style={{ background: 'linear-gradient\(90deg, #1e3a8a 0%, #064e3b 100%\)',[\s\S]*?AVG FUND UTILIZATION<\/div>\s*<div style={{ fontSize: '1.4rem', fontWeight: 800 }}>85%<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  execHtml
);


// 3. APPLY OTHER REPLACEMENTS (SHG, Livelihood, Overall)
let lines = content.split('\\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Total Tribal Beneficiaries') && lines[i+1] && lines[i+1].includes('369')) {
    lines[i+1] = lines[i+1].replace('369', '{totalBeneficiaries}');
    lines[i+2] = lines[i+2].replace('369 Women', '{totalBeneficiaries} Women');
  }
  if (lines[i].includes('Average Income Surge') && lines[i+1] && lines[i+1].includes('+88%')) {
    lines[i+1] = lines[i+1].replace('+88%', '+{incomeSurge}%');
    lines[i+2] = lines[i+2].replace('₹67,333', '₹{avgIncomeBefore.toLocaleString("en-IN")}').replace('₹1,29,867', '₹{avgIncomeAfter.toLocaleString("en-IN")}');
    // Also catch unicode weirdness
    lines[i+2] = lines[i+2].replace(/,167,333 Before/, '₹{avgIncomeBefore.toLocaleString("en-IN")} Before').replace(/,11,29,867 After/, '₹{avgIncomeAfter.toLocaleString("en-IN")} After');
  }
  if (lines[i].includes('Total Revenue Generated') && lines[i+1] && lines[i+1].includes('1.26 Cr')) {
    lines[i+1] = lines[i+1].replace(/₹?1\.26 Cr/, '₹{(totalRevenue > 100 ? (totalRevenue / 100).toFixed(2) + " Cr" : totalRevenue.toFixed(2) + " L")}');
    lines[i+1] = lines[i+1].replace(/,11\.26 Cr/, '₹{(totalRevenue > 100 ? (totalRevenue / 100).toFixed(2) + " Cr" : totalRevenue.toFixed(2) + " L")}');
    lines[i+3] = lines[i+3].replace('₹36.5 Lakhs (27.4% margin)', '₹{totalProfit.toFixed(1)} Lakhs ({profitMargin}% margin)');
    lines[i+3] = lines[i+3].replace(',136.5 Lakhs (27.4% margin)', '₹{totalProfit.toFixed(1)} Lakhs ({profitMargin}% margin)');
  }
  if (lines[i].includes('Govt Investment & Support') && lines[i+1] && lines[i+1].includes('55.10 L')) {
    lines[i+1] = lines[i+1].replace(/₹?55\.10 L/, '₹{govtSupport.toFixed(2)} L');
    lines[i+1] = lines[i+1].replace(/,155\.10 L/, '₹{govtSupport.toFixed(2)} L');
    lines[i+2] = lines[i+2].replace('₹14.6 Lakhs', '₹{totalRevFund.toFixed(1)} Lakhs');
    lines[i+2] = lines[i+2].replace(',114.6 Lakhs', '₹{totalRevFund.toFixed(1)} Lakhs');
  }
  if (lines[i].includes('Institutional Credit Linkage') && lines[i+1] && lines[i+1].includes('68.00 L')) {
    lines[i+1] = lines[i+1].replace(/₹?68\.00 L/, '₹{totalBankLinkage.toFixed(2)} L');
    lines[i+1] = lines[i+1].replace(/,168\.00 L/, '₹{totalBankLinkage.toFixed(2)} L');
    lines[i+2] = lines[i+2].replace('191 Accounts', '{totalActiveLoans} Accounts');
  }
  if (lines[i].includes('Tribal & Gender Inclusion') && lines[i+2] && lines[i+2].includes('90.8%')) {
    lines[i+2] = lines[i+2].replace('90.8% ST Membership', '{stPercentage}% ST Membership').replace('335 ST Members', '{totalST} ST Members');
  }

  // Div metrics replacements (North)
  if (lines[i].includes('Similipal North Wildlife Division')) {
    for(let j=i; j<i+10; j++) {
       if (lines[j] && lines[j].includes('>18<')) lines[j] = lines[j].replace('>18<', '>{northMetrics.units}<');
       if (lines[j] && lines[j].includes('>218<')) lines[j] = lines[j].replace('>218<', '>{northMetrics.ben}<');
       if (lines[j] && lines[j].includes('70.30 L<')) lines[j] = lines[j].replace(/>[^<]+70\.30 L</, '>₹{northMetrics.rev} L<');
       if (lines[j] && lines[j].includes('>+86%<')) lines[j] = lines[j].replace('>+86%<', '>+{northMetrics.growth}%<');
    }
  }

  // Div metrics replacements (South)
  if (lines[i].includes('Similipal South Wildlife Division')) {
    for(let j=i; j<i+10; j++) {
       if (lines[j] && lines[j].includes('>12<')) lines[j] = lines[j].replace('>12<', '>{southMetrics.units}<');
       if (lines[j] && lines[j].includes('>151<')) lines[j] = lines[j].replace('>151<', '>{southMetrics.ben}<');
       if (lines[j] && lines[j].includes('55.50 L<')) lines[j] = lines[j].replace(/>[^<]+55\.50 L</, '>₹{southMetrics.rev} L<');
       if (lines[j] && lines[j].includes('>+90%<')) lines[j] = lines[j].replace('>+90%<', '>+{southMetrics.growth}%<');
    }
  }

  // SHG Benchmarks
  if (lines[i].includes('Official SHG-Producer Group KPI Benchmarks')) {
    for(let j=i; j<i+15; j++) {
      if (lines[j] && lines[j].includes('Total SHGs') && lines[j].includes('>30<')) lines[j] = lines[j].replace('>30<', '>{calcShgCount}<');
      if (lines[j] && lines[j].includes('Total Members') && lines[j].includes('>369<')) lines[j] = lines[j].replace('>369<', '>{calcShgMembers}<');
      if (lines[j] && lines[j].includes('Women Members') && lines[j].includes('>369 (100%)<')) lines[j] = lines[j].replace('>369 (100%)<', '>{calcShgMembers} (100%)<');
      if (lines[j] && lines[j].includes('ST Members') && lines[j].includes('>335 (90.8%)<')) lines[j] = lines[j].replace('>335 (90.8%)<', '>{calcShgST} ({calcShgSTPercent}%)<');
      if (lines[j] && lines[j].includes('Total Revenue') && lines[j].includes('Cr<')) lines[j] = lines[j].replace(/>[^<]+11\.33 Cr</, '>₹{calcShgRev} L<');
      if (lines[j] && lines[j].includes('Total Profit') && lines[j].includes('L<')) lines[j] = lines[j].replace(/>[^<]+136\.5 L</, '>₹{calcShgProfit} L<');
    }
  }

  // Livelihood Benchmarks
  if (lines[i].includes('Official Livelihood Dashboard KPI Benchmarks')) {
    for(let j=i; j<i+15; j++) {
      if (lines[j] && lines[j].includes('Total Projects') && lines[j].includes('>30<')) lines[j] = lines[j].replace('>30<', '>{calcLivProjects}<');
      if (lines[j] && lines[j].includes('Total Beneficiaries') && lines[j].includes('>374<')) lines[j] = lines[j].replace('>374<', '>{calcLivBen}<');
      if (lines[j] && lines[j].includes('Investment Support') && lines[j].includes('Lakhs<')) lines[j] = lines[j].replace(/>[^<]+154\.9 Lakhs</, '>₹{calcLivInv} L<');
      if (lines[j] && lines[j].includes('Income Before') && lines[j].includes('/ yr<')) lines[j] = lines[j].replace(/>[^<]+67,333 \/ yr</, '>₹{livIncB.toLocaleString()} / yr<');
      if (lines[j] && lines[j].includes('Income After') && lines[j].includes('/ yr<')) lines[j] = lines[j].replace(/>[^<]+129,867 \/ yr</, '>₹{livIncA.toLocaleString()} / yr<');
      if (lines[j] && lines[j].includes('Avg Income Increase') && lines[j].includes('>93%<')) lines[j] = lines[j].replace('>93%<', '>{livIncSurge}%<');
    }
  }

  // Badges
  if (lines[i].includes('<span className="badge">30 SHGs</span>')) {
    lines[i] = lines[i].replace('<span className="badge">30 SHGs</span>', '<span className="badge">{calcShgCount} SHGs</span>');
  }
  if (lines[i].includes('<span className="badge">30 Projects</span>')) {
    lines[i] = lines[i].replace('<span className="badge">30 Projects</span>', '<span className="badge">{calcLivProjects} Projects</span>');
  }
}

content = lines.join('\\n');

fs.writeFileSync('src/pages/Dashboard.tsx', content);
console.log('Rebuilt successfully!');
