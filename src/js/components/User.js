export class User {
    constructor(settings) {
        Object.assign(this, {...User.#defaults}, {...settings});
    }

    static #defaults = {
        name: null,
        email: null,
        image: null,
        bio: null,
        subscribers: 0,
        registered: new Date()
    }
}