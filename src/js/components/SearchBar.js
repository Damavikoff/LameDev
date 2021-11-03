import { createFromTemplate, applyListener, createDomElement } from "../utils";
import { Tooltip } from "./Tooltip";
import { SEARCH_BAR_TEMPLATE, SEARCH_BAR_TAG_FIELD, SEARCH_BAR_DROPDOWN } from '../templates'

export class SearchBar {
    constructor(args) {
        if (SearchBar.#instance) return SearchBar.#instance;

        Object.assign(this, {...SearchBar.#defaults, ...args});
        if (typeof this.attachedTo === 'string') {
            this.attachedTo = document.querySelector(this.attachedTo);
        }
        this.#getStorageData();
        this.element = createFromTemplate(SEARCH_BAR_TEMPLATE);
        this.tagField = new Tooltip({
            attachedTo: this.element.querySelector('label'),
            element: createFromTemplate(SEARCH_BAR_TAG_FIELD),
            position: 'bottom-left',
            isAttached: true
        });
        this.#setTags();
        this.filterDropdown = new Tooltip({
            attachedTo: this.element.querySelector('.filter'),
            element: createFromTemplate(SEARCH_BAR_DROPDOWN),
            position: 'bottom-left',
            isAttached: true
        });

        this.setDefaults();

        SearchBar.#instance = this;

        this.#setListeners();
        this.#render();
    }

    static #instance = null;

    static #defaults = {
        target: null,
        searchValue: '',
        filterType: 0,
        tagList: [],
        isSet: false,
        onFilter: null,
        onSearch: null
    }

    #getStorageData() {
        let storage = localStorage.getItem('pinterestProfile');
        if (!storage) return;
        storage = JSON.parse(storage);
        this.searchValue = storage.searchBar.searchValue ?? '';
        this.filterType = storage.searchBar.filterType ?? 0;
        this.tagList = storage.searchBar.tagList ?? [];
    }

    #setStorageData() {
        let storage = localStorage.getItem('pinterestProfile');
        if (!storage) return;
        storage = JSON.parse(storage);
        storage.searchBar.searchValue = this.searchValue;
        storage.searchBar.filterType = this.filterType;
        storage.searchBar.tagList = this.tagList;
        localStorage.setItem('pinterestProfile', JSON.stringify(storage));
    }

    #setTags() {
        const list = this.tagField.element.querySelector('.tag-list');
        list.innerHTML = '';
        this.tagList.forEach(el => {
            const tag = createDomElement('div', 'tag-label', () => {
                this.#setSearch(el);
            });
            tag.textContent = el;
            list.append(tag);
        });
    }
    
    #setSearch(value) {
        this.searchValue = value;
        this.element.querySelector('label > input').value = value;
        this.tagField.hide();
        this.#toggleActive();
        this.#setStorageData();
        this.onSearch(this.searchValue);
    }

    setDefaults() {
        this.element.querySelector('label > input').value = this.searchValue;
        const filterTypes = [
            {name: 'Все пины', value: 0},
            {name: 'Люди', value: 1},
            {name: 'Видео', value: 2},
            {name: 'Картинки', value: 3}
        ];
        const filterText = filterTypes.find(el => el.value === this.filterType).name;
        this.element.querySelector('.filter > .dropdown > .text').textContent = filterText;
        this.#toggleActive();
    }

    #setListeners() {
        applyListener(this.element.querySelector('label'), () => {
            if (this.#hasTags && !this.#hasValue) {
                this.tagField.show();
            }
        });

        applyListener(this.element.querySelector('.filter > .dropdown'), () => {
            this.filterDropdown.toggle();
        });

        applyListener(this.element.querySelector('label > input'), () => {
            this.#toggleActive();
            this.onSearch(this.searchValue);
            this.#setTagLabel(this.searchValue);
            this.#setStorageData();
        }, 'change');

        applyListener(this.element.querySelector('label > input'), () => {
            this.searchValue = this.element.querySelector('label > input').value;
            if (this.#hasValue) {
                this.tagField.hide();
            } else {
                this.tagField.show();
            }
        }, 'keyup');

        applyListener(this.element.querySelector('label > i.close'), () => {
            this.element.querySelector('label > input').value = '';
            this.searchValue = '';
            this.#toggleActive();
            this.onSearch(this.searchValue);
            this.#setStorageData();
        });

        this.filterDropdown.element.querySelectorAll('.item').forEach(el => {
            applyListener(el, () => {
                this.#setFilterItem(el.getAttribute('data-type'), el.textContent);
                this.filterDropdown.hide();
            });
        });

        applyListener(this.tagField.element.querySelector('i.close'), () => {
            this.#clearTags();
        });
    }

    #clearTags() {
        this.tagList = [];
        this.#setTags();
        this.tagField.hide();
        this.#setStorageData();
    }

    #setTagLabel(value) {
        if (!value.trim().length) return;
        const hasValue = this.tagList.some(el => el === this.searchValue);
        if (hasValue) return;
        if (this.tagList.length > 6) {
            this.tagList.pop();
        }
        this.tagList.unshift(value);
        this.#setTags();
        this.#setStorageData();
    }

    #toggleActive() {
        if (this.#hasValue) {
            this.element.classList.add('active');
        } else {
            this.element.classList.remove('active');
        }
    }

    #setFilterItem(data, text) {
        this.filterType = Number(data);
        this.element.querySelector('.filter > .dropdown > .text').textContent = text;
        this.onFilter(data);
        this.#setStorageData();
    }

    #render() {
        this.attachedTo.append(this.element);
    }

    get #hasTags() {
        return this.tagList.length ? true: false;
    }

    get #hasValue() {
        return this.searchValue.length ? true : false;
    }
}