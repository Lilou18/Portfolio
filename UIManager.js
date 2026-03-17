class UIManager {
    constructor() {
        this.menuBtn = document.getElementById("menuBtn");
        this.dropdown = document.getElementById("tabsDropdown");

        document.addEventListener("DOMContentLoaded", () => { this.init(); });
    }

    init() {
        this.menuBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        })

        document.addEventListener("click", (e) => {
            if (!this.dropdown.contains(e.target) || !this.menuBtn.contains(e.target)) {
                this.closeDropdown();
            }
        });

        document.querySelectorAll('[data-copy]').forEach(item => {
            item.addEventListener("click", () => {
                navigator.clipboard.writeText(item.dataset.copy);
                const tooltip = item.querySelector('.copy-tooltip');
                if (tooltip != null) {
                    tooltip.textContent = 'Copié!';
                    setTimeout(() => {
                        tooltip.innerHTML = 'Copier <i class="fa-solid fa-copy copy-icon"></i>';
                    }, 2000);
                }
            });
        });

        this.initScrollAnimation();
    }

    initScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= 0.2) {
                    entry.target.classList.add("in-view");
                    entry.target.classList.remove("out-of-view");
                } else if (entry.intersectionRatio === 0) {
                    entry.target.classList.remove("in-view");
                    entry.target.classList.add("out-of-view");
                }
            });
        }, { threshold: [0, 0.2] });

        const infoPanels = document.querySelectorAll(".info-panel");
        infoPanels.forEach((element) => {
            observer.observe(element);
        });

        document.querySelectorAll('.icon-grid').forEach((grid) => {
            grid.querySelectorAll('.icon-grid-item').forEach((item, index) => {
                item.style.setProperty('--delay', `${(index + 1) * 90}ms`);
                observer.observe(item);
            });
        });

        document.querySelectorAll('.contact-grid').forEach((grid) => {
            grid.querySelectorAll('.contact-item').forEach((item, index) => {
                item.style.setProperty('--delay', `${(index + 1) * 150}ms`);
                observer.observe(item);
            });
        });

        document.querySelectorAll('.project').forEach((project, index) => {
            project.style.setProperty('--delay', `150ms`);
            observer.observe(project);
        });

    }

    closeDropdown() {
        this.dropdown.classList.add("hidden");
    }

    toggleDropdown() {
        this.dropdown?.classList.toggle("hidden");
    }
}

const uiManager = new UIManager();