let currentTab = "home"; // tab hiện tại
let logBuffer = [];

// Load nội dung tab
async function loadPage(page) {
  const main = document.getElementById("mainContent");

  try {
    const res = await fetch(`${page}.html`);
    const html = await res.text();
    main.innerHTML = html;

    // Nếu tab home, thêm sự kiện reload
    if (page === "profile") settingHTML();
    // Nếu tab chat → render log
    if (page === "chat") logHTML();
  } catch (err) {
    main.innerHTML = `<div class='content-box'>Không tải được</div>`;
    console.error(err);
  }
}

function settingHTML() {
  const reloadBtn = document.getElementById("reloadBtn");
  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
    window.location.reload();
    addLog("đã click")
    });
  }
}

function logHTML() {
  const logContainer = main.querySelector(".log-container");
  if (logContainer) {
    logContainer.innerHTML = ''; // xóa log cũ
    logBuffer.forEach(text => {
    const box = document.createElement("div");
    box.className = "content-box";
    box.textContent = text;
    logContainer.appendChild(box);
    });
  }
}

// Chuyển tab
function switchTab(tab, btn) {
  currentTab = tab;

  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const header = document.getElementById("headerTitle");
  header.textContent = tab.toUpperCase(); // safe hơn childNodes[0].nodeValue

  loadPage(tab);
}

// Thêm log vào chat
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

  // Load tab mặc định
  loadPage(currentTab);
});
