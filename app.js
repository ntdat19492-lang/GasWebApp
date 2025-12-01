let currentTab = "home";
let logBuffer = [];

// Nút update
document.getElementById("reloadBtn").addEventListener("click", () => {
    window.location.reload();
});

// Thêm log vào logBuffer và render
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

// Kiểm tra Telegram WebApp
function isTelegramWebApp() {
    return (
        window.Telegram &&
        window.Telegram.WebApp &&
        typeof window.Telegram.WebApp.ready === "function" &&
        typeof window.Telegram.WebApp.initData === "string" &&
        window.Telegram.WebApp.initData.length > 0
    );
}

// Load nội dung page
async function loadPage(page) {
    const main = document.getElementById("mainContent");

    try {
        let html = "";

        if (page === "home") {
            html = `<div class="content-box">Đây là nội dung Home</div>`;
        } else if (page === "chat") {
            html = `<div class="log-container"></div><div class="content-box">Đây là tab Chat</div>`;
        }

        main.innerHTML = html;

        // Render log nếu tab chat
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

// Chuyển tab
function switchTab(tab, btn) {
    currentTab = tab;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.getElementById("headerTitle").childNodes[0].nodeValue = tab.toUpperCase();
    loadPage(tab);
}

// Khi DOM sẵn sàng
window.addEventListener("DOMContentLoaded", () => {
    const isTG = isTelegramWebApp();
    addLog("isTelegramWebApp() = " + isTG);

    if (isTG) {
        addLog("Đã nhận được Telegram WebApp API");
        const header = document.getElementById("headerTitle");
        header.style.height = "100px";

        Telegram.WebApp.ready();

        setTimeout(() => {
            Telegram.WebApp.expand();  // FULLSCREEN thực sự
        }, 150);

        addLog("isExpanded: " + Telegram.WebApp.isExpanded);
    } else {
        addLog("Không nhận được Telegram WebApp API");
    }

    // Mặc định load home
    loadPage("home");
});