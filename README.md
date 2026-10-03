
# 🌊 SIAI Tucumán

## Sistema de Información y Alertas de Inundaciones

SIAI Tucumán es una aplicación web desarrollada para centralizar información relacionada con el **riesgo de inundaciones en la provincia de Tucumán**.

El sistema permite visualizar información sobre estaciones de monitoreo, niveles de agua, precipitaciones, zonas de riesgo y alertas, con el objetivo de facilitar el acceso a información para la prevención y respuesta ante posibles inundaciones.

---

## 🛠️ Tecnologías utilizadas

* **React**
* **Vite**
* **React Bootstrap**
* **Bootstrap**
* **React Router DOM**
* **JavaScript**
* **HTML5**
* **CSS3**

---

# 🚀 Instalación del proyecto

## 1. Crear el proyecto con React + Vite

Abrir una terminal y ejecutar:

```bash
npm create vite@latest siai-frontend
```

Vite solicitará algunas opciones.

Seleccionar:

```text
Project name: siai-frontend
Framework: React
Variant: JavaScript
```

Luego ingresar a la carpeta:

```bash
cd siai-frontend
```

---

## 2. Instalar las dependencias

Instalar React y React DOM:

```bash
npm install react react-dom
```

Instalar React Bootstrap:

```bash
npm install react-bootstrap bootstrap
```

Instalar React Router DOM:

```bash
npm install react-router-dom
```

---

# 🎨 Configuración de Bootstrap

En el archivo:

```text
src/main.jsx
```

importar Bootstrap:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
```

También se pueden instalar los iconos de Bootstrap con:

```bash
npm install bootstrap-icons
```

---

# ▶️ Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
http://localhost:5173/
```

Abrir esa dirección en el navegador.

---

# 📁 Estructura del proyecto

Una estructura recomendada para SIAI es:

```text
siai-frontend/
│
├── public/
│   └── img/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   └── AlertCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Mapa.jsx
│   │   ├── Alertas.jsx
│   │   ├── Estaciones.jsx
│   │   ├── Mediciones.jsx
│   │   ├── Historial.jsx
│   │   ├── Usuarios.jsx
│   │   ├── Reportes.jsx
│   │   └── Configuracion.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧭 React Router DOM

React Router DOM permite crear diferentes páginas dentro de la aplicación sin tener que crear un archivo HTML para cada sección.

En `App.jsx` se pueden definir las rutas:


# 🎨 React Bootstrap

React Bootstrap permite utilizar los componentes de Bootstrap directamente dentro de React.

Ejemplo de un botón:

```jsx
import Button from 'react-bootstrap/Button';

function Ejemplo() {
  return (
    <Button variant="primary">
      Ver información
    </Button>
  );
}

export default Ejemplo;
```

Ejemplo de una tarjeta:

```jsx
import Card from 'react-bootstrap/Card';

function Tarjeta() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Nivel del agua</Card.Title>

        <Card.Text>
          Información actual de la estación.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;
```

---

# 🌊 Funcionalidades principales

SIAI Tucumán está pensado para incorporar las siguientes funcionalidades:

### 🗺️ Mapa de riesgo

Visualización de las diferentes zonas de riesgo de inundación.

### 🚨 Alertas

Visualización de alertas y avisos relacionados con posibles inundaciones.

### 📡 Estaciones

Información de las estaciones de monitoreo instaladas en diferentes puntos.

### 📊 Mediciones

Visualización de datos obtenidos de sensores y estaciones.

### 📋 Historial

Consulta de mediciones y alertas anteriores.

### 👥 Usuarios

Administración de los usuarios del sistema.

### 📑 Reportes

Generación y consulta de información relacionada con las mediciones y alertas.

### ⚙️ Configuración

Configuración general del sistema.

---

# 📦 Comandos principales

| Comando           | Función                               |
| ----------------- | ------------------------------------- |
| `npm install`     | Instala las dependencias              |
| `npm run dev`     | Ejecuta el servidor de desarrollo     |
| `npm run build`   | Genera la versión de producción       |
| `npm run preview` | Previsualiza la versión de producción |

---

# 🏗️ Generar versión de producción

Para generar los archivos optimizados para publicar el proyecto:

```bash
npm run build
```

Se generará la carpeta:

```text
dist/
```

Esta carpeta contiene la versión lista para desplegar.

---

# 🌐 Publicación

El proyecto puede desplegarse en plataformas como:

* Netlify
* Vercel
* GitHub Pages

Para un proyecto realizado con Vite, el comando de compilación es:

```bash
npm run build
```

Y la carpeta de publicación es:

```text
dist
```

---

# 👨‍💻 Proyecto

**SIAI Tucumán**

Sistema de Información y Alertas de Inundaciones.

Proyecto académico desarrollado con **React + Vite**.

---

## 📌 Estado del proyecto

🚧 **En desarrollo**

Actualmente se encuentra en desarrollo la interfaz frontend y la integración de los diferentes módulos del sistema.


