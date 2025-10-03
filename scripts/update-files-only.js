// Script simple para solo actualizar archivos JSON (sin deploy)
// Ejecutar con: node scripts/update-files-only.js

const { updateJSONFiles } = require('./update-data');

console.log('📝 Actualizando solo archivos JSON...');
console.log('');

updateJSONFiles();

console.log('');
console.log('✅ Archivos actualizados. Para subir a GitHub ejecuta:');
console.log('1. git add public/data/');
console.log('2. git commit -m "Actualizar datos"');
console.log('3. git push origin main');
console.log('4. npm run build');
console.log('5. npx gh-pages -d build -f');
console.log('');
console.log('O ejecuta: node scripts/update-data.js (para proceso completo)');
