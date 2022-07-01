import { dishConstants } from "../constants/Constants"
import axios from "axios"


export const listDishes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: dishConstants.DISH_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
              
            },
        }
        const { data } = await axios.post(`/dish/getListDish?dishName&status&menuId&subcategoryId&startDate&endDate&createdBy&pageIndex=1&pageSize=10`, {}, config)
        dispatch({
            type: dishConstants.DISH_LIST_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: dishConstants.DISH_LIST_FAIL,
            payload: message,
        })
    }
}