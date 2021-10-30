import { createDomElement, createFromTemplate, roundByScale } from '../../utils'
import { PIN_USER_TEMPLATE } from '../../templates'
import { STATIC_IMG_USERS, STATIC_IMG_PINS } from '../../globals'
import { Pin } from './Pin';

export class UserPin extends Pin {
    constructor({id, url, user, target, collage}) {
        super({id, url, user, target});
        this.collage = collage;

        this.element = createFromTemplate(PIN_USER_TEMPLATE);
        this.element.querySelector('.avatar > img').src = STATIC_IMG_USERS + user.image;
        this.element.querySelector('.user').textContent = user.name;
        this.element.querySelector('.subscribers').textContent = this.#subscribers;
        this.collage.slice(0, 2).forEach((el, index) => {
            const container = this.element.querySelector('.collage').children[index];
            const innerImage = createDomElement('img', 'covered');
            innerImage.src = STATIC_IMG_PINS + el;
            container.append(innerImage);
        })
    }

    get #subscribers() {
        let affix = '';
        let divider = 1;
        if (this.user.subscribers > 1000000) {
            divider = 1000000;
            affix = 'млн. ';
        } else if (this.user.subscribers > 1000) {
            divider = 1000;
            affix = 'тыс. ';
        }
        return `${roundByScale(this.user.subscribers / divider, 2)} ${affix}подписчиков`;
    }
}