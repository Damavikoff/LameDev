import { SAVED_PINS, USER_PROFILE_CARD } from '../templates'
import { applyListener, createFromTemplate } from '../utils';
import { Tooltip } from './Tooltip';
import { PinList } from './pin/PinList';
import { Modal } from './Modal';

const STATIC_PATH = 'assets/img/users/';

export class UserProfile {
    constructor (user, trigger) {
        if (UserProfile.#activeUser) return UserProfile.#activeUser;
        
        const card = createFromTemplate(USER_PROFILE_CARD);
        card.querySelector('.username').textContent = user.name;
        card.querySelector('.bio').textContent = user.bio;
        card.querySelector('.email > .text').textContent = user.email;
        card.querySelector('.image > img').src = STATIC_PATH + user.image;
        
        this.user = user;
        this.savedPins = [];
        this.card = new Tooltip({
            isCloseable: false,
            attachedTo: trigger ?? 'body',
            isAttached: true,
            element: card,
            position: 'bottom-right'
        });
        this.pinsModal = new Modal(createFromTemplate(SAVED_PINS));
        this.pinList = new PinList({
            list: this.savedPins,
            attachedTo: this.pinsModal.element.querySelector('.segment > .list')
        });
        this.pinList.toggle();

        if (trigger) {
            applyListener(document.querySelector(trigger), () => { this.toggle(); } );
        }

        applyListener(this.card.element.querySelector('.menu .my-pins.item'), () => {
            if (!this.savedPins.length) return; 
            this.pinList.setList(this.savedPins);
            this.pinList.renderItems();
            this.pinsModal.show();
            this.card.hide();
        });

        UserProfile.#activeUser = this;
        UserProfile.#setStorage();
    }

    toggle() {
        this.card.toggle();
    }

    static #activeUser = null;

    static getInstance(user, trigger) {
        return new UserProfile(user, trigger);
    }

    static #setStorage() {
        if (localStorage.getItem('pinterestProfile')) {
            return;
        }
        const settings = {
            searchValue: '',
            filter: 0,
        };
        localStorage.setItem('pinterestProfile', settings);
    }

    static savePin(pin) {
        if (!UserProfile.#activeUser) return;
        const check = UserProfile.#activeUser.savedPins.some(el => {
            return el.id === pin.id;
        });
        if (check) {
            return;
        }
        if (UserProfile.#activeUser.savedPins.length > 4) {
            UserProfile.#activeUser.savedPins.pop();
        }
        UserProfile.#activeUser.savedPins.unshift(pin.clone());
    }
}