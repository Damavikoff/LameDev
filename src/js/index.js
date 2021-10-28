import { Tooltip } from "./components/Tooltip";
import { UserNotification, NewsNotification, NotificationList } from './components/Notification' 
import { User } from './components/User'
import { Modal } from './components/Modal'
import { applyListener, promiseDelay } from './utils'
import { UserProfile } from "./components/UserProfile";
import { Pin } from './components/Pin'
import { PinList } from './components/PinList'
import { SearchBar } from './components/SearchBar'

document.addEventListener('DOMContentLoaded', function() {

    const searchBar = new SearchBar({
        attachedTo: 'header .menu > .fluid.item'
    });

    const tooltip = new Tooltip({element: '.tooltip', isCloseable: true});
    document.querySelector('button.toggle-tooltip').addEventListener('click', () => {
        tooltip.toggle();
    });

    const users = [
        new User({image: 'usr_marie.jpg', name: 'Marie de Villepin'}),
        new User({image: 'usr_napoleon.jpg', name: 'Napoléon Bonaparte'}),
        new User({image: 'usr_hyena.jpg', name: 'Hyena'}),
        new User({image: 'usr_uriel.jpg', name: 'Uriel Ventris', bio: 'For the Emperor!', email: 'warp_ventris@gmail.com'})
    ];

    const notificationList = new NotificationList({
        trigger: '.notification.button',
        target: 'main'
    });

    const notifications = [
        new UserNotification({
            user: users[0],
            message: `Let's be friends`
        }),
        new NewsNotification({
            message: {
                title: 'Lorem Ipsum',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        }),
        new UserNotification({
            user: users[1],
            message: `I will conquer you!!!!!!`
        }),
        new UserNotification({
            user: users[2],
            message: `Wanna Hear A Joke?))))`
        })
    ];

    notifications.reduce((acc, el) => {
        return acc.then(() => promiseDelay(notificationList.push(el), 1000));
    }, Promise.resolve());

    setTimeout(() => {
        notificationList.expand()
    }, 1300);


    const modal = new Modal('.modal-segment');
    const toogleModal = document.querySelector('.toggle-modal');
    applyListener(toogleModal, () => { modal.show(); });

    UserProfile.getInstance(users[3], 'button.profile');



    const pins = [
        new Pin({
            id: 1,
            image: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new Pin({
            id: 1,
            image: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new Pin({
            id: 1,
            image: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new Pin({
            id: 1,
            image: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new Pin({
            id: 1,
            image: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new Pin({
            id: 1,
            image: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new Pin({
            id: 1,
            image: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new Pin({
            id: 1,
            image: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new Pin({
            id: 1,
            image: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new Pin({
            id: 1,
            image: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new Pin({
            id: 1,
            image: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new Pin({
            id: 1,
            image: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new Pin({
            id: 1,
            image: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new Pin({
            id: 1,
            image: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new Pin({
            id: 1,
            image: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new Pin({
            id: 1,
            image: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new Pin({
            id: 1,
            image: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new Pin({
            id: 1,
            image: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new Pin({
            id: 1,
            image: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new Pin({
            id: 1,
            image: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
    ];

    const pinList = new PinList({list: pins, attachedTo: 'main'});
    pinList.toggle();

});