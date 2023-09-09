import {createRouter, createWebHashHistory} from 'vue-router';
import index from '../src/pages/index.vue'
import dashboard from '../src/pages/dashboard.vue';
import table from '../src/pages/table.vue';
import tablePlus from '/src/pages/tablePlus.vue'
import login from '../src/pages/login.vue'

// api 验证token
import api from '/API/api.js'
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
            {path: '/table', component: table},
            {path: '/tablePlus', component: tablePlus},
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
    // const token = sessionStorage.getItem('token')
    // // 登录页面不验证token
    // if (to.path === '/') {
    //     next()
    //     return
    // }
    // if (token) {
    //     // 验证token是否过期 0验证通过 1token过期
    //     api.tokenCheck(token).then(res => {
    //         const code = res.code
    //         if (code === 0) {
    //             next()
    //         } else if (code === 1) {
    //             next('/')
    //         }
    //     })
    // } else {
    //     next('/')
    //     return;
    // }
});

export default router;