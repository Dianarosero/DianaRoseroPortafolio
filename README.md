# Diana Rosero — Portafolio Profesional

> **Analista & Desarrolladora de Proyectos TI**
> Portafolio personal construido con React 19, TypeScript, Tailwind CSS 4 y Motion.

🌐 **Demo en vivo:** [diana-rosero-portafolio.vercel.app](https://diana-rosero-portafolio.vercel.app)

---

## Características

- **Integración con GitHub API** — Los proyectos se cargan automáticamente desde repositorios públicos filtrados por nombre. Agregar un nuevo proyecto es editar una sola línea.
- **Casos de estudio expandibles** — Cada proyecto puede tener un modal con problema, proceso, decisiones técnicas, resultado y aprendizajes.
- **Animaciones de scroll** — Transiciones con Motion (fade-in, stagger, spring).
- **Formulario de contacto real** — Conectado a Formspree con manejo de estados de envío.
- **Stack tecnológico visual** — Con íconos oficiales de devicons y soporte para íconos personalizados.
- **Diseño mobile-first** — Totalmente responsivo.
- **TypeScript estricto** — Sin `any`, tipos explícitos en todos los módulos.

---

## Stack

| Categoría | Tecnología |
|---|---|
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS 4 |
| Animaciones | Motion (motion/react) |
| Íconos | Lucide React |
| Bundler | Vite 6 |
| Datos | GitHub REST API + JSON local |
| Formulario | Formspree |
| Deploy | Vercel |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Hero.tsx            # Sección inicial con nombre, título y botones
│   ├── About.tsx           # Descripción profesional y cards de fortalezas
│   ├── Projects.tsx        # Proyectos desde GitHub API + modal de caso de estudio
│   ├── CaseStudyModal.tsx  # Modal: problema, proceso, decisiones, resultado, aprendizajes
│   ├── Skills.tsx          # Stack tecnológico con íconos
│   ├── Contact.tsx         # Formulario conectado a Formspree + datos de contacto
│   ├── Navbar.tsx          # Navegación fija con scroll progress
│   ├── Footer.tsx          # Pie de página
│   └── SectionHeading.tsx  # Componente reutilizable de encabezados
│
├── data/
│   ├── caseStudies.ts      # ✏️  Contenido de los casos de estudio (editar aquí)
│   ├── navigation.ts       # Links del menú
│   └── socialLinks.ts      # GitHub, LinkedIn
│
├── lib/
│   ├── github.ts           # ✏️  Lista de repos permitidos + fetch de la API
│   └── projectMatcher.ts   # Lógica de matching (legacy, no se muestra en UI)
│
├── types/
│   └── project.ts          # Tipos TypeScript de proyectos
│
├── assets/
│   └── Dianita_Avatar.png  # Foto de perfil
│
├── App.tsx                 # Layout principal y barra de progreso de scroll
├── main.tsx                # Punto de entrada
└── index.css               # Variables de tema y estilos globales
```

---

## Instalación y desarrollo

```bash
# 1. Clonar el repositorio
git clone https://github.com/Dianarosero/portafolio.git
cd portafolio

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# Disponible en http://localhost:3000

# 4. Build de producción
npm run build

# 5. Verificar tipos TypeScript
npm run lint
```

---

## Guía de personalización

### Agregar un nuevo proyecto desde GitHub

Edita **`src/lib/github.ts`** y añade el nombre exacto del repositorio al array:

```ts
export const ALLOWED_REPOS: readonly string[] = [
  'Proyecto_Saberquest',
  'CESMAPS_RESPONSIVE',
  'Learn_Go',
  'NuevoRepositorio',   // ← agregar aquí
];
```

La información (descripción, lenguaje, topics, stars, fecha) se carga sola desde la API de GitHub.

> **Tip:** Para que el botón de demo aparezca automáticamente, agrega la URL del deploy en el campo **Website** de la configuración del repositorio en GitHub.

---

### Agregar un caso de estudio

Edita **`src/data/caseStudies.ts`** y agrega una entrada con el mismo nombre del repo como clave:

```ts
export const CASE_STUDIES: Readonly<Record<string, CaseStudy>> = {

  NuevoRepositorio: {
    problema:   'Qué problema o necesidad existía antes del proyecto.',
    proceso:    'Cómo abordaste la solución: requisitos, diseño, iteraciones.',
    decisiones: [
      'Por qué elegiste esta tecnología o arquitectura.',
      'Qué alternativa descartaste y por qué.',
    ],
    resultado:    'Qué se entregó: funcionalidades, usuarios beneficiados.',
    aprendizajes: 'Qué aprendiste técnica o profesionalmente.',
  },

};
```

Si un repo **no tiene entrada** en este archivo, el botón "Ver caso de estudio" simplemente no aparece en su card.

---

### Cambiar el color de acento

En **`src/index.css`**, modifica la variable `--color-primary` dentro del bloque `@theme`:

```css
@theme {
  --color-primary: #10b981;   /* verde esmeralda (por defecto) */
  --color-background: #0a0a0f;
  --color-surface: #111118;
  --color-foreground: #f4f4f5;
}
```

---

### Conectar el formulario de contacto (Formspree)

1. Crea una cuenta gratuita en [formspree.io](https://formspree.io)
2. Crea un nuevo formulario y copia el ID (formato: `xabcdefg`)
3. Edita **`src/components/Contact.tsx`**:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xabcdefg";  // ← tu ID aquí
```

---

### Actualizar el CV descargable

1. Sube tu CV en PDF a la carpeta `public/` con el nombre `CV_Diana_Rosero.pdf`
2. Actualiza el `href` en los botones de Hero y Contacto:

```tsx
href="/CV_Diana_Rosero.pdf"
```

---

## Deploy en Vercel

El proyecto está configurado para deploy automático en Vercel.

```bash
# Con Vercel CLI
npx vercel --prod
```

O conecta el repositorio directamente desde [vercel.com](https://vercel.com) — Vercel detecta Vite automáticamente.

---

## Licencia

Apache 2.0 — ver [`LICENSE`](./LICENSE)

---

Desarrollado por **Diana Sofía Rosero López** · [github.com/Dianarosero](https://github.com/Dianarosero) · San Juan de Pasto, Colombia
