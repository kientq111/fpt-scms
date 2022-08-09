import axios from 'axios'
import { tableConstants } from '../constants/Constants'
import { base_url } from '../api/api'

export const listTables = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: tableConstants.TABLE_LIST_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`${base_url}/table/getListTable?tableNumber=&canteenID=&startDate=&endDate=&status=&type=&pageNumber=1&pageSize=100`, config)
        dispatch({
            type: tableConstants.TABLE_LIST_SUCCESS,
            payload: data.data,
        })
        dispatch({ type: tableConstants.TABLE_EDIT_RESET })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: tableConstants.TABLE_LIST_FAIL,
            payload: message,
        })
    }
}



export const addTable = (description, canteenId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: tableConstants.TABLE_ADD_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const status = 0;
        const type = 0;
        const createdBy = userInfo.username;
        const updatedBy = userInfo.username;
        const updatedTime = new Date();
        const createdTime = new Date();

        canteenId = 1;

        const { data } = await axios.post(`${base_url}/table/addOrUpdate`, { description, canteenId, status, type, createdBy, createdTime, updatedBy, updatedTime }, config)
        dispatch({
            type: tableConstants.TABLE_ADD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: tableConstants.TABLE_ADD_FAIL,
            payload: message,
        })
    }
}


export const editTable = (id, tableNumber, description, canteenId, status, type, createdTime, createdBy) => async (dispatch, getState) => {
    try {
        dispatch({
            type: tableConstants.TABLE_EDIT_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const updatedBy = userInfo.username;
        const updatedTime = new Date();
        canteenId = 1;
        const { data } = await axios.post(`${base_url}/table/addOrUpdate`, { id, tableNumber, description, canteenId, status, type, createdBy, createdTime, updatedBy, updatedTime }, config)
        dispatch({
            type: tableConstants.TABLE_EDIT_SUCCESS,
            payload: data,
        })


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: tableConstants.TABLE_EDIT_FAIL,
            payload: message,
        })
    }
}

export const changeTableStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: tableConstants.TABLE_CHANGE_STATUS_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const { data } = await axios.put(`${base_url}/table/changeStatusTable?status=${status}&tableId=${id}`, {}, config)
        dispatch({
            type: tableConstants.TABLE_CHANGE_STATUS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: tableConstants.TABLE_CHANGE_STATUS_FAIL,
            payload: message,
        })
    }
}
