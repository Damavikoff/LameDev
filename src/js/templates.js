export const USER_NOTIFICATION = `<div class="user notification">
                                    <i class="close link icon"></i>
                                    <div class="image">
                                        <img class="avatar" alt="user_icon" />
                                    </div>
                                    <div class="content">
                                        <div class="header"></div>
                                        <div class="description"></div>
                                        <div class="date">
                                            <i class="calendar alterante icon"></i>
                                            <span class="text"></span>
                                        </div>
                                    </div>
                                  </div>`;

export const NEWS_NOTIFICATION = `<div class="news notification">
                                    <i class="close link icon"></i>
                                    <div class="content">
                                        <div class="header"></div>
                                        <div class="description"></div>
                                        <div class="date">
                                            <i class="calendar alterante icon"></i>
                                            <span class="text"></span>
                                        </div>
                                    </div>
                                    </div>`;

export const NOTIFICATION_CONTAINER = `<div class="notifications container">
                                            <div class="scrolling"></div>
                                      </div>`


export const MODAL = `<div class="modal">
                        <div class="container">
                            <i class="close link icon"></i>
                        </div>
                    </div>`

export const USER_PROFILE_CARD = `<div class="user-profile">
                                <div class="ratio">
                                    <i class="yellow star icon"></i>
                                    <i class="yellow star icon"></i>
                                    <i class="yellow star icon"></i>
                                </div>
                                <div class="image header">
                                    <div class="image">
                                        <img alt="user_icon" />
                                    </div>
                                    <div class="content">
                                        <span class="username"></span>
                                        <div class="sub divided header bio">
                                        </div>
                                        <div class="sub header email">
                                            <i class="blue envelope icon"></i>
                                            <span class="text"></span>
                                        </div>
                                    </div>
                                </div>
                                <dl class="vertical selectable menu">
                                    <dt class="item"><i class="cog icon"></i>Settings</dt>
                                    <dt class="my-pins item"><i class="pinterest icon"></i>My pins</dt>
                                    <dt class="item"><i class="sign out icon"></i>Sign Out</dt>
                                </dl>
                                </div>`

export const PIN_MEDIA_TEMPLATE = `<div class="pin">
                        <div class="image">
                            <img class="media" />
                            <video class="media" muted loop autoplay></video>
                            <div class="hover">
                                <div class="control top">
                                    <div class="red button">Сохранить</div>
                                </div>
                                <div class="control bottom">
                                    <div class="link labeled label">
                                        <i class="share icon"></i>
                                        <div class="nowrap">
                                            <span class="text"></span>
                                        </div>
                                    </div>
                                    <div class="icon menu label">
                                        <i class="ellipsis horizontal icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="author">
                            <div class="avatar">
                                <img class="centered" alt="user_pic" />
                            </div>
                            <span class="name"></span>
                        </div>
                    </div>`;

export const PIN_USER_TEMPLATE = `<div class="pin user-pin">
                                    <div class="collage">
                                        <div class="image"></div>
                                        <div class="image"></div>
                                    </div>
                                    <div class="avatar">
                                        <img class="covered" />
                                    </div>
                                    <div class="user"></div>
                                    <div class="subscribers"></div>
                                    <button class="grey button">Подписаться</div>
                                </div>`;

export const PIN_POPUP_TEMPLATE = `<div class="context menu">
                                    <dl class="vertical selectable menu">
                                        <dt class="download item">Скачать</dt>
                                        <dt class="item">Скрыть</dt>
                                        <dt class="add item">Добавить себе</dt>
                                    </dl>
                                </div>`;

export const PIN_LIST_TEMPLATE = `<div class="pin-list container">
                                    <div class="content"></div>
                                </div>`;

export const SEARCH_BAR_TEMPLATE = `<div class="search-bar">
                                    <label class="label">
                                        <input type="text" placeholder="..." />
                                        <i class="close icon"></i>
                                    </label>
                                    <div class="filter">
                                        <div class="dropdown">
                                            <span class="text">Все пины</span>
                                            <i class="chevron down icon"></i>
                                        </div>
                                    </div>
                                    </div>`;

export const SEARCH_BAR_TAG_FIELD = `<div class="tag-field popup-field">
                                        <div class="tag-set">
                                            <span class="text">Недавние поисковые запросы</span>
                                            <i class="grey link close icon"></i>
                                            <div class="divider"></div>
                                            <div class="tag-list">
                                                <div class="tag-label">ancient</div>
                                                <div class="tag-label">nature</div>
                                                <div class="tag-label">light</div>
                                            </div>
                                        </div>
                                    </div>`;

export const SEARCH_BAR_DROPDOWN = `<div class="filter-field popup-field">
                                        <dl class="vertical selectable menu">
                                            <dt class="item">Все пины</dt>
                                            <dt class="item">Видео</dt>
                                            <dt class="item">Люди</dt>
                                            <dt class="item">Ваши пины</dt>
                                        </dl>
                                    </div>`;

export const SAVED_PINS = `<div class="my-pins segment">
                                <div class="header">
                                    <i class="th icon"></i>Сохранённые пины
                                </div>
                                <div class="list"></div>
                            </div>`;