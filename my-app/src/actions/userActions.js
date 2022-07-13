import axios from 'axios'
import { userConstants, staffConstants } from '../constants/Constants'

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
    if (data.success === true) {
      localStorage.setItem('userInfo', JSON.stringify(data))
    }


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

export const checkAccount = (username) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_CHECKACC_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `/getInfoByUserName?username=${username}`,
      config
    );
    dispatch({
      type: userConstants.USER_CHECKACC_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: userConstants.USER_CHECKACC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (username, email, password, dob, first_name, last_name, phone, address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    })
    // Dinamic variable
    const status = '1';
    const type = '1';
    const {
      userLogin: { userInfo },
    } = getState()

    const createdBy = userInfo.username;
    const config = {
      headers: {

        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`
      },
    }

    const { data } = await axios.post(
      '/createUser',
      { username, email, password, dob, createdBy, first_name, last_name, phone, address, status, type },
      config
    )

    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: data,
    })

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
  document.location.href = '/'
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    // const userFromLocal = localStorage.getItem("userInfo");
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.get(`/getListUser?username=&email=&phone=&status=&createBy=&type=&isActive=&createdBy=&dateFrom=&dateUntil=&page=&pageSize=100`, config)
    dispatch({
      type: userConstants.USER_LIST_SUCCESS,
      payload: data.data,
    })
    dispatch({ type: userConstants.USER_UPDATE_RESET })
    dispatch({
      type: userConstants.USER_CHECKACC_RESET,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: userConstants.USER_LIST_FAIL,
      payload: message,
    })
  }
}


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    await axios.delete(`/deleteUser/${id}`, config)

    dispatch({ type: userConstants.USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: userConstants.USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateUser = (id, username, email, dob, first_name, last_name, phone, address, gender) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_UPDATE_REQUEST,
    })
    const createdBy = "";
    const updatedBy = "";
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`

      },
    }

    const { data } = await axios.put(`/updateUser/${id}`, { username, email, dob, first_name, last_name, createdBy, updatedBy, phone, address, gender }, config)

    dispatch({ type: userConstants.USER_UPDATE_SUCCESS, payload: data })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: userConstants.USER_UPDATE_FAIL,
      payload: message,
    })
  }
}


export const listStaff = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: staffConstants.STAFF_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {

        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.get(`/getListStaff?username=&email=&phone=&status=1&type=&isActive=&createdBy=&dateFrom=&dateUntil=&page=&pageSize=`, config)
    dispatch({
      type: staffConstants.STAFF_LIST_SUCCESS,
      payload: data.data,
    })
    dispatch({ type: userConstants.USER_UPDATE_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: staffConstants.STAFF_LIST_FAIL,
      payload: message,
    })
  }
}


export const addStaff = (username, email, password, dob, first_name, last_name, phone, address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: staffConstants.STAFF_ADD_REQUEST,
    })
    // Dinamic variable
    const status = '1';
    const type = '1';
    const {
      userLogin: { userInfo },
    } = getState()
    const createdBy = userInfo.username;
    const config = {
      headers: {

        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`
      },
    }

    const { data } = await axios.post(
      '/createStaff',
      { username, email, password, dob, first_name, last_name, createdBy, phone, address, status, type },
      config
    )

    dispatch({
      type: staffConstants.STAFF_ADD_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: staffConstants.STAFF_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}