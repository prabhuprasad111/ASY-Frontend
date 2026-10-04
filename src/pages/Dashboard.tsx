import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, AreaChart, Area,
  ComposedChart, Line, CartesianGrid
} from 'recharts';
import KPIDetailModal from '../components/KPIDetailModal';
import { detailedKpiData } from '../data/kpiData';

// --- DATA ---
const livelihoodImpact = [
  { category: 'NTFP', before: 65, after: 125 },
  { category: 'Eco-Tourism', before: 82, after: 200 },
  { category: 'Agriculture', before: 52, after: 88 },
  { category: 'Livestock', before: 62, after: 105 },
];

const shgEnterpriseMix = [
  { name: 'Honey Proc.', value: 24, fill: '#FFB822' },
  { name: 'Leaf Plates', value: 18, fill: '#00D084' },
  { name: 'Eco-Tourism', value: 12, fill: '#06A5FF' },
  { name: 'Agri/Livestock', value: 28, fill: '#8B5CF6' },
  { name: 'Tamarind', value: 18, fill: '#F43F5E' },
];

// Generate 30-day cumulative trajectory matching the screenshot style
const trajectoryData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  return {
    day: `Day ${day}`,
    // Generating roughly linear cumulative data that mimics the screenshot's curves
    lastYear: Math.floor(day * 2.2 + 2),      // Ends around 68
    prevMonth: Math.floor(day * 2.5 + 3),     // Ends around 78
    currentMonth: Math.floor(day * 2.8 + 2),  // Ends around 86
  };
});

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#111827', border: '1px solid #374151', padding: '12px', borderRadius: '8px', color: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '4px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '0.9rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: p.color || p.stroke || p.fill }}></span>
            <span style={{ color: '#9CA3AF' }}>{p.name}:</span>
            <span style={{ fontWeight: 'bold' }}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Dot to mimic the square labeled markers in the screenshot
const CustomLabelDot = (props: any) => {
  const { cx, cy, value, stroke } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <rect x={cx - 9} y={cy - 7} width={18} height={14} fill={stroke} rx={2} />
      <text x={cx} y={cy + 3} textAnchor="middle" fill="#fff" fontSize={9} fontWeight="bold">
        {value}
      </text>
    </g>
  );
};

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dynamicResourceCount, setDynamicResourceCount] = useState(0);
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string; activeColumn: keyof typeof detailedKpiData[0] | null }>({
    isOpen: false, title: '', activeColumn: null
  });

  const openModal = (title: string, column: keyof typeof detailedKpiData[0]) => {
    setModalConfig({ isOpen: true, title, activeColumn: column });
  };

  React.useEffect(() => {
    fetch('http://localhost:5009/api/resources')
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          setDynamicResourceCount(data.data.length);
        }
      })
      .catch(err => console.warn("Backend not running yet, using base counts."));
  }, []);

  return (
    <div>
      <div className="page-head" style={{ marginBottom: '24px' }}>
        <div>
          <div className="eyebrow" style={{ color: '#005eb8', fontWeight: 700 }}>Executive Decision View</div>
          <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Similipal Analytics & Livelihoods</h1>
          <p style={{ fontSize: '1.1rem', color: '#617083' }}>Integrated master data tracking for EDCs, SHGs, Microplans, Convergence, and progressive trajectories.</p>
        </div>
      </div>

      {/* --- KPI ROW --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi" onClick={() => openModal('Households Covered', 'hh')} style={{ cursor: 'pointer', borderTop: '4px solid #3b82f6', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Households Covered</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>5,021</div>
          <div style={{ fontSize: '0.85rem', color: '#10b981' }}>Across 9 Ranges</div>
        </div>
        <div className="kpi" onClick={() => openModal('Total Beneficiaries', 'beneficiaries')} style={{ cursor: 'pointer', borderTop: '4px solid #8b5cf6', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Total Beneficiaries</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>20,084</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Direct Impact</div>
        </div>
        <div className="kpi" onClick={() => openModal('Active Groups', 'edcs')} style={{ cursor: 'pointer', borderTop: '4px solid #10b981', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Active Groups</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>177</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>30 EDCs | 147 SHGs</div>
        </div>
        <div className="kpi" onClick={() => openModal('Livelihood Projects', 'projects')} style={{ cursor: 'pointer', borderTop: '4px solid #f59e0b', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Livelihood Projects</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>{96 + dynamicResourceCount}</div>
          <div style={{ fontSize: '0.85rem', color: '#f59e0b' }}>Active Initiatives</div>
        </div>
        <div className="kpi" onClick={() => openModal('Income Generated', 'income')} style={{ cursor: 'pointer', borderTop: '4px solid #ec4899', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Income Generated</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>₹ 402.7L</div>
          <div style={{ fontSize: '0.85rem', color: '#10b981' }}>NTFP: ₹ 202.2L</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi" onClick={() => openModal('Training Beneficiaries', 'training')} style={{ cursor: 'pointer', borderTop: '4px solid #6366f1', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Training Beneficiaries</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>1,267</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Trained Members</div>
        </div>
        <div className="kpi" onClick={() => openModal('Convergence Achieved', 'convergence')} style={{ cursor: 'pointer', borderTop: '4px solid #14b8a6', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Convergence Achieved</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>₹ 583L</div>
          <div style={{ fontSize: '0.85rem', color: '#10b981' }}>Cross-Departmental</div>
        </div>
        <div className="kpi" onClick={() => openModal('Avg Fund Utilization', 'utilization')} style={{ cursor: 'pointer', borderTop: '4px solid #f43f5e', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Avg Fund Utilization</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>85%</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Across EDC/SHG</div>
        </div>
        <div className="kpi" onClick={() => openModal('Total Tourists', 'tourism')} style={{ cursor: 'pointer', borderTop: '4px solid #84cc16', padding: '16px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>Total Tourists</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0' }}>7,265</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Eco-Tourism Visitors</div>
        </div>
      </div>



      {/* --- CHARTS ROW 2 --- */}
      <div className="grid-12" style={{ marginBottom: '24px' }}>
        <article className="panel span-8" style={{ padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderRadius: '12px' }}>
          <div className="panel-head" style={{ marginBottom: '20px' }}>
            <div><h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Livelihood Impact: Income (₹ Thousands)</h2><div className="panel-sub">Income Before vs After by Enterprise Category</div></div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={livelihoodImpact} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={1} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              <Bar dataKey="before" name="Before (? K)" fill="url(#colorBefore)" radius={[6, 6, 0, 0]} barSize={40} onClick={(data: any) => openModal(`${data.category || 'Category'} Impact Analysis`, (data.category || '').includes('NTFP') ? 'ntfp' : (data.category || '').includes('Tourism') ? 'tourism' : 'income')} style={{ cursor: 'pointer' }} />
              <Bar dataKey="after" name="After (? K)" fill="url(#colorAfter)" radius={[6, 6, 0, 0]} barSize={40} onClick={(data: any) => openModal(`${data.category || 'Category'} Impact Analysis`, (data.category || '').includes('NTFP') ? 'ntfp' : (data.category || '').includes('Tourism') ? 'tourism' : 'income')} style={{ cursor: 'pointer' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </article>

        <article className="panel span-4" style={{ padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderRadius: '12px' }}>
          <div className="panel-head" style={{ marginBottom: '20px' }}>
            <div><h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>SHG Enterprise Mix</h2><div className="panel-sub">Distribution of 147 SHGs</div></div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={shgEnterpriseMix}
                cx="50%" cy="45%"
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                stroke="none"
                paddingAngle={5}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {shgEnterpriseMix.map((entry, index) => (
                  <Cell key={`pie-${index}`} fill={entry.fill} opacity={activeIndex === index ? 1 : 0.8} style={{ transition: 'opacity 0.3s', cursor: 'pointer' }} onClick={() => openModal(`${entry.name} Enterprise Breakdown`, entry.name.includes('Eco-Tourism') ? 'tourism' : entry.name.includes('Agri') ? 'income' : 'ntfp')} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </article>
      </div>
      {/* --- NEW PROGRESSIVE TRAJECTORY CHART (From Screenshot) --- */}
      <div className="grid-12" style={{ marginBottom: '24px' }}>
        <article className="panel span-12" style={{ padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderRadius: '12px' }}>
          <div className="panel-head" style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#2563eb', fontSize: '1.2rem' }}>📈</span>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b' }}>Progressive Livelihood Trajectory: Similipal (Overall)</h2>
                <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>
                  Cumulative livelihood income monitored across Days 1 to 30 of the month comparing Current Month, Previous Month, and Last Year Same Month.
                </div>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart data={trajectoryData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

              <XAxis
                dataKey="day"
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
                dy={15}
                label={{ value: 'Days of the Month (Day 1 to Day 30)', position: 'bottom', offset: 0, fontSize: 12, fontWeight: 'bold', fill: '#475569' }}
              />

              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                label={{ value: 'Income Generated (Cumulative ₹ Lakhs)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, fontSize: 12, fontWeight: 'bold', fill: '#475569', dx: -10 }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '30px' }}
                iconType="circle"
              />

              <Line
                type="linear"
                dataKey="currentMonth"
                name="September 2026 (Current Month)"
                stroke="#2563eb"
                strokeWidth={3}
                dot={<CustomLabelDot stroke="#2563eb" />}
                activeDot={{ r: 0 }}
              />
              <Area
                type="linear"
                dataKey="currentMonth"
                fill="url(#colorArea)"
                stroke="none"
              />

              <Line
                type="linear"
                dataKey="prevMonth"
                name="August 2026 (Previous Month)"
                stroke="#10b981"
                strokeWidth={3}
                dot={<CustomLabelDot stroke="#10b981" />}
                activeDot={{ r: 0 }}
              />

              <Line
                type="linear"
                dataKey="lastYear"
                name="September 2025 (Same Month Last Year)"
                stroke="#a855f7"
                strokeWidth={3}
                dot={<CustomLabelDot stroke="#a855f7" />}
                activeDot={{ r: 0 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </article>
      </div>

      <KPIDetailModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        activeColumn={modalConfig.activeColumn}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}
