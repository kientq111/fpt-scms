import { categoryConstants, subCategoryConstatnts } from "../constants/Constants";
import axios from "axios";


export const addCategory = (categoryName, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoryConstants.CATEGORY_ADD_REQUEST,
        })
        // Dinamic variable
        const status = '1';

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
            '/category/addOrUpdateCategory',
            { categoryName, description, status },
            config
        )

        dispatch({
            type: categoryConstants.CATEGORY_ADD_SUCCESS,
            payload: data,
        })

        dispatch({ type: categoryConstants.CATEGORY_ADD_RESET })

    } catch (error) {
        dispatch({
            type: categoryConstants.CATEGORY_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editCategory = (id, categoryName, description, createdTime, createdBy) => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoryConstants.CATEGORY_EDIT_REQUEST,
        })
        // Dinamic variable
        const status = '1';

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        const updatedBy = userInfo.userName
        const updatedTime = new Date();
        const { data } = await axios.post(
            '/category/addOrUpdateCategory',
            { id, categoryName, description, status, createdTime, createdBy, updatedTime, updatedBy },
            config
        )

        dispatch({
            type: categoryConstants.CATEGORY_EDIT_SUCCESS,
            payload: data,
        })

        dispatch({ type: categoryConstants.CATEGORY_ADD_RESET })

    } catch (error) {
        dispatch({
            type: categoryConstants.CATEGORY_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listCategory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoryConstants.CATEGORY_LIST_REQUEST,
        })

        dispatch({
            type: categoryConstants.CATEGORY_EDIT_RESET,
        })


        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,

            },
        }
        const { data } = await axios.get(`/category/getListCategory?categoryName&status&startDate&endDate&createdBy&pageIndex=1&pageSize=10`, {}, config)
        dispatch({
            type: categoryConstants.CATEGORY_LIST_SUCCESS,
            payload: data.data,
        })

        dispatch({
            type: categoryConstants.CATEGORY_EDIT_RESET,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: categoryConstants.CATEGORY_LIST_FAIL,
            payload: message,
        })
    }
}
//SUBCATEGORY ZONEEEE
export const listSubcategory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`/subcategory/getListSubCategory?subcategoryName=&status=&startDate=&endDate=&categoryID=&pageIndex=&pageSize=100`, {}, config)
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_LIST_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_LIST_FAIL,
            payload: message,
        })
    }
}


export const addSubCategory = (subCategoryName, categoryEntity, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_ADD_REQUEST,
        })
        // Dinamic variable
        const status = '3';

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
        const createdTime = new Date();
        const updatedTime = new Date();
        const { data } = await axios.post(
            '/category/addOrUpdateCategory',
            { subCategoryName, categoryEntity, description, status, createdBy, updatedBy, createdTime, updatedTime },
            config
        )

        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_ADD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}