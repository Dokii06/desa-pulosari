fetch("partials/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;

        // Tunggu sampai header sudah di-render
        const header = document.getElementById("site-header");
        let lastScroll = window.pageYOffset || document.documentElement.scrollTop;

        setTimeout(() => {
            window.addEventListener("scroll", () => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                // Scroll ke bawah
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.add("hide-header");
                }
                // Scroll ke atas
                else if (currentScroll < lastScroll) {
                    header.classList.remove("hide-header");
                }

                lastScroll = currentScroll;
            });
        }, 100); // Sedikit delay agar header dipastikan ada
        

        // Highlight nav aktif
        const currentPath = window.location.pathname.split("/").pop();
        document.querySelectorAll(".nav-link").forEach(link => {
            const href = link.getAttribute("href");
            if (href === currentPath || (href === "index.html" && currentPath === "")) {
                link.classList.add("active-link");
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
