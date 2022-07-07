import { dishConstants } from "../constants/Constants";


export const dishListReducer = (state = {}, action) => {
  switch (action.type) {
    case dishConstants.DISH_LIST_REQUEST:
      return { loading: true }
    case dishConstants.DISH_LIST_SUCCESS:
      return { loading: false, dishes: action.payload }
    case dishConstants.DISH_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const dishChangeStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case dishConstants.DISH_CHANGE_STATUS_REQUEST:
      return { loading: true }
    case dishConstants.DISH_CHANGE_STATUS_SUCCESS:
      return { loading: false, dishes: action.payload, success: true }
    case dishConstants.DISH_CHANGE_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dishAddReducer = (state = {}, action) => {
  switch (action.type) {
    case dishConstants.DISH_ADD_REQUEST:
      return { loading: true }
    case dishConstants.DISH_ADD_SUCCESS:
      return { loading: false, dishes: action.payload }
    case dishConstants.DISH_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dishEditReducer = (state = {}, action) => {
  switch (action.type) {
    case dishConstants.DISH_EDIT_REQUEST:
      return { loading: true }
    case dishConstants.DISH_EDIT_SUCCESS:
      return { loading: false, dishes: action.payload, success:true }
    case dishConstants.DISH_EDIT_FAIL:
      return { loading: false, error: action.payload }
    case dishConstants.DISH_EDIT_RESET:
      return { }
    default:
      return state
  }
}