# Vault Hub

> Your personal and minimalist web space to store, organize, and copy rich text snippets (copies), images, and GIFs quickly and securely.

---

## Features

* Category Management: Organize your resources into different groups with custom colors and a fast side search bar.
* Rich Text Editor: Create text notes with bold, italics, strikethrough, underline, and custom font sizes and colors.
* Multimedia Support: Save images or GIFs via local files (with drag and drop support) or URL links.
* Advanced Clipboard: Copy rich text (HTML + plain text) or actual images directly to your clipboard using the modern JavaScript Clipboard API.
* Direct Paste: Paste images directly from your clipboard using Ctrl + V inside the modal.
* Pin Elements: Pin your most important resources to the top.
* Local Storage: Data is saved persistently in your browser using localStorage.

---

## Technologies Used

* HTML5 (Web structure and contenteditable interactive elements)
* CSS3 (Modern design, custom variables, backdrop-filter effects, and dark mode)
* JavaScript (ES6+) (Application logic, DOM manipulation, storage management, and Clipboard API)

---

## How to Run Locally

1. Clone or download this repository to your computer.
2. Open the project folder in your favorite code editor (such as VS Code).
3. Open the index.html file directly in your web browser or use a local server extension (like Live Server).

---

## Project Structure

```text
web de copy/
├── css/
│   ├── global.css      # General styles and theme variables
│   ├── login.css       # Welcome screen styles
│   └── vault.css       # Main dashboard and modal styles
├── js/
│   ├── auth.js         # Authentication/access logic
│   ├── groups.js       # Category management and rendering
│   ├── storage.js      # LocalStorage and database handling
│   └── vault.js        # Main logic, editor, and clipboard
├── index.html          # Welcome page
├── login.html          # Access screen
└── vault.html          # Main Vault dashboard

# Vault Hub

> Tu espacio personal y minimalista en la web para almacenar, organizar y copiar fragmentos de texto con formato (copies), imágenes y GIFs de forma rápida y segura.

---

## Características

* Gestión por Categorías: Organiza tus recursos en diferentes grupos con colores personalizados y un buscador lateral rápido.
* Editor Enriquecido: Crea notas de texto aplicando negrita, cursiva, tachado, subrayado, tamaños y colores personalizados.
* Soporte Multimedia: Guarda imágenes o GIFs mediante archivos locales (con soporte de arrastrar y soltar) o enlaces URL.
* Portapapeles Avanzado: Copia texto con formato (HTML + texto plano) o imágenes directamente al portapapeles con la API moderna de JavaScript.
* Pegado Directo: Pega imágenes desde el portapapeles con Ctrl + V directamente dentro del modal.
* Fijar Elementos: Destaca tus recursos más importantes en la parte superior.
* Almacenamiento Local: Los datos se guardan de forma persistente en el navegador mediante localStorage.

---

## Tecnologías Utilizadas

* HTML5 (Estructura web y elementos interactivos contenteditable)
* CSS3 (Diseño moderno, variables personalizadas, efectos de desenfoque y modo oscuro)
* JavaScript (ES6+) (Lógica de la aplicación, manipulación del DOM, gestión del almacenamiento y Clipboard API)

---

## Cómo ejecutarlo localmente

1. Clona o descarga este repositorio en tu ordenador.
2. Abre la carpeta del proyecto en tu editor de código favorito (como VS Code).
3. Abre el archivo index.html directamente en tu navegador web o utiliza una extensión de servidor local (como Live Server).

---

## Estructura del Proyecto

```text
web de copy/
├── css/
│   ├── global.css      # Estilos generales y variables del tema
│   ├── login.css       # Estilos de la pantalla de bienvenida
│   └── vault.css       # Estilos del panel principal y modales
├── js/
│   ├── auth.js         # Lógica de autenticación/acceso
│   ├── groups.js       # Gestión y renderizado de categorías
│   ├── storage.js      # Manejo de localStorage y base de datos
│   └── vault.js        # Lógica principal, editor y portapapeles
├── index.html          # Página de bienvenida
├── login.html          # Pantalla de acceso
└── vault.html          # Panel principal de Vault
