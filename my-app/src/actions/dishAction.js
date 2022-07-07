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
        const { data } = await axios.get(`/dish/getListDish?dishName&status&menuId&subcategoryId&startDate&endDate&createdBy&pageIndex=1&pageSize=10`, config)
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



export const addDish = (dishName, description, menuID, subcategoryID) => async (dispatch, getState) => {
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
        //Call API to get menu name
        const menuResponse = await axios.get(`/menu/getMenuById/${menuID}`, config);
        const menuData = menuResponse.data;
        const menuName = menuData.data.menuName;
        const menu = {
            id: menuID,
            menuName: menuName
        }
        //Call API to get subcategory name

        const subcategoryResponse = await axios.get(`/subcategory/getSubCategoryByID/${subcategoryID}`, config)
        const subcategoryData = subcategoryResponse.data;
        // parse to object base on format on API
        const createdBy = userInfo.username;
        const subcategoryName = subcategoryData.data.subCategoryName;
        const subcategory = {
            "id": subcategoryID,
            "subCategoryName": subcategoryName
        }

        const { data } = await axios.post(`/dish/addOrUpdate`, { dishName, description, createdBy, menu, subcategory }, config)

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

export const editDish = (id, dishName, description, menuID, subcategoryID) => async (dispatch, getState) => {
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
        //Call API to get menu name
        const menuResponse = await axios.get(`/menu/getMenuById/${menuID}`, config);
        const menuData = menuResponse.data;
        const menuName = menuData.data.menuName;
        const menu = {
            id: menuID,
            menuName: menuName
        }
        //Call API to get subcategory name

        const subcategoryResponse = await axios.get(`/subcategory/getSubCategoryByID/${subcategoryID}`, config)
        const subcategoryData = subcategoryResponse.data;
        // parse to object base on format on API
        const createdBy = userInfo.username;
        const subcategoryName = subcategoryData.data.subCategoryName;
        const subcategory = {
            "id": subcategoryID,
            "subCategoryName": subcategoryName
        }

        const { data } = await axios.post(`/dish/addOrUpdate`, { id, dishName, description, createdBy, menu, subcategory }, config)

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