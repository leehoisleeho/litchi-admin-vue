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
    // 上传文件
    upload: (data) => {
        return http({
            url: "/api/upload",
            method: "post",
            data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    // 删除文件
    remove: (fileName) => {
        return http({
            url: "/api/remove",
            method: "delete",
            data:fileName,
        });
    }
}