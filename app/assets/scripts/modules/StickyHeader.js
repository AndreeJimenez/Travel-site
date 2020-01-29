import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScroll = window.scrollY;
        this.events();
    }

    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    runOnScroll() {
        this.determineScrollDirection();

        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");
        }

        this.pageSections.forEach(element => this.calcSection(element));
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScroll) {
            this.scrollDirection = 'down';
        } else {
            this.scrollDirection = 'up';
        }
        this.previousScroll = window.scrollY;
    }

    calcSection(element) {
        if (window.scrollY + this.browserHeight > element.offsetTop && window.scrollY < element.offsetTop + element.offsetHeight) {
            let scrollPercent = (element.getBoundingClientRect().top / this.browserHeight) * 100;
            if ((scrollPercent > 20 && this.scrollDirection == 'down') || (scrollPercent < 33 && this.scrollDirection == 'up')) {
                let matchingLink = element.getAttribute("data-matching-link");
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(element => element.classList.remove("is-current-link"));
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
            else {
                if (window.scrollY < 500 && this.scrollDirection == 'up') {
                     document.querySelector(`.primary-nav a:first-child`).classList.remove("is-current-link")
                 }
             }
        }
    }
}


export default StickyHeader;