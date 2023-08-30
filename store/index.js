import {defineStore} from 'pinia';

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        value: 0,
        link: '/dashboard'
    }),
    actions: {
        setNav(value, link) {
            this.value = value;
            this.link = link
        },
    },
});