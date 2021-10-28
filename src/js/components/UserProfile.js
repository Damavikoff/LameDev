import { USER_PROFILE_CARD } from '../templates'
import { applyListener, createFromTemplate } from '../utils';
import { Tooltip } from './Tooltip';

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
        this.element = new Tooltip({
            isCloseable: false,
            attachedTo: trigger ?? 'body',
            isAttached: true,
            element: card,
            position: 'bottom-right'
        });
        if (trigger) {
            applyListener(document.querySelector(trigger), () => { this.toggle(); } );
        }
        UserProfile.#activeUser = this;
    }

    toggle() {
        this.element.toggle();
    }

    static #activeUser = null;

    static getInstance(user, trigger) {
        return new UserProfile(user, trigger);
    }
}