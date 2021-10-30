import { Tooltip } from "./components/Tooltip";
import { UserNotification, NewsNotification, NotificationList } from './components/Notification' 
import { User } from './components/User'
import { Modal } from './components/Modal'
import { applyListener, promiseDelay } from './utils'
import { UserProfile } from "./components/UserProfile";
import { PinList } from './components/pin/PinList'
import { ImagePin, VideoPin } from './components/pin/MediaPin'
import { UserPin } from './components/pin/UserPin'
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
        new User({image: 'usr_marie.jpg', name: 'Marie de Villepin', subscribers: 12340}),
        new User({image: 'usr_napoleon.jpg', name: 'Napoléon Bonaparte', subscribers: 413}),
        new User({image: 'usr_hyena.jpg', name: 'Hyena', subscribers: 2344545}),
        new User({image: 'usr_uriel.jpg', name: 'Uriel Ventris', bio: 'For the Emperor!', email: 'warp_ventris@gmail.com', subscribers: 1198})
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

    // setTimeout(() => {
    //     notificationList.expand()
    // }, 1300);


    const modal = new Modal('.modal-segment');
    const toogleModal = document.querySelector('.toggle-modal');
    applyListener(toogleModal, () => { modal.show(); });

    UserProfile.getInstance(users[3], 'button.profile');



    const pins = [
        new UserPin({
            id: 1,
            url: 'vk.com',
            user: users[3],
            collage: [
                'pin_01.jpg',
                'pin_02.jpg'
            ]
        }),
        new VideoPin({
            id: 2,
            media: 'pin_05.mp4',
            url: 'some_url.com',
            user: users[0]
        }),
        new VideoPin({
            id: 3,
            media: 'pin_06.mp4',
            url: 'another_site.com',
            user: users[2]
        }),
        new ImagePin({
            id: 4,
            media: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new ImagePin({
            id: 5,
            media: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new ImagePin({
            id: 6,
            media: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new ImagePin({
            id: 7,
            media: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new ImagePin({
            id: 8,
            media: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new ImagePin({
            id: 9,
            media: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new ImagePin({
            id: 10,
            media: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new ImagePin({
            id: 11,
            media: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new ImagePin({
            id: 12,
            media: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new ImagePin({
            id: 13,
            media: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new ImagePin({
            id: 14,
            media: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new ImagePin({
            id: 15,
            media: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new ImagePin({
            id: 16,
            media: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new ImagePin({
            id: 17,
            media: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new ImagePin({
            id: 18,
            media: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new ImagePin({
            id: 19,
            media: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
        new ImagePin({
            id: 20,
            media: 'pin_01.jpg',
            url: 'vk.com',
            user: users[0]
        }),
        new ImagePin({
            id: 21,
            media: 'pin_02.jpg',
            url: 'bonny@gmail.com',
            user: users[1]
        }),
        new ImagePin({
            id: 22,
            media: 'pin_03.jpg',
            url: 'waterfall-source.com',
            user: users[3]
        }),
        new ImagePin({
            id: 23,
            media: 'pin_04.jpg',
            url: 'art-design.com',
            user: users[2]
        }),
    ];

    const pinList = new PinList({list: pins, attachedTo: 'main'});
    pinList.toggle();

});