import { createFromTemplate, applyListener, switchClass } from '../utils'
import { PIN_TEMPLATE, PIN_POPUP_TEMPLATE } from '../templates'
import { Tooltip } from './Tooltip';
import { STATIC_IMG_USERS, STATIC_IMG_PINS } from '../globals'

export class Pin {
    constructor({id, image, url, user, target}) {
        this.isActive = false;
        this.isVisible = false;
        this.id = id;
        this.image = image;
        this.url = url;
        this.author = {
            avatar: user.image,
            name: user.name
        }

        this.target = document.querySelector(target);
        this.element = createFromTemplate(PIN_TEMPLATE);
        this.element.querySelector('.image > img').src = STATIC_IMG_PINS + image;
        this.element.querySelector('.author img').src = STATIC_IMG_USERS + user.image;
        this.element.querySelector('.author .name').textContent = user.name;
        
        applyListener(this.element, () => {
            this.element.classList.add('active');
        }, 'mouseenter');
        applyListener(this.element, () => {
            if (!this.isActive) {
                this.element.classList.remove('active');
            }
        }, 'mouseleave');

        if (url) {
            this.element.querySelector('.control.bottom .link.label .text').textContent = url;
        } else {
            this.element.querySelector('.control.bottom .link.label .text').remove();
        }

        this.popup = new Tooltip({
            isCloseable: false,
            attachedTo: this.element.querySelector('.control.bottom .menu.label') ?? 'body',
            element: createFromTemplate(PIN_POPUP_TEMPLATE),
            position: 'right-top',
            isAttached: true,
            transition: {
                duration: 200,
                delay: 0
            },
            onHide: () => {
                this.isActive = false;
                this.element.classList.remove('active');
            }
        });
        
        applyListener(this.popup.attachedTo, () => {
            this.isActive = !this.isActive; 
            this.popup.toggle();
            if (!this.isActive) {
                return;
            }

            if (window.innerWidth - this.popup.element.getBoundingClientRect().right > 0) {
                switchClass(this.popup.element, 'left-top', 'right-top');
            } else {
                switchClass(this.popup.element, 'right-top', 'left-top');
            }
        });
    }

    show() {
        if (this.isVisible) return;
        this.target.append(this.element);
    }

    hide() {
        if (!this.isVisible) return;
        this.element.remove();
    }
}