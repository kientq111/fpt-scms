import { dashboardConstants } from "../constants/Constants";


export const listDashboardReducer = (state = {}, action) => {
    switch (action.type) {
        case dashboardConstants.GET_DASHBOARD_REQUEST:
            return { loading: true }
        case dashboardConstants.GET_DASHBOARD_SUCCESS:
            return { loading: false, dashboardInfo: action.payload, success: true }
        case dashboardConstants.GET_DASHBOARD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}