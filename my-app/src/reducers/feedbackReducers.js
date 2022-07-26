import { feedbackConstants } from "../constants/Constants"


export const listFeedBackReducer = (state = {}, action) => {
    switch (action.type) {
        case feedbackConstants.FB_LIST_REQUEST:
            return { loading: true }
        case feedbackConstants.FB_LIST_SUCCESS:
            return { loading: false, feedbacks: action.payload }
        case feedbackConstants.FB_LIST_FAIL:
            return { loading: false, error: action.payload }
        case feedbackConstants.FB_LIST_RESET:
            return {}
        default:
            return state
    }
}



export const deleteFeedBackReducer = (state = {}, action) => {
    switch (action.type) {
        case feedbackConstants.FB_DELETE_REQUEST:
            return { loading: true }
        case feedbackConstants.FB_DELETE_SUCCESS:
            return { loading: false, feedbackDelete: action.payload, success: true }
        case feedbackConstants.FB_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case feedbackConstants.FB_DELETE_RESET:
            return {}
        default:
            return state
    }
}