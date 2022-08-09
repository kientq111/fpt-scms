import { menuConstants } from "../constants/Constants"
import axios from "axios"
import { base_url } from "../api/api"

export const listMenus = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: menuConstants.MENU_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`${base_url}/menu/getListMenu?menuName&startDate&endDate&createdBy&pageIndex=1&pageSize=100`, config)
        dispatch({
            type: menuConstants.MENU_LIST_SUCCESS,
            payload: data.data,
        })

        dispatch({
            type: menuConstants.MENU_EDIT_RESET,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: menuConstants.MENU_LIST_FAIL,
            payload: message,
        })
    }
}


export const changeMenuStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: menuConstants.MENU_CHANGE_STATUS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        await axios.put(`${base_url}/menu/updateMenuStatus?status=${status === 1 ? 0 : 1}&menuId=${id}`, {}, config)

        dispatch({ type: menuConstants.MENU_CHANGE_STATUS_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
        dispatch({
            type: menuConstants.MENU_CHANGE_STATUS_FAIL,
            payload: message,
        })
    }
}


export const addMenu = (menuName, description, listDish) => async (dispatch, getState) => {
    try {
        dispatch({
            type: menuConstants.MENU_ADD_REQUEST,
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
        const createdBy = userInfo.username;
        const updatedBy = userInfo.username;
        const updatedTime = new Date();
        const createdTime = new Date();
        let listDishId = [];
        if (listDish !== undefined) {
            listDish.forEach(e => {
                listDishId.push(e.id)
            });
        }
        console.log(listDishId);
        const { data } = await axios.post(
            `${base_url}/menu/addOrUpdate`,
            { menuName, description, listDishId, createdBy, updatedBy, updatedTime, createdTime },
            config
        )

        dispatch({
            type: menuConstants.MENU_ADD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: menuConstants.MENU_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const editMenu = (id, menuName, description, status, listDish, createdBy, createdTime) => async (dispatch, getState) => {
    try {
        dispatch({
            type: menuConstants.MENU_EDIT_REQUEST,
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
        const updatedBy = userInfo.username;
        const updatedTime = new Date();
        let listDishId = [];
        listDish.forEach(e => {
            listDishId.push(e.id)
        });
        const { data } = await axios.post(
            `${base_url}/menu/addOrUpdate`,
            { id, menuName, description, status, listDishId, createdBy, updatedBy, updatedTime, createdTime },
            config
        )

        dispatch({
            type: menuConstants.MENU_EDIT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: menuConstants.MENU_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getMenuById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: menuConstants.MENU_GET_BY_ID_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`${base_url}/menu/getMenuById/${id}`, config)
        dispatch({
            type: menuConstants.MENU_GET_BY_ID_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: menuConstants.MENU_GET_BY_ID_FAIL,
            payload: message,
        })
    }
}