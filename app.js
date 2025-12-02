let currentTab = "home"; // tab hiện tại
let logBuffer = [];
const tabTitles = {
  home: "Trang Chủ",
  setting: "Cài Đặt",
  log: "Log",
  search: 'Tìm Kiếm'
};

// Load nội dung tab
async function loadPage(page) {
  const main = document.getElementById("mainContent");
  // 🔹 Set header ngay khi load page
  const header = document.getElementById("headerTitle");
  header.textContent = tabTitles[page];
  try {
    const res = await fetch(`${page}.html`);
    const html = await res.text();
    main.innerHTML = html;
    if (page === "setting") settingHTML();
    if (page === "log") logHTML();
  } catch (err) {
    main.innerHTML = `<div class='content-box'>Không tải được</div>`;
    console.error(err);
  }
}

function settingHTML() {
  document.getElementById("reloadBtn").addEventListener("click", () => {
    window.location.reload();
    addLog("đã click")
  });
  document.getElementById('createAccBtn').addEventListener('click', function () {
    const inputDiv = document.getElementById('createAccInputs');
    const button = this; // Lấy đối tượng button hiện tại

    if (inputDiv.style.display === 'none' || inputDiv.style.display === '') {
        // Hiển thị các input và mở rộng chiều cao của button
        inputDiv.style.display = 'block';
        button.classList.add('open'); // Thêm class 'open' để mở rộng chiều cao
        button.classList.remove('active'); // Loại bỏ trạng thái "clicked" của button
    } else {
        // Ẩn các input và thu nhỏ chiều cao của button
        inputDiv.style.display = 'none';
        button.classList.remove('open'); // Loại bỏ class 'open' để thu nhỏ chiều cao
    }
  });
}

function logHTML() {
  const main = document.getElementById("mainContent");
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
  if (isTG) {
    document.getElementById("headerTitle").style.height = "100px";
  }
  // Load tab mặc định
  loadPage(currentTab);
});
