import { createDomElement, applyListener } from '../utils'

export class Tooltip {

    constructor(args) {
        let settings = {...Tooltip.#defaults};
        if (typeof args === 'string') {
            this.element = document.querySelector(args);
        } else {
            settings = {...settings, ...args};
            settings.element = settings.element instanceof Element ? settings.element : document.querySelector(settings.element);
        }
        Object.assign(this, settings);
        if (this.isAttached) {
            this.element.classList.add('attached');
        }
        if (settings.attachedTo === 'body') {
            this.element.classList.add('fixed');
        } 
        
        if (typeof settings.attachedTo === 'string') {
            this.attachedTo = document.querySelector(settings.attachedTo);
        } else {
            this.attachedTo = settings.attachedTo;
        }

        this.element.classList.add(...['tooltip', ...this.position.split(' ')]);
        this.element.classList.remove('visible');
        this.element.style.transitionDuration = this.transition.duration  + 'ms';
        this.element.style.transitionDelay = this.transition.delay + 'ms';
        applyListener(this.element);
        this.element.remove();
        this.onHide = settings.onHide;

        if (this.isCloseable) {
            this.#createCloseIcon();
        }

        if (!Tooltip.#isInitiated) {
            Tooltip.#setBodyListener();
        }

        Tooltip.#instances.push(this);
    }

    static #defaults = {
        isVisible: false,
        isCloseable: false,
        attachedTo: 'body',
        isAttached: false,
        onHide: null,
        transition: {
            duration: 300,
            delay: 100
        },
        position: 'bottom-left'
    }

    static #instances = [];
    static #isInitiated = false;

    static #closeAll() {
        for (const el of Tooltip.#instances) {
            if (!el.isCloseable) {
                el.hide();
            }
        }
    }

    static #setBodyListener() {
        applyListener(document.querySelector('body'), () => { Tooltip.#closeAll(); });
        Tooltip.#isInitiated = true;
    }

    #createCloseIcon() {
        const closeIcon = createDomElement('i', 'close link icon', () => { this.hide(); });
        this.element.classList.add('closeable');
        this.element.prepend(closeIcon);
    }

    show() {
        if (this.isVisible) return;
        if (!this.isCloseable) {
            Tooltip.#closeAll();
        }
        this.attachedTo.append(this.element);
        if (!this.transition.duration) {
            this.element.style.opacity = 1;
            this.element.classList.add('visible');
        } else {
            this.element.style.opacity = 0;
            this.element.classList.add('visible');
            setTimeout(() => {
                this.element.style.opacity = 1;
            }, this.transition.delay);
        }
        this.isVisible = true;
    }

    hide() {
        if (!this.isVisible) return;
        if (!this.transition.duration) {
            this.element.classList.remove('visible');
            this.element.remove();
        } else {
            this.element.style.opacity = 0;
            setTimeout(() => {
                this.element.classList.remove('visible');
                this.element.remove();
            }, this.transition.delay + this.transition.duration);
        }
        this.isVisible = false;
        this.onHide && this.onHide();
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
}