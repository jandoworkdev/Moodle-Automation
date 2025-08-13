# LMS Automation Dashboard

Una interfaz moderna para gestionar automatizaciones entre Moodle 4.5 y Zoom API, diseñada con un estilo cyberpunk futurista.

## 🚀 Características

- **Dashboard Principal**: Vista general de todas las automatizaciones y métricas del sistema
- **Integración Moodle**: Gestión de cursos, estudiantes y sincronización de datos
- **Integración Zoom**: Administración de reuniones, webinars y grabaciones
- **Flujos de Automatización**: Configuración y monitoreo de procesos automatizados
- **Estado del Sistema**: Monitoreo en tiempo real de la infraestructura

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI modernos
- **Lucide React** - Iconos vectoriales

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** como gestor de paquetes
- **Git** para clonar el repositorio

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/lms-automation-dashboard.git
cd lms-automation-dashboard
\`\`\`

### 2. Instalar Dependencias

\`\`\`bash
# Con npm
npm install

# Con yarn
yarn install
\`\`\`

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`env
# Configuración de Moodle
MOODLE_URL=https://tu-moodle.com
MOODLE_TOKEN=tu_token_de_moodle

# Configuración de Zoom
ZOOM_API_KEY=tu_api_key_de_zoom
ZOOM_API_SECRET=tu_api_secret_de_zoom
ZOOM_WEBHOOK_SECRET=tu_webhook_secret

# Base de datos (opcional)
DATABASE_URL=postgresql://usuario:password@localhost:5432/lms_automation

# Configuración de la aplicación
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_para_nextauth
\`\`\`

### 4. Ejecutar en Modo Desarrollo

\`\`\`bash
# Con npm
npm run dev

# Con yarn
yarn dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

### 5. Construir para Producción

\`\`\`bash
# Con npm
npm run build
npm start

# Con yarn
yarn build
yarn start
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
lms-automation-dashboard/
├── app/                          # App Router de Next.js
│   ├── dashboard/               # Página principal del dashboard
│   ├── moodle-integration/      # Gestión de integración con Moodle
│   ├── zoom-integration/        # Gestión de integración con Zoom
│   ├── automation-flows/        # Configuración de flujos automatizados
│   ├── system-status/          # Monitoreo del sistema
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   └── globals.css             # Estilos globales
├── components/                  # Componentes reutilizables
│   └── ui/                     # Componentes de shadcn/ui
├── lib/                        # Utilidades y configuraciones
├── public/                     # Archivos estáticos
├── README.md                   # Este archivo
├── next.config.js             # Configuración de Next.js
├── tailwind.config.js         # Configuración de Tailwind
└── package.json               # Dependencias del proyecto
\`\`\`

## 🔌 Configuración de APIs

### Moodle API

1. Habilita los servicios web en tu instalación de Moodle
2. Crea un token de API con los permisos necesarios
3. Configura las funciones web requeridas:
   - `core_course_get_courses`
   - `core_enrol_get_enrolled_users`
   - `core_grades_get_grades`
   - `core_user_get_users`

### Zoom API

1. Crea una aplicación en Zoom Marketplace
2. Obtén las credenciales API (Key y Secret)
3. Configura los webhooks para eventos de reuniones
4. Habilita los scopes necesarios:
   - `meeting:write`
   - `meeting:read`
   - `user:read`
   - `recording:read`

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega automáticamente con cada push

### Docker

\`\`\`bash
# Construir imagen
docker build -t lms-automation-dashboard .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env.local lms-automation-dashboard
\`\`\`

## 🔧 Personalización

### Colores y Tema

El dashboard utiliza un esquema de colores cyberpunk. Para personalizar:

1. Edita `tailwind.config.js` para cambiar los colores principales
2. Modifica `app/globals.css` para ajustes de estilo global
3. Los componentes utilizan clases de Tailwind CSS para facilitar la personalización

### Agregar Nuevas Integraciones

1. Crea una nueva página en `app/nueva-integracion/`
2. Agrega la ruta al menú principal en `app/page.tsx`
3. Implementa los componentes necesarios siguiendo el patrón existente

## 🐛 Solución de Problemas

### Error de Conexión con APIs

- Verifica que las URLs y tokens sean correctos
- Comprueba que los servicios web estén habilitados
- Revisa los logs del servidor para más detalles

### Problemas de Estilo

- Ejecuta `npm run build` para regenerar los estilos
- Verifica que Tailwind CSS esté configurado correctamente
- Limpia la caché del navegador

### Errores de Dependencias

\`\`\`bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 📝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si necesitas ayuda:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema
4. Contacta al equipo de desarrollo

## 🔄 Actualizaciones

Para mantener el proyecto actualizado:

\`\`\`bash
# Verificar actualizaciones disponibles
npm outdated

# Actualizar dependencias
npm update

# Actualizar Next.js
npm install next@latest react@latest react-dom@latest
\`\`\`

---

**Desarrollado con ❤️ para la educación digital**
