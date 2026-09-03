# Soy-Henry Proyecto Integrador M3

Eres desarrollador/a frontend junior en ComicSansCon, una agencia digital especializada en experiencias interactivas para fans de videojuegos, películas y series de televisión.

El equipo de producto quiere lanzar una prueba de concepto (POC) de una aplicación web donde los usuarios puedan chatear con personajes ficticios usando inteligencia artificial. Tu tarea es crear una Single Page Application responsive que permita a los usuarios tener conversaciones naturales con un personaje conocido de alguna franquicia popular de tu elección, integrando una API de AI de forma segura mediante Vercel Functions, implementando routing básico, y desplegando la aplicación funcional en Vercel para que el equipo de producto pueda mostrarla a stakeholders y decidir si quieren ampliar o no el proyecto.

---

## Chat Interactivo con Protagonistas de CODE GEASS

En la web podras interactuar con los protagonistas de la serie animada, estrenada en 2006.

Cada personaje cuenta con personalidad acordes al anime, podras disfrutar con ellos unas charlas interesantes.

* **Lelouch Lamperouge:** un príncipe exiliado del Imperio de Britannia que obtiene el poder del Geass.
* **Suzaku Kururugi:** un joven japones con un fuerte sentido de la justicia.
* **C.C.:** Una misteriosa joven de aspecto inmortal que le otorga a Lelouch su poder de Geass.

---

## Stack Tecnico

* **FrontEnd:** HTML, CSS y JavaScript Vanilla.
* **BackEnd/Proxy:** Vercel Serveless Functions.
* **Formato Web:** SPA de navegacion (HOME/CHAT/ABOUT) con History API nativa del navegador.
* **IA:** Gemini ( Google AI Studio ).
* **Deploy:** Vercel.
* **Testing:** Vitest.

---

## Accesos Directos del Proyecto

* **Deploy en Vercel:** https://proyecto-m3-moyano-erik.vercel.app/chat
* **Documentacion de la AI:** https://docs.google.com/document/d/1Ee0e-M249yfs5KunV3Yuwov90aXHiUBHmPtvUup9h-c/edit?usp=sharing

---

## Estructura del Proyecto

```text
ProyectoM3_MoyanoErik/
│
├── index.html            # Página HTML principal
├── package.json          # Dependencias y scripts del proyecto
├── README.md             # Documentación
├── vercel.json           # Configuración del despliegue en Vercel
├── .env.example          # Ejemplo de variables de entorno
├── .gitignore            # Archivos excluidos del repositorio
│
├── api/
│   └── gemini.js         # Endpoint serverless para comunicarse con Gemini
│
├── src/
│   ├── app.js            # Punto de entrada de la aplicación
│   ├── navigation.js     # Navegación entre rutas
│   ├── router.js         # Sistema de enrutamiento
│   ├── styles.css        # Importación general de estilos
│   │
│   ├── img/
│   │   └── characters/   # Imágenes de los personajes
│   │
│   ├── services/         # Lógica de negocio y servicios
│   │   ├── aiClient.js
│   │   ├── characterLookup.js
│   │   ├── characters.js
│   │   ├── debounce.js
│   │   ├── fetchJson.js
│   │   ├── mockGeminiApi.js
│   │   ├── prompts.js
│   │   └── storage.js
│   │
│   ├── styles/           # Estilos separados por vista
│   │   ├── about.css
│   │   ├── chat.css
│   │   ├── home.css
│   │   └── responsive.css
│   │
│   ├── transform/        # Transformación de mensajes para Gemini
│   │   └── chatPayload.js
│   │
│   ├── ui/               # Componentes visuales reutilizables
│   │   ├── characterCard.js
│   │   └── messages.js
│   │
│   └── views/            # Vistas principales de la aplicación
│       ├── about.js
│       ├── chat.js
│       ├── home.js
│       └── notFound.js
│
└── tests/                # Pruebas automatizadas
    ├── aiClient.test.js
    └── chatPayload.test.js
```

## Como Desplegar tu Proyecto 

Requisitos previos: 
    
* **Tener instaladas las siguientes dependencias:**
  * Visual Studio Code & Node.js

* **Registrarse en los Siguientes servicios:** 
  * Google AI Studio ( Al registrarse generar su API_KEY) https://aistudio.google.com
  * Vercel https://vercel.com
  * GitHub https://github.com

---

### Ejecutar el Proyecto de Manera Local

1. Accede al link: https://github.com/moyanoerik1991-hue/ProyectoM3_MoyanoErik
2. Busca el boton `<>Code` y descarga el archivo ZIP.
3. Descomprime el Archivo ZIP donde puedas encontrarlo con facilidad.
4. Con Visual Studio Code abierto, arriba a la izquierda das click `File > Add Folder to Workspace` y buscas la carpeta descomprimida.
5. Pasaremos a instalar las dependencias del proyecto, Abriras la terminar con `CTRL+J` y escribiras el siguiente comando `npm install` .
6. Importante!! Ahora utilizaremos la API_KEY, para ello crearas el archivo `.env` en la misma ubicacion de `.env.example` y clonaras(copy&paste) su informacion.
7. En `.env` tendras `GEMINI_API_KEY= api_key_gemini` reemplazaras `api_key_gemini` por tu API_KEY generada en Google AI Studio.
8. ahora en la terminal escribiremos `vercel dev` y abriremos `http://localhost:3000` listo para navegar.

---

### Ejercutar el Proyecto en Vercel

1. Con tu proyecto ya subido a tu GitHub con los push correspondientes.
2. Te conectaras tu cuenta de Vercel en tu navegador.
3. Ulizaremos la terminal del Vs code para ingresar `npm i -g vercel` esto instalara CLI de vercel en tu proyecto.
4. Continuando en la terminal usaremos `vercel login` para conectar tu cuenta de de vercel con tu terminal.
5. Ahora generaremos el link, utilizando `vercel` Despliega el proyecto directamente desde tu terminal y crea la carpeta para recordar esa vinculación en futuros despliegues.
6. Ahora en el navegador en la cuenta de vercel escribiremos en el buscador "Environment Variables" y daremos click en Add Environment Variables. En Key: `GEMINI_API_KEY` y en Value usaras la API_KEY generada. Importante al generar la variable dejar el TYPE en Secret y Enviorement en Produccion.
7. Ahora ya estamos listos para utilizar el link generado anteriormente y navegar.

---

### Desplegar los Test

1. El proyecto contiene test para los modulos: `aiClient.js` y `chatPayload.js` .
2. Para ejecutarlos en la terminar usaremos `npm install -D vitest` para instalar el vitest en las dependencias de desarrollo.
3. Ahora para ejecutarlos simplemente escribiremos `npm test` . Lo que dara inicio a los test en la terminal.

---

## Aportes de la AI en el Proyecto

Durante esta etapa de formacion me concentre en mejorar los prompt que solicitaba a la AI, con motivos educativos practique la interaccion contrui anticipadamente los archivos JS, y utilice la AI para generar los archivos CSS.
Durante la interracion con la IA esta nunca suponia los Archivos JS, antes de realizar cualquier supocision, solicitaba informacion de cada archivo especificamente.

| IA utilizada | Mis observaciones |
| :--- | :--- |
| **ChatGPT** | Lo utilicé principalmente para plantear y organizar el proyecto desde una perspectiva profesional, teniendo en cuenta mi nivel como programador junior. También recurrí a esta herramienta para analizar y solucionar errores que fueron apareciendo durante el desarrollo, tanto en la terminal, como en **psql** y **Railway**. |
| **Claude** | Lo utilicé para profundizar en la comprensión de los códigos y conceptos obtenidos a partir de las lecturas y recursos de estudio. Mi objetivo fue entender para qué servía cada parte del código y cómo funcionaba. Si bien también me ayudó a comprender y construir algunas soluciones, en la mayoría de los casos le solicité que revisara y corrigiera posibles errores en código que previamente había escrito. |
| **GitHub Copilot (VS Code)** | Lo utilicé como apoyo durante la programación para detectar y solucionar problemas más específicos relacionados con la interacción entre los diferentes archivos del proyecto. Fue especialmente útil para identificar errores de integración y realizar ajustes puntuales en el código. |