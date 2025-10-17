document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const navLinks = document.querySelectorAll(".nav-link");
    const elementsToAnimate = document.querySelectorAll(
        ".animate-on-scroll, .animate-every-time"
    );

    const mainObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.target.classList.contains("animate-every-time")) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    } else {
                        entry.target.classList.remove("visible");
                    }
                    return;
                }

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    mainObserver.unobserve(entry.target);
                }

                if (
                    entry.target.hasAttribute("data-color") &&
                    entry.intersectionRatio > 0.4
                ) {
                    const color = entry.target.dataset.color;
                    const sectionId = entry.target.id;
                    header.style.backgroundColor = color
                        ? `${color}80`
                        : "transparent";
                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${sectionId}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        { threshold: [0.25, 0.4] }
    );

    document
        .querySelectorAll("section[data-color]")
        .forEach((section) => mainObserver.observe(section));
    elementsToAnimate.forEach((el) => mainObserver.observe(el));

    const accordionItems = document.querySelectorAll(".accordion-item");
    accordionItems.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");
        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            accordionItems.forEach((i) => {
                i.classList.remove("active");
                i.querySelector(".accordion-content").style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    const infiniteContainer = document.getElementById(
        "infinite-scroll-container"
    );
    let isLoading = false;
    let imageIndex = 0;
    const imageUrls = [
        "images/Gemini_Generated_Image_fgopc0fgopc0fgop.png",
        "images/Gemini_Generated_Image_i2uf6li2uf6li2uf.png",
        "images/Gemini_Generated_Image_jwa2cxjwa2cxjwa2.png",
        "images/Gemini_Generated_Image_mfjngpmfjngpmfjn.png",
        "images/Gemini_Generated_Image_p059x2p059x2p059.png",
        "images/ChatGPT Image Oct 17, 2025, 10_26_33 AM.png",
        "images/Gemini_Generated_Image_y5pkbsy5pkbsy5pk.png",
        "images/Gemini_Generated_Image_ponqegponqegponq.png",
        "images/Gemini_Generated_Image_hdh16vhdh16vhdh1.png",
        "images/Gemini_Generated_Image_qx3fkrqx3fkrqx3f.png",
        "images/Gemini_Generated_Image_s3xq28s3xq28s3xq.png",
        "images/Gemini_Generated_Image_ugzm22ugzm22ugzm.png",
        "images/ChatGPT Image Oct 17, 2025, 10_33_19 AM.png",
        "images/Gemini_Generated_Image_u24fovu24fovu24f.png",
        "images/Gemini_Generated_Image_uxxk8yuxxk8yuxxk.png",
        "images/Gemini_Generated_Image_yvzvg9yvzvg9yvzv.png",
        "images/ChatGPT Image Oct 16, 2025, 02_52_26 PM.png",
        "images/Gemini_Generated_Image_wlpqzzwlpqzzwlpq.png",
    ];
    function loadMoreImages() {
        if (isLoading) return;
        isLoading = true;
        for (let i = 0; i < 2; i++) {
            const wrapper = document.createElement("div");
            wrapper.className = "infinite-scroll-image-wrapper";
            const img = document.createElement("img");
            img.src = imageUrls[imageIndex % imageUrls.length];
            img.alt = "A cup of experimental coffee";
            wrapper.appendChild(img);
            infiniteContainer.appendChild(wrapper);
            mainObserver.observe(wrapper);
            imageIndex++;
        }
        isLoading = false;
    }
    loadMoreImages();
    window.addEventListener("scroll", () => {
        if (
            window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 500 &&
            !isLoading
        ) {
            loadMoreImages();
        }
    });

    document.querySelectorAll(".text-scroller").forEach((scroller) => {
        const content = scroller.innerHTML;
        for (let i = 0; i < 20; i++) {
            scroller.innerHTML += content;
        }
    });

    const navToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector(".nav-links");

    function closeNav() {
        navMenu.setAttribute("data-visible", "false");
        document.body.classList.remove("nav-open");
    }

    navToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = navMenu.getAttribute("data-visible") === "true";
        if (isVisible) {
            closeNav();
        } else {
            navMenu.setAttribute("data-visible", "true");
            document.body.classList.add("nav-open");
        }
    });

    navMenu.addEventListener("click", (e) => {
        if (e.target.matches(".nav-link")) {
            closeNav();
        }
    });

    document.addEventListener("click", (e) => {
        if (document.body.classList.contains("nav-open")) {
            if (!navMenu.contains(e.target) && e.target !== navToggle) {
                closeNav();
            }
        }
    });
});
