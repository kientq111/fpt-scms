import { feedbackConstants } from "../constants/Constants"
import axios from "axios"
import { logout } from "./userActions"
import { base_url } from "../api/api"
export const listFeedBack = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: feedbackConstants.FB_LIST_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`${base_url}/management/view/feedbacks?content=&createdBy=&dateFrom&dateUntil&page&pageSize`, config)
        dispatch({
            type: feedbackConstants.FB_LIST_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: feedbackConstants.FB_LIST_FAIL,
            payload: message,
        })
    }
}

export const deleteFeedBack = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: feedbackConstants.FB_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.delete(`${base_url}/management/delete/feedbacks/${id}`, config)

        dispatch({
            type: feedbackConstants.FB_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: feedbackConstants.FB_DELETE_FAIL,
            payload: message,
        })
    }
}

