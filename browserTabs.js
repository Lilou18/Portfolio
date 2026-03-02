class BrowserTabs{
    constructor(){
        this.tabsRow = document.getElementById("tabsRow");
        this.tabLink = document.getElementById("tabLink");
        this.menuBtn = document.getElementById("menuBtn");
        this.dropdown = document.getElementById("tabsDropdown");

        document.addEventListener("DOMContentLoaded", () => {this.init();});
    }

    init(){
        this.menuBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        })

        document.addEventListener("click", (e) => {
            if(!this.dropdown.contains(e.target) || !this.menuBtn.contains(e.target)){
                this.closeDropdown();
            }
        });
    }

    openDropdown(){

    }

    closeDropdown(){
        this.dropdown.classList.add("hidden");
    }

    toggleDropdown(){
        this.dropdown?.classList.toggle("hidden");
    }
}

const browserTabs = new BrowserTabs();