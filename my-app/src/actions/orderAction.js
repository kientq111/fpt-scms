import axios from "axios";
import { orderConstants } from "../constants/Constants";
import { base_url } from "../api/api";

export const listOrders = (startDate, endDate) => async (dispatch, getState) => {

    try {
        if (startDate === undefined) {
            startDate = ''
        }
        if (endDate === undefined) {
            endDate = ''
        }
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

        const { data } = await axios.get(`${base_url}/order/getListOrderDish?orderNumber=&userId&status&bookId&startDate=${startDate}&endDate=${endDate}&createdBy&orderId=&pageSize=100&pageIndex=0`, config)
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

        const { data } = await axios.get(`/orderDetail/getListOrderDetailByOrderId?orderId=${id}&fromDate&toDate&createdBy&pageIndex=0&pageSize=100`, config)
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

export const changeOrderStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderConstants.ORDER_CHANGE_STATUS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const { data } = await axios.put(`${base_url}/order/changeStatusOrder?status=${status}&orderId=${id}`, {}, config)
        dispatch({
            type: orderConstants.ORDER_CHANGE_STATUS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: orderConstants.ORDER_CHANGE_STATUS_FAIL,
            payload: message,
        })
    }
}

export const changeOrderDetailStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderConstants.ORDER_CHANGE_STATUS_DETAIL_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const { data } = await axios.put(`${base_url}/orderDetail/changeStatusOrderDetail/?status=${status}&orderDetailId=${id}`, {}, config)
        dispatch({
            type: orderConstants.ORDER_CHANGE_STATUS_DETAIL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: orderConstants.ORDER_CHANGE_STATUS_DETAIL_FAIL,
            payload: message,
        })
    }
}