const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// Add import
if (!content.includes('import SimilipalMap from')) {
    content = content.replace("import KPIDetailModal from '../components/KPIDetailModal';", "import KPIDetailModal from '../components/KPIDetailModal';\nimport SimilipalMap from '../components/SimilipalMap';");
}

// Add the component
let lines = content.split('\n');
let chartIdx = lines.findIndex(line => line.includes('Range-Wise Economic Turnover'));

// Go up to find the start of its grid-12
let insertIdx = -1;
for (let i = chartIdx; i >= 0; i--) {
    if (lines[i].includes('<div className="grid-12"')) {
        insertIdx = i;
        break;
    }
}

if (insertIdx !== -1) {
    lines.splice(insertIdx, 0, '          <div style={{ marginBottom: "24px" }}>\n            <SimilipalMap />\n          </div>');
}

fs.writeFileSync('src/pages/Dashboard.tsx', lines.join('\n'));
console.log('Added Map component');
