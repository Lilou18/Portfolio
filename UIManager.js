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
    }

    closeDropdown() {
        this.dropdown.classList.add("hidden");
    }

    toggleDropdown() {
        this.dropdown?.classList.toggle("hidden");
    }
}

const uiManager = new UIManager();