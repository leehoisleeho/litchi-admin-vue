import {createRouter, createWebHashHistory} from 'vue-router';
import index from '../src/pages/index.vue'
import dashboard from '../src/pages/dashboard.vue';
import table_template from '../src/pages/table_template.vue';
import login from '../src/pages/login.vue'
import news from '/src/pages/news.vue'
import qualification from '/src/pages/qualification.vue'
import video from '/src/pages/video.vue'
import about from '/src/pages/about.vue'

const routes = [
    {
        path: '/', component: login
    },
    {
        path: '/index',
        component: index,
        redirect: '/dashboard',
        children: [
            {path: '/dashboard', component: dashboard},
            {path: '/news', component: news},
            {path: '/qualification', component: qualification},
            {path: '/video', component: video},
            {path: '/about', component: about},
            {path: '/table_template', component: table_template},
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    next()
});


export {
    router
}

export default router;