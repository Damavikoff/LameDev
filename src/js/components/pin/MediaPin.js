import { createFromTemplate, applyListener, switchClass } from '../../utils'
import { PIN_MEDIA_TEMPLATE, PIN_POPUP_TEMPLATE } from '../../templates'
import { Tooltip } from '../Tooltip';
import { Pin } from './Pin';
import { STATIC_IMG_USERS, STATIC_IMG_PINS, STATIC_VID_PINS } from '../../globals'
import { UserProfile } from '../UserProfile'

class MediaPin extends Pin {
    constructor({id, media, url, user, target, tags}) {
        super({id, media, url, user, target});
        Object.assign(this.initial, {tags});
        this.tags = tags;
        this.mediaLink = null;
        this.element = createFromTemplate(PIN_MEDIA_TEMPLATE);
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
                this.#setInactive();
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

        applyListener(this.popup.element.querySelector('.item.download'), () => {
            const a = document.createElement('a');
            a.href = this.mediaLink;
            a.download = true;
            a.click();
            a.remove();
            this.#setInactive();
        });

        applyListener(this.popup.element.querySelector('.item.add'), () => {
            UserProfile.savePin(this);
        });

        applyListener(this.element.querySelector('.control.top > .button'), () => {
            UserProfile.savePin(this);
        });
    }

    #setInactive() {
        this.isActive = false;
        this.element.classList.remove('active');
    }
}

export class ImagePin extends MediaPin {
    constructor({id, media, url, user, target}) {
        super({id, media, url, user, target});
        this.mediaLink = STATIC_IMG_PINS + media;
        this.element.querySelector('.image > img').src = this.mediaLink;
        this.element.querySelector('.image > video').remove();
    }
    clone() {
        return new ImagePin(this.initial);
    }
}

export class VideoPin extends MediaPin {
    constructor({id, media, url, user, target}) {
        super({id, media, url, user, target});
        this.mediaLink = STATIC_VID_PINS + media;
        this.element.querySelector('.image > video').src = this.mediaLink;
        this.element.querySelector('.image > img').remove();
    }
    clone() {
        return new VideoPin(this.initial);
    }
}