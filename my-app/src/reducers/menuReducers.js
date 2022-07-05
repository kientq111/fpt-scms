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