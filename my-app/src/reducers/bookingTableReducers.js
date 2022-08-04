import { bookingTableConstants } from "../constants/Constants";

export const listBookingTableReducer = (state = {}, action) => {
    switch (action.type) {
        case bookingTableConstants.BOOKING_TABLE_LIST_REQUEST:
            return { loading: true }
        case bookingTableConstants.BOOKING_TABLE_LIST_SUCCESS:
            return { loading: false, bookingTables: action.payload }
        case bookingTableConstants.BOOKING_TABLE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const changeBookingTableStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case bookingTableConstants.BOOKING_TABLE_CHANGE_STATUS_REQUEST:
            return { loading: true }
        case bookingTableConstants.BOOKING_TABLE_CHANGE_STATUS_SUCCESS:
            return { loading: false, bookingTableStatus: action.payload, success: true }
        case bookingTableConstants.BOOKING_TABLE_CHANGE_STATUS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

