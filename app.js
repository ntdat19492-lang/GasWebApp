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
	
	document.getElementById('btnRegister').addEventListener('click', function(event) {
		event.preventDefault();

		// Lấy thông tin từ form
		const name = document.getElementById('regUsername').value;
		const pasword = document.getElementById('regPassword').value;
		const repasword = document.getElementById('regRepassword').value;

		// Gửi dữ liệu đến Google Apps Script
		fetch('https://script.google.com/macros/s/AKfycbwi-porgZXeTWAZ7MoAUXYzqJAL9Eh7wbcUV2ItAnWHLfYeTIQLeLiTkn9RmFEUVhiuMQ/exec', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: name, pasword: pasword})
		})
		.then(response => response.json())
		.catch(error => {
			alert('There was an error submitting the form.');
			console.error(error);
		});
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

// Tính năng ẩn bàn phím ảo khi click ra ngoài input
function setupInputBlur() {
  // Lắng nghe sự kiện click trên toàn bộ trang
  document.addEventListener('click', function(event) {
    // Kiểm tra nếu người dùng không click vào input
    if (!event.target.closest('input')) {
      // Nếu không phải click vào input, gọi blur() cho tất cả các input
      document.querySelectorAll('input').forEach(function(input) {
        input.blur();
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const isTG = isTelegramWebApp();
  if (isTG) {
    document.getElementById("headerTitle").style.height = "100px";
  }
  // Thiết lập tính năng ẩn bàn phím khi click ra ngoài input
  setupInputBlur();
  
  // Load tab mặc định
  loadPage("home");
});
