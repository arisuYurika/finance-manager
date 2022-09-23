import { request, pretty } from '@/services/axios.js'

export const doLogin = (user) => {
    return pretty(request.post("/user/login", {
        account: user.username,
        password: user.password
    }))
}