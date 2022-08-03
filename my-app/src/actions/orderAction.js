import axios from "axios";
import { orderConstants } from "../constants/Constants";

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderConstants.ORDER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const { data } = await axios.get(`/order/getListOrderDish?orderNumber&userId&status&bookId&startDate&endDate&createdBy&orderId&pageSize=6&pageIndex=1`, config)
        dispatch({
            type: orderConstants.ORDER_LIST_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: orderConstants.ORDER_LIST_FAIL,
            payload: message,
        })
    }
}

export const getOrderByID = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderConstants.ORDER_GET_BY_ID_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const { data } = await axios.get(`/order/getOrderDishById/${id}`, config)
        dispatch({
            type: orderConstants.ORDER_GET_BY_ID_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: orderConstants.ORDER_GET_BY_ID_FAIL,
            payload: message,
        })
    }
}