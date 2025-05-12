<div align="center">
  <h1>🤝 Manos que Alimentan - Plataforma de Donaciones 🤝</h1>
  <p>Sistema para la gestión y asignación de donaciones de alimentos, desarrollado con <strong>TypeScript</strong>, <strong>Express</strong>, <strong>React</strong>, <strong>Vite</strong>, <strong>TailwindCSS</strong> y <strong>PostgreSQL</strong>.</p>

![JavaScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000?logo=express)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

</div>

## 🌟 **Bienvenido**

Plataforma que permite gestionar la recepción, asignación y entrega de donaciones de alimentos a personas en situación de vulnerabilidad. Con este sistema, organizaciones pueden optimizar la distribución de recursos y mejorar su impacto social.

## 📂 **Módulos Principales**

| Módulo            | Descripción                                              |
| ----------------- | -------------------------------------------------------- |
| **Usuarios**      | Gestión de administradores, voluntarios y beneficiarios. |
| **Donaciones**    | Registro y seguimiento de donaciones recibidas.          |
| **Alimentos**     | Control de stock y fechas de caducidad.                  |
| **Reservaciones** | Distribución eficiente de los recursos a beneficiarios.  |
| **Reportes**      | Estadísticas y seguimiento del impacto social.           |

## 🚀 **Instalación y Configuración**

### 🛠️ **Requisitos Previos**

- **Node.js** - Descargar e instalar desde: [NodeJS](https://nodejs.org/).
- **pnpm** - Si no lo tienes, instálalo ejecuando: `npm install -g pnpm`.
- **PostgreSQL** - Descargare instalar desde: [PostgreSQL](https://www.postgresql.org/download/).

### 📥 **Instalación**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Eddys912/manos-que-alimentan.git
   ```
2. **Acceder al proyecto:**
   ```bash
   cd manos-que-alimentan
   ```
3. **Configurar la base de datos:**
   - Renombra el archivo `.env.example` a `.env` y configurar las variables.
4. **Inicializar el proyecto:**
   - Inicializar el **`backend`**:
   ```bash
   cd backend
   pnpm install
   pnpm run dev
   ```
   - Inicializar el **`frontend`**:
   ```bash
   cd frontend
   pnpm install
   pnpm run dev
   ```

## 🚀 ¿Cómo Contribuir?

1. **Realizar un Fork** del proyecto haciendo clic en el botón `Fork`.
2. **Realizar los pasos de instalación.**
3. **Realiza tus cambios**:
   - Guarda los archivos.
   - Crea un commit con una descripción clara:
     ```bash
     git add .
     git commit -m "Descripción de los cambios realizados"
     ```
4. **Envíar los cambios** a tu repositorio fork:
   ```bash
   git push origin mi-nueva-funcionalidad
   ```
5. **Abre un Pull Request** 🚀:
   - Dirígete al repositorio original y crea un **Pull Request**.
   - Describe los cambios realizados.
