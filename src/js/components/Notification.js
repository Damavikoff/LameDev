import { createFromTemplate, applyListener, formatDate } from '../utils'
import { USER_NOTIFICATION, NEWS_NOTIFICATION, NOTIFICATION_CONTAINER } from '../templates';
import { Tooltip } from './Tooltip'

const STATIC_PATH = 'assets/img/users/';

class Notification {
    constructor(settings) {
        Object.assign(this, Notification.#defaults, settings);
    }

    static #defaults = {
        date: new Date(),
        seen: false,
        element: null,
        onRemove: null
    }

    render(target) {
        target.append(this.element);
        setTimeout(() => { this.element.classList.add('visible') }, 50);
    }

    setSeen() {
        this.seen = true;
    }

    remove() {
        this.element.remove();
        this.onRemove && this.onRemove();
    }

    init() {
        this.element.querySelector('.date > .text').textContent = formatDate(this.date);
        this.element.style.transitionDuration = this.transition + 'ms';
        applyListener(this.element);
        applyListener(this.element.querySelector('i.close'), () => { this.remove(); });
    }
}

export class UserNotification extends Notification {
    constructor({...settings}) {
        super(settings);
        this.element = createFromTemplate(USER_NOTIFICATION);
        this.element.querySelector('img').src = STATIC_PATH + this.user.image;
        this.element.querySelector('.header').textContent = this.user.name;
        this.element.querySelector('.description').textContent = this.message;
        this.init();
    }
}

export class NewsNotification extends Notification {
    constructor({...settings}) {
        super(settings);
        this.element = createFromTemplate(NEWS_NOTIFICATION);
        this.element.querySelector('.header').textContent = this.message.title;
        this.element.querySelector('.description').innerHTML = this.message.description;
        this.init();
    }
}

export class NotificationList {

    constructor({notifications, trigger, target}) {
        this.notifications = notifications ?? [];
        this.trigger = document.querySelector(trigger);
        this.counter = this.trigger.querySelector('.counter') ?? false;
        this.container = new Tooltip({
            isCloseable: false,
            attachedTo: target ?? 'body',
            element: createFromTemplate(NOTIFICATION_CONTAINER),
            position: 'top-right',
            transition: {
                duration: 200,
                delay: 0
            }
        });
        if (this.trigger) {
            applyListener(this.trigger, () => { this.toggle(); });
            this.#setCounter();
        }
    }

    get notSeen() {
        return this.notifications.filter(el => !el.seen);
    }

    get isVisible() {
        return this.container.isVisible;
    }

    #setCounter() {
        if (!this.counter) return;
        const count = this.notSeen.length;
        this.counter.textContent = count;
        this.counter.classList[count ? 'remove' : 'add']('hidden');
    }

    remove(notification) {
        const index = this.notifications.indexOf(notification);
        this.notifications.splice(index, 1);
        this.#setCounter();
        if (!this.notifications.length) {
            this.collapse();
        }
    }

    push(notification) {
        notification.onRemove = () => {
            this.remove(notification);
        }
        this.notifications.push(notification);
        notification.render(this.container.element.querySelector('.scrolling'));
        this.#setCounter();
    }

    expand() {
        if (this.isVisible || !this.notSeen.length) return;
        this.container.show();
    }

    collapse() {
        if (!this.isVisible) return;
        this.container.hide();
    }

    toggle() {
        if (this.isVisible) {
            this.collapse();
        } else {
            this.expand();
        }
    }
}