import React, { useState } from 'react';

const initialMicroplanData = [
  { id: 'MP-2026-001', edc: 'Gendapokhari EDC', range: 'Pithabata North', status: 'Approved', budget: '₹ 12.5L', utilized: '82%', date: '2026-08-12' },
  { id: 'MP-2026-002', edc: 'Digdiga EDC', range: 'Pithabata South', status: 'In Review', budget: '₹ 10.8L', utilized: '0%', date: '2026-09-05' },
  { id: 'MP-2026-003', edc: 'Kabatghai EDC', range: 'Dukura', status: 'Approved', budget: '₹ 13.2L', utilized: '65%', date: '2026-07-22' },
  { id: 'MP-2026-004', edc: 'Podadiha EDC', range: 'Podadiha', status: 'Completed', budget: '₹ 21.5L', utilized: '98%', date: '2025-11-10' },
  { id: 'MP-2026-005', edc: 'Mohanpur EDC', range: 'Nawana North', status: 'Draft', budget: '₹ 8.6L', utilized: '0%', date: '2026-09-28' },
  { id: 'MP-2026-006', edc: 'Barehipani EDC', range: 'Barehipani', status: 'Approved', budget: '₹ 15.0L', utilized: '45%', date: '2026-08-01' },
  { id: 'MP-2026-007', edc: 'Gudgudia EDC', range: 'Gudgudia', status: 'Approved', budget: '₹ 14.2L', utilized: '88%', date: '2026-04-15' },
  { id: 'MP-2026-008', edc: 'Talabandha EDC', range: 'Talabandha', status: 'In Review', budget: '₹ 21.4L', utilized: '0%', date: '2026-09-15' },
];

export default function Microplans() {
  const [plans, setPlans] = useState(initialMicroplanData);
  const [filter, setFilter] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ edc: '', range: 'Pithabata North', budget: '', status: 'Draft' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return { bg: '#d1fae5', text: '#065f46' };
      case 'In Review': return { bg: '#fef3c7', text: '#92400e' };
      case 'Completed': return { bg: '#e0e7ff', text: '#3730a3' };
      case 'Draft': return { bg: '#f1f5f9', text: '#475569' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = {
      id: `MP-2026-${String(plans.length + 1).padStart(3, '0')}`,
      edc: formData.edc + (formData.edc.includes('EDC') ? '' : ' EDC'),
      range: formData.range,
      status: formData.status,
      budget: `₹ ${formData.budget}L`,
      utilized: '0%',
      date: new Date().toISOString().split('T')[0]
    };
    setPlans([newPlan, ...plans]);
    setIsModalOpen(false);
    setFormData({ edc: '', range: 'Pithabata North', budget: '', status: 'Draft' });
  };

  const filteredData = filter === 'All' ? plans : plans.filter(d => d.status === filter);

  return (
    <div>
      {/* ADD MICROPLAN MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden', animation: 'slideUp 0.3s ease-out' }}>
            <div style={{ background: '#f8fafc', padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Create New Microplan</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>
            <form onSubmit={handleAddPlan} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>EDC Name / Village</label>
                <input required type="text" placeholder="e.g. Digdiga" value={formData.edc} onChange={e => setFormData({...formData, edc: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Forest Range</label>
                <select value={formData.range} onChange={e => setFormData({...formData, range: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', background: '#fff' }}>
                  <option>Pithabata North</option><option>Pithabata South</option>
                  <option>Dukura</option><option>Podadiha</option>
                  <option>Nawana North</option><option>Barehipani</option>
                  <option>Gudgudia</option><option>Talabandha</option>
                  <option>Kendumundi</option><option>Thakurmunda</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Requested Budget (₹ Lakhs)</label>
                  <input required type="number" step="0.1" placeholder="e.g. 15.5" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Initial Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', background: '#fff' }}>
                    <option>Draft</option>
                    <option>In Review</option>
                    <option>Approved</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#0ea5e9', color: '#fff', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 6px rgba(14,165,233,0.2)' }}>Submit Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="page-head" style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="eyebrow" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Planning & Execution</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>Microplans & EDCs</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Track the status, funding, and execution of Eco-Development Committee microplans across Similipal.</p>
        </div>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)} style={{ background: '#0ea5e9', padding: '12px 24px', fontSize: '1.05rem', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)' }}>+ New Microplan</button>
      </div>

      {/* WIDER KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="panel" style={{ borderTop: '5px solid #3b82f6', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Active EDCs</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: '8px 0' }}>42</div>
            </div>
            <div style={{ background: '#eff6ff', color: '#3b82f6', padding: '8px', borderRadius: '8px' }}>🏘️</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600 }}>↑ 3 new this quarter</div>
        </div>
        <div className="panel" style={{ borderTop: '5px solid #10b981', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Approved Plans</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: '8px 0' }}>{plans.filter(p => p.status === 'Approved').length}</div>
            </div>
            <div style={{ background: '#ecfdf5', color: '#10b981', padding: '8px', borderRadius: '8px' }}>✅</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>For FY 2026-27</div>
        </div>
        <div className="panel" style={{ borderTop: '5px solid #f59e0b', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>In Review</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: '8px 0' }}>{plans.filter(p => p.status === 'In Review').length}</div>
            </div>
            <div style={{ background: '#fffbeb', color: '#f59e0b', padding: '8px', borderRadius: '8px' }}>⏳</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#f59e0b', fontWeight: 600 }}>Requires RCCF approval</div>
        </div>
        <div className="panel" style={{ borderTop: '5px solid #8b5cf6', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Funds Disbursed</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: '8px 0' }}>₹450L</div>
            </div>
            <div style={{ background: '#f5f3ff', color: '#8b5cf6', padding: '8px', borderRadius: '8px' }}>💰</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Cumulative across ranges</div>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>Microplan Directory</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Approved', 'In Review', 'Draft', 'Completed'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                style={{ 
                  padding: '8px 16px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: filter === f ? '#0f172a' : '#e2e8f0',
                  color: filter === f ? '#fff' : '#475569',
                  transition: 'all 0.2s', boxShadow: filter === f ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '18px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Plan ID</th>
                <th style={{ padding: '18px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>EDC Name</th>
                <th style={{ padding: '18px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Range</th>
                <th style={{ padding: '18px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Budget</th>
                <th style={{ padding: '18px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Utilization</th>
                <th style={{ padding: '18px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '18px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#f8fafc', transition: 'background 0.2s' }}>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: 700, color: '#3b82f6' }}>{row.id}</td>
                  <td style={{ padding: '16px 24px', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{row.edc}</td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>{row.range}</td>
                  <td style={{ padding: '16px 24px', fontSize: '0.95rem', fontWeight: 700, color: '#059669' }}>{row.budget}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', width: '36px' }}>{row.utilized}</span>
                      <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: row.utilized, background: parseInt(row.utilized) >= 80 ? '#10b981' : parseInt(row.utilized) > 0 ? '#3b82f6' : '#94a3b8' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em',
                      background: getStatusColor(row.status).bg, color: getStatusColor(row.status).text 
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{row.date}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '1.1rem' }}>No microplans found matching this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
