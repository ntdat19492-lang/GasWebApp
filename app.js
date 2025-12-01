// Nút refresh
document.getElementById("refreshBtn").addEventListener("click", () => {
    window.location.reload();
});

async function loadPage(page) {
    const main = document.getElementById("mainContent");

    try {
        const res = await fetch(`${page}.html`);
        const html = await res.text();
        main.innerHTML = html;

        // Nếu load vào tab chat → render log
        if (page === "chat") {
            const logContainer = main.querySelector(".log-container");
            logBuffer.forEach(text => {
                const box = document.createElement("div");
                box.className = "content-box";
                box.textContent = text;
                logContainer.appendChild(box);
            });
        }

    } catch(err) {
        main.innerHTML = `<div class='content-box'>Không tải được</div>`;
    }
}

// Chuyển tab
function switchTab(tab, btn) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.getElementById("headerTitle").childNodes[0].nodeValue = tab.toUpperCase();

    loadPage(tab);
}

let logBuffer = [];

function addLog(text) {
    logBuffer.push(text);

    const main = document.getElementById("mainContent");
    const logContainer = main.querySelector(".log-container");

    if (logContainer) {
        const box = document.createElement("div");
        box.className = "content-box";
        box.textContent = text;
        logContainer.appendChild(box);
    }
}

function isTelegramWebApp() {
    return (
        window.Telegram &&
        window.Telegram.WebApp &&
        typeof window.Telegram.WebApp.ready === "function"
    );
}

window.addEventListener("DOMContentLoaded", () => {
    if (isTelegramWebApp()) {
        addLog("Đã nhận được Telegram WebApp API");
        const header = document.getElementById("headerTitle");
        header.style.height = "100px";
    } else {
        addLog("Không nhận được Telegram WebApp API");
    }
});

// Mặc định load home
loadPage("home");
