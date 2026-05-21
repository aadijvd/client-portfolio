// =========================================================
// DOM READY
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // INITIALIZE AOS
    // =====================================================

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });


    // =====================================================
    // PRELOADER
    // =====================================================

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {

        preloader.style.opacity = "0";

        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);

    });


    // =====================================================
    // STICKY HEADER
    // =====================================================

    const header = document.querySelector(".main-header");

    const handleHeader = () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    handleHeader();

    window.addEventListener("scroll", handleHeader);


    // =====================================================
    // SCROLL PROGRESS BAR
    // =====================================================

    const progressBar = document.querySelector(".scroll-progress");

    const updateProgressBar = () => {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const scrollPercent = (scrollTop / documentHeight) * 100;

        progressBar.style.width = `${scrollPercent}%`;

    };

    window.addEventListener("scroll", updateProgressBar);


    // =====================================================
    // ACTIVE NAVIGATION LINK
    // =====================================================

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const activateNavLink = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener("scroll", activateNavLink);


    // =====================================================
    // COUNTER ANIMATION
    // =====================================================

    const counters = document.querySelectorAll(".counter");

    let counterStarted = false;

    const startCounters = () => {

        const statsSection = document.querySelector(".stats-section");

        if (!statsSection) return;

        const sectionTop = statsSection.offsetTop - 400;

        if (window.scrollY > sectionTop && !counterStarted) {

            counterStarted = true;

            counters.forEach(counter => {

                const target = +counter.dataset.target;
                let current = 0;

                const increment = target / 100;

                const updateCounter = () => {

                    current += increment;

                    if (current < target) {

                        counter.innerText = Math.ceil(current);

                        requestAnimationFrame(updateCounter);

                    } else {

                        if (target === 50) {
                            counter.innerText = `${target}+`;
                        } else if (target === 100) {
                            counter.innerText = `${target}+`;
                        } else {
                            counter.innerText = `${target}+`;
                        }

                    }

                };

                updateCounter();

            });

        }

    };

    window.addEventListener("scroll", startCounters);


    // =====================================================
    // SMOOTH SCROLL FOR BUTTONS
    // =====================================================

    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {

                e.preventDefault();

                const targetSection = document.querySelector(targetId);

                if (targetSection) {

                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    // =====================================================
    // CLOSE MOBILE MENU AFTER CLICK
    // =====================================================

    const navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navbarCollapse.classList.contains("show")) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbarCollapse);

                bsCollapse.hide();

            }

        });

    });


    // =====================================================
    // FLOATING WHATSAPP BUTTON
    // =====================================================

    const whatsappButton = document.querySelector(".floating-whatsapp");

    whatsappButton.addEventListener("click", (e) => {

        e.preventDefault();

        window.open(
            "https://wa.me/923001234567",
            "_blank"
        );

    });



    // =====================================================
    // CONTACT FORM → WHATSAPP (STATIC USE)
    // =====================================================

    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const subject = contactForm.subject.value;
        const message = contactForm.message.value;

        const text =
            `New Consultation Request:
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}`;

        const whatsappURL = `https://wa.me/923001234567?text=${encodeURIComponent(text)}`;

        window.open(whatsappURL, "_blank");
    });


    // =====================================================
    // TOAST FUNCTION
    // =====================================================

    function showToast(message, type = "success") {

        const toastText = toast.querySelector("span");

        const toastIcon = toast.querySelector("i");

        toastText.innerText = message;


        // =============================================
        // SUCCESS STYLE
        // =============================================

        if (type === "success") {

            toast.style.background = "#0F172A";

            toastIcon.className = "fa-solid fa-circle-check";

            toastIcon.style.color = "#22C55E";

        }

        // =============================================
        // ERROR STYLE
        // =============================================

        else {

            toast.style.background = "#DC2626";

            toastIcon.className = "fa-solid fa-circle-xmark";

            toastIcon.style.color = "#ffffff";

        }


        // =============================================
        // SHOW TOAST
        // =============================================

        toast.classList.add("show");


        // =============================================
        // HIDE TOAST
        // =============================================

        setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);

    }


    // =====================================================
    // HERO PARALLAX EFFECT
    // =====================================================

    const heroShapes = document.querySelectorAll(".hero-shape");

    window.addEventListener("mousemove", (e) => {

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        heroShapes.forEach((shape, index) => {

            const speed = (index + 1) * 20;

            shape.style.transform =
                `translate(${x * speed}px, ${y * speed}px)`;

        });

    });


    // =====================================================
    // SERVICE CARD HOVER GLOW
    // =====================================================

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);

        });

    });


    // =====================================================
    // REVEAL ELEMENTS ON SCROLL
    // =====================================================

    const revealElements = document.querySelectorAll(
        ".service-card, .timeline-item, .highlight-box"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

            }

        });

    }, {
        threshold: 0.2
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // =====================================================
    // DYNAMIC CURRENT YEAR
    // =====================================================

    const footerText = document.querySelector(".footer-bottom p");

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} Powered by Adix. All Rights Reserved.`;


    // =====================================================
    // DISABLE EMPTY LINKS
    // =====================================================

    const emptyLinks = document.querySelectorAll('a[href="#"]');

    emptyLinks.forEach(link => {

        link.addEventListener("click", (e) => {
            e.preventDefault();
        });

    });

});