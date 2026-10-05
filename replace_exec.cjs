const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');
const lines = content.split('\n');

const startIdx = lines.findIndex(l => l.includes('HOUSEHOLDS COVERED'));
if (startIdx === -1) {
    console.log("Could not find start");
    process.exit(1);
}

// Find the <div className="grid-12"... that contains it
let gridStartIdx = -1;
for (let i = startIdx; i >= 0; i--) {
    if (lines[i].includes('className="grid-12"')) {
        gridStartIdx = i;
        break;
    }
}

const endIdx = lines.findIndex(l => l.includes('Active Enterprise Hubs'));
if (endIdx === -1) {
    console.log("Could not find end");
    process.exit(1);
}

// The grid closes 2 lines after "Active Enterprise Hubs"
let gridEndIdx = endIdx + 2;

const exec_grid_new = `            <div className="grid-12" style={{ marginBottom: '24px', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
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
            </div>`;

// Replace lines
lines.splice(gridStartIdx, gridEndIdx - gridStartIdx + 1, exec_grid_new);

fs.writeFileSync('src/pages/Dashboard.tsx', lines.join('\n'), 'utf8');
console.log("Successfully replaced the executive 8-card grid.");
