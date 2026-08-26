let imageMode = "file";
let currentDroppedFile = null;

// Control del Tema Claro / Oscuro
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    if (localStorage.getItem("vault_theme") === "light") {
        document.body.classList.add("light");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const isLight = document.body.classList.contains("light");
        localStorage.setItem("vault_theme", isLight ? "light" : "dark");
    });
}

function escapeHTML(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function render() {
    renderGroups();

    const title = document.getElementById("title");
    const count = document.getElementById("count");
    const grid = document.getElementById("grid");

    if (database.groups.length === 0) {
        title.textContent = "Vault";
        count.textContent = "0 elementos";
        grid.innerHTML = `
            <div class="empty" style="color: var(--text-secondary); grid-column: 1/-1; text-align: center; padding: 40px;">
                <div style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Tu Vault está vacío</div>
                Crea una categoría en el menú lateral para comenzar.
            </div>
        `;
        return;
    }

    if (!currentGroup) {
        currentGroup = database.groups[0].id;
    }

    const group = database.groups.find(g => g.id === currentGroup);
    if (!group) return;

    title.textContent = group.name;

    const search = document.getElementById("search").value.toLowerCase();

    const items = database.items.filter(item => {
        if (item.group !== group.id) return false;
        const groupName = database.groups.find(g => g.id === item.group)?.name.toLowerCase() || "";
        
        // Creamos texto plano temporal para buscar dentro de contenidos con HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = item.content || "";
        const plainContent = tempDiv.textContent || tempDiv.innerText || "";

        return (
            !search ||
            item.name.toLowerCase().includes(search) ||
            plainContent.toLowerCase().includes(search) ||
            groupName.includes(search)
        );
    });

    count.textContent = `${items.length} elemento` + (items.length === 1 ? "" : "s");
    grid.innerHTML = "";

    if (!items.length) {
        grid.innerHTML = `
            <div class="empty" style="color: var(--text-secondary); grid-column: 1/-1; text-align: center; padding: 40px;">
                <div style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Sin resultados</div>
                No hay elementos en esta categoría que coincidan con la búsqueda.
            </div>
        `;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("article");
        card.className = "card";

        if (item.pinned) {
            card.classList.add("pinned");
        }

        const typeBadge = item.type === "text" 
            ? `<span class="badge badge-text">COPY</span>` 
            : `<span class="badge badge-image">GIF/IMG</span>`;

        let content;
        if (item.type === "text") {
            // Muestra el HTML enriquecido directamente en la tarjeta
            content = `<div class="text-preview">${item.content}</div>`;
        } else {
            content = `<img class="image-preview" src="${escapeHTML(item.content)}" alt="${escapeHTML(item.name)}">`;
        }

        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${escapeHTML(item.name)}</div>
                <div>${typeBadge}</div>
            </div>
            ${content}
            <div class="actions">
                <button class="small-button" onclick="copyItem('${item.id}')">📋 Copiar</button>
                <button class="small-button" onclick="togglePin('${item.id}')">${item.pinned ? "📌 Desfijar" : "📌 Fijar"}</button>
                <button class="small-button delete" onclick="deleteItem('${item.id}')">🗑️ Borrar</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* =========================
   PESTAÑAS Y DRAG & DROP
========================= */

const tabFile = document.getElementById("tabFile");
const tabUrl = document.getElementById("tabUrl");
const fileModeDiv = document.getElementById("fileMode");
const urlModeDiv = document.getElementById("urlMode");
const dropZone = document.getElementById("dropZone");
const itemImageInput = document.getElementById("itemImage");
const dropZoneText = document.getElementById("dropZoneText");

if (tabFile && tabUrl) {
    tabFile.addEventListener("click", () => {
        imageMode = "file";
        tabFile.classList.add("active");
        tabUrl.classList.remove("active");
        fileModeDiv.style.display = "block";
        urlModeDiv.style.display = "none";
    });

    tabUrl.addEventListener("click", () => {
        imageMode = "url";
        tabUrl.classList.add("active");
        tabFile.classList.remove("active");
        fileModeDiv.style.display = "none";
        urlModeDiv.style.display = "block";
    });
}

if (dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            currentDroppedFile = files[0];
            dropZoneText.textContent = `Seleccionado: ${files[0].name}`;
        }
    });

    itemImageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            currentDroppedFile = e.target.files[0];
            dropZoneText.textContent = `Seleccionado: ${e.target.files[0].name}`;
        }
    });
}

window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.closest('#dropZone')) return;

    if (e.dataTransfer.files.length > 0) {
        currentDroppedFile = e.dataTransfer.files[0];
        document.getElementById("itemType").value = "image";
        document.getElementById("textContainer").style.display = "none";
        document.getElementById("imageContainer").style.display = "block";
        dropZoneText.textContent = `Seleccionado: ${currentDroppedFile.name}`;
        openItemModal();
    }
});

/* =========================
   PEGAR IMÁGENES CON CTRL + V
========================= */

window.addEventListener("paste", (e) => {
    const itemModal = document.getElementById("itemModal");
    if (!itemModal.classList.contains("show")) return;

    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
                currentDroppedFile = blob;
                
                document.getElementById("itemType").value = "image";
                document.getElementById("textContainer").style.display = "none";
                document.getElementById("imageContainer").style.display = "block";
                
                imageMode = "file";
                if (tabFile && tabUrl) {
                    tabFile.classList.add("active");
                    tabUrl.classList.remove("active");
                    fileModeDiv.style.display = "block";
                    urlModeDiv.style.display = "none";
                }

                dropZoneText.textContent = `Imagen pegada del portapapeles (${blob.size ? Math.round(blob.size / 1024) + ' KB' : 'copiada'})`;
            }
            break;
        }
    }
});

/* =========================
   EDITOR ENRIQUECIDO (TOOLBAR)
========================= */

function formatText(command) {
    document.execCommand(command, false, null);
}

function formatSize(size) {
    document.execCommand('fontSize', false, size);
}

function formatColor(color) {
    document.execCommand('foreColor', false, color);
}

/* =========================
   NUEVO ELEMENTO
========================= */

function openItemModal() {
    if (database.groups.length === 0) {
        openGroupModal();
        return;
    }
    document.getElementById("itemModal").classList.add("show");
}

function closeItemModal() {
    document.getElementById("itemModal").classList.remove("show");
    currentDroppedFile = null;
    dropZoneText.textContent = "Arrastra un GIF o imagen aquí o haz clic";
    document.getElementById("itemUrl").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemContent").innerHTML = ""; // Limpia el editor HTML
}

document.getElementById("newItemButton").addEventListener("click", openItemModal);
document.getElementById("cancelItem").addEventListener("click", closeItemModal);

document.getElementById("itemType").addEventListener("change", event => {
    const isImage = event.target.value === "image";
    document.getElementById("textContainer").style.display = isImage ? "none" : "block";
    document.getElementById("imageContainer").style.display = isImage ? "block" : "none";
});

document.getElementById("saveItem").addEventListener("click", () => {
    const name = document.getElementById("itemName").value.trim();
    const type = document.getElementById("itemType").value;

    if (!name) return;

    if (type === "text") {
        const content = document.getElementById("itemContent").innerHTML; // Guarda el HTML con formato
        database.items.push({
            id: crypto.randomUUID(),
            group: currentGroup,
            name,
            type,
            content,
            pinned: false
        });
        saveDatabase();
        closeItemModal();
        render();
        return;
    }

    if (imageMode === "url") {
        const url = document.getElementById("itemUrl").value.trim();
        if (!url) return;
        database.items.push({
            id: crypto.randomUUID(),
            group: currentGroup,
            name,
            type: "image",
            content: url,
            pinned: false
        });
        saveDatabase();
        closeItemModal();
        render();
    } else {
        const file = currentDroppedFile || document.getElementById("itemImage").files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            database.items.push({
                id: crypto.randomUUID(),
                group: currentGroup,
                name,
                type: "image",
                content: reader.result,
                pinned: false
            });
            saveDatabase();
            closeItemModal();
            render();
        };
        reader.readAsDataURL(file);
    }
});

async function copyItem(id) {
    const item = database.items.find(x => x.id === id);
    if (!item) return;

    try {
        if (item.type === "image") {
            // Copiar imagen real como Blob
            const response = await fetch(item.content);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob })
            ]);
            console.log("¡Imagen copiada al portapapeles!");
        } else {
            // Genera texto plano extrayendo el contenido del HTML para respaldo
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = item.content;
            const plainText = tempDiv.textContent || tempDiv.innerText || "";

            const textBlob = new Blob([plainText], { type: "text/plain" });
            const htmlBlob = new Blob([item.content], { type: "text/html" });

            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/plain": textBlob,
                    "text/html": htmlBlob
                })
            ]);
            console.log("¡Texto con formato copiado al portapapeles!");
        }
    } catch (err) {
        console.error("Error al copiar al portapapeles:", err);
        // Plan de respaldo básico en texto plano
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = item.content;
        await navigator.clipboard.writeText(tempDiv.textContent || tempDiv.innerText || "");
    }
}

function togglePin(id) {
    const item = database.items.find(x => x.id === id);
    if (!item) return;
    item.pinned = !item.pinned;
    saveDatabase();
    render();
}

function deleteItem(id) {
    database.items = database.items.filter(x => x.id !== id);
    saveDatabase();
    render();
}

document.getElementById("search").addEventListener("input", render);

render();