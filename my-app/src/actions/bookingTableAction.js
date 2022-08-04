import axios from "axios";
import { bookingTableConstants } from "../constants/Constants";


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

        const { data } = await axios.get(`/bookingTable/getListBookedTable?status&fromEstimateReceiveTime&toEstimateReceiveTime&fromCreatedTime&toCreatedTime&createdBy&canteenId&startFromDate&endFromDate&startToDate&endToDate&userID&pageSize=10&pageIndex=1&type`, config)
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

        const { data } = await axios.put(`/bookingTable/updateStatusBookingTable?bookingTableId=${id}&status=${status}`, {},config)
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