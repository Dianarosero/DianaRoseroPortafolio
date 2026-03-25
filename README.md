# Portafolio Profesional - Diana Sofia

Este es un portafolio moderno y responsivo para desarrolladores frontend, construido con **React**, **Tailwind CSS** y **Framer Motion**.

## 🚀 Características

- **Diseño Mobile-First:** Totalmente responsivo para todos los dispositivos.
- **Animaciones Elegantes:** Implementadas con Framer Motion (fade-in, stagger, scroll triggers).
- **Stack Moderno:** React 19, Tailwind CSS 4, Lucide Icons.
- **Gestión de Datos:** Proyectos cargados dinámicamente desde un archivo JSON.
- **Project Match Studio:** Recomendador interactivo con scoring de proyectos, stack sugerido y roadmap.
- **Formulario de Contacto:** Con validación básica y estados de envío.
- **SEO Optimizado:** Estructura semántica y metadatos configurados.

## 🛠️ Instalación y Desarrollo

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### 3. Construir para producción
```bash
npm run build
```
Los archivos optimizados se generarán en la carpeta `dist/`.

### 4. Activar modo IA opcional (free tier)
El Project Match Studio funciona sin IA por defecto (costo cero).
Si quieres generación con Gemini, crea tu `.env` con:

```bash
VITE_GEMINI_API_KEY="TU_API_KEY"
```

## 🎨 Personalización de Colores

Para cambiar la paleta de colores, edita el archivo `src/index.css` en la sección `@theme`:

```css
@theme {
  --color-primary: #tu-color-hex;
  --color-background: #tu-color-hex;
  --color-surface: #tu-color-hex;
  --color-foreground: #tu-color-hex;
}
```

## 📂 Estructura del Proyecto

- `src/components/`: Componentes UI reutilizables.
- `src/data/`: Archivos de datos (proyectos.json).
- `src/App.tsx`: Punto de entrada y layout principal.
- `src/index.css`: Estilos globales y configuración de Tailwind 4.

---
Desarrollado con ❤️ por Diana Sofia.
