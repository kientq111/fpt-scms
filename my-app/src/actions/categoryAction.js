import { categoryConstants } from "../constants/Constants";
import axios from "axios";


export const addCategory = (categoryName, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: categoryConstants.CATEGORY_ADD_REQUEST,
        })
        // Dinamic variable
        const status = '1';

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                //   Authorization: `Bearer ${userInfo.accessToken}`
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1NjU2MTMyNSwiZXhwIjoxNjU2NjA0NTI1fQ.CaDPWriGBmulWZCja5trEfSaxjutoAHz27Y07rxRBT8`
            },
        }

        const { data } = await axios.post(
            '/category/addOrUpdateCategory',
            { categoryName, description, status },
            config
        )

        dispatch({
            type: categoryConstants.CATEGORY_ADD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: categoryConstants.CATEGORY_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}