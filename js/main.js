class App {
    constructor() {
        this.main = document.querySelector("main");
        this.footer = document.querySelector(".footer-wrapper");
        this.tabs = {
            home: new HomeTab(this),
            search: new SearchTab(this),
            log: new LogTab(this),
            setting: new SettingTab(this)
        };
        
        this.init();
    }

    init() {
        this.addEventListeners();
        this.loadPage("home");
    }
    
    addEventListeners() {
        this.footer.addEventListener("click", e => {
            const btn = e.target.closest(".nav-btn");
            if (!btn) return;
            const tab = btn.dataset.tab;
            if (!tab) return;
            this.switchTab(tab, btn);
        });
    }

    switchTab(name, btn) {
        document
            .querySelectorAll(".nav-btn")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.loadPage(name);
    }

    async loadPage(name) {
        try {
            this.animatehide();
            const res = await fetch(`html/${name}.html`);
            const html = await res.text();
            this.main.innerHTML = html;
            this.animateshow();
            this.tabs[name]?.init();
        } catch (err) {
            console.error(err);
            this.main.innerHTML = `<div class="content-box">Lỗi tải trang</div>`;
        }
    }

    animatehide() {
        this.main.style.opacity = "0";
        this.main.style.transform = "translateY(20px)";
    }
    
    animateshow() {
        this.main.style.transition = "0.3s";
        this.main.style.opacity = "1";
        this.main.style.transform = "translateY(0)";
    }
}

class HomeTab {
    constructor(app) {
        this.app = app;
    }

    init() {
        // ví dụ nếu có button trong home.html
        console.log("Home tab loaded");
    }
}

class SearchTab {
    constructor(app) {
        this.app = app;
    }

    init() {
        console.log("Search tab loaded");
    }
}

class LogTab {
    constructor(app) {
        this.app = app;
        this.buffer = [];
    }

    add(text) {
        this.buffer.push(text);
        this.render();
    }

    render() {
        const logContainer = document.querySelector(".log-container");
        if (!logContainer) return;

        logContainer.innerHTML = "";

        this.buffer.forEach(msg => {
            const box = document.createElement("div");
            box.className = "content-box";
            box.textContent = msg;
            logContainer.appendChild(box);
        });
    }

    init() {
        this.render();
    }
}

class SettingTab {
    constructor(app) {
        this.app = app;
    }

    init() {
        const reloadBtn = document.getElementById("reloadBtn");
        const createAccBtn = document.getElementById("createAccBtn");
        const btnRegister = document.getElementById("btnRegister");

        if (!reloadBtn) return;   // HTML chưa load → tránh lỗi

        reloadBtn.onclick = () => location.reload();

        createAccBtn.onclick = () => {
            document.getElementById("createAccInputs").classList.toggle("hidden");
            document.getElementById("bgbuttonbox").classList.toggle("active");
        };

        btnRegister.onclick = async () => {
            const username = regUsername.value;
            const password = regPassword.value;
            const repass = regRepassword.value;
            const msg = regmessage;

            if (!username || !password || !repass) {
                msg.textContent = "❌ Chưa nhập thông tin";
                return;
            }

            if (password !== repass) {
                msg.textContent = "❌ Mật khẩu không đúng";
                return;
            }

            const res = await fetch("./register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            msg.style.color = data.gasJson.ok ? "green" : "red";
            msg.textContent = data.gasJson.message;
        };
    }
}
