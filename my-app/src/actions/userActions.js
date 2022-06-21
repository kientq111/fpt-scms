import axios from 'axios'
import { userConstants } from '../constants/Constants'
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/login',
      { username, password },
      config
    );
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data.data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: userConstants.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: userConstants.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: userConstants.USER_LOGOUT })
  dispatch({ type: userConstants.USER_DETAILS_RESET })
  document.location.href = '/login'
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
         Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.post(`/getListUser`, {} , config)
    dispatch({
      type: userConstants.USER_LIST_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: userConstants.USER_LIST_FAIL,
      payload: message,
    })
  }
}