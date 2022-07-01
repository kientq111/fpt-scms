import { categoryConstants } from "../constants/Constants"


export const addCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case categoryConstants.CATEGORY_ADD_REQUEST:
            return { loading: true }
        case categoryConstants.CATEGORY_ADD_SUCCESS:
            return { loading: false, categoryInfo: action.payload }
        case categoryConstants.CATEGORY_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const listCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case categoryConstants.CATEGORY_LIST_REQUEST:
        return { loading: true }
        case categoryConstants.CATEGORY_LIST_SUCCESS:
        return { loading: false, categoryInfo: action.payload }
        case categoryConstants.CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }