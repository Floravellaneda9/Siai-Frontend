# SIAI Tucumán 🌧️

### Sistema Integral de Alerta Temprana de Inundaciones

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite\&logoColor=white)](https://vite.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap\&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript\&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel\&logoColor=white)](https://vercel.com/)

---

## Descripción del proyecto

**SIAI Tucumán** es un proyecto web orientado al monitoreo y la prevención de situaciones de riesgo hídrico en la provincia de Tucumán.

La propuesta busca centralizar información relacionada con estaciones de monitoreo, niveles de agua, precipitaciones, alertas y zonas de riesgo, presentándola mediante una interfaz clara y organizada.

Este repositorio corresponde al **Frontend del proyecto**, desarrollado con **React y Vite**.

La versión actual representa la migración de la interfaz desarrollada anteriormente con HTML, CSS, JavaScript y Bootstrap hacia una estructura basada en componentes de React.

---

##  Objetivo

El objetivo de SIAI Tucumán es proporcionar una interfaz que permita visualizar información relacionada con posibles situaciones de riesgo de inundaciones y facilitar el acceso a los diferentes módulos del sistema.

El proyecto se encuentra planteado para trabajar posteriormente con información proveniente de estaciones, sensores y otras fuentes de datos.

---

##  Funcionalidades

En esta etapa del frontend se implementaron las siguientes funcionalidades y elementos:

###  Navegación

La aplicación cuenta con una barra de navegación responsive que permite acceder a los diferentes módulos previstos para el sistema:

*  Mapa
*  Alertas
*  Estaciones
*  Mediciones
*  Historial
*  Usuarios
*  Reportes
*  Configuración
*  Login

### Estado de zonas

Se incorporó un conjunto de tarjetas para representar diferentes estados de las zonas monitoreadas:

* **Zonas normales**
* **Precaución**
* **Riesgo**
* **Emergencia**

Cada tarjeta muestra una cantidad y una descripción asociada al estado.

Actualmente estos valores son utilizados como datos de demostración de la interfaz.

### Presentación del sistema

La página incluye una sección informativa que explica:

* Quiénes somos.
* Qué hace SIAI Tucumán.
* Cómo funciona la propuesta.
* La importancia del monitoreo y las alertas tempranas.
* La participación de la comunidad.

### Diseño responsive

La interfaz utiliza las clases responsive de Bootstrap para adaptar la distribución de los elementos a diferentes tamaños de pantalla.

###  Pie de página

Se incorporó un footer con:

* Identidad del proyecto.
* Año.
* Información de contacto.

---

##  Componentización con React

La interfaz fue dividida en componentes reutilizables para organizar mejor el código.

Actualmente se encuentran los siguientes componentes:

| Componente         | Función                                |
| ------------------ | -------------------------------------- |
| `Navbar.jsx`       | Barra de navegación principal          |
| `Cards.jsx`        | Tarjetas de estados de las zonas       |
| `Presentacion.jsx` | Información y presentación del sistema |
| `Footer.jsx`       | Pie de página                          |

El componente principal `App.jsx` se encarga de integrar estos componentes:

```jsx
function App() {
  return (
    <>
      <Navbar />
      <Cards />
      <Presentacion />
      <Footer />
    </>
  )
}
```

Esta organización permite mantener cada parte de la interfaz separada y facilita futuras modificaciones.

---

## Tecnologías utilizadas

### React

Utilizado para construir la interfaz mediante componentes reutilizables.

### Vite

Utilizado como herramienta de desarrollo y construcción del proyecto.

### JavaScript

Utilizado para la lógica de la aplicación y la creación de los componentes.

### Bootstrap 5.3

Utilizado para:

* Diseño de la interfaz.
* Sistema de filas y columnas.
* Componentes visuales.
* Clases utilitarias.
* Diseño responsive.

### Bootstrap Icons

Utilizado para incorporar iconos en la navegación, las tarjetas informativas y otros elementos de la interfaz.

### ESLint

Utilizado para detectar problemas y mantener buenas prácticas en el código JavaScript.

### Git y GitHub

Utilizados para el control de versiones y almacenamiento del código fuente.

### Vercel

Utilizado para realizar el despliegue del frontend.

---

##  Uso de Flexbox

Se utiliza Flexbox principalmente mediante las clases proporcionadas por Bootstrap.

Algunos ejemplos utilizados en los componentes son:

```html
d-flex align-items-center
```

y:

```html
d-flex align-items-center justify-content-between
```

También se utilizan clases responsive como:

```html
d-md-flex
```

Estas clases permiten organizar y alinear elementos dentro de diferentes componentes, principalmente en la navegación y el footer.

---

##  Uso de Grid

Se utiliza el sistema **Grid de Bootstrap** para distribuir los elementos de la interfaz.

Por ejemplo, en las tarjetas de estados se utiliza:

```jsx
<div className="row g-4">
  <div className="col-md-6 col-xl-3">
    ...
  </div>
</div>
```

Esto permite que:

* En pantallas pequeñas se distribuyan los elementos en una columna.
* En pantallas medianas se muestren dos columnas.
* En pantallas grandes se puedan mostrar cuatro columnas.

También se utiliza este sistema en la sección de presentación y en el footer.

> En este proyecto se utiliza el sistema Grid proporcionado por Bootstrap.

---

## Estilos

En esta etapa se utilizan principalmente las clases y componentes proporcionados por **Bootstrap 5.3** para definir la apariencia de la aplicación.

También se encuentran disponibles los archivos:

```text
src/
├── App.css
└── index.css
```

que permiten incorporar estilos personalizados a medida que avance el desarrollo.

Actualmente la mayor parte de la presentación visual se realiza mediante las clases de Bootstrap.

---

##  Responsive Design

El diseño responsive se implementó utilizando las clases responsive de Bootstrap.

Por ejemplo:

```html
col-md-6 col-xl-3
```

permite modificar la distribución de los componentes dependiendo del tamaño de pantalla.

También se utilizan clases como:

```html
text-center
text-md-start
text-md-end
justify-content-md-start
```

para adaptar la alineación de los elementos.

Además, el proyecto incluye la etiqueta:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

que permite que la aplicación se adapte correctamente al ancho de los dispositivos.

---

##  SEO y estructura HTML

Se incorporaron algunas prácticas básicas relacionadas con la estructura y accesibilidad del sitio.

Entre ellas:

* Uso del atributo `lang` en el documento HTML.
* Etiqueta `meta charset="UTF-8"`.
* Etiqueta `viewport`.
* Uso de títulos y encabezados para organizar el contenido.
* Uso del atributo `alt` en las imágenes.
* Uso de atributos `aria-label` en elementos donde resulta necesario.

En futuras etapas se continuará trabajando en la optimización de la estructura y el contenido del sitio.

---

## Estructura del proyecto

```text
SIAI-Frontend/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Cards.jsx
│   │   ├── Presentacion.jsx
│   │   └── Footer.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
└── README.md
```

### `src/main.jsx`

Es el punto de entrada de la aplicación React. También se encarga de importar Bootstrap, Bootstrap Icons y los estilos generales.

### `src/App.jsx`

Es el componente principal que integra los diferentes componentes de la aplicación.

### `src/components/`

Contiene los componentes reutilizables que forman la interfaz.

### `src/assets/`

Contiene recursos utilizados por la aplicación.

### `public/`

Contiene archivos públicos utilizados por el proyecto.

---

##  Requisitos

Para ejecutar el proyecto localmente se necesita tener instalado:

* **Node.js**
* **npm**

Se recomienda utilizar una versión actual de Node.js compatible con Vite.

---

##  Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Floravellaneda9/Siai-Frontend.git
```

### 2. Ingresar al proyecto

```bash
cd Siai-Frontend
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Luego de ejecutar el comando, Vite mostrará en la terminal la dirección local para acceder a la aplicación.

---

##  Scripts disponibles

### Ejecutar el proyecto en desarrollo

```bash
npm run dev
```

### Generar la versión de producción

```bash
npm run build
```

### Ejecutar ESLint

```bash
npm run lint
```

### Previsualizar la versión de producción

```bash
npm run preview
```

---

##  Deploy

El frontend se encuentra desplegado mediante **Vercel**.

**Aplicación:**
https://siai-frontend-lime.vercel.app/

**Repositorio:**
https://github.com/Floravellaneda9/Siai-Frontend

---

## Integrantes

* **Ivan Diez Gomez**
* **Luciana Jimenez**
* **Florencia Avellaneda**

---





