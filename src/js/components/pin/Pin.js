export class Pin {
    constructor({id, media, url, user, target}) {
        this.initial = {id, media, url, user, target};
        this.isActive = false;
        this.isVisible = false;
        this.id = id;
        this.media = media;
        this.url = url;
        this.user = {
            avatar: user.image,
            name: user.name,
            subscribers: user.subscribers
        }

        this.target = document.querySelector(target);
    }

    toggle() {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.target.append(this.element);
        } else {
            this.element.remove();
        }
    }

    render() {
        this.isVisible = true;
        this.target.append(this.element);
    }
}
