const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');
content = content.replace('<SimilipalMap />', '<SimilipalMap selectedRange={rangeFilter === "All" ? "Pithabata South" : rangeFilter} onRangeSelect={setRangeFilter} />');
fs.writeFileSync('src/pages/Dashboard.tsx', content);
