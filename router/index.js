import {createRouter, createWebHashHistory} from 'vue-router';
import index from '../src/pages/index.vue'
import dashboard from '../src/pages/dashboard.vue';
import baseTemplate from '../src/pages/baseTemplate.vue';
import login from '../src/pages/login.vue'
const routes = [
    {
        path: '/',component: login
    },
    {
        path: '/index', component: index, children: [
            {path: '/dashboard', component: dashboard},
            {path: '/baseTemplate', component: baseTemplate},
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;