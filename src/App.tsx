import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import GISMap from './pages/GISMap';
import Resources from './pages/Resources';
import Chatbot from './components/Chatbot';
import MasterDataDirectory from './pages/MasterDataDirectory';
import Microplans from './pages/Microplans';
import { detailedKpiData } from './data/kpiData';
import { Trees, PawPrint, Printer, FileSpreadsheet, Menu } from 'lucide-react';
import './index.css';

function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={toggleSidebar} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="brand" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="brand-mark">ASY</div>
            <div className="brand-text">
              <div className="brand-title">Ama Similipal Yojana</div>
              <div className="brand-sub">DoEFCC â€¢ Govt of Odisha</div>
            </div>
          </div>
          <button className="mobile-close-btn" onClick={toggleSidebar}>âœ•</button>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} onClick={() => window.innerWidth <= 768 && toggleSidebar()}>
            <span className="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span>
            <span className="nav-text">Programme Overview</span>
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} onClick={() => window.innerWidth <= 768 && toggleSidebar()}>
            <span className="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg></span>
            <span className="nav-text">GIS Map & Heatmap</span>
          </NavLink>
          <NavLink to="/microplans" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} onClick={() => window.innerWidth <= 768 && toggleSidebar()}>
            <span className="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span>
            <span className="nav-text">Microplans & EDCs</span>
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} onClick={() => window.innerWidth <= 768 && toggleSidebar()}>
            <span className="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></span>
            <span className="nav-text">Resources</span>
          </NavLink>
          <NavLink to="/villages" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'} onClick={() => window.innerWidth <= 768 && toggleSidebar()}>
            <span className="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></span>
            <span className="nav-text">Villages</span>
          </NavLink>
        </nav>
        <div className="sidebar-foot" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span className="nav-icon" style={{ fontSize: '1.1rem', margin: 0, opacity: 0.8 }}>Â©</span>
          <span className="nav-text" style={{ fontSize: '0.75rem', opacity: 0.8, whiteSpace: 'normal', lineHeight: '1.2' }}>All rights Reserved DoEFCC</span>
        </div>
      </aside>
    </>
  );
}

function Topbar({ toggleSidebar, isSidebarOpen }: { toggleSidebar: () => void, isSidebarOpen: boolean }) {
  const handleExport = () => {
    if (!detailedKpiData || detailedKpiData.length === 0) return;
    const headers = Object.keys(detailedKpiData[0]).join(',');
    const csv = detailedKpiData.map((row: any) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'ASY_Similipal_Snapshot.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <header className="topbar" style={{ position: 'relative', borderTop: '4px solid transparent', padding: '10px 24px', height: 'auto', minHeight: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', gap: '12px' }}>

        {/* Left Side: Mobile Toggle & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '0 0 auto' }}>
          <button className="toggle-btn" onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
            <Menu size={24} color="#334155" />
          </button>
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/fe/Seal_of_Odisha.png" alt="Odisha Govt" style={{ height: '60px', width: '60px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} className="hide-mobile" /> */}
        </div>

        {/* Center: Title & Badges */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          {/* <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', padding: '2px 10px', borderRadius: '12px', color: '#065f46', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em', border: '1px solid #a7f3d0' }}>
            <Trees size={12} />
            GOVERNMENT OF ODISHA &bull; FOREST, ENVIRONMENT &amp; CLIMATE CHANGE DEPARTMENT
          </div> */}
          <h1 style={{ color: '#025c99', fontSize: '1.4rem', fontWeight: 900, margin: '6px 0', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
            Ama Similipal Yojana: Analysis &amp; Monitoring
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>
            <PawPrint size={14} /> SIMILIPAL TIGER RESERVE
          </div>
        </div>

        {/* Right: Actions */}
        <div className="top-actions" style={{ flex: '0 0 auto', display: 'flex', gap: '8px', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', width: '130px', justifyContent: 'center', boxShadow: '0 2px 4px rgba(37,99,235,0.2)' }}>
              <Printer size={14} /> Export Report
            </button>
            {/* <button onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', width: '130px', justifyContent: 'center' }}>
              <FileSpreadsheet size={14} /> Export CSV
            </button> */}
          </div>
        </div>

      </div>
    </header>
  );
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className={`app ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="main">
          <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<GISMap />} />
              <Route path="/microplans" element={<Microplans />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/villages" element={<MasterDataDirectory />} />
            </Routes>
          </div>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

