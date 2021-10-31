export function createFromTemplate(template, classes) {

    let element = document.createElement('template');
    element.innerHTML = template.trim();
    element = element.content.firstChild;

    if (classes) {
        element.classList.add(...classes.split(' '));
    }

    return element;
}

export function createDomElement(tag, classes, action) {
    const el = document.createElement(tag);
    el.classList.add(...classes.split(' '));
    action && applyListener(el, action);
    return el;
}

export function applyListener(el, callback, type = 'click', prevent = true, propagation = true) {
    el.addEventListener(type, (event) => {
        prevent && event.preventDefault();
        propagation && event.stopPropagation();
        callback && callback(event);
    });
}

export function switchClass(el, from, to) {
    if (from) {
        el.classList.remove(from);
    }
    if (to) {
        el.classList.add(to);
    }
}

export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}`;
}

export function promiseDelay(action, delay) {
    return Promise.all([
        action,
        new Promise(resolve => {
            setTimeout(resolve, delay);
        })
    ]);
}

export function roundByScale(number, scale = 0) {
    return Math.round(number * 10 ** scale) / 10 ** scale;
}