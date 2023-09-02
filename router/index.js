import {createRouter, createWebHashHistory} from 'vue-router';
import index from '../src/pages/index.vue'
import dashboard from '../src/pages/dashboard.vue';
import table_template from '../src/pages/table_template.vue';
import login from '../src/pages/login.vue'

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