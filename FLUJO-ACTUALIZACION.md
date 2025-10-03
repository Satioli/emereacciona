# 🎬 Flujo de Actualización de Contenido

## Resumen
Este flujo te permite agregar películas, series, novelas y anime localmente, y **automáticamente** actualizar todo en GitHub sin pasos manuales.

## 🚀 Flujo Automático (Recomendado)

### Paso 1: Configurar Token de GitHub (Solo una vez)
1. Ve a [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Genera un nuevo token con permisos de `repo`
3. Crea un archivo `.env` en la raíz del proyecto:
   ```
   REACT_APP_GITHUB_TOKEN=tu_token_aqui
   ```

### Paso 2: Agregar Contenido (¡Automático!)
1. Ve a tu sitio: `https://satioli.github.io/emereacciona/#/admin`
2. Agrega películas, series, novelas o anime usando el formulario
3. **¡Los datos se actualizan automáticamente en GitHub!** ✨
4. Todos los usuarios verán los cambios inmediatamente

## 📋 Flujo Manual (Sin Token)

### Paso 1: Agregar Contenido Localmente
1. Ve a tu sitio: `https://satioli.github.io/emereacciona/#/admin`
2. Agrega películas, series, novelas o anime usando el formulario
3. Los datos se guardan temporalmente en `localStorage`

### Paso 2: Obtener Datos del localStorage
1. Abre las herramientas de desarrollador (F12)
2. Ve a **Application** → **Local Storage**
3. Copia los valores de las claves:
   - `peliculas`
   - `series`
   - `novelas`
   - `anime`

### Paso 3: Actualizar Archivos JSON
1. Abre el archivo `scripts/update-data.js`
2. Pega los datos copiados en la función `readLocalStorageData()`
3. Ejecuta: `node scripts/update-data.js`

## 🚀 Comandos Disponibles

### Con Token de GitHub (Automático)
**¡No necesitas comandos!** Los datos se actualizan automáticamente cuando agregas contenido.

### Sin Token (Manual)
```bash
node scripts/update-data.js
```
**Esto hace:**
- ✅ Actualiza archivos JSON
- ✅ Hace commit a git
- ✅ Sube a GitHub
- ✅ Construye la aplicación
- ✅ Despliega a GitHub Pages

### Solo Actualizar Archivos
```bash
node scripts/update-files-only.js
```
**Esto hace:**
- ✅ Actualiza archivos JSON
- ⚠️ Requiere pasos manuales para subir a GitHub

## 📁 Archivos que se Actualizan

- `public/data/peliculas.json`
- `public/data/series.json`
- `public/data/novelas.json`
- `public/data/anime.json`

## 🔧 Solución de Problemas

### Si falla el push a GitHub:
1. Verifica tu conexión a internet
2. Asegúrate de tener configurado git correctamente
3. Ejecuta los comandos manualmente:
   ```bash
   git add public/data/
   git commit -m "Actualizar datos"
   git push origin main
   npm run build
   npx gh-pages -d build -f
   ```

### Si no tienes git configurado:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## 📝 Estructura de Datos

### Películas
```json
[
  {
    "id": 1704372000000,
    "title": "Nombre de la Película",
    "description": "Descripción",
    "year": "2024",
    "genre": "Acción",
    "duration": "120 min",
    "thumbnail": "URL de imagen",
    "videoUrl": "URL del video"
  }
]
```

### Series
```json
[
  {
    "id": 1704372000001,
    "title": "Nombre de la Serie",
    "description": "Descripción",
    "year": "2024",
    "genre": "Drama",
    "thumbnail": "URL de imagen",
    "episodes": [
      {
        "id": 1704372000002,
        "season": 1,
        "episode": 1,
        "epTitle": "Título del Episodio",
        "epDescription": "Descripción del episodio",
        "duration": "45 min",
        "videoUrl": "URL del video"
      }
    ]
  }
]
```

## 🎯 Resultado Final

Después de ejecutar el proceso completo:
- ✅ Los datos se actualizan en GitHub
- ✅ El sitio web se actualiza automáticamente
- ✅ Todos los usuarios pueden ver el nuevo contenido
- ✅ El sitio está disponible en: `https://satioli.github.io/emereacciona`

## 💡 Consejos

1. **Haz backups**: Antes de actualizar, copia los datos actuales
2. **Prueba localmente**: Verifica que los datos se vean bien antes de subir
3. **Usa el proceso completo**: Es más fácil y menos propenso a errores
4. **Revisa el resultado**: Siempre verifica que el sitio se actualizó correctamente
