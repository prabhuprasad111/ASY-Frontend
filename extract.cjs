const fs = require('fs');
const html = fs.readFileSync('C:/Users/prabhulenka/Downloads/PYQ/Odhisa_Ama_Similipal_Dashboard/index.html', 'utf8');

const startStr = '<div class="map-dashboard-grid">';
const endStr = '<!-- END ASY Field Analytics Map Section -->';
const startIdx = html.indexOf(startStr);
let endIdx = html.indexOf(endStr);
if(endIdx === -1) {
   // Just find the end of the section manually. It's likely right before the "<section id=\"executive-dashboard\">"
   endIdx = html.indexOf('<section id="executive-dashboard">');
   if(endIdx === -1) endIdx = html.length;
}

if (startIdx !== -1) {
    // Only grab up to the end of the map-dashboard-grid div.
    let block = html.substring(startIdx, endIdx);
    
    // Quick JSX conversion
    block = block.replace(/class=/g, 'className=');
    block = block.replace(/stop-color/g, 'stopColor');
    block = block.replace(/stop-opacity/g, 'stopOpacity');
    block = block.replace(/stroke-width/g, 'strokeWidth');
    block = block.replace(/stroke-dasharray/g, 'strokeDasharray');
    block = block.replace(/stroke-linecap/g, 'strokeLinecap');
    block = block.replace(/stroke-linejoin/g, 'strokeLinejoin');
    block = block.replace(/fill-opacity/g, 'fillOpacity');
    block = block.replace(/<!--[\s\S]*?-->/g, ''); // strip comments
    
    // We also need to map the interactivity (clicks on polygons) to a state variable.
    // I will write this into a raw JS file that I can inspect.
    fs.writeFileSync('temp_map.jsx', block);
    console.log('Extracted to temp_map.jsx');
} else {
    console.log('Could not find start string');
}
