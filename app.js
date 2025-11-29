// Nút refresh
document.getElementById("refreshBtn").addEventListener("click", () => {
    window.location.reload();
});

// Load nội dung file HTML con (home.html, chat.html...)
async function loadPage(page) {
    const main = document.getElementById("mainContent");

    try {
        const res = await fetch(`${page}.html`);
        if (!res.ok) throw new Error("HTTP " + res.status);

        const html = await res.text();
        main.innerHTML = html;
        main.scrollTop = 0;

    } catch (err) {
        main.innerHTML = `
            <div class="content-box">Không tải được file (${page}.html)</div>
        `;
    }
}

// Chuyển tab
function switchTab(tab, btn) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.getElementById("headerTitle").childNodes[0].nodeValue = tab.toUpperCase();

    loadPage(tab);
}

// Mặc định load home.html
loadPage("home");