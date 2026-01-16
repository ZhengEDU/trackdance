document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".view");
    const links = document.querySelectorAll(".nav-item");
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");

    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("open");
        menuBtn.style.display = "none";
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
        if (window.innerWidth <= 768) menuBtn.style.display = "block";
    }

    menuBtn.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    function showView(viewId) {
        views.forEach(v => v.classList.remove("active"));
        links.forEach(l => l.classList.remove("active-tab"));
        const target = document.getElementById(viewId);
        const link = document.querySelector(`[data-view="${viewId}"]`);
        if (target) target.classList.add("active");
        if (link) link.classList.add("active-tab");
        closeSidebar();
    }

    links.forEach(link => link.addEventListener("click", (e) => {
        e.preventDefault();
        showView(link.dataset.view);
    }));

    // Filter Logic
    function applyFilters() {
        const team = document.getElementById("teamSelect").value;
        const division = document.getElementById("divisionSelect").value;
        document.querySelectorAll("tbody tr").forEach(row => {
            const tMatch = !team || row.dataset.team === team;
            const dMatch = !division || row.dataset.division === division;
            row.style.display = (tMatch && dMatch) ? "" : "none";
        });
    }

    if(document.getElementById("teamSelect")) {
        document.getElementById("teamSelect").addEventListener("change", applyFilters);
        document.getElementById("divisionSelect").addEventListener("change", applyFilters);
    }

    // Accordion Logic
    document.addEventListener("click", e => {
        const btn = e.target.closest(".division-toggle");
        if (btn) {
            const panel = btn.nextElementSibling;
            panel.classList.toggle("open");
            btn.querySelector('span').textContent = panel.classList.contains("open") ? "−" : "+";
        }
    });

    showView("info");
});