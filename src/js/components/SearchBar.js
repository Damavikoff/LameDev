import { createFromTemplate, applyListener } from "../utils";
import { Tooltip } from "./Tooltip";
import { SEARCH_BAR_TEMPLATE, SEARCH_BAR_TAG_FIELD, SEARCH_BAR_DROPDOWN } from '../templates'

export class SearchBar {
    constructor(args) {
        if (SearchBar.#instance) return SearchBar.#instance;

        Object.assign(this, {...SearchBar.#defaults, ...args});
        if (typeof this.attachedTo === 'string') {
            this.attachedTo = document.querySelector(this.attachedTo);
        }
        this.element = createFromTemplate(SEARCH_BAR_TEMPLATE);
        this.tagField = new Tooltip({
            attachedTo: this.element.querySelector('label'),
            element: createFromTemplate(SEARCH_BAR_TAG_FIELD),
            position: 'bottom-left',
            isAttached: true
        });
        this.filterDropdown = new Tooltip({
            attachedTo: this.element.querySelector('.filter'),
            element: createFromTemplate(SEARCH_BAR_DROPDOWN),
            position: 'bottom-left',
            isAttached: true
        });

        SearchBar.#instance = this;

        this.#setListeners();
        this.#render();
    }

    static #instance = null;

    static #defaults = {
        target: null,
        searchValue: null,
        filterTypes: 'all',
        tagList: ['coffee', 'nature', 'light'],
        isSet: false,
        onFilter: null,
        onSearch: null
    }

    #setListeners() {
        applyListener(this.element.querySelector('label'), () => {
            if (this.#hasTags) {
                this.tagField.show();
            }
        });
        applyListener(this.element.querySelector('.filter > .dropdown'), () => {
            this.filterDropdown.toggle();
        });
    }

    #render() {
        this.attachedTo.append(this.element);
    }

    get #hasTags() {
        return this.tagList.length ? true: false;
    }
}