// Script para actualizar archivos JSON locales desde localStorage
// Ejecutar con: node scripts/update-data.js

const fs = require('fs');
const path = require('path');

// Función para leer localStorage desde el navegador
function readLocalStorageData() {
  console.log('📋 Para obtener los datos de localStorage:');
  console.log('');
  console.log('1. Abre tu sitio: https://satioli.github.io/emereacciona/#/admin');
  console.log('2. Agrega contenido (películas, series, etc.)');
  console.log('3. Abre las herramientas de desarrollador (F12)');
  console.log('4. Ve a Application → Local Storage');
  console.log('5. Copia los valores de las claves:');
  console.log('   - peliculas');
  console.log('   - series');
  console.log('   - novelas');
  console.log('   - anime');
  console.log('');
  console.log('6. Pega los datos aquí abajo y ejecuta el script');
  console.log('');
  
  // Datos de ejemplo - reemplaza con tus datos reales
  const localStorageData = {
    peliculas: `[
    {
        "title": "X-Men",
        "description": "En un mundo donde los mutantes (humanos superpoderosos evolucionados) existen y son discriminados, dos grupos se forman para un choque inevitable: la supremacista Hermandad y los pacifistas",
        "year": "2000",
        "genre": "Accion",
        "duration": "2h 14 min",
        "thumbnail": "https://m.media-amazon.com/images/M/MV5BNTVjY2E2YjgtYmUxOS00ZDI1LWEwYzctYjAxMDIzOGViZWYyXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg",
        "videoUrl": "https://app.emereacciones.com/files/Reacciones/UNIVERSO%20MARVEL/1.%20X-men.mp4",
        "id": 1759534096039
    }
]`,
    series: `[
  {
    "id": 1704372000001,
    "title": "Ejemplo de Serie",
    "description": "Una serie de ejemplo",
    "year": "2024",
    "genre": "Drama",
    "thumbnail": "https://via.placeholder.com/300x200?text=Serie",
    "episodes": [
      {
        "id": 1704372000002,
        "season": 1,
        "episode": 1,
        "epTitle": "Episodio Piloto",
        "epDescription": "El primer episodio",
        "duration": "45 min",
        "videoUrl": "https://example.com/episode1"
      }
    ]
  }
]`,
    novelas: `[]`,
    anime: `[]`
  };
  
  return localStorageData;
}

// Función para actualizar archivos JSON locales
function updateLocalJSONFiles() {
  const dataPath = path.join(__dirname, '../public/data');
  const localStorageData = readLocalStorageData();
  
  console.log('📝 Actualizando archivos JSON locales...');
  
  Object.keys(localStorageData).forEach(key => {
    const filePath = path.join(dataPath, `${key}.json`);
    
    try {
      // Parsear y formatear el JSON
      const data = JSON.parse(localStorageData[key]);
      const formattedJSON = JSON.stringify(data, null, 2);
      
      // Escribir el archivo
      fs.writeFileSync(filePath, formattedJSON, 'utf8');
      console.log(`✅ Actualizado: ${key}.json`);
    } catch (error) {
      console.error(`❌ Error actualizando ${key}.json:`, error.message);
    }
  });
  
  console.log('');
  console.log('🎉 Archivos JSON actualizados exitosamente!');
  console.log('');
  console.log('📁 Archivos actualizados en: public/data/');
  console.log('   - peliculas.json');
  console.log('   - series.json');
  console.log('   - novelas.json');
  console.log('   - anime.json');
}

// Función principal
function updateData() {
  console.log('🚀 Actualizando archivos JSON locales...');
  console.log('');
  
  updateLocalJSONFiles();
  
  console.log('');
  console.log('💡 Para subir los cambios a GitHub (opcional):');
  console.log('1. git add public/data/');
  console.log('2. git commit -m "Actualizar datos"');
  console.log('3. git push origin main');
  console.log('4. npm run build');
  console.log('5. npx gh-pages -d build -f');
}

// Ejecutar el script
if (require.main === module) {
  updateData();
}

module.exports = { updateLocalJSONFiles, updateData };
