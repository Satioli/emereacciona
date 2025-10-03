# Twitch Content Repository

Una aplicación web moderna para gestionar y visualizar tu repositorio personal de contenido multimedia visto en Twitch.

## 🎯 Características

- **Navegación intuitiva** entre diferentes tipos de contenido
- **Reproductor de video integrado** con controles personalizados
- **Sistema de búsqueda y filtros** por género y título
- **Diseño responsive** que funciona en todos los dispositivos
- **Interfaz moderna** con tema oscuro y efectos visuales
- **Organización por categorías**: Películas, Series, Novelas y Anime

## 🚀 Tecnologías Utilizadas

- **React 18** - Framework de JavaScript
- **React Router** - Navegación entre páginas
- **React Player** - Reproductor de video
- **Lucide React** - Iconos modernos
- **CSS3** - Estilos personalizados con efectos avanzados

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd twitch-content-repository
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abre tu navegador**
   La aplicación estará disponible en `http://localhost:3000`

## 🎮 Uso

### Navegación Principal
- **Inicio**: Vista general con estadísticas y contenido destacado
- **Películas**: Colección de películas vistas en Twitch
- **Series**: Episodios de series con información de temporadas
- **Novelas**: Contenido literario y novelas
- **Anime**: Series de animación japonesa

### Funcionalidades
- **Búsqueda**: Utiliza la barra de búsqueda para encontrar contenido específico
- **Filtros**: Filtra por género usando el menú desplegable
- **Reproducción**: Haz clic en cualquier tarjeta para ver el contenido
- **Controles de video**: Play/pause, volumen, pantalla completa

## 🎨 Características del Diseño

- **Tema oscuro** con gradientes modernos
- **Efectos de hover** y transiciones suaves
- **Diseño glassmorphism** con efectos de desenfoque
- **Iconografía consistente** con Lucide React
- **Tipografía legible** y jerarquía visual clara

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Vista completa con grid de tarjetas
- **Tablet**: Layout adaptativo con navegación mejorada
- **Mobile**: Diseño de una columna con menú hamburguesa

## 🔧 Personalización

### Agregar Nuevo Contenido
Para agregar nuevo contenido, edita los arrays de datos en cada página:
- `src/pages/Movies.js` - Para películas
- `src/pages/Series.js` - Para series
- `src/pages/Novels.js` - Para novelas
- `src/pages/Anime.js` - Para anime

### Modificar Estilos
Los estilos están organizados en:
- `src/index.css` - Estilos globales
- `src/App.css` - Estilos de la aplicación principal
- `src/components/*.css` - Estilos de componentes específicos

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Despliegue en Netlify
1. Conecta tu repositorio a Netlify
2. Configura el comando de build: `npm run build`
3. Configura el directorio de publicación: `build`

### Despliegue en Vercel
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es una aplicación React
3. El despliegue se realizará automáticamente

## 📝 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.js       # Barra de navegación
│   ├── ContentCard.js  # Tarjeta de contenido
│   └── VideoPlayer.js  # Reproductor de video
├── pages/              # Páginas principales
│   ├── Home.js         # Página de inicio
│   ├── Movies.js       # Página de películas
│   ├── Series.js       # Página de series
│   ├── Novels.js       # Página de novelas
│   └── Anime.js        # Página de anime
├── App.js              # Componente principal
└── index.js            # Punto de entrada
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o problema:
- Abre un issue en GitHub
- Contacta al desarrollador principal
- Revisa la documentación de React

---

**¡Disfruta explorando tu repositorio de contenido de Twitch!** 🎬📺📚⚡ 