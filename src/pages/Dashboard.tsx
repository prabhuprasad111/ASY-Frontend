import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, ComposedChart, CartesianGrid, RadialBarChart, RadialBar, AreaChart, Area, Line
} from 'recharts';
import {
  Search, RotateCcw, Filter, Activity, IndianRupee, ShieldCheck,
  PiggyBank, Briefcase, Map, LineChart, Users, Compass, Globe,
  Leaf, Trees, Tent, List, Landmark, Trophy, TrendingUp, Shield, Lightbulb,
  Home, GraduationCap, Blocks, Calendar, Zap, PieChart as PieChartIcon
} from 'lucide-react';
import KPIDetailModal from '../components/KPIDetailModal';
import SimilipalMap from '../components/SimilipalMap';

// --- MOCK DATA ---
const rangeWiseData = [
  { range: 'Pithabata North', div: 'North', revenue: 9.5, profit: 2.8, st: 33, other: 4, incomeBefore: 65000, incomeAfter: 115000, bankLinkage: 6.0, savings: 2.4, revolvingFund: 1.2, activeLoans: 19 },
  { range: 'Pithabata South', div: 'South', revenue: 10.8, profit: 3.1, st: 45, other: 5, incomeBefore: 68000, incomeAfter: 122000, bankLinkage: 5.8, savings: 2.2, revolvingFund: 1.1, activeLoans: 18 },
  { range: 'Dukura', div: 'South', revenue: 10.2, profit: 2.7, st: 42, other: 3, incomeBefore: 60000, incomeAfter: 110000, bankLinkage: 8.0, savings: 2.9, revolvingFund: 1.4, activeLoans: 18 },
  { range: 'Podadiha', div: 'South', revenue: 14.2, profit: 3.8, st: 43, other: 4, incomeBefore: 75000, incomeAfter: 140000, bankLinkage: 8.5, savings: 3.4, revolvingFund: 1.6, activeLoans: 21 },
  { range: 'Nawana North', div: 'North', revenue: 9.8, profit: 2.5, st: 48, other: 5, incomeBefore: 62000, incomeAfter: 108000, bankLinkage: 5.4, savings: 2.1, revolvingFund: 1.0, activeLoans: 16 },
  { range: 'Barehipani', div: 'North', revenue: 10.1, profit: 2.6, st: 47, other: 0, incomeBefore: 55000, incomeAfter: 98000, bankLinkage: 9.5, savings: 3.6, revolvingFund: 1.8, activeLoans: 28 },
  { range: 'Gudgudia', div: 'North', revenue: 20.2, profit: 5.9, st: 50, other: 6, incomeBefore: 80000, incomeAfter: 155000, bankLinkage: 8.2, savings: 2.9, revolvingFund: 1.5, activeLoans: 21 },
  { range: 'Talabandha', div: 'North', revenue: 15.8, profit: 4.5, st: 45, other: 2, incomeBefore: 78000, incomeAfter: 155000, bankLinkage: 5.8, savings: 2.2, revolvingFund: 1.1, activeLoans: 15 },
  { range: 'Kendumundi', div: 'South', revenue: 10.1, profit: 2.9, st: 24, other: 1, incomeBefore: 68000, incomeAfter: 142000, bankLinkage: 5.6, savings: 2.0, revolvingFund: 1.0, activeLoans: 11 },
  { range: 'Thakurmunda', div: 'South', revenue: 9.7, profit: 3.1, st: 14, other: 1, incomeBefore: 90000, incomeAfter: 235000, bankLinkage: 4.5, savings: 1.8, revolvingFund: 0.9, activeLoans: 12 },
];

const enterpriseMix = [
  { name: 'Honey Processing', value: 24, fill: '#d97706' },
  { name: 'Sal Leaf Plates', value: 18, fill: '#059669' },
  { name: 'Goat Rearing', value: 15, fill: '#2563eb' },
  { name: 'Poultry', value: 12, fill: '#7c3aed' },
  { name: 'Tamarind Proc.', value: 10, fill: '#0891b2' },
  { name: 'Veg Cultivation', value: 8, fill: '#e11d48' },
  { name: 'Eco-Tourism', value: 13, fill: '#0284c7' },
];

const livelihoodMix = [
  { name: 'NTFP', value: 45, fill: '#0f766e' },
  { name: 'Livestock', value: 25, fill: '#d97706' },
  { name: 'Agriculture', value: 15, fill: '#2563eb' },
  { name: 'Eco-Tourism', value: 10, fill: '#7c3aed' },
  { name: 'Handicrafts', value: 5, fill: '#e11d48' },
];

const incomeGrowthData = [
  { sector: 'NTFP', growth: 88, fill: '#2563eb' },
  { sector: 'Livestock', growth: 75, fill: '#10b981' },
  { sector: 'Agriculture', growth: 68, fill: '#d97706' },
  { sector: 'Eco-Tourism', growth: 147, fill: '#8b5cf6' },
  { sector: 'Handicrafts', growth: 80, fill: '#e11d48' },
];

const financialCapital = [
  { name: 'Revolving Fund', value: 14.6, fill: '#8b5cf6' },
  { name: 'Group Savings', value: 26.2, fill: '#d97706' },
  { name: 'Govt Investment', value: 55.1, fill: '#3b82f6' },
  { name: 'Bank Linkage', value: 68.0, fill: '#10b981' },
];

const shgTableData = [
  { id: 'SHG001', name: 'Maa Mangala SHG', div: 'North', range: 'Pithabata North', vill: 'Gendiapokhari', mem: '12 (12W)', st: 11, sav: '₹65,000', bank: '₹2,00,000', act: 'Honey Processing', actClass: 'pill-ntfp', rev: '₹3,50,000', prof: '₹95,000' },
  { id: 'SHG002', name: 'Maa Tarini SHG', div: 'North', range: 'Pithabata North', vill: 'Phuljhari', mem: '11 (11W)', st: 10, sav: '₹76,000', bank: '₹1,50,000', act: 'Sal Leaf Plates', actClass: 'pill-ntfp', rev: '₹2,00,000', prof: '₹72,000' },
  { id: 'SHG003', name: 'Maa Ambika SHG', div: 'North', range: 'Pithabata North', vill: 'Badgaon', mem: '13 (13W)', st: 12, sav: '₹92,000', bank: '₹2,50,000', act: 'Goat Rearing', actClass: 'pill-livestock', rev: '₹4,10,000', prof: '₹1,15,000' },
  { id: 'SHG004', name: 'Maa Budhi SHG', div: 'South', range: 'Pithabata South', vill: 'Digdiga', mem: '12 (12W)', st: 11, sav: '₹80,000', bank: '₹1,80,000', act: 'Poultry', actClass: 'pill-livestock', rev: '₹3,25,000', prof: '₹85,000' },
  { id: 'SHG005', name: 'Maa Sarala SHG', div: 'South', range: 'Pithabata South', vill: 'Gopinathpur', mem: '14 (14W)', st: 12, sav: '₹1,05,000', bank: '₹3,00,000', act: 'Tamarind Processing', actClass: 'pill-ntfp', rev: '₹5,50,000', prof: '₹1,55,000' },
  { id: 'SHG006', name: 'Maa Kali SHG', div: 'South', range: 'Pithabata South', vill: 'Balikhal', mem: '10 (10W)', st: 9, sav: '₹65,000', bank: '₹1,20,000', act: 'Vegetable Cultivation', actClass: 'pill-agri', rev: '₹2,25,000', prof: '₹58,000' }
];

const livelihoodTableData = [
  { id: 'LIV001', range: 'Pithabata North', div: 'North', village: 'Goudagaon', group: 'Maa Mangala SHG', activity: 'Honey Processing', cat: 'NTFP', catClass: 'pill-ntfp', ben: 12, inv: '₹1,50,000', incB: '₹65,000', incA: '₹1,15,000' },
  { id: 'LIV002', range: 'Dukura', div: 'South', village: 'Sialinai', group: 'Sabuja Bahini', activity: 'Sal Leaf Plates', cat: 'NTFP', catClass: 'pill-ntfp', ben: 15, inv: '₹1,20,000', incB: '₹60,000', incA: '₹1,10,000' },
  { id: 'LIV003', range: 'Gudgudia', div: 'North', village: 'Gudgudia', group: 'Eco-Tourism Group', activity: 'Eco-Tourism', cat: 'Eco-Tourism', catClass: 'pill-eco', ben: 10, inv: '₹5,00,000', incB: '₹80,000', incA: '₹1,97,000' },
  { id: 'LIV004', range: 'Podadiha', div: 'South', village: 'Kusumi', group: 'Chaiti SHG', activity: 'Poultry', cat: 'Livestock', catClass: 'pill-livestock', ben: 14, inv: '₹1,80,000', incB: '₹72,000', incA: '₹1,30,000' },
  { id: 'LIV005', range: 'Barehipani', div: 'North', village: 'Barehipani', group: 'Similipal Farmers', activity: 'Vegetable Cultivation', cat: 'Agriculture', catClass: 'pill-agri', ben: 20, inv: '₹2,50,000', incB: '₹55,000', incA: '₹98,000' },
  { id: 'LIV006', range: 'Thakurmunda', div: 'South', village: 'Kendua', group: 'Tulasi Handicrafts', activity: 'Bamboo Crafts', cat: 'Handicrafts', catClass: 'pill-handi', ben: 8, inv: '₹90,000', incB: '₹90,000', incA: '₹2,35,000' },
];

const executiveGrowthData = [
  { year: '2021-22', revenue: 35.5, investment: 15.0 },
  { year: '2022-23', revenue: 72.8, investment: 32.5 },
  { year: '2023-24', revenue: 133.3, investment: 54.9 },
];

const executiveEfficiencyData = [
  { metric: 'Avg ROI', North: 2.5, South: 1.8 },
  { metric: 'Recovery Rate %', North: 92, South: 88 },
  { metric: 'Profit Margin %', North: 28, South: 24 },
];

const executiveMonthlyData = [
  { month: 'Apr', income: 70, ntfp: 36, convergence: 115 },
  { month: 'May', income: 66, ntfp: 32, convergence: 100 },
  { month: 'Jun', income: 52, ntfp: 26, convergence: 70 },
  { month: 'Jul', income: 56, ntfp: 30, convergence: 82 },
  { month: 'Aug', income: 68, ntfp: 31, convergence: 98 },
  { month: 'Sep', income: 84, ntfp: 42, convergence: 125 },
];

const executiveRangeData = [
  { range: 'Pithabata North', div: 'North', convergence: 63, income: 34, tourists: 380, fundUtil: 81, score: 76 },
  { range: 'Pithabata South', div: 'South', convergence: 40, income: 26, tourists: 360, fundUtil: 84, score: 80 },
  { range: 'Dukura', div: 'South', convergence: 33, income: 21, tourists: 120, fundUtil: 80, score: 74 },
  { range: 'Podadiha', div: 'South', convergence: 44, income: 30, tourists: 250, fundUtil: 87, score: 82 },
  { range: 'Nawana North', div: 'North', convergence: 64, income: 43, tourists: 280, fundUtil: 84, score: 72 },
  { range: 'Barehipani', div: 'North', convergence: 31, income: 22, tourists: 950, fundUtil: 79, score: 72 },
  { range: 'Gudgudia', div: 'North', convergence: 94, income: 60, tourists: 4400, fundUtil: 85, score: 81 },
  { range: 'Talabandha', div: 'North', convergence: 95, income: 62, tourists: 450, fundUtil: 88, score: 84 },
  { range: 'Kendumundi', div: 'South', convergence: 39, income: 25, tourists: 100, fundUtil: 85, score: 80 },
  { range: 'Thakurmunda', div: 'South', convergence: 96, income: 67, tourists: 330, fundUtil: 93, score: 92 },
];

const executiveTableData = [
  { id: 'R1', month: 'Apr', div: 'North', range: 'Pithabata North', village: 'Gendapokhari', hh: 185, ben: 740, edc: 1, shg: 5, proj: 3, inc: '₹12.5 L', ntfp: '₹6.8 L', train: 45, conv: '₹22 L', util: '82%', tour: 150, score: 78 },
  { id: 'R2', month: 'Apr', div: 'North', range: 'Pithabata North', village: 'Phuljhari', hh: 140, ben: 560, edc: 1, shg: 4, proj: 2, inc: '₹9.2 L', ntfp: '₹4.5 L', train: 32, conv: '₹18 L', util: '79%', tour: 80, score: 72 },
  { id: 'R3', month: 'Apr', div: 'South', range: 'Pithabata South', village: 'Digdiga', hh: 165, ben: 660, edc: 1, shg: 4, proj: 2, inc: '₹10.8 L', ntfp: '₹5.2 L', train: 38, conv: '₹16 L', util: '81%', tour: 120, score: 75 },
  { id: 'R4', month: 'Apr', div: 'South', range: 'Pithabata South', village: 'Gopinathpur', hh: 210, ben: 840, edc: 1, shg: 5, proj: 4, inc: '₹16.5 L', ntfp: '₹9.0 L', train: 52, conv: '₹25 L', util: '89%', tour: 250, score: 88 },
  { id: 'R5', month: 'Apr', div: 'South', range: 'Dukura', village: 'Kabatghai', hh: 175, ben: 700, edc: 1, shg: 5, proj: 3, inc: '₹13.2 L', ntfp: '₹7.5 L', train: 41, conv: '₹20 L', util: '85%', tour: 70, score: 80 },
  { id: 'R6', month: 'Apr', div: 'South', range: 'Dukura', village: 'Badmakabadi', hh: 155, ben: 620, edc: 1, shg: 4, proj: 2, inc: '₹8.7 L', ntfp: '₹4.0 L', train: 29, conv: '₹14 L', util: '76%', tour: 40, score: 69 },
  { id: 'R7', month: 'May', div: 'South', range: 'Podadiha', village: 'Podadiha', hh: 230, ben: 920, edc: 1, shg: 7, proj: 5, inc: '₹21.5 L', ntfp: '₹11.0 L', train: 60, conv: '₹30 L', util: '92%', tour: 190, score: 91 },
  { id: 'R8', month: 'May', div: 'South', range: 'Podadiha', village: 'Jamuani', hh: 145, ben: 580, edc: 1, shg: 4, proj: 2, inc: '₹9.1 L', ntfp: '₹4.8 L', train: 34, conv: '₹15 L', util: '84%', tour: 90, score: 74 },
  { id: 'R9', month: 'May', div: 'North', range: 'Nawana North', village: 'Mohanpur', hh: 205, ben: 820, edc: 1, shg: 6, proj: 4, inc: '₹18.6 L', ntfp: '₹8.2 L', train: 55, conv: '₹26 L', util: '90%', tour: 135, score: 87 },
  { id: 'R10', month: 'May', div: 'North', range: 'Nawana North', village: 'Kaliani', hh: 185, ben: 740, edc: 1, shg: 5, proj: 3, inc: '₹11.8 L', ntfp: '₹5.8 L', train: 40, conv: '₹19 L', util: '86%', tour: 75, score: 80 },
  { id: 'R11', month: 'May', div: 'North', range: 'Nawana North', village: 'Uski', hh: 110, ben: 440, edc: 1, shg: 3, proj: 2, inc: '₹5.5 L', ntfp: '₹3.1 L', train: 24, conv: '₹10 L', util: '78%', tour: 35, score: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)', color: '#f8fafc', zIndex: 100 }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 700, fontSize: '0.9rem', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>{label || payload[0].payload.name || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '4px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: entry.color || entry.payload.fill, borderRadius: '2px' }} />
            <span style={{ color: '#cbd5e1' }}>{entry.name}:</span>
            <span style={{ fontWeight: 600 }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color, border: `1px solid ${color}40`, background: `${color}10`, padding: '4px 8px', borderRadius: '12px' }}>
    {children}
  </span>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overall');
  const [modalData, setModalData] = useState<{ isOpen: boolean, title: string, activeColumn: any }>({ isOpen: false, title: '', activeColumn: null });

  // Filter States
  const [divFilter, setDivFilter] = useState('All');
  const [rangeFilter, setRangeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply Filters to Data
  const filteredRangeData = rangeWiseData.filter(d =>
    (divFilter === 'All' || d.div === divFilter) &&
    (rangeFilter === 'All' || d.range === rangeFilter)
  );

  const q = searchQuery.toLowerCase();

  const filteredSHG = shgTableData.filter(row =>
    (divFilter === 'All' || row.div === divFilter) &&
    (rangeFilter === 'All' || row.range === rangeFilter) &&
    (q === '' || row.vill.toLowerCase().includes(q) || row.act.toLowerCase().includes(q) || row.name.toLowerCase().includes(q))
  );

  const filteredLivelihood = livelihoodTableData.filter(row =>
    (divFilter === 'All' || row.div === divFilter) &&
    (rangeFilter === 'All' || row.range === rangeFilter) &&
    (q === '' || row.village.toLowerCase().includes(q) || row.activity.toLowerCase().includes(q) || row.group.toLowerCase().includes(q))
  );

  const filteredExecutiveRangeData = executiveRangeData.filter(d =>
    (divFilter === 'All' || d.div === divFilter) &&
    (rangeFilter === 'All' || d.range === rangeFilter)
  );

  const filteredExecutiveTable = executiveTableData.filter(row =>
    (divFilter === 'All' || row.div === divFilter) &&
    (rangeFilter === 'All' || row.range === rangeFilter) &&
    (q === '' || row.village.toLowerCase().includes(q) || row.month.toLowerCase().includes(q))
  );

  const openModal = (title: string, column: any) => setModalData({ isOpen: true, title, activeColumn: column });

  // SHARED FILTERS COMPONENT
  const FiltersRow = () => (
    <div className="filter-row">
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div className="filter-group">
          <label>Wildlife Division</label>
          <select className="filter-select" value={divFilter} onChange={e => setDivFilter(e.target.value)}>
            <option value="All">All Divisions (North & South)</option>
            <option value="North">Similipal North Division</option>
            <option value="South">Similipal South Division</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Forest Range</label>
          <select className="filter-select" value={rangeFilter} onChange={e => setRangeFilter(e.target.value)}>
            <option value="All">All 10 Forest Ranges</option>
            {Array.from(new Set(rangeWiseData.map(d => d.range))).map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Search Village / Activity</label>
          <div className="filter-input-wrapper">
            <Search size={18} />
            <input
              type="text"
              className="filter-input"
              placeholder="e.g. Honey, Gudgudia, Podadiha..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="filter-right">
        <div className="filter-badge" style={{ background: (divFilter !== 'All' || rangeFilter !== 'All' || searchQuery !== '') ? '#dcfce7' : '#f1f5f9', color: (divFilter !== 'All' || rangeFilter !== 'All' || searchQuery !== '') ? '#166534' : '#64748b' }}>
          <Filter size={16} /> {(divFilter !== 'All' || rangeFilter !== 'All' || searchQuery !== '') ? 'Filters Active' : 'Showing All Field Units'}
        </div>
        <button className="filter-reset" onClick={() => { setDivFilter('All'); setRangeFilter('All'); setSearchQuery(''); }}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );


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
    const ben = data.reduce((a, c) => a + c.st + c.other, 0);
    const rev = data.reduce((a, c) => a + c.revenue, 0).toFixed(2);
    const avgB = data.reduce((a, c) => a + c.incomeBefore, 0) / data.length;
    const avgA = data.reduce((a, c) => a + c.incomeAfter, 0) / data.length;
    const growth = avgB ? Math.round(((avgA - avgB) / avgB) * 100) : 0;
    return { units: data.reduce((a, c) => a + c.activeLoans, 0), ben, rev, growth };
  };
  const northMetrics = calcDivMetrics('North');
  const southMetrics = calcDivMetrics('South');

  const calcExecHH = filteredExecutiveTable.reduce((a, c) => a + c.hh, 0);
  const calcExecBen = filteredExecutiveTable.reduce((a, c) => a + c.ben, 0);
  const calcExecVillage = new Set(filteredExecutiveTable.map(c => c.village)).size;
  const calcExecUtil = filteredExecutiveTable.length ? Math.round(filteredExecutiveTable.reduce((a, c) => a + parseAmt(c.util), 0) / filteredExecutiveTable.length) : 0;
  const calcExecRev = filteredExecutiveTable.reduce((a, c) => a + parseAmt(c.inc), 0).toFixed(1);
  const calcExecConv = filteredExecutiveTable.reduce((a, c) => a + parseAmt(c.conv), 0).toFixed(1);
  const calcExecTourists = filteredExecutiveTable.reduce((a, c) => a + (c.tour || 0), 0);
  const calcExecTrain = filteredExecutiveTable.reduce((a, c) => a + (c.train || 0), 0);
  const calcExecProj = filteredExecutiveTable.reduce((a, c) => a + (c.proj || 0), 0);
  const calcExecNtfp = filteredExecutiveTable.reduce((a, c) => a + parseAmt(c.ntfp), 0).toFixed(1);
  const calcExecEdc = filteredExecutiveTable.reduce((a, c) => a + (c.edc || 0), 0);
  const calcExecShg = filteredExecutiveTable.reduce((a, c) => a + (c.shg || 0), 0);

  const calcShgCount = filteredSHG.length;
  const calcShgMembers = filteredSHG.reduce((a, c) => a + (parseInt(c.mem) || 0), 0);
  const calcShgST = filteredSHG.reduce((a, c) => a + c.st, 0);
  const calcShgSTPercent = calcShgMembers ? ((calcShgST / calcShgMembers) * 100).toFixed(1) : 0;
  const calcShgRev = filteredSHG.reduce((a, c) => a + parseAmt(c.rev), 0).toFixed(2);
  const calcShgProfit = filteredSHG.reduce((a, c) => a + parseAmt(c.prof), 0).toFixed(2);

  const calcLivProjects = filteredLivelihood.length;
  const calcLivBen = filteredLivelihood.reduce((a, c) => a + c.ben, 0);
  const calcLivInv = filteredLivelihood.reduce((a, c) => a + parseAmt(c.inv) / 100000, 0).toFixed(1);
  const livIncB = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a, c) => a + parseAmt(c.incB), 0) / filteredLivelihood.length) : 0;
  const livIncA = filteredLivelihood.length ? Math.round(filteredLivelihood.reduce((a, c) => a + parseAmt(c.incA), 0) / filteredLivelihood.length) : 0;
  const livIncSurge = livIncB ? Math.round(((livIncA - livIncB) / livIncB) * 100) : 0;

  return (
    <div>
      <KPIDetailModal isOpen={modalData.isOpen} onClose={() => setModalData({ ...modalData, isOpen: false })} title={modalData.title} activeColumn={modalData.activeColumn} />

      {/* TOP NAVIGATION TABS */}
      <div className="dash-tabs-container">
        <button className={`dash-tab ${activeTab === 'overall' ? 'active' : ''}`} onClick={() => setActiveTab('overall')}>
          <LineChart size={18} /> Overall Overview <span className="badge">Program 360°</span>
        </button>
        <button className={`dash-tab ${activeTab === 'executive' ? 'active' : ''}`} onClick={() => setActiveTab('executive')}>
          <Briefcase size={18} /> Executive Dashboard <span className="badge">Strategic</span>
        </button>
        <button className={`dash-tab ${activeTab === 'shg' ? 'active' : ''}`} onClick={() => setActiveTab('shg')}>
          <Users size={18} /> SHG-Producer Group Dashboard <span className="badge">{calcShgCount} SHGs</span>
        </button>
        <button className={`dash-tab ${activeTab === 'livelihood' ? 'active' : ''}`} onClick={() => setActiveTab('livelihood')}>
          <Map size={18} /> Livelihood Dashboard <span className="badge">{calcLivProjects} Projects</span>
        </button>

      </div>

      <FiltersRow />

      {/* =========================================================================
          TAB 1: OVERALL OVERVIEW
          ========================================================================= */}
      {activeTab === 'overall' && (
          <div className="tab-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="benchmark-bar" style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #064e3b 100%)' }}>
              <div className="benchmark-title">
                <h3><Activity size={20} /> Official Overview KPI Benchmarks</h3>
                <p>Consolidated performance across all ranges</p>
              </div>
              <div className="benchmark-metrics">
                <div className="benchmark-metric"><div className="benchmark-metric-label">Beneficiaries</div><div className="benchmark-metric-val">{totalBeneficiaries.toLocaleString()}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Income Surge</div><div className="benchmark-metric-val">+{incomeSurge}%</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Total Revenue</div><div className="benchmark-metric-val">₹{(totalRevenue > 100 ? (totalRevenue / 100).toFixed(2) + " Cr" : totalRevenue.toFixed(2) + " L")}</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Net Profit</div><div className="benchmark-metric-val">₹{totalProfit.toFixed(1)} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Credit Linkage</div><div className="benchmark-metric-val">₹{totalBankLinkage.toFixed(2)} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Govt Support</div><div className="benchmark-metric-val">₹{govtSupport.toFixed(2)} L</div></div>
                <div className="benchmark-metric"><div className="benchmark-metric-label">Women Included</div><div className="benchmark-metric-val">100%</div></div>
              </div>
            </div>
            <div className="kpi-grid-6">
              <div className="kpi-card" style={{ borderTopColor: '#3b82f6' }}>
                <div className="kpi-title">Total Tribal Beneficiaries <Globe size={18} color="#3b82f6" /></div>
                <div className="kpi-val">{totalBeneficiaries}</div>
                <div className="kpi-sub"><span style={{ color: '#10b981' }}>{totalBeneficiaries} Women</span> across {filteredRangeData.length * 3} Villages</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#10b981' }}>
                <div className="kpi-title">Average Income Surge <LineChart size={18} color="#10b981" /></div>
                <div className="kpi-val">+{incomeSurge}%</div>
                <div className="kpi-sub" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>₹{avgIncomeBefore.toLocaleString("en-IN")} Before</span> <span>➔</span> <span style={{ color: '#10b981' }}>₹{avgIncomeAfter.toLocaleString("en-IN")} After</span>
                </div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#f59e0b' }}>
                <div className="kpi-title">Total Revenue Generated <PiggyBank size={18} color="#f59e0b" /></div>
                <div className="kpi-val">₹{(totalRevenue > 100 ? (totalRevenue / 100).toFixed(2) + " Cr" : totalRevenue.toFixed(2) + " L")}</div>
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
            </div>


          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <div className="division-card north span-6">
              <div>
                <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Northern Division</span>
                <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', color: '#0f172a' }}>Similipal North Wildlife Division</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Ranges: Pithabata North, Nawana North, Barehipani, Gudgudia, Talabandha</p>
              </div>
              <div className="div-metrics">
                <div className="div-metric"><div className="div-metric-label">Field Units</div><div className="div-metric-val">{northMetrics.units}</div></div>
                <div className="div-metric"><div className="div-metric-label">Beneficiaries</div><div className="div-metric-val">{northMetrics.ben}</div></div>
                <div className="div-metric"><div className="div-metric-label">Revenue Gen.</div><div className="div-metric-val">₹{northMetrics.rev} L</div></div>
                <div className="div-metric"><div className="div-metric-label">Avg Growth</div><div className="div-metric-val" style={{ color: '#10b981' }}>+{northMetrics.growth}%</div></div>
              </div>
            </div>

            <div className="division-card south span-6">
              <div>
                <span style={{ background: '#fffbeb', color: '#f59e0b', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Southern Division</span>
                <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', color: '#0f172a' }}>Similipal South Wildlife Division</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Ranges: Pithabata South, Dukura, Podadiha, Kendumundi, Thakurmunda</p>
              </div>
              <div className="div-metrics">
                <div className="div-metric"><div className="div-metric-label">Field Units</div><div className="div-metric-val">{southMetrics.units}</div></div>
                <div className="div-metric"><div className="div-metric-label">Beneficiaries</div><div className="div-metric-val">{southMetrics.ben}</div></div>
                <div className="div-metric"><div className="div-metric-label">Revenue Gen.</div><div className="div-metric-val">₹{southMetrics.rev} L</div></div>
                <div className="div-metric"><div className="div-metric-label">Avg Growth</div><div className="div-metric-val" style={{ color: '#10b981' }}>+{southMetrics.growth}%</div></div>
              </div>
            </div>
          </div>


          <div style={{ marginBottom: "24px" }}>
            <SimilipalMap selectedRange={rangeFilter === "All" ? "Pithabata South" : rangeFilter} onRangeSelect={setRangeFilter} />
          </div>
          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} /> Range-Wise Economic Turnover</h2>
                  <div className="panel-sub">Annual Revenue vs Net Profit generated by tribal enterprises across ranges</div>
                </div>
                <Badge color="#3b82f6">FINANCIALS</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={filteredRangeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-35} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Amount (₹ in Lakhs)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 50 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="revenue" name="Annual Revenue (₹ Lakhs)" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="profit" name="Net Profit (₹ Lakhs)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
                </ComposedChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><LineChart size={18} /> Income Leap: Pre vs Post Intervention</h2>
                  <div className="panel-sub">Average household income before vs after Ama Similipal Yojna assistance (₹/Year)</div>
                </div>
                <Badge color="#10b981">LIVELIHOOD</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={filteredRangeData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-35} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Annual Income (₹)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 50 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="incomeBefore" name="Income Before (₹/Yr)" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={14} />
                  <Bar dataKey="incomeAfter" name="Income After (₹/Yr)" fill="#0f766e" radius={[4, 4, 0, 0]} barSize={14} />
                </ComposedChart>
              </ResponsiveContainer>
            </article>
          </div>

          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-4" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={16} /> Livelihood Category Mix</h2>
                  <div className="panel-sub">Distribution of 30 projects by sector</div>
                </div>
                <Badge color="#d97706">SECTOR</Badge>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={livelihoodMix} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none" paddingAngle={2}>
                    {livelihoodMix.map((entry, index) => (
                      <Cell key={`pie-${index}`} fill={entry.fill} style={{ outline: 'none' }} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="rect" wrapperStyle={{ fontSize: '0.8rem' }} />
                </PieChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-4" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><IndianRupee size={16} /> Financial Capital Framework</h2>
                  <div className="panel-sub">Govt Support vs Bank Linkage vs Savings (₹ Lakhs)</div>
                </div>
                <Badge color="#3b82f6">CAPITAL</Badge>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" barSize={20} data={financialCapital}>
                  <RadialBar label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }} background dataKey="value" />
                  <Legend iconSize={10} iconType="rect" layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '0.8rem', lineHeight: '24px' }} />
                  <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-4" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> Tribal Community Representation</h2>
                  <div className="panel-sub">ST Membership vs Total Beneficiaries by Range</div>
                </div>
                <Badge color="#10b981">INCLUSION</Badge>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart layout="vertical" data={filteredRangeData} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} width={80} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10, fontSize: '0.8rem' }} iconType="rect" />
                  <Bar dataKey="st" name="ST Members" stackId="a" fill="#10b981" barSize={12} />
                  <Bar dataKey="other" name="Other Members" stackId="a" fill="#94a3b8" barSize={12} radius={[0, 4, 4, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </article>
          </div>

        </div>
      )}
      {/* =========================================================================
          TAB 4: EXECUTIVE DASHBOARD
          ========================================================================= */}
      {activeTab === 'executive' && (
        <div className="tab-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>

          {/* KPI ROW */}
          <div className="benchmark-bar" style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #064e3b 100%)' }}>
            <div className="benchmark-title">
              <h3><Activity size={20} /> Official Executive Dashboard KPI Benchmarks</h3>
              <p>Verified with Field Monitoring Records</p>
            </div>
            <div className="benchmark-metrics">
              <div className="benchmark-metric"><div className="benchmark-metric-label">Households</div><div className="benchmark-metric-val">{calcExecHH.toLocaleString()}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Beneficiaries</div><div className="benchmark-metric-val">{calcExecBen.toLocaleString()}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Convergence</div><div className="benchmark-metric-val">₹{calcExecConv} L</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Income Gen</div><div className="benchmark-metric-val">₹{calcExecRev} L</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">NTFP Revenue</div><div className="benchmark-metric-val">₹{calcExecNtfp} L</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Tourists</div><div className="benchmark-metric-val">{calcExecTourists.toLocaleString()}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Fund Util</div><div className="benchmark-metric-val">{calcExecUtil}%</div></div>
            </div>
          </div>

            <div className="grid-12" style={{ marginBottom: '24px', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div className="kpi-card" style={{ borderTopColor: '#3b82f6', gridColumn: 'span 1' }}>
                <div className="kpi-title">HOUSEHOLDS COVERED <Home size={18} color="#3b82f6" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>{calcExecHH.toLocaleString()}</div>
                <div className="kpi-sub">Across {calcExecVillage} Forest Villages</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#10b981', gridColumn: 'span 1' }}>
                <div className="kpi-title">TOTAL FIELD BENEFICIARIES <Users size={18} color="#10b981" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>{calcExecBen.toLocaleString()}</div>
                <div className="kpi-sub">{calcExecEdc} EDCs • {calcExecShg} Active SHGs</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#f59e0b', gridColumn: 'span 1' }}>
                <div className="kpi-title">SCHEME CONVERGENCE <IndianRupee size={18} color="#f59e0b" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>₹{calcExecConv} L</div>
                <div className="kpi-sub">Multi-Departmental Interventions</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#a855f7', gridColumn: 'span 1' }}>
                <div className="kpi-title">TOTAL INCOME GENERATED <PiggyBank size={18} color="#a855f7" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>₹{calcExecRev} L</div>
                <div className="kpi-sub">NTFP Share: <span style={{ color: '#f59e0b', fontWeight: 700 }}>₹{calcExecNtfp} L</span></div>
              </div>
  
              <div className="kpi-card" style={{ borderTopColor: '#14b8a6', gridColumn: 'span 1' }}>
                <div className="kpi-title">TOURISM FOOTFALL <Globe size={18} color="#14b8a6" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>{calcExecTourists.toLocaleString()}</div>
                <div className="kpi-sub">Gudgudia & Barehipani Hotspots</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#ef4444', gridColumn: 'span 1' }}>
                <div className="kpi-title">TRAINING PARTICIPANTS <GraduationCap size={18} color="#ef4444" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>{calcExecTrain.toLocaleString()}</div>
                <div className="kpi-sub">Capacity Building & Skill Hubs</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#10b981', gridColumn: 'span 1' }}>
                <div className="kpi-title">AVERAGE FUND UTILIZATION <PieChartIcon size={18} color="#10b981" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>{calcExecUtil}%</div>
                <div className="kpi-sub">Peak 96% in Thakurmunda</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#3b82f6', gridColumn: 'span 1' }}>
                <div className="kpi-title">LIVELIHOOD UNITS <Blocks size={18} color="#3b82f6" /></div>
                <div className="kpi-val" style={{ fontSize: '1.8rem' }}>{calcExecProj} Units</div>
                <div className="kpi-sub">Active Enterprise Hubs</div>
              </div>
            </div>

          {/* Charts Row 1 */}
          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={16} /> Monthly Financial Trajectory (Apr - Sep)</h2>
                  <div className="panel-sub">Income Generated, NTFP Revenue, and Scheme Convergence achieved month-by-month (₹ Lakhs)</div>
                </div>
                <Badge color="#3b82f6">TIMELINE</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={executiveMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: '₹ in Lakhs', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 30 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="income" name="Income Generated (₹ L)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="ntfp" name="NTFP Revenue (₹ L)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="convergence" name="Scheme Convergence (₹ L)" fill="#d97706" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={16} /> Range-Wise Scheme Convergence & Income</h2>
                  <div className="panel-sub">Convergence Funds vs Income Generated across 10 Forest Ranges (₹ Lakhs)</div>
                </div>
                <Badge color="#f59e0b">IMPACT</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredExecutiveRangeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-30} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: '₹ in Lakhs', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 30 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="convergence" name="Scheme Convergence (₹ L)" fill="#d97706" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="income" name="Income Generated (₹ L)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </article>
          </div>

          {/* Charts Row 2 */}
          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Tent size={16} /> Eco-Tourism Footfall by Range</h2>
                  <div className="panel-sub">Tourist visitor volume across Similipal core and buffer ranges</div>
                </div>
                <Badge color="#10b981">TOURISM</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredExecutiveRangeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-30} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Visitors Count', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 50 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="tourists" name="Visitor Count" radius={[4, 4, 0, 0]} barSize={36}>
                    {filteredExecutiveRangeData.map((entry, index) => {
                      const colors = ['#0f766e', '#10b981', '#3b82f6', '#6366f1', '#a855f7', '#d97706', '#f59e0b', '#f43f5e', '#14b8a6', '#6366f1'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={16} /> Range Performance: Fund Utilization vs Dashboard Score</h2>
                  <div className="panel-sub">Operational efficiency index comparison across ranges</div>
                </div>
                <Badge color="#8b5cf6">EFFICIENCY</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={filteredExecutiveRangeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-30} textAnchor="end" dy={10} />
                  <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Percentage / Score', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 60 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Area type="monotone" dataKey="fundUtil" name="Avg Fund Utilization %" fill="#10b981" fillOpacity={0.1} stroke="none" />
                  <Line type="monotone" dataKey="fundUtil" name="Avg Fund Utilization %" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                  <Line type="monotone" dataKey="score" name="Avg Dashboard Score / 100" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </article>
          </div>

          {/* Division Cards */}
          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <div className="division-card north span-6" style={{ padding: '24px', borderLeft: '4px solid #3b82f6', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={20} color="#3b82f6" /> Similipal North Wildlife Division
                </h3>
                <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '16px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>North Wildlife</span>
              </div>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                Encompasses Pithabata North, Nawana North, Barehipani, Gudgudia, and Talabandha. Major hub for tourism footfall (4,995 visitors) and heavy NTFP aggregation.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Households</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>2,951</div></div>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Convergence</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>₹335 L</div></div>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Income Gen.</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>₹225.4 L</div></div>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Tourists</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>6,520</div></div>
              </div>
            </div>

            <div className="division-card south span-6" style={{ padding: '24px', borderLeft: '4px solid #f59e0b', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={20} color="#f59e0b" /> Similipal South Wildlife Division
                </h3>
                <span style={{ background: '#fffbeb', color: '#f59e0b', padding: '4px 10px', borderRadius: '16px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>South Wildlife</span>
              </div>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                Encompasses Pithabata South, Dukura, Podadiha, Kendumundi, and Thakurmunda. Strong performer in high fund utilization and household enterprise convergence.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Households</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>2,135</div></div>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Convergence</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>₹257 L</div></div>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Income Gen.</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>₹173.5 L</div></div>
                <div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Tourists</div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>1,205</div></div>
              </div>
            </div>
          </div>

          {/* New Executive Data Table */}
          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-12" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><List size={18} /> Executive Monitoring Register (Field Convergence & Socio-Economic Matrix)</h2>
                  <div className="panel-sub">Comprehensive register of 30 village monitoring records across Similipal Tiger Reserve</div>
                </div>
                <Badge color="#3b82f6">{filteredExecutiveTable.length} Records Filtered</Badge>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Division</th>
                      <th>Range</th>
                      <th>Village</th>
                      <th>HH Covered</th>
                      <th>Beneficiaries</th>
                      <th>EDCs</th>
                      <th>SHGs</th>
                      <th>Projects</th>
                      <th>Income (₹ L)</th>
                      <th>NTFP (₹ L)</th>
                      <th>Training</th>
                      <th>Convergence (₹ L)</th>
                      <th>Fund Util %</th>
                      <th>Tourists</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExecutiveTable.length === 0 ? <tr><td colSpan={16} style={{ textAlign: 'center' }}>No records match the current filters.</td></tr> : null}
                    {filteredExecutiveTable.map(row => {
                      let scoreColor = '#3b82f6';
                      if (row.score < 75) scoreColor = '#d97706';
                      if (row.score > 85) scoreColor = '#10b981';
                      return (
                        <tr key={row.id}>
                          <td><span style={{ color: '#6366f1', background: '#e0e7ff', padding: '2px 8px', borderRadius: '12px', fontWeight: 700, fontSize: '0.75rem' }}>{row.month}</span></td>
                          <td><span style={{ color: row.div === 'North' ? '#3b82f6' : '#f43f5e', fontWeight: 700 }}>{row.div}</span></td>
                          <td style={{ fontWeight: 600 }}>{row.range}</td>
                          <td>{row.village}</td>
                          <td style={{ fontWeight: 700 }}>{row.hh}</td>
                          <td>{row.ben}</td>
                          <td>{row.edc}</td>
                          <td>{row.shg}</td>
                          <td>{row.proj}</td>
                          <td style={{ color: '#3b82f6', fontWeight: 700 }}>{row.inc}</td>
                          <td style={{ color: '#10b981', fontWeight: 700 }}>{row.ntfp}</td>
                          <td>{row.train}</td>
                          <td style={{ color: '#f59e0b', fontWeight: 700 }}>{row.conv}</td>
                          <td style={{ fontWeight: 700 }}>{row.util}</td>
                          <td>{row.tour}</td>
                          <td style={{ color: scoreColor, fontWeight: 800 }}>{row.score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: SHG-PRODUCER GROUP DASHBOARD
          ========================================================================= */}
      {activeTab === 'shg' && (
        <div className="tab-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className="benchmark-bar">
            <div className="benchmark-title">
              <h3><ShieldCheck size={20} /> Official SHG-Producer Group KPI Benchmarks</h3>
              <p>Verified with Mayurbhanj District & Similipal Tiger Reserve Field Records (Excel Sheet: Tab 2)</p>
            </div>
            <div className="benchmark-metrics">
              <div className="benchmark-metric"><div className="benchmark-metric-label">Total SHGs</div><div className="benchmark-metric-val">{calcShgCount}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Total Members</div><div className="benchmark-metric-val">{calcShgMembers}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Women Members</div><div className="benchmark-metric-val">{calcShgMembers} (100%)</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">ST Members</div><div className="benchmark-metric-val">{calcShgST} ({calcShgSTPercent}%)</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Total Revenue</div><div className="benchmark-metric-val">₹{(parseFloat(calcShgRev) > 100 ? (parseFloat(calcShgRev)/100).toFixed(2) + " Cr" : calcShgRev + " L")}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Total Profit</div><div className="benchmark-metric-val">₹{calcShgProfit} L</div></div>
            </div>
          </div>

          <div className="kpi-grid-6">
              <div className="kpi-card" style={{ borderTopColor: '#3b82f6' }}>
                <div className="kpi-title">Active SHG Groups <Activity size={18} color="#3b82f6" /></div>
                <div className="kpi-val">{calcShgCount}</div>
                <div className="kpi-sub">{calcShgMembers} Women Beneficiaries</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#f59e0b' }}>
                <div className="kpi-title">Total Gross Revenue <IndianRupee size={18} color="#f59e0b" /></div>
                <div className="kpi-val">₹{calcShgRev} L</div>
                <div className="kpi-sub">Generated across {calcShgCount} SHGs</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#10b981' }}>
                <div className="kpi-title">Total Annual Profit <LineChart size={18} color="#10b981" /></div>
                <div className="kpi-val">₹{calcShgProfit} L</div>
                <div className="kpi-sub">Avg Profit / SHG: <span style={{ color: '#10b981' }}>₹{calcShgCount ? (parseFloat(calcShgProfit) / calcShgCount).toFixed(2) : 0} Lakhs</span></div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#8b5cf6' }}>
                <div className="kpi-title">Total Bank Linkage <Briefcase size={18} color="#8b5cf6" /></div>
                <div className="kpi-val">₹{totalBankLinkage.toFixed(2)} L</div>
                <div className="kpi-sub">{totalActiveLoans} Active Loan Accounts</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#06b6d4' }}>
                <div className="kpi-title">Total Group Savings <PiggyBank size={18} color="#06b6d4" /></div>
                <div className="kpi-val">₹{totalSavings.toFixed(2)} L</div>
                <div className="kpi-sub">Revolving Fund: <span style={{ color: '#3b82f6' }}>₹{totalRevFund.toFixed(1)} Lakhs</span></div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#f43f5e' }}>
                <div className="kpi-title">Conservation Linkage <Compass size={18} color="#f43f5e" /></div>
                <div className="kpi-val" style={{ fontSize: '1.4rem' }}>11 NTFP / 3 Tourism</div>
                <div className="kpi-sub">Forest-dependent sustainable models</div>
              </div>
            </div>

          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={18} /> Enterprise Activity Revenue Breakdown</h2>
                  <div className="panel-sub">Revenue distribution by enterprise trade (Honey, Leaf Plates, Eco-Tourism, etc.)</div>
                </div>
                <Badge color="#3b82f6">ENTERPRISE</Badge>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={enterpriseMix} cx="35%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" stroke="none" paddingAngle={2}>
                    {enterpriseMix.map((entry, index) => (
                      <Cell key={`pie-${index}`} fill={entry.fill} style={{ outline: 'none' }} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" iconType="rect" wrapperStyle={{ fontSize: '0.75rem', paddingRight: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} /> Range-Wise Revenue & Profitability</h2>
                  <div className="panel-sub">Gross Revenue vs Net Profit for each forest range</div>
                </div>
                <Badge color="#d97706">PERFORMANCE</Badge>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={filteredRangeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-35} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: '₹ Lakhs', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 30 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="revenue" name="Revenue (₹ Lakhs)" fill="#d97706" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="profit" name="Net Profit (₹ Lakhs)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
                </ComposedChart>
              </ResponsiveContainer>
            </article>
          </div>

          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><IndianRupee size={18} /> Financial Capital Mobilization by Range</h2>
                  <div className="panel-sub">Savings, Bank Linkage, and Revolving Funds per Range (₹)</div>
                </div>
                <Badge color="#10b981">CAPITAL</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={filteredRangeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-35} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: '₹ Lakhs', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 30 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="bankLinkage" name="Bank Linkage (₹)" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="savings" name="Savings (₹)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="revolvingFund" name="Revolving Fund (₹)" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={10} />
                </ComposedChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} /> Active Loan Portfolio by Range</h2>
                  <div className="panel-sub">Total active bank loan credit accounts across ranges</div>
                </div>
                <Badge color="#3b82f6">CREDIT</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredRangeData} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-35} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Number of Active Loans', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 70 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Area type="monotone" dataKey="activeLoans" name="Active Bank Loans" stroke="#8b5cf6" strokeWidth={3} fill="#8b5cf6" fillOpacity={0.2} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </article>
          </div>

          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-12" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><List size={18} /> SHG-Producer Group Field Register</h2>
                  <div className="panel-sub">Comprehensive listing of 30 women tribal self-help groups in Similipal Tiger Reserve</div>
                </div>
                <Badge color="#10b981">{filteredSHG.length} Groups Filtered</Badge>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>SHG ID</th>
                      <th>SHG Name</th>
                      <th>Division</th>
                      <th>Range</th>
                      <th>Village</th>
                      <th>Members</th>
                      <th>ST</th>
                      <th>Savings (₹)</th>
                      <th>Bank Linkage (₹)</th>
                      <th>Enterprise Activity</th>
                      <th>Annual Revenue (₹)</th>
                      <th>Annual Profit (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSHG.length === 0 ? <tr><td colSpan={12} style={{ textAlign: 'center' }}>No records match the current filters.</td></tr> : null}
                    {filteredSHG.map(row => (
                      <tr key={row.id}>
                        <td><span style={{ color: '#3b82f6', background: '#eff6ff', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>{row.id}</span></td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.name}</td>
                        <td><span style={{ color: row.div === 'North' ? '#3b82f6' : '#f43f5e', background: row.div === 'North' ? '#eff6ff' : '#fff1f2', padding: '4px 8px', borderRadius: '12px', fontWeight: 700, fontSize: '0.75rem' }}>{row.div}</span></td>
                        <td>{row.range}</td>
                        <td>{row.vill}</td>
                        <td style={{ color: '#64748b' }}>{row.mem}</td>
                        <td style={{ color: '#10b981', fontWeight: 700 }}>{row.st}</td>
                        <td>{row.sav}</td>
                        <td style={{ color: '#3b82f6', fontWeight: 700 }}>{row.bank}</td>
                        <td><span className={`pill-badge ${row.actClass}`}>{row.act}</span></td>
                        <td style={{ fontWeight: 700 }}>{row.rev}</td>
                        <td style={{ fontWeight: 700 }}>{row.prof}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 3: LIVELIHOOD DASHBOARD
          ========================================================================= */}
      {activeTab === 'livelihood' && (
        <div className="tab-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>

          <div className="benchmark-bar" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
            <div className="benchmark-title">
              <h3><Leaf size={20} color="#10b981" /> Official Livelihood Dashboard KPI Benchmarks</h3>
              <p>Verified with Mayurbhanj Biosphere Reserve Field Records</p>
            </div>
            <div className="benchmark-metrics">
              <div className="benchmark-metric"><div className="benchmark-metric-label">Total Projects</div><div className="benchmark-metric-val">{calcLivProjects}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Total Beneficiaries</div><div className="benchmark-metric-val">{calcLivBen}</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Investment Support</div><div className="benchmark-metric-val">₹{calcLivInv} Lakhs</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Income Before</div><div className="benchmark-metric-val">₹{livIncB.toLocaleString()} / yr</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Income After</div><div className="benchmark-metric-val">₹{livIncA.toLocaleString()} / yr</div></div>
              <div className="benchmark-metric"><div className="benchmark-metric-label">Avg Income Increase</div><div className="benchmark-metric-val" style={{ color: '#10b981' }}>{livIncSurge}%</div></div>
            </div>
          </div>

          <div className="kpi-grid-6">
              <div className="kpi-card" style={{ borderTopColor: '#10b981' }}>
                <div className="kpi-title">Livelihood Projects <Trees size={18} color="#10b981" /></div>
                <div className="kpi-val">{calcLivProjects}</div>
                <div className="kpi-sub">Across {filteredRangeData.length} Forest Ranges</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#3b82f6' }}>
                <div className="kpi-title">Investment Support <IndianRupee size={18} color="#3b82f6" /></div>
                <div className="kpi-val">₹{calcLivInv} L</div>
                <div className="kpi-sub">Govt Seed Capital</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#f59e0b' }}>
                <div className="kpi-title">Household Income Transformation <LineChart size={18} color="#f59e0b" /></div>
                <div className="kpi-val">+{livIncSurge}%</div>
                <div className="kpi-sub" style={{ color: '#10b981' }}>Avg Leap Post-Intervention</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#8b5cf6' }}>
                <div className="kpi-title">NTFP Aggregation Units <Leaf size={18} color="#8b5cf6" /></div>
                <div className="kpi-val">13 Projects</div>
                <div className="kpi-sub">Highest Growth Sector</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#06b6d4' }}>
                <div className="kpi-title">Livestock Interventions <ShieldCheck size={18} color="#06b6d4" /></div>
                <div className="kpi-val">8 Projects</div>
                <div className="kpi-sub">Goatery & Poultry Units</div>
              </div>
              <div className="kpi-card" style={{ borderTopColor: '#f43f5e' }}>
                <div className="kpi-title">Eco-Tourism & Agri <Tent size={18} color="#f43f5e" /></div>
                <div className="kpi-val" style={{ fontSize: '1.4rem' }}>3 Tourism / 5 Agri</div>
                <div className="kpi-sub">Diversified Income Portfolios</div>
              </div>
            </div>

          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><LineChart size={18} /> Income Leap by Forest Range</h2>
                  <div className="panel-sub">Pre-Intervention vs Post-Intervention Annual Income (₹/Year)</div>
                </div>
                <Badge color="#10b981">IMPACT</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={filteredRangeData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} angle={-35} textAnchor="end" dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Annual Income (₹)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 50 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="incomeBefore" name="Income Before (₹)" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={14} />
                  <Bar dataKey="incomeAfter" name="Income After (₹)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={14} />
                </ComposedChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} /> Investment Deployment by Sector</h2>
                  <div className="panel-sub">Total government investment support allocated by livelihood category</div>
                </div>
                <Badge color="#d97706">BUDGET</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={livelihoodMix} cx="50%" cy="50%" outerRadius={110} dataKey="value" stroke="#fff" strokeWidth={2}>
                    {livelihoodMix.map((entry, index) => (
                      <Cell key={`pie-${index}`} fill={entry.fill} style={{ outline: 'none' }} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" iconType="rect" wrapperStyle={{ fontSize: '0.85rem' }} />
                </PieChart>
              </ResponsiveContainer>
            </article>
          </div>

          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} /> Highest Income Growth Sectors</h2>
                  <div className="panel-sub">Average percentage income leap generated per category</div>
                </div>
                <Badge color="#3b82f6">ROI</Badge>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={incomeGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'Income Growth (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, dy: 40 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Legend wrapperStyle={{ top: -10 }} iconType="rect" />
                  <Bar dataKey="growth" name="Average Income Growth %" radius={[4, 4, 0, 0]} barSize={40}>
                    {incomeGrowthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </article>

            <article className="panel span-6" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} /> Beneficiary Reach Across Sectors</h2>
                  <div className="panel-sub">Number of tribal families supported in each domain</div>
                </div>
                <Badge color="#3b82f6">DEMOGRAPHICS</Badge>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={livelihoodMix} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" stroke="#fff" strokeWidth={2}>
                    {livelihoodMix.map((entry, index) => (
                      <Cell key={`pie-${index}`} fill={entry.fill} style={{ outline: 'none' }} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="rect" wrapperStyle={{ fontSize: '0.85rem' }} />
                </PieChart>
              </ResponsiveContainer>
            </article>
          </div>

          <div className="grid-12" style={{ marginBottom: '24px' }}>
            <article className="panel span-12" style={{ padding: '24px', borderRadius: '12px' }}>
              <div className="panel-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><List size={18} /> Livelihood Project Interventions Register</h2>
                  <div className="panel-sub">Comprehensive register of 30 livelihood units funded under Ama Similipal Yojna</div>
                </div>
                <Badge color="#3b82f6">{filteredLivelihood.length} Projects Filtered</Badge>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Project ID</th>
                      <th>Range</th>
                      <th>Division</th>
                      <th>Village</th>
                      <th>Beneficiary / Group</th>
                      <th>Livelihood Activity</th>
                      <th>Category</th>
                      <th>Beneficiaries</th>
                      <th>Investment Support (₹)</th>
                      <th>Income Before (₹)</th>
                      <th>Income After (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLivelihood.length === 0 ? <tr><td colSpan={11} style={{ textAlign: 'center' }}>No records match the current filters.</td></tr> : null}
                    {filteredLivelihood.map(row => (
                      <tr key={row.id}>
                        <td style={{ color: '#3b82f6', fontWeight: 700 }}>{row.id}</td>
                        <td>{row.range}</td>
                        <td style={{ color: '#3b82f6', fontWeight: 700 }}>{row.div}</td>
                        <td>{row.village}</td>
                        <td style={{ fontWeight: 700 }}>{row.group}</td>
                        <td>{row.activity}</td>
                        <td><span className={`pill-badge ${row.catClass}`}>{row.cat}</span></td>
                        <td>{row.ben}</td>
                        <td style={{ color: '#3b82f6', fontWeight: 700 }}>{row.inv}</td>
                        <td style={{ color: '#64748b' }}>{row.incB}</td>
                        <td style={{ color: '#10b981', fontWeight: 700 }}>{row.incA}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

        </div>
      )}



    </div>
  );
}
