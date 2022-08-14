import axios from 'axios'
import { userConstants, staffConstants } from '../constants/Constants'
import { base_url } from '../api/api'


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
      `${base_url}/login`,
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
      `${base_url}/getInfoByUserName?username=${username}`,
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


export const changeUserStatus = (username, status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_CHANGE_STATUS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.put(
      `${base_url}${status == 1 ? "/blockByStatus" : "/unBlockByStatus"}/user?username=${username}`, {},
      config
    );
    dispatch({
      type: userConstants.USER_CHANGE_STATUS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: userConstants.USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const register = (username, email, password, dob, first_name, last_name, gender, phone, address) => async (dispatch, getState) => {
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
      `${base_url}/createUser`,
      { username, email, password, dob, createdBy, first_name, last_name, gender, phone, address, status, type },
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
  dispatch({
    type: userConstants.USER_CHECKACC_RESET,
  })
  localStorage.removeItem('userInfo')
  dispatch({ type: userConstants.USER_LOGOUT })
  dispatch({ type: userConstants.USER_DETAILS_RESET })
  window.location.href = '/';
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
    const { data } = await axios.get(`${base_url}/getListUser?username=&email=&phone=&status=&createBy=&type=&isActive=&createdBy=&dateFrom=&dateUntil=&page=&pageSize=200`, config)
    dispatch({
      type: userConstants.USER_LIST_SUCCESS,
      payload: data.data,
    })
    dispatch({ type: userConstants.USER_UPDATE_RESET })

    dispatch({
      type: userConstants.VERIFY_CODE_RESET,
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

    await axios.delete(`${base_url}/deleteUser/${id}`, config)

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

    const {
      userLogin: { userInfo },
    } = getState()

    const createdBy = "admin";
    const updatedBy = userInfo.username;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`

      },
    }

    const { data } = await axios.put(`${base_url}/updateUser/${id}`, { username, email, dob, first_name, last_name, createdBy, updatedBy, phone, address, gender }, config)

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
    const { data } = await axios.get(`${base_url}/getListStaff?username=&email=&phone=&status=&type=&isActive=&createdBy=&dateFrom=&dateUntil=&page=&pageSize=`, config)
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


export const addStaff = (username, email, password, dob, first_name, last_name, gender, phone, address) => async (dispatch, getState) => {
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
      `${base_url}/createStaff`,
      { username, email, password, dob, first_name, last_name, createdBy, phone, address, status, type, gender },
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

export const verifyAccount = (email, code,) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.VERIFY_CODE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`

      },
    }

    const { data } = await axios.post(`${base_url}/updateUserStatusIsActive?email=${email}&code=${code}`, {}, config)

    dispatch({ type: userConstants.VERIFY_CODE_SUCCESS, payload: data })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: userConstants.VERIFY_CODE_FAIL,
      payload: message,
    })
  }
}
