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
