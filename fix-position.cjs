const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// The block to extract and move
const blockStart = '// Dynamic Global KPIs';
const blockEnd = 'const filteredSHG =';
if (content.includes(blockStart) && content.includes(blockEnd)) {
    const block = content.substring(content.indexOf(blockStart), content.indexOf(blockEnd));
    
    // Remove the block from its current bad location
    content = content.replace(block, '');
    
    // The fixed block with correct properties and parsing
    let fixedBlock = block.replace(/c\.members/g, "parseInt(c.mem) || 0");
    fixedBlock = fixedBlock.replace(/c\.profit/g, "parseAmt(c.prof)");
    fixedBlock = fixedBlock.replace(/c\.rev/g, "parseAmt(c.rev)");
    
    // We want to insert it right before the "return (" of the main Dashboard render
    const returnIndex = content.indexOf('return (\n    <div className="dashboard-layout">');
    if (returnIndex !== -1) {
        content = content.substring(0, returnIndex) + fixedBlock + "\n  " + content.substring(returnIndex);
    }
}

fs.writeFileSync('src/pages/Dashboard.tsx', content);
