import axios from 'axios'
import { tableConstants } from '../constants/Constants'


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
        const { data } = await axios.get(`/table/getListTable?tableNumber=&canteenID=&startDate=&endDate=&status=&type=&pageNumber=1&pageSize=100`, config)
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



export const addTable = (tableNumber, description, canteen) => async (dispatch, getState) => {
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

        canteen = {
            "id": 1,
            "canteenName": "Canteen ABC",
            "phone": "01234567",
            "createdDate": "2022-06-26T17:00:00.000+00:00",
            "updatedDate": "2022-06-26T17:00:00.000+00:00",
            "logoUrl": "logo_url",
            "userResponse": {
                "id": 15,
                "username": "admin",
                "email": "admin@gmail.com",
                "dob": "2022-06-05T17:00:00.000+00:00",
                "first_name": "Admin",
                "last_name": "Admin",
                "phone": "012345678",
                "status": "1",
                "type": "1",
                "create_date": "2022-06-08T17:00:00.000+00:00",
                "create_by": "owner",
                "updated_date": "2022-06-08T17:00:00.000+00:00",
                "updated_by": "owner",
                "is_active": true,
                "address": {
                    "id": 14,
                    "street": "Dich Vong Hau",
                    "district": "Cau Giay",
                    "city": "Ha Noi",
                    "country": "Viet Nam"
                }
            }
        }

        const { data } = await axios.post(`/table/addOrUpdate`, { tableNumber, description, canteen, status, type, createdBy, createdTime, updatedBy, updatedTime }, config)
        dispatch({
            type: tableConstants.TABLE_ADD_SUCCESS,
            payload: data,
        })
        dispatch({ type: tableConstants.TABLE_EDIT_RESET })

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

        switch (status) {
            case 1:
                status = 2
                break;
            case 2:
                status = 3
                break;
            case 3:
                status = 1
                break;
            default:
                break;
        }

        const { data } = await axios.put(`/table/changeStatusTable?status=${status}&tableId=${id}`, {}, config)
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
