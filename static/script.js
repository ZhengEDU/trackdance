document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".view");
    const links = document.querySelectorAll(".nav-item");
    const teamSelect = document.getElementById("teamSelect");
    const divisionSelect = document.getElementById("divisionSelect");

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");

    // TOGGLE SIDEBAR
    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("open");
        menuBtn.style.display = "none"; // Hide Menu Button
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
        // Only show Menu Button again if we are on mobile
        if (window.innerWidth <= 768) {
            menuBtn.style.display = "block";
        }
    }

    menuBtn.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    // NAVIGATION
    function showView(viewId) {
        views.forEach(v => v.classList.remove("active"));
        links.forEach(l => l.classList.remove("active-tab"));

        const target = document.getElementById(viewId);
        const link = document.querySelector(`[data-view="${viewId}"]`);

        if (target) target.classList.add("active");
        if (link) link.classList.add("active-tab");

        closeSidebar();
    }

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showView(link.dataset.view);
        });
    });

    // FILTERING
    function applyFilters() {
        const team = teamSelect.value;
        const division = divisionSelect.value;
        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {
            const teamMatch = !team || row.dataset.team === team;
            const divisionMatch = !division || row.dataset.division === division;

            if (teamMatch && divisionMatch) {
                row.style.display = "";
                row.classList.toggle("highlight", team !== "" && row.dataset.team === team);
            } else {
                row.style.display = "none";
            }
        });
    }

    if (teamSelect) teamSelect.addEventListener("change", applyFilters);
    if (divisionSelect) divisionSelect.addEventListener("change", applyFilters);

    // PLACEMENTS ACCORDION
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