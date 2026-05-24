const fs = require('fs');
const c = fs.readFileSync('./lib/landing-source.ts', 'utf8');

// Find exact end of landingStyles
const stylesEnd = c.indexOf('export const landingBodyHtml');
const stylesClose = c.substring(stylesEnd - 100, stylesEnd);
console.log('Styles closing (last 100 chars before landingBodyHtml):');
console.log(JSON.stringify(stylesClose));

// Find exact character codes at the closing quote of landingStyles
const closingQuoteIdx = stylesEnd - 4; // rough estimate
for (let i = stylesEnd - 10; i < stylesEnd + 5; i++) {
  process.stdout.write(c.charCodeAt(i) + ':' + JSON.stringify(c[i]) + ' ');
}
console.log();

// Get eyebrow CSS
const eyebrowIdx = c.indexOf('eyebrow {');
console.log('\nEyebrow CSS:', JSON.stringify(c.substring(eyebrowIdx, eyebrowIdx + 150)));

// Get btn CSS
const btnIdx = c.indexOf('.btn {');
console.log('\nBtn CSS:', JSON.stringify(c.substring(btnIdx, btnIdx + 300)));
