import axios from "axios";
import { blogConstants } from "../constants/Constants";
import { base_url } from "../api/api";

export const addBlog = (name, content, image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: blogConstants.BLOG_ADD_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        const { data } = await axios.post(
            `${base_url}/management/blogs/createPost`,
            { name, content, image },
            config
        );
        dispatch({
            type: blogConstants.BLOG_ADD_SUCCESS,
            payload: data.data,
        })


    } catch (error) {
        dispatch({
            type: blogConstants.BLOG_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listBlog = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: blogConstants.BLOG_LIST_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        console.log(userInfo.accessToken);
        const { data } = await axios.get(`${base_url}/management/blogs/posts/search?name=&content=&status=&createdBy=&dateFrom=&dateUntil=&page=&pageSize=100`, config)
        dispatch({
            type: blogConstants.BLOG_LIST_SUCCESS,
            payload: data.data,
        })
        dispatch({
            type: blogConstants.BLOG_EDIT_RESET,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: blogConstants.BLOG_LIST_FAIL,
            payload: message,
        })
    }
}


export const editBlog = (id, name, content, image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: blogConstants.BLOG_EDIT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        const { data } = await axios.post(
            `${base_url}/management/blogs/createPost`,
            { id, name, content, image },
            config
        );
        dispatch({
            type: blogConstants.BLOG_EDIT_SUCCESS,
            payload: data.data,
        })


    } catch (error) {
        dispatch({
            type: blogConstants.BLOG_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const changeBlogStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: blogConstants.BLOG_CHANGE_STATUS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        const { data } = await axios.put(
            `${base_url}/management/blogs/post/${status === 1 ? "disable" : "active"}/${id}`,
            {},
            config
        );
        dispatch({
            type: blogConstants.BLOG_CHANGE_STATUS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: blogConstants.BLOG_CHANGE_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const deleteBlog = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: blogConstants.BLOG_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        const { data } = await axios.delete(
            `${base_url}/management/blogs/delete/post/${id}`,
            config
        );
        dispatch({
            type: blogConstants.BLOG_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: blogConstants.BLOG_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getBlogDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: blogConstants.BLOG_DETAIL_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        const { data } = await axios.get(
            `${base_url}/management/blogs/detail/posts/${id}`,
            config
        );
        dispatch({
            type: blogConstants.BLOG_DETAIL_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: blogConstants.BLOG_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}