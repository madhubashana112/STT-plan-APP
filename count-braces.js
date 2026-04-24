import fs from 'fs';
const content = fs.readFileSync('stt-app.jsx', 'utf8');
let openB = 0; let closeB = 0;
let openP = 0; let closeP = 0;
for (let char of content) {
    if (char === '{') openB++;
    if (char === '}') closeB++;
    if (char === '(') openP++;
    if (char === ')') closeP++;
}
console.log('Braces - Open:', openB, 'Close:', closeB);
console.log('Parens - Open:', openP, 'Close:', closeP);
