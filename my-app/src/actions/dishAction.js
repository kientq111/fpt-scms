import { dishConstants } from "../constants/Constants"
import axios from "axios"
import { base_url } from "../api/api"
import moment from "moment"

export const listDishes = (status) => async (dispatch, getState) => {
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

        if (status === undefined) {
            status = "";
        }

        const { data } = await axios.get(`${base_url}/dish/getListDish?dishName=&status=${status}&subcategoryId=&startDate&endDate&createdBy&pageIndex=1&pageSize=1000`, config)
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
        const { data } = await axios.get(`${base_url}/dish/getDishById/${id}`, config)
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

        const res = await axios.put(`${base_url}/dish/changeDishStatus?status=${status === 1 ? 0 : 1}&dishID=${id}`, {}, config)

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

export const addDish = (dishName, price, description, rawMenu, rawSubCategory, file, finishedTime) => async (dispatch, getState) => {
    try {
        dispatch({

            type: dishConstants.DISH_ADD_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const configImg = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        let image = file
        if (typeof (file) === 'object') {
            const res = await axios.post(
                `/image/upload`,
                { file },
                configImg
            );
            image = res.data?.data?.imageUrl
        }


        const listMenuId = [];
        if (rawMenu !== undefined) {
            rawMenu.forEach(element => {
                listMenuId.push(
                    element.value
                )
            });
        }
        let subcategoryId;

        if (rawSubCategory !== undefined) {
            subcategoryId = rawSubCategory.value;
        }

        //End of rename key block
        const createdTime = new Date();
        const updatedTime = new Date();
        const status = 1;
        const createdBy = userInfo.username;
        const updatedBy = userInfo.username;
        const { data } = await axios.post(`${base_url}/dish/addOrUpdate`, { dishName, description, createdBy, status, listMenuId, subcategoryId, updatedBy, createdTime, updatedTime, price, image, finishedTime }, config)

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

export const editDish = (id, dishName, description, rawMenu, rawSubCategory, createdTime, createdBy, price, file, status, finishedTime) => async (dispatch, getState) => {
    try {
        dispatch({

            type: dishConstants.DISH_EDIT_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const configImg = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        let image = file
        if (typeof (file) === 'object') {
            const res = await axios.post(
                `/image/upload`,
                { file },
                configImg
            );
            image = res.data?.data?.imageUrl
        }

        console.log(image)

        const listMenuId = [];
        if (rawMenu !== undefined) {
            rawMenu.forEach(element => {
                listMenuId.push(
                    element.value
                )
            });
        }
        const subcategoryId = rawSubCategory.value


        //End of rename key block 
        let d = new Date()
        const updatedTime = moment(d).format('YYYY-MM-DD hh:mm:ss')
        const updatedBy = userInfo.username;
        const { data } = await axios.post(`${base_url}/dish/addOrUpdate`, { id, dishName, description, createdBy, listMenuId, subcategoryId, updatedBy, price, image, status, finishedTime }, config)

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