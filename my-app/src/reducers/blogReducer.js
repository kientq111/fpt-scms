import { blogConstants } from "../constants/Constants"


export const addBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case blogConstants.BLOG_ADD_REQUEST:
            return { loading: true }
        case blogConstants.BLOG_ADD_SUCCESS:
            return { loading: false, blog: action.payload, success: true }
        case blogConstants.BLOG_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}