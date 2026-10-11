const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

const targetStr = `prof: '₹58,000' }`;
const replacement = `prof: '₹58,000' },
    { id: 'SHG007', name: 'Maa Durga SHG', div: 'North', range: 'Gudgudia', vill: 'Kendumundi', mem: '12 (12W)', st: 11, sav: '₹70,000', bank: '₹1,50,000', act: 'Leaf Plate Making', actClass: 'pill-ntfp', rev: '₹2,50,000', prof: '₹80,000' },
    { id: 'SHG008', name: 'Maa Samaleswari SHG', div: 'South', range: 'Dukura', vill: 'Dukura', mem: '10 (10W)', st: 10, sav: '₹60,000', bank: '₹1,00,000', act: 'Mushroom Farming', actClass: 'pill-agri', rev: '₹1,80,000', prof: '₹60,000' },
    { id: 'SHG009', name: 'Maa Bhuasuni SHG', div: 'North', range: 'Barehipani', vill: 'Barehipani', mem: '11 (11W)', st: 10, sav: '₹85,000', bank: '₹2,10,000', act: 'Bamboo Craft', actClass: 'pill-ntfp', rev: '₹3,00,000', prof: '₹95,000' },
    { id: 'SHG010', name: 'Maa Hingula SHG', div: 'South', range: 'Podadiha', vill: 'Podadiha', mem: '14 (14W)', st: 13, sav: '₹95,000', bank: '₹2,60,000', act: 'Poultry Farming', actClass: 'pill-livestock', rev: '₹4,50,000', prof: '₹1,20,000' },
    { id: 'SHG011', name: 'Maa Chandi SHG', div: 'North', range: 'Nawana North', vill: 'Nawana', mem: '11 (11W)', st: 11, sav: '₹75,000', bank: '₹1,80,000', act: 'Spices Processing', actClass: 'pill-agri', rev: '₹2,80,000', prof: '₹85,000' }`;

// Note: The ₹ symbol in the file might be encoded as ,1 in the script output due to console encoding, but in the raw file it's likely ₹ or something else. Let's just match SHG006 line loosely.
