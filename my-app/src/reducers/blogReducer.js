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



export const listBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case blogConstants.BLOG_LIST_REQUEST:
            return { loading: true }
        case blogConstants.BLOG_LIST_SUCCESS:
            return { loading: false, blogs: action.payload, success: true }
        case blogConstants.BLOG_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const editBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case blogConstants.BLOG_EDIT_REQUEST:
            return { loading: true }
        case blogConstants.BLOG_EDIT_SUCCESS:
            return { loading: false, blog: action.payload, success: true }
        case blogConstants.BLOG_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case blogConstants.BLOG_EDIT_RESET:
            return {}
        default:
            return state
    }
}

export const changeBlogStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case blogConstants.BLOG_CHANGE_STATUS_REQUEST:
            return { loading: true }
        case blogConstants.BLOG_CHANGE_STATUS_SUCCESS:
            return { loading: false, blog: action.payload, success: true }
        case blogConstants.BLOG_CHANGE_STATUS_FAIL:
            return { loading: false, error: action.payload }
        case blogConstants.BLOG_CHANGE_STATUS_RESET:
            return {}
        default:
            return state
    }
}

export const deleteBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case blogConstants.BLOG_DELETE_REQUEST:
            return { loading: true }
        case blogConstants.BLOG_DELETE_SUCCESS:
            return { loading: false, blog: action.payload, success: true }
        case blogConstants.BLOG_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case blogConstants.BLOG_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const blogDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case blogConstants.BLOG_DETAIL_REQUEST:
            return { loading: true }
        case blogConstants.BLOG_DETAIL_SUCCESS:
            return { loading: false, blog: action.payload, success: true }
        case blogConstants.BLOG_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        case blogConstants.BLOG_DETAIL_RESET:
            return {}
        default:
            return state
    }
}