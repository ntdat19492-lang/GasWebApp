// Nút refresh
document.getElementById("refreshBtn").addEventListener("click", () => {
    loadPage(currentTab);  // Load lại trang đúng tab hiện tại
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

    } catch (err) {
        main.innerHTML = `<div class='content-box'>Không tải được</div>`;
    }
}

let currentTab = "home"; // mặc định home

// Chuyển tab
function switchTab(tab, btn) {
    currentTab = tab; // cập nhật tab hiện tại
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.getElementById("headerTitle").childNodes[0].nodeValue = tab.toUpperCase();

    loadPage(tab);
}

let logBuffer = [];

// Thêm log vào logBuffer
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
        typeof window.Telegram.WebApp.ready === "function" &&
        typeof window.Telegram.WebApp.initData === "string" &&
        window.Telegram.WebApp.initData.length > 0
    );
}

window.addEventListener("DOMContentLoaded", () => {
    const isTG = isTelegramWebApp();
    addLog("isTelegramWebApp() = " + isTG);
    if (isTG) {
        addLog("Đã nhận được Telegram WebApp API");
        const header = document.getElementById("headerTitle");
        header.style.height = "100px";
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        addLog("isExpanded: " + Telegram.WebApp.isExpanded);
    } else {
        addLog("Không nhận được Telegram WebApp API");
    }
});

// Mặc định load home
loadPage("home");