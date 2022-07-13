import axios from "axios";
import { blogConstants } from "../constants/Constants";


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
            '/management/blogs/createPost',
            { name, content, image },
            config
        );
        dispatch({
            type: blogConstants.BLOG_ADD_SUCCESS,
            payload: data.data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
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
