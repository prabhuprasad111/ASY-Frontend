import React from 'react';
import { detailedKpiData } from '../data/kpiData';

interface KPIDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  activeColumn: keyof typeof detailedKpiData[0] | null;
}

export default function KPIDetailModal({ isOpen, onClose, title, activeColumn }: KPIDetailModalProps) {
  if (!isOpen) return null;

  const thStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '16px 12px',
    textAlign: isActive || activeColumn === null ? 'left' : 'right',
    background: isActive ? '#f8fafc' : '#ffffff',
    borderBottom: isActive ? '3px solid #3b82f6' : '2px solid #e2e8f0',
    color: isActive ? '#1e293b' : '#64748b',
    fontWeight: 700,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: isActive ? 'inset 0px -3px 0px #3b82f6' : 'none',
  });

  const tdStyle = (isActive: boolean, isNumeric: boolean = false): React.CSSProperties => ({
    padding: '12px',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.85rem',
    color: isActive ? '#0f172a' : '#475569',
    background: isActive ? '#eff6ff' : 'transparent',
    fontWeight: isActive ? 600 : 500,
    textAlign: isNumeric && (!isActive && activeColumn !== null) ? 'right' : 'left',
  });

  // Range color mapping for badges
  const getRangeColor = (range: string) => {
    const map: Record<string, string> = {
      'Pithabata North': '#dcfce7', 'Pithabata South': '#bbf7d0',
      'Dukura': '#fef08a', 'Podadiha': '#fed7aa',
      'Nawana North': '#fecaca', 'Barehipani': '#e9d5ff',
      'Gudgudia': '#bfdbfe', 'Talabandha': '#c7d2fe',
      'Kendumundi': '#fbcfe8', 'Thakurmunda': '#ddd6fe'
    };
    return map[range] || '#f1f5f9';
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, padding: '32px', backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .fancy-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .fancy-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-radius: 4px; }
        .fancy-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .fancy-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1300px',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease-out forwards'
      }}>
        {/* Header - Premium Dark Gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              📊
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#ffffff', letterSpacing: '-0.02em' }}>{title} Analysis</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>
                Detailed cross-sectional data breakdown across {detailedKpiData.length} Similipal localities
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', 
              borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer',
              color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            ✕
          </button>
        </div>

        {/* Table Container */}
        <div className="fancy-scrollbar" style={{ overflow: 'auto', flex: 1, padding: '0 16px 16px 16px', background: '#f8fafc' }}>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle(false)}>Range</th>
                  <th style={thStyle(false)}>Village</th>
                  <th style={thStyle(activeColumn === 'hh')}>HH Covered</th>
                  <th style={thStyle(activeColumn === 'beneficiaries')}>Beneficiaries</th>
                  <th style={thStyle(activeColumn === 'edcs')}>EDCs</th>
                  <th style={thStyle(activeColumn === 'shgs')}>SHGs</th>
                  <th style={thStyle(activeColumn === 'projects')}>Projects</th>
                  <th style={thStyle(activeColumn === 'income')}>Income</th>
                  <th style={thStyle(activeColumn === 'ntfp')}>NTFP Rev.</th>
                  <th style={thStyle(activeColumn === 'training')}>Training</th>
                  <th style={thStyle(activeColumn === 'convergence')}>Convergence</th>
                  <th style={thStyle(activeColumn === 'utilization')}>Utilization</th>
                  <th style={thStyle(activeColumn === 'tourism')}>Tourists</th>
                  <th style={thStyle(activeColumn === 'score')}>Score</th>
                </tr>
              </thead>
              <tbody>
                {detailedKpiData.map((row, i) => (
                  <tr key={i} style={{ transition: 'background 0.2s', ':hover': { background: '#f8fafc' } } as any}>
                    {/* Range Badge */}
                    <td style={tdStyle(false)}>
                      <span style={{ 
                        background: getRangeColor(row.range), color: '#1e293b', 
                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                        border: '1px solid rgba(0,0,0,0.05)', whiteSpace: 'nowrap'
                      }}>
                        {row.range}
                      </span>
                    </td>
                    
                    {/* Village */}
                    <td style={tdStyle(false)}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{row.village}</span>
                    </td>
                    
                    {/* Numeric Columns */}
                    <td style={tdStyle(activeColumn === 'hh', true)}>{row.hh.toLocaleString()}</td>
                    <td style={tdStyle(activeColumn === 'beneficiaries', true)}>{row.beneficiaries.toLocaleString()}</td>
                    <td style={tdStyle(activeColumn === 'edcs', true)}>{row.edcs}</td>
                    <td style={tdStyle(activeColumn === 'shgs', true)}>{row.shgs}</td>
                    <td style={tdStyle(activeColumn === 'projects', true)}>{row.projects}</td>
                    
                    {/* Currency Columns */}
                    <td style={tdStyle(activeColumn === 'income', true)}>
                      <span style={{ color: activeColumn === 'income' ? '#0f172a' : '#059669', fontWeight: 700 }}>₹{row.income}L</span>
                    </td>
                    <td style={tdStyle(activeColumn === 'ntfp', true)}>
                      <span style={{ color: activeColumn === 'ntfp' ? '#0f172a' : '#2563eb', fontWeight: 600 }}>₹{row.ntfp}L</span>
                    </td>
                    
                    <td style={tdStyle(activeColumn === 'training', true)}>{row.training}</td>
                    <td style={tdStyle(activeColumn === 'convergence', true)}>₹{row.convergence}L</td>
                    
                    {/* Progress Bar for Utilization */}
                    <td style={tdStyle(activeColumn === 'utilization', true)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: (activeColumn && activeColumn !== 'utilization') ? 'flex-end' : 'flex-start' }}>
                        <span style={{ fontWeight: 700, color: row.utilization >= 90 ? '#059669' : row.utilization < 80 ? '#dc2626' : '#d97706' }}>
                          {row.utilization}%
                        </span>
                        <div style={{ width: '40px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', display: (activeColumn && activeColumn !== 'utilization') ? 'none' : 'block' }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${row.utilization}%`,
                            background: row.utilization >= 90 ? '#10b981' : row.utilization < 80 ? '#ef4444' : '#f59e0b'
                          }} />
                        </div>
                      </div>
                    </td>
                    
                    <td style={tdStyle(activeColumn === 'tourism', true)}>{row.tourism.toLocaleString()}</td>
                    
                    {/* Score Highlight */}
                    <td style={tdStyle(activeColumn === 'score', true)}>
                      <div style={{ 
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: row.score >= 90 ? '#dcfce7' : row.score < 75 ? '#fee2e2' : '#fef3c7',
                        color: row.score >= 90 ? '#166534' : row.score < 75 ? '#991b1b' : '#92400e',
                        fontWeight: 700, fontSize: '0.8rem'
                      }}>
                        {row.score}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ background: '#f8fafc', padding: '16px 32px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Showing all <strong>{detailedKpiData.length}</strong> master records.
          </div>
          <button 
            onClick={onClose}
            style={{ padding: '8px 24px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
