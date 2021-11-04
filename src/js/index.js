import { Tooltip } from "./components/Tooltip";
import { UserNotification, NewsNotification, NotificationList } from './components/Notification' 
import { User } from './components/User'
import { promiseDelay, doRequest } from './utils'
import { UserProfile } from "./components/UserProfile";
import { PinList } from './components/pin/PinList'
import { SearchBar } from './components/SearchBar'
import { API_URL } from './globals'

document.addEventListener('DOMContentLoaded', async function() {

    let userData = [];
    let pinsData = [];
    const storage = localStorage.getItem('pinterestProfile');

    await doRequest(API_URL + 'users').then(data => {
        userData = data.map(el => new User(el));
        const search = storage ? JSON.parse(storage).searchBar.searchValue : '';
        return doRequest(API_URL + 'pins?title=' + search);
    }).then(data => {
        pinsData = data.map(el => Object.assign(el, {user: userData.find(user => el.user === user.id)}));
        document.querySelector('body > .dimmer').remove();
    }).catch(err => {
        alert(err);
    })

    const searchBar = new SearchBar({
        attachedTo: 'header .menu > .fluid.item',
        onSearch(value) {
            doRequest('https://6182bc4502f60a001775ce9d.mockapi.io/pinter/pins?title=' + value).then(data => {
                pinsData = data.map(el => Object.assign(el, {user: userData.find(user => el.user === user.id)}));
                pinList.setList(PinList.generatePins(searchBar.getFilteredList(pinsData)));
            }).catch(err => alert(err));
        },
        onFilter() {
            pinList.setList(PinList.generatePins(searchBar.getFilteredList(pinsData)));
        }
    });

    UserProfile.getInstance(new User(userData[0]), 'button.profile');
    const pinList = new PinList({list: PinList.generatePins(searchBar.getFilteredList(pinsData)), attachedTo: 'main'});
    pinList.toggle();

    const tooltip = new Tooltip({element: '.tooltip', isCloseable: true});
    setTimeout(() => {
        tooltip.toggle();
    }, 2400);

    const notificationList = new NotificationList({
        trigger: '.notification.button',
        target: 'main'
    });

    const notifications = [
        new UserNotification({
            user: userData[2],
            message: `Let's be friends`
        }),
        new NewsNotification({
            message: {
                title: 'Lorem Ipsum',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        }),
        new UserNotification({
            user: userData[3],
            message: `I will conquer you!!!!!!`
        }),
        new UserNotification({
            user: userData[1],
            message: `Wanna Hear A Joke?))))`
        })
    ];

    notifications.reduce((acc, el) => {
        return acc.then(() => promiseDelay(notificationList.push(el), 1000));
    }, Promise.resolve());

    setTimeout(() => {
        notificationList.expand()
    }, 700);
});