import axios from "axios";
import { bookingTableConstants } from "../constants/Constants";
import { base_url } from "../api/api";

export const listBookingTables = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: bookingTableConstants.BOOKING_TABLE_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const { data } = await axios.get(`${base_url}/bookingTable/getListBookedTable?status&fromEstimateReceiveTime&toEstimateReceiveTime&fromCreatedTime&toCreatedTime&createdBy&canteenId&startFromDate&endFromDate&startToDate&endToDate&userID&pageSize=100&pageIndex=0&type`, config)
        dispatch({
            type: bookingTableConstants.BOOKING_TABLE_LIST_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: bookingTableConstants.BOOKING_TABLE_LIST_FAIL,
            payload: message,
        })
    }
}

export const changeBookingTableStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: bookingTableConstants.BOOKING_TABLE_CHANGE_STATUS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }

        const { data } = await axios.put(`${base_url}/bookingTable/updateStatusBookingTable?bookingTableId=${id}&status=${status}`, {},config)
        dispatch({
            type: bookingTableConstants.BOOKING_TABLE_CHANGE_STATUS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: bookingTableConstants.BOOKING_TABLE_CHANGE_STATUS_FAILGE,
            payload: message,
        })
    }
}