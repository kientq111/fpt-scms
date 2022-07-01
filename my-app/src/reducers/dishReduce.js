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