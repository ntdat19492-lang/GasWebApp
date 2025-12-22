let logBuffer = [];
const tabTitles = {
  	home: "Trang Chủ",
  	setting: "Cài Đặt",
  	log: "Log",
  	search: 'Tìm Kiếm'
};

async function loadPage(page) {
  const header = document.getElementById("headerTitle");
  const mainCard = document.querySelector('.main');
  const main = document.getElementById("mainContent");

  try {
    // animate mất đi
    animationLoadPage(mainCard);

    // ⏳ CHỜ animation
    await new Promise(r => setTimeout(r, 250));

    // đổi nội dung
    header.textContent = tabTitles[page];

    const res = await fetch(`html/${page}.html`);
    const html = await res.text();
    main.innerHTML = html;

    if (page === "setting") settingHTML();
    if (page === "log") logHTML();

    // hiện ngay
    mainCard.style.transition = 'none';
    mainCard.style.opacity = '1';
    mainCard.style.transform = 'translateY(0) scale(1)';

  } catch (err) {
    main.innerHTML = `<div class='content-box'>Không tải được</div>`;
    console.error(err);
  }
}

function animationLoadPage(card) {
  if (!card) return;

  // 1️⃣ trạng thái ban đầu (hiện)
  card.style.transition = 'none';
  card.style.opacity = '1';
  card.style.transform = 'translateY(0) scale(1)';

  // 2️⃣ cho browser render 1 frame
  requestAnimationFrame(() => {
    // 3️⃣ set transition
    card.style.transition = 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)';

    // 4️⃣ trạng thái animate (mất đi)
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
  });
}

function settingHTML() {
	document.getElementById("reloadBtn").addEventListener("click", () => {
		window.location.reload();
	});
	
	document.getElementById('createAccBtn').addEventListener('click', function () {
    	const box = document.getElementById("createAccInputs");
    	const wrapper = document.getElementById("bgbuttonbox");
    	box.classList.toggle("hidden");
    	wrapper.classList.toggle("active");
	});
	
	document.getElementById("btnRegister").addEventListener("click", async () => {
	  	const username = document.getElementById("regUsername").value;
	  	const password = document.getElementById("regPassword").value;
	  	const repass = document.getElementById("regRepassword").value;
		const thongbaoTrangThaiDangKy = document.getElementById("regmessage");
	
	  	if (!username || !password || !repass) {
	    	thongbaoTrangThaiDangKy.textContent = "❌ Chưa nhập thông tin";
	    	return;
	  	}
	
	  	if (password !== repass) {
	    	thongbaoTrangThaiDangKy.textContent = "❌ Mật khẩu không đúng";
	    	return;
	  	}

		const body ={};
		body.username = username;
	  	body.password = password;
	
	  	const res = await fetch("./register", {
	    	method: "POST",
	    	headers: { "Content-Type": "application/json" },
	    	body: JSON.stringify(body)
	    });
		
	  	const data = await res.json(); // Phản hồi từ server
		if (data.gasJson.ok) {
			thongbaoTrangThaiDangKy.style.color = 'green';
		} else {
			thongbaoTrangThaiDangKy.style.color = 'red';
		}
		thongbaoTrangThaiDangKy.textContent = data.gasJson.message;
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

loadPage("home");
