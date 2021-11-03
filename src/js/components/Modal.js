import { createFromTemplate } from '../utils'
import { MODAL } from '../templates'
import { applyListener } from '../utils';

export class Modal {
    constructor(selector) {
        this.isVisisble = false;
        this.transition = 200;

        const modal = createFromTemplate(MODAL);
        let target = selector instanceof Element ? selector : document.querySelector(selector);
        modal.querySelector('.container').append(target);
        modal.style.transitionDuration = this.transition + 'ms';
        //applyListener(modal);
        applyListener(modal.querySelector('.container > i.close'), () => { this.hide(); });

        this.element = modal;
        this.element.remove();
    }

    show() {
        if (this.isVisisble) return;
        this.element.classList.remove('visible');
        document.querySelector('body').append(this.element);
        setTimeout(() => {
            this.element.classList.add('visible');
        }, 50);

        this.isVisisble = true;
    }

    hide() {
        if (!this.isVisisble) return;
        this.element.classList.remove('visible');
        setTimeout(() => {
            this.element.remove();
        }, this.transition);

        this.isVisisble = false;
    }
}