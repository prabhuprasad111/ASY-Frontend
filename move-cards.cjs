const fs = require('fs');
const content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

const lines = content.split('\n');
let divCardsStartIdx = -1;
let divCardsEndIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<div className="division-card north span-6"')) {
    // Look up one line to find the wrapping grid-12
    if (lines[i-1].includes('<div className="grid-12"')) {
      divCardsStartIdx = i - 1;
    } else {
      divCardsStartIdx = i;
    }
    
    // Find the end of this block
    let openDivs = 0;
    for (let j = divCardsStartIdx; j < lines.length; j++) {
      let openMatches = (lines[j].match(/<div/g) || []).length;
      let closeMatches = (lines[j].match(/<\/div>/g) || []).length;
      openDivs += openMatches;
      openDivs -= closeMatches;
      
      if (openDivs === 0 && j > divCardsStartIdx) {
        divCardsEndIdx = j;
        break;
      }
    }
    break;
  }
}

if (divCardsStartIdx !== -1 && divCardsEndIdx !== -1) {
  // Extract block
  const block = lines.slice(divCardsStartIdx, divCardsEndIdx + 1).join('\n');
  
  // Find where to insert (before Range-Wise chart)
  let insertIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Range-Wise Economic Turnover')) {
      // Go up until we find the opening of its grid-12
      for (let j = i; j >= 0; j--) {
        if (lines[j].includes('<div className="grid-12"')) {
          insertIdx = j;
          break;
        }
      }
      break;
    }
  }

  if (insertIdx !== -1) {
    // Remove old block
    lines.splice(divCardsStartIdx, divCardsEndIdx - divCardsStartIdx + 1);
    
    // If the old block was below the insert index (which it is), 
    // we don't need to adjust insertIdx because we are slicing it out from BELOW.
    // Insert block
    lines.splice(insertIdx, 0, block);
    
    fs.writeFileSync('src/pages/Dashboard.tsx', lines.join('\n'));
    console.log('Successfully moved the block.');
  } else {
    console.log('Could not find insert index.');
  }
} else {
  console.log('Could not find division cards block.');
}
