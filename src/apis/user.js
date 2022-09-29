import { request,pretty } from '@/utils/request' 


export const doLogin = (user)=>{
    return pretty(request.post("/user/login", {
        account: user.username,
        password: user.pass
    }));
}
export const logout = ()=>{
    return pretty(request.post('/user/logout'));
}