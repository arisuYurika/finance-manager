export default Object.freeze({ // 提升性能(不需要响应式)
    title: '你好，我是title',
    items: [
        [{ type: 'input', label: '用户名', colspan: 24, key: 'username' }],
        [{ type: 'input', label: '密码', colspan: 24, key: 'password' }],
        [{ type: 'input', label: '确认密码', colspan: 24, key: 'confirmPwd' }],
    ],
    rules: {
        username: [{ require: true }],
        password: [{ require: true }],
    }
});