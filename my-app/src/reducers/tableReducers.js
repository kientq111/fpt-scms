import { tableConstants } from "../constants/Constants";


export const listTableReducer = (state = {}, action) => {
    switch (action.type) {
        case tableConstants.TABLE_LIST_REQUEST:
            return { loading: true }
        case tableConstants.TABLE_LIST_SUCCESS:
            return { loading: false, tables: action.payload }
        case tableConstants.TABLE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case tableConstants.TABLE_LIST_RESET:
            return {}
        default:
            return state
    }
}



export const addTableReducer = (state = {}, action) => {
    switch (action.type) {
        case tableConstants.TABLE_ADD_REQUEST:
            return { loading: true }
        case tableConstants.TABLE_ADD_SUCCESS:
            return { loading: false, table: action.payload, success: true }
        case tableConstants.TABLE_ADD_FAIL:
            return { loading: false, error: action.payload }
        case tableConstants.TABLE_ADD_RESET:
            return {}
        default:
            return state
    }
}


export const editTableReducer = (state = {}, action) => {
    switch (action.type) {
        case tableConstants.TABLE_EDIT_REQUEST:
            return { loading: true }
        case tableConstants.TABLE_EDIT_SUCCESS:
            return { loading: false, table: action.payload, success: true }
        case tableConstants.TABLE_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case tableConstants.TABLE_EDIT_RESET:
            return {}
        default:
            return state
    }
}


export const changeTableStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case tableConstants.TABLE_CHANGE_STATUS_REQUEST:
            return { loading: true }
        case tableConstants.TABLE_CHANGE_STATUS_SUCCESS:
            return { loading: false, table: action.payload, success: true }
        case tableConstants.TABLE_CHANGE_STATUS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

