import { createFromTemplate } from "../utils";
import { PIN_LIST_TEMPLATE } from "../templates";

export class PinList {
    constructor({list, attachedTo}) {
        this.isRendered = false;
        this.list = list;
        this.attachedTo = attachedTo;
        this.element = createFromTemplate(PIN_LIST_TEMPLATE);
        list.forEach(el => {
            el.target = this.element.querySelector('.content');
        });
        this.renderItems();
    }

    toggle() {
        this.isRendered = !this.isRendered;
        if (!this.isRendered) {
            this.element.remove();
        } else {
            document.querySelector(this.attachedTo).append(this.element);
        }
    }

    renderItems() {
        this.element.querySelector('.content').innerHTML = '';
        this.list.forEach(el => {
            el.show();
        });
        // let chain = Promise.resolve();
        // this.list.forEach(el => {
        //     chain = chain.then(function() {
        //         el.element.style.opacity = 0;
        //         el.show();
        //     }).then(() => {
        //         return new Promise(resolve => {
        //             setTimeout(() => {el.element.style.opacity = 1;}, 10);
        //             setTimeout(resolve, 120);
        //         })
        //     });
        // });
    }
}