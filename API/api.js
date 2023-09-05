import http from "./http.js";

export default {
    // 登录
    login: (data) => {
        return http({
            url: "/api/login",
            method: "post",
            data,
        });
    },
    // 验证token
    tokenCheck: (token) => {
        return http({
            url: '/api/checkToken',
            method: 'post',
            data: {token}
        })
    },
    // 上传数据
    update: (data) => {
        return http({
            url: "/api/update",
            method: "post",
            data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    // 新增新闻
    addNews: (data) => {
        return http({
            url: "/api/addNews",
            method: "post",
            data,
        });
    },
    // 获取新闻列表
    getNews: (id = '') => {
        return http({
            url: "/api/getNews?id=" + id,
            method: "get",
        });
    },
    // 删除新闻
    delNews: (data) => {
        return http({
            url: "/api/delNews",
            method: "delete",
            data
        });
    },
    // 编辑新闻
    editNews: (data) => {
        return http({
            url: "/api/editNews",
            method: "post",
            data
        });
    },
    // 新增资质
    addQualification: (data) => {
        return http({
            url: "/api/addQualification",
            method: "post",
            data,
        });
    },
    // 查看资质
    getQualification: (id = '') => {
        return http({
            url: "/api/getQualification?id=" + id,
            method: "get",
        });
    },
    // 删除资质
    delQualification: (data) => {
        return http({
            url: "/api/delQualification",
            method: "delete",
            data
        });
    },
    // 编辑资质
    editQualification: (data) => {
        return http({
            url: "/api/editQualification",
            method: "post",
            data
        });
    },
    // 新增视频
    addVideo: (data) => {
        return http({
            url: "/api/addVideo",
            method: "post",
            data,
        });
    },
    // 获取视频
    getVideo: (id = '') => {
        return http({
            url: "/api/getVideo?id=" + id,
            method: "get",
        });
    },
    // 删除资质
    delVideo: (data) => {
        return http({
            url: "/api/delVideo",
            method: "delete",
            data
        });
    },
    // 编辑资质
    editVideo: (data) => {
        return http({
            url: "/api/editVideo",
            method: "post",
            data
        });
    },
    // 获取关于我们
    getAbout: (id = '') => {
        return http({
            url: "/api/getAbout?id=" + id,
            method: "get",
        });
    },
    // 编辑关于我们
    editAbout: (data) => {
        return http({
            url: "/api/editAbout",
            method: "post",
            data
        });
    },
    // 新增banner
    addBanner: (data) => {
        return http({
            url: "/api/addBanner",
            method: "post",
            data,
        });
    },
    // 获取banner
    getBanner: (id = '') => {
        return http({
            url: "/api/getBanner?id=" + id,
            method: "get",
        });
    },
    // 删除banner
    delBanner: (data) => {
        return http({
            url: "/api/delBanner",
            method: "delete",
            data
        });
    },
    // 编辑banner
    editBanner: (data) => {
        return http({
            url: "/api/editBanner",
            method: "post",
            data
        });
    },
    // 新增视频
    addProduct: (data) => {
        return http({
            url: "/api/addProduct",
            method: "post",
            data,
        });
    },
    // 获取视频
    getProduct: (id = '') => {
        return http({
            url: "/api/getProduct?id=" + id,
            method: "get",
        });
    },
    // 删除资质
    delProduct: (data) => {
        return http({
            url: "/api/delProduct",
            method: "delete",
            data
        });
    },
    // 编辑资质
    editProduct: (data) => {
        return http({
            url: "/api/editProduct",
            method: "post",
            data
        });
    },
}