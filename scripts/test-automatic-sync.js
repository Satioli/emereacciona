// Script de prueba para verificar la sincronización automática
// Ejecutar con: node scripts/test-automatic-sync.js

const fs = require('fs');
const path = require('path');

// Simular datos de localStorage
const testData = {
  peliculas: [
    {
      id: Date.now(),
      title: "Película de Prueba",
      description: "Esta es una película de prueba para verificar la sincronización automática",
      year: "2024",
      genre: "Acción",
      duration: "120 min",
      thumbnail: "https://via.placeholder.com/300x200?text=Test",
      videoUrl: "https://example.com/test"
    }
  ],
  series: [
    {
      id: Date.now() + 1,
      title: "Serie de Prueba",
      description: "Esta es una serie de prueba",
      year: "2024",
      genre: "Drama",
      thumbnail: "https://via.placeholder.com/300x200?text=Serie",
      episodes: [
        {
          id: Date.now() + 2,
          season: 1,
          episode: 1,
          epTitle: "Episodio de Prueba",
          epDescription: "Primer episodio de prueba",
          duration: "45 min",
          videoUrl: "https://example.com/episode1"
        }
      ]
    }
  ],
  novelas: [],
  anime: []
};

// Función para simular localStorage
function simulateLocalStorage() {
  console.log('🧪 Simulando datos de localStorage...');
  
  // Crear archivos JSON de prueba
  const dataPath = path.join(__dirname, '../public/data');
  
  Object.keys(testData).forEach(key => {
    const filePath = path.join(dataPath, `${key}.json`);
    const formattedJSON = JSON.stringify(testData[key], null, 2);
    
    try {
      fs.writeFileSync(filePath, formattedJSON, 'utf8');
      console.log(`✅ Creado archivo de prueba: ${key}.json`);
    } catch (error) {
      console.error(`❌ Error creando ${key}.json:`, error.message);
    }
  });
  
  console.log('');
  console.log('📝 Datos de prueba creados:');
  console.log('- 1 película de prueba');
  console.log('- 1 serie de prueba con 1 episodio');
  console.log('- Novelas y anime vacíos');
  console.log('');
  console.log('🔍 Verifica que los archivos se crearon correctamente en public/data/');
}

// Función para verificar la estructura de archivos
function verifyFileStructure() {
  console.log('🔍 Verificando estructura de archivos...');
  
  const dataPath = path.join(__dirname, '../public/data');
  const requiredFiles = ['peliculas.json', 'series.json', 'novelas.json', 'anime.json'];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(dataPath, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        console.log(`✅ ${file}: ${Array.isArray(data) ? data.length : 'N/A'} elementos`);
      } catch (error) {
        console.error(`❌ ${file}: Error leyendo archivo - ${error.message}`);
      }
    } else {
      console.error(`❌ ${file}: Archivo no encontrado`);
    }
  });
}

// Función principal
function runTest() {
  console.log('🚀 Iniciando prueba de sincronización automática...');
  console.log('');
  
  simulateLocalStorage();
  verifyFileStructure();
  
  console.log('');
  console.log('✅ Prueba completada!');
  console.log('');
  console.log('📋 Próximos pasos:');
  console.log('1. Ejecuta: npm start');
  console.log('2. Ve a la sección de administración');
  console.log('3. Verifica que los datos de prueba se muestren correctamente');
  console.log('4. Agrega nuevo contenido y verifica que se actualice automáticamente');
  console.log('');
  console.log('💡 Para habilitar sincronización automática con GitHub:');
  console.log('1. Crea un archivo .env con tu token de GitHub');
  console.log('2. Reinicia la aplicación');
}

// Ejecutar prueba
if (require.main === module) {
  runTest();
}

module.exports = { simulateLocalStorage, verifyFileStructure, runTest };
