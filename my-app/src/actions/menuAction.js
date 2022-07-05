import { menuConstants } from "../constants/Constants"
import axios from "axios"

export const listMenus = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: menuConstants.MENU_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        const { data } = await axios.get(`/menu/getListMenu?menuName&startDate&endDate&createdBy&pageIndex=1&pageSize=10`, config)
        dispatch({
            type: menuConstants.MENU_LIST_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: menuConstants.MENU_LIST_FAIL,
            payload: message,
        })
    }
}
