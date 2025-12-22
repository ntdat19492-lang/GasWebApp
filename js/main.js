let logBuffer = [];
const tabTitles = {
  	home: "Trang Chủ",
  	setting: "Cài Đặt",
  	log: "Log",
  	search: 'Tìm Kiếm'
};

// Load nội dung tab
async function loadPage(page) {
  	try {
      // 🔹 Set header ngay khi load page
      const header = document.getElementById("headerTitle");
      animationLoadPage(header);
      header.textContent = tabTitles[page];
      
      const mainCard = document.querySelector('.main');
      animationLoadPage(mainCard);
		
    	const res = await fetch(`html/${page}.html`);
    	const html = await res.text();
      const main = document.getElementById("mainContent");
    	main.innerHTML = html;
    	if (page === "setting") settingHTML();
    	if (page === "log") logHTML();
		
  	} catch (err) {
    	main.innerHTML = `<div class='content-box'>Không tải được</div>`;
    	console.error(err);
  	}
}

function animationLoadPage(card) {
  if (mainCard) {
    mainCard.style.opacity = '0';
    mainCard.style.transform = 'translateY(30px) scale(0.9)';
        
    setTimeout(() => {
      mainCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      mainCard.style.opacity = '1';
      mainCard.style.transform = 'translateY(0) scale(1)';
    }, 200);
  }
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
