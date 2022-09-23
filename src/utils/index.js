import jwt from 'jsonwebtoken'
import { secure } from '@/conf'

// 返回用户token
export const getToken = () => {
    return window.sessionStorage.getItem('token')
};

// 返回解密后的用户token信息
export const checkLogin = () => {
    const token = getToken();
    // 判断登录状态（Token是否合法）
    if (!token) {
        return null;
    }
    return jwt.decode(token, secure);

}