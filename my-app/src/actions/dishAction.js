import { dishConstants } from "../constants/Constants"
import axios from "axios"


export const listDishes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: dishConstants.DISH_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,

            },
        }
        const { data } = await axios.post(`/dish/getListDish?dishName&status&menuId&subcategoryId&startDate&endDate&createdBy&pageIndex=1&pageSize=10`, {}, config)
        dispatch({
            type: dishConstants.DISH_LIST_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: dishConstants.DISH_LIST_FAIL,
            payload: message,
        })
    }
}



export const changeDishStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: dishConstants.DISH_CHANGE_STATUS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        await axios.post(`/dish/changeDishStatus?status=${status === 1 ? 0 : 1}&dishID=${id}`, {}, config)

        dispatch({ type: dishConstants.DISH_CHANGE_STATUS_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
        dispatch({
            type: dishConstants.DISH_CHANGE_STATUS_FAIL,
            payload: message,
        })
    }
}



export const addDish = (dishName, description, menu, subcategory) => async (dispatch, getState) => {
    try {
        dispatch({
            type: dishConstants.DISH_ADD_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        await axios.post(`/dish/addOrUpdate`, { dishName, description, menu, subcategory }, config)

        dispatch({ type: dishConstants.DISH_ADD_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
        dispatch({
            type: dishConstants.DISH_ADD_FAIL,
            payload: message,
        })
    }
}