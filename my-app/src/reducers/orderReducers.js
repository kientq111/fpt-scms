import { orderConstants } from "../constants/Constants";


export const listOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstants.ORDER_LIST_REQUEST:
            return { loading: true }
        case orderConstants.ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case orderConstants.ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const getOrderByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstants.ORDER_GET_BY_ID_REQUEST:
            return { loading: true }
        case orderConstants.ORDER_GET_BY_ID_SUCCESS:
            return { loading: false, orderDetail: action.payload }
        case orderConstants.ORDER_GET_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}