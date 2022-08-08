import axios from "axios"
import { dashboardConstants } from "../constants/Constants"
import { userConstants } from "../constants/Constants"
import { logout } from "./userActions"
import { base_url } from "../api/api"

//SUBCATEGORY ZONEEEE
export const getListDashboard = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: userConstants.USER_CHECKACC_RESET,
        })

        dispatch({
            type: dashboardConstants.GET_DASHBOARD_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`${base_url}/dashboard/getDashboardData`, config)
        dispatch({
            type: dashboardConstants.GET_DASHBOARD_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: dashboardConstants.GET_DASHBOARD_FAIL,
            payload: message,
        })

    }
}
