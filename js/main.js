let logBuffer = [];

// Load nội dung tab
async function loadPage(page) {
  	const main = document.querySelector("main");
  	try {
		animationLoadPage('main');
      
      	const res = await fetch(`html/${page}.html`);
      	const html = await res.text();
      	main.innerHTML = html;
      	if (page === "setting") settingHTML();
      	if (page === "log") logHTML();
  	} catch (err) {
    	main.innerHTML = `<div class='content-box'>Không tải được</div>`;
      	console.error(err);
  	}
}

function animationLoadPage(mainCard) {
	const card = document.querySelector(mainCard);
	if (card) {
		card.style.opacity = '0';
		card.style.transform = 'translateY(30px) scale(0.9)';
        
	setTimeout(() => {
    	card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    	card.style.opacity = '1';
    	card.style.transform = 'translateY(0) scale(1)';
    	}, 200);
  	}
}

// Chuyển tab
function switchTab(tab, btn) {
  	document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  	btn.classList.add("active");
  	loadPage(tab);
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

		const body ={username, password};
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
