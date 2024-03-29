import { categoryConstants, subCategoryConstatnts } from "../constants/Constants";
import axios from "axios";
import { base_url } from "../api/api";

export const addCategory = (categoryName, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoryConstants.CATEGORY_ADD_REQUEST,
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
        // Dinamic variable
        const status = 0;
        const createdBy = userInfo.username;
        const updatedBy = userInfo.username;
        const createdTime = new Date();
        const updatedTime = new Date();
        const { data } = await axios.post(
            `${base_url}/category/addOrUpdateCategory`,
            { categoryName, description, status, createdBy, createdTime, updatedBy, updatedTime },
            config
        )

        dispatch({
            type: categoryConstants.CATEGORY_ADD_SUCCESS,
            payload: data,
        })


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
            `${base_url}/category/addOrUpdateCategory`,
            { id, categoryName, description, status, createdBy, updatedBy },
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


export const listCategory = (status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoryConstants.CATEGORY_LIST_REQUEST,
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
            status = ""
        }

        const { data } = await axios.get(`${base_url}/category/getListCategory?categoryName&status=${status}&startDate&endDate&createdBy&pageIndex=1&pageSize=100`, {}, config)
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

export const changeCategoryStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoryConstants.CATEGORY_CHANGE_STATUS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,

            },
        }


        console.log(status)
        const { data } = await axios.put(`${base_url}/category/changeCategoryStatus?status=${status === 1 ? 0 : 1}&categoryID=${id}`, {}, config)
        dispatch({
            type: categoryConstants.CATEGORY_CHANGE_STATUS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: categoryConstants.CATEGORY_CHANGE_STATUS_FAIL,
            payload: message,
        })
    }
}

//SUBCATEGORY ZONEEEE
export const listSubcategory = (status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_LIST_REQUEST,
        })
        if (status === undefined) {
            status = ''
        }
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`${base_url}/subcategory/getListSubCategory?subcategoryName=&status=${status}&startDate=&endDate=&categoryID=&pageIndex=&pageSize=100`, {}, config)
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_LIST_SUCCESS,
            payload: data.data,
        })
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_EDIT_RESET,
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


export const addSubCategory = (subCategoryName, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_ADD_REQUEST,
        })
        // Dinamic variable
        const status = 1;

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        let categoryId = 1441

        const createdBy = userInfo.username;
        const updatedBy = userInfo.username;
        const { data } = await axios.post(
            `${base_url}/subcategory/addOrUpdateCategory`,
            { subCategoryName, categoryId, description, status, createdBy, updatedBy },
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


export const editSubCategory = (id, subCategoryName, description, createdBy, createdTime, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_EDIT_REQUEST,
        })
        // Dinamic variable

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        let categoryId = 1441;


        const updatedBy = userInfo.username;

        const { data } = await axios.post(
            `${base_url}/subcategory/addOrUpdateCategory`,
            { id, subCategoryName, categoryId, description, status, createdBy, updatedBy },
            config
        )

        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_EDIT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const changeSubCategoryStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_CHANGE_STATUS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,

            },
        }

        const { data } = await axios.put(`${base_url}/subcategory/changeSubcategoryStatus?status=${status === 1 ? 0 : 1}&subcategoryId=${id}`, {}, config)
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_CHANGE_STATUS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: subCategoryConstatnts.SUB_CATEGORY_CHANGE_STATUS_FAIL,
            payload: message,
        })
    }
}