import {createRouter, createWebHashHistory} from 'vue-router';
import index from '../src/pages/index.vue'
import dashboard from '../src/pages/dashboard.vue';
import table_template from '../src/pages/table_template.vue';
import login from '../src/pages/login.vue'
import news from '/src/pages/news.vue'
import qualification from '/src/pages/qualification.vue'
import video from '/src/pages/video.vue'
import about from '/src/pages/about.vue'
import product from '/src/pages/product.vue'
import banner from '/src/pages/banner.vue'
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
            {path: '/news', component: news},
            {path: '/qualification', component: qualification},
            {path: '/video', component: video},
            {path: '/about', component: about},
            {path: '/product', component: product},
            {path: '/banner', component: banner},
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
    const token = sessionStorage.getItem('token')
    // 登录页面不验证token
    if (to.path === '/') {
        next()
        return
    }
    if (token) {
        // 验证token是否过期 0验证通过 1token过期
        api.tokenCheck(token).then(res => {
            const code = res.code
            if (code === 0) {
                next()
            } else if (code === 1) {
                next('/')
            }
        })
    } else {
        next('/')
        return;
    }
});

export default router;