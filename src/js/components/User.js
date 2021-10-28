export class User {
    constructor(settings) {
        Object.assign(this, {...User.#defaults}, {...settings});
    }

    static #defaults = {
        name: null,
        email: null,
        image: null,
        bio: null,
        registered: new Date()
    }
}