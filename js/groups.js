let currentGroup = null;

function escapeHTML(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderGroups() {
    const container = document.getElementById("groups");

    if (!container) return;

    container.innerHTML = "";

    database.groups.forEach(group => {
        const button = document.createElement("button");

        button.className = "group";

        if (group.id === currentGroup) {
            button.classList.add("active");
        }

        button.innerHTML = `
            <span
                class="color-dot"
                style="background:${group.color}"
            ></span>
            ${escapeHTML(group.name)}
        `;

        button.addEventListener("click", () => {
            currentGroup = group.id;
            render();
        });

        container.appendChild(button);
    });
}

function openGroupModal() {
    document
        .getElementById("groupModal")
        .classList.add("show");
}

function closeGroupModal() {
    document
        .getElementById("groupModal")
        .classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("newGroupButton")
        .addEventListener("click", openGroupModal);

    document
        .getElementById("cancelGroup")
        .addEventListener("click", closeGroupModal);

    // Filtro para buscar categorías rápidamente en la sidebar
    const searchGroupsInput = document.getElementById("searchGroups");
    if (searchGroupsInput) {
        searchGroupsInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const groupButtons = document.querySelectorAll("#groups .group");
            groupButtons.forEach(btn => {
                const text = btn.textContent.toLowerCase();
                btn.style.display = text.includes(term) ? "flex" : "none";
            });
        });
    }

    document
        .getElementById("saveGroup")
        .addEventListener("click", () => {

            const name =
                document
                    .getElementById("groupName")
                    .value
                    .trim();

            const color =
                document
                    .getElementById("groupColor")
                    .value;

            if (!name) {
                alert("Escribe un nombre para el grupo.");
                return;
            }

            const id =
                Date.now().toString();

            database.groups.push({
                id: id,
                name: name,
                color: color
            });

            currentGroup = id;

            saveDatabase();

            document
                .getElementById("groupName")
                .value = "";

            closeGroupModal();

            render();
        });

});