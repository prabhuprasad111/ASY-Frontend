const fs = require('fs');
const css = fs.readFileSync('C:/Users/prabhulenka/Downloads/PYQ/Odhisa_Ama_Similipal_Dashboard/css/styles.css', 'utf8');

const mapStyles = css.match(/\.map-[^{]+{[^}]+}|\.range-[^{]+{[^}]+}|\.legend-[^{]+{[^}]+}|\.sanctuary-[^{]+{[^}]+}/g);

if(mapStyles) {
    fs.writeFileSync('temp_map_styles.css', mapStyles.join('\n\n'));
    console.log('Extracted map styles');
}
