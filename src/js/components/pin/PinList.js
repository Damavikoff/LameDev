import { createFromTemplate } from '../../utils'
import { PIN_LIST_TEMPLATE } from '../../templates'

export class PinList {
    constructor({list, attachedTo}) {
        this.isRendered = false;
        this.attachedTo = attachedTo instanceof Element ? attachedTo : document.querySelector(attachedTo);
        this.element = createFromTemplate(PIN_LIST_TEMPLATE);
        this.setList(list);
        this.renderItems();
    }

    toggle() {
        this.isRendered = !this.isRendered;
        if (!this.isRendered) {
            this.element.remove();
        } else {
            this.attachedTo.append(this.element);
        }
    }

    renderItems() {
        this.element.querySelector('.content').innerHTML = '';
        this.list.forEach(el => {
            el.render();
        });
        // this.list.reduce((acc, el) => {
        //     return acc.then(() => promiseDelay(el.show(), 1000));
        // }, Promise.resolve());
    }

    setList(list) {
        this.list = list;
        list.forEach(el => {
            el.target = this.element.querySelector('.content');
        });
    }
}