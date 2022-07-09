import { dishConstants } from "../constants/Constants"
import axios from "axios"
import moment from "moment"

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
        const { data } = await axios.get(`/dish/getListDish?dishName=&status=&subcategoryId=&startDate&endDate&createdBy&pageIndex=1&pageSize=100`, config)
        dispatch({
            type: dishConstants.DISH_LIST_SUCCESS,
            payload: data.data,
        })

        dispatch({
            type: dishConstants.DISH_EDIT_RESET,
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

export const getDishById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: dishConstants.DISH_GET_BY_ID_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`/dish/getDishById/${id}`, config)
        dispatch({
            type: dishConstants.DISH_GET_BY_ID_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: dishConstants.DISH_GET_BY_ID_FAIL,
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

        await axios.put(`/dish/changeDishStatus?status=${status === 1 ? 0 : 1}&dishID=${id}`, {}, config)

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

export const addDish = (dishName, description, rawMenu, rawSubCategory) => async (dispatch, getState) => {
    try {
        dispatch({

            type: dishConstants.DISH_ADD_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        //Rename key of obj block
        const menu = [];
        rawMenu.forEach(element => {
            menu.push({
                id: element.value,
                menuName: element.label,
                description: element.description,
                status: element.status,
                createdTime: element.createdTime,
                createdBy: element.createdBy,
                updatedTime: element.updatedTime,
                updatedBy: element.updatedBy
            })
        });
        const subcategory = {
            id: rawSubCategory.value,
            subCategoryName: rawSubCategory.label,
            description: rawSubCategory.description,
            status: rawSubCategory.status,
            createdTime: rawSubCategory.createdTime,
            createdBy: rawSubCategory.createdBy,
            updatedBy: rawSubCategory.updatedBy,
            updatedTime: rawSubCategory.updatedTime
        };

        //End of rename key block
        const createdTime = new Date();
        const updatedTime = new Date();

        const createdBy = userInfo.username;
        const updatedBy = userInfo.username;
        const { data } = await axios.post(`/dish/addOrUpdate`, { dishName, description, createdBy, menu, subcategory, updatedBy, createdTime, updatedTime }, config)

        dispatch({ type: dishConstants.DISH_ADD_SUCCESS, payload: data })
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

export const editDish = (id, dishName, description, rawMenu, rawSubCategory, createdTime, createdBy) => async (dispatch, getState) => {
    try {
        dispatch({

            type: dishConstants.DISH_EDIT_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        //Rename value  of obj block
        const menu = [];
        rawMenu.forEach(element => {
            menu.push({
                id: element.value,
                menuName: element.label,
                description: element.description,
                status: element.status,
                createdTime: element.createdTime,
                createdBy: element.createdBy,
                updatedTime: element.updatedTime,
                updatedBy: element.updatedBy
            })
        });
        const subcategory = {
            id: rawSubCategory.value,
            subCategoryName: rawSubCategory.label,
            description: rawSubCategory.description,
            status: rawSubCategory.status,
            createdTime: rawSubCategory.createdTime,
            createdBy: rawSubCategory.createdBy,
            updatedBy: rawSubCategory.updatedBy,
            updatedTime: rawSubCategory.updatedTime
        };

        //End of rename key block
        const updatedTime = new Date();
        const updatedBy = userInfo.username;
        const { data } = await axios.post(`/dish/addOrUpdate`, { id, dishName, description, createdBy, menu, subcategory, updatedBy, createdTime, updatedTime }, config)

        dispatch({ type: dishConstants.DISH_EDIT_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
        dispatch({
            type: dishConstants.DISH_EDIT_FAIL,
            payload: message,
        })
    }
}