import { menuConstants } from "../constants/Constants";



export const menuListReducer = (state = {}, action) => {
    switch (action.type) {
        case menuConstants.MENU_LIST_REQUEST:
            return { loading: true }
        case menuConstants.MENU_LIST_SUCCESS:
            return { loading: false, menus: action.payload }
        case menuConstants.MENU_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



export const menuChangeStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case menuConstants.MENU_CHANGE_STATUS_REQUESTA:
            return { loading: true }
        case menuConstants.MENU_CHANGE_STATUS_SUCCESS:
            return { loading: false, menus: action.payload, success: true }
        case menuConstants.MENU_CHANGE_STATUS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



export const menuAddReducer = (state = {}, action) => {
    switch (action.type) {
        case menuConstants.MENU_ADD_REQUEST:
            return { loading: true }
        case menuConstants.MENU_ADD_SUCCESS:
            return { loading: false, menus: action.payload, success: true }
        case menuConstants.MENU_ADD_FAIL:
            return { loading: false, error: action.payload }
        case menuConstants.MENU_ADD_RESET:
            return {}
        default:
            return state
    }
}

export const menuEditReducer = (state = {}, action) => {
    switch (action.type) {
        case menuConstants.MENU_EDIT_REQUEST:
            return { loading: true }
        case menuConstants.MENU_EDIT_SUCCESS:
            return { loading: false, menus: action.payload, success: true }
        case menuConstants.MENU_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case menuConstants.MENU_EDIT_RESET:
            return {}
        default:
            return state
    }
}

export const menuGetByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case menuConstants.MENU_GET_BY_ID_REQUEST:
            return { loading: true }
        case menuConstants.MENU_GET_BY_ID_SUCCESS:
            return { loading: false, menu: action.payload, success: true }
        case menuConstants.MENU_GET_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        case menuConstants.MENU_GET_BY_ID_RESET:
            return {}
        default:
            return state
    }
}
