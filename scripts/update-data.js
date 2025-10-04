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
    anime: `[
  {
    "title": "Dan Da Dan",
    "description": "Dos adolescentes deciden probar si los fantasmas o los álienes existen y terminan enfrentando aterradoras amenazas paranormales, recibiendo superpoderes y, tal vez, enamorándose.",
    "year": "2024",
    "genre": "shonen",
    "thumbnail": "https://m.media-amazon.com/images/M/MV5BN2M4YzdjM2EtN2JjNC00YTJkLTliZTItZmY1MzBlNWFkZWIxXkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg",
    "id": 1759537027608,
    "episodes": [
      {
        "id": 1759539622508,
        "season": 1,
        "episode": 1,
        "epTitle": "Yo diría que así inicia el amor",
        "epDescription": "La estudiante Momo cree en fantasmas, pero no en extraterrestres. Un día discute con un compañero obsesionado con ovnis y escéptico de los espíritus.",
        "duration": "26 min",
        "videoUrl": "https://app.emereacciones.com/files/Reacciones/DAN%20DA%20DAN/1.%20Dan%20da%20dan%20(1).mp4",
        "thumbnail": "https://occ-0-659-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABZefvDLTCy4ykLkq2SX0-YdGIGVZf8M-zw8dlIzzyVS2HOikq2X3btOxIbutM_Ar0vMCejceLwXhKm8na38XQ6HgZjBO2dFmLWqa58VHWLQ8pjHnhHKoTLhs.webp?r=894"
      },
      {
        "id": 1759541242014,
        "season": 1,
        "episode": 2,
        "epTitle": "Eso es un extraterrestre, ¿no?",
        "epDescription": "Momo lleva a Ken a su casa y decide llamarlo Okarun. Sin embargo, un extraterrestre gigante aparece y los ataca de repente.",
        "duration": "26 min",
        "videoUrl": "https://app.emereacciones.com/files/Reacciones/DAN%20DA%20DAN/2.%20Dan%20da%20dan%20(2).mp4",
        "thumbnail": "https://occ-0-659-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABZdfJwt6LkahK3o2BRaK3YPJE_gVOVKARVGdvh6T5vliChnfF_IJsdBZVfv8W7TnpS1xge9_jkS3Z4Kj1FPywln2hq0xx-qjTkF0KgsCtp_sBarKHQoHN6-M.webp?r=4ee"
      },
      {
        "id": 1759542739503,
        "season": 1,
        "episode": 3,
        "epTitle": "Abuela contra abuela",
        "epDescription": "La abuela de Momo suprime temporalmente el espíritu maligno dentro de Okarun y les dice que jugar un juego puede ser la clave para derrotarlo para siempre.",
        "duration": "25 min",
        "videoUrl": "https://app.emereacciones.com/files/Reacciones/DAN%20DA%20DAN/3.%20Dan%20da%20dan%20(3).mp4",
        "thumbnail": "https://occ-0-659-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABRip3_Hb4qMW3uaxx5FnaxdJ4tTQbBwVdSweXOSHn0TYjN4JDasshMaGHkx605qbJeZw0j81OEResHrUZDW-hmIDA_-Glc1ZHFQ6o0jvEuNGoSDGvPrqoRNz.webp?r=4b2"
      },
      {
        "id": 1759547538259,
        "season": 1,
        "episode": "4 a 6",
        "epTitle": "Mandamos a volar a la Turbo Abuela",
        "epDescription": "Okarun y Momo llegan al túnel para enfrentarse a Turbo Abuela.",
        "duration": "1h 15 min",
        "videoUrl": "https://app.emereacciones.com/files/Reacciones/DAN%20DA%20DAN/4.%20Dan%20da%20dan%20(4%20-%206).mp4",
        "thumbnail": "https://occ-0-659-114.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABTD4xv6PAhbVyAIj73vFoFdjzMgniCqkX2IoVRK_UZMBGqZ6aMcwh72Z9ONBi0ShF5_g_nCsvSMzsSBYqAIO44FFm7Os4gCbbXcHb7Ye_L3AklItponyBknx.webp?r=aee"
      }
    ]
  }
]`
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
