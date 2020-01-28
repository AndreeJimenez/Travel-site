import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(elements, threshold) {
        this.threshold = threshold;
        this.itemsToReveal = elements;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            console.log("Resize just ran");
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        console.log("function called");
        this.itemsToReveal.forEach(element => {
            if (element.isRevealed == false) {
                this.calculateIfScrolledTo(element);
            }
        })
    }

    calculateIfScrolledTo(element) {
        if (window.scrollY + this.browserHeight > element.offsetTop) {
            console.log("element was calculated");
            let scrollPercent = (element.getBoundingClientRect().top / this.browserHeight) * 100;
            if (scrollPercent < this.threshold) {
                element.classList.add("reveal-item--is-visible");
                element.isRevealed = true;

                if (element.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(element => {
            element.classList.add('reveal-item');
            element.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}


export default RevealOnScroll;