import Api from './api';

export async function getBlog(reqData) {
    let res = await Api.fetchBlog(reqData);
    return res;
}
export async function addBlog(reqData) {
    let res = await Api.addBlog(reqData);
    return res;
}
export async function updateBlog(reqData) {
    let res = await Api.updateBlog(reqData);
    return res;
}
export async function deleteBlogCover(id, reqData) {
    let res = await Api.deleteBlogCover(id, reqData);
    return res;
}