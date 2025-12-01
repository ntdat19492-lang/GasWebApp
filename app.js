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
        
        // Kiểm tra xem trang cần load có chứa phần tử .log-container không
        if (page === "chat" && main.querySelector(".log-container")) {
            const logContainer = main.querySelector(".log-container");
            main.innerHTML = html; // Load trang vào
            main.querySelector(".log-container").replaceWith(logContainer); // Thêm lại log-container
        } else {
            main.innerHTML = html;
        }
        
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

// Hàm thêm log
function addLog(text) {
  const main = document.getElementById("mainContent"); // Lấy phần tử chính chứa nội dung
  const logContainer = main.querySelector(".log-container"); // Tìm phần tử chứa log bên trong mainContent

  if (logContainer) {
    const box = document.createElement("div");
    box.className = "content-box";
    box.textContent = text;  // Đưa text vào content-box
    logContainer.appendChild(box);
  } else {
    console.error("Không tìm thấy phần tử log-container trong chat.html");
  }
}

// Khi mở Telegram WebApp
window.addEventListener("load", () => {
  const tg = window.Telegram?.WebApp;

  addLog("👉 window.load chạy");

  if (tg) {
    addLog("👉 Telegram WebApp detected");
    tg.ready();
    const header = document.getElementById("header");
    header.style.height = "90px";
    addLog("✔️ Header height set 90px cho Telegram WebApp UI");
  } else {
    addLog("❌ Không mở trong Telegram WebApp, giữ nguyên header");
  }
});

// Mặc định load home.html
loadPage("home");
