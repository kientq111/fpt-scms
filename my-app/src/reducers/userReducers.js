import { userConstants, staffConstants } from "../constants/Constants"
//USER ZONEEEE
export const userCheckAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_CHECKACC_REQUEST:
      return { loading: true }
    case userConstants.USER_CHECKACC_SUCCESS:
      return { loading: false, userCheckAccount: action.payload, success: true }
    case userConstants.USER_CHECKACC_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_CHECKACC_RESET:
      return {}
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { loading: true }
    case userConstants.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case userConstants.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { loading: true }
    case userConstants.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case userConstants.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_REGISTER_RESET:
      return {}
    case userConstants.USER_LOGOUT:
      return {}
    default:
      return state
  }
}


export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_LIST_REQUEST:
      return { loading: true }
    case userConstants.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case userConstants.USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}


export const userDeleteReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_DELETE_REQUEST:
      return { loading: true }
    case userConstants.USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case userConstants.USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_REQUEST:
      return { loading: true }
    case userConstants.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, data: action.payload }
    case userConstants.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_UPDATE_RESET:
      return { users: [] }
    default:
      return state
  }
}
//Staff ZONEEEEEEEE~!!!!!
export const staffListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case staffConstants.STAFF_LIST_REQUEST:
      return { loading: true }
    case staffConstants.STAFF_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case staffConstants.STAFF_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const AddStaffReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case staffConstants.STAFF_ADD_REQUEST:
      return { loading: true }
    case staffConstants.STAFF_ADD_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case staffConstants.STAFF_ADD_FAIL:
      return { loading: false, error: action.payload }
    case staffConstants.STAFF_ADD_RESET:
      return {}
    default:
      return state
  }
}


export const ChangeUserStatusReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_CHANGE_STATUS_REQUEST:
      return { loading: true }
    case userConstants.USER_CHANGE_STATUS_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true }
    case userConstants.USER_CHANGE_STATUS_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_CHANGE_STATUS_RESET:
      return {}
    default:
      return state
  }
}


export const verifyAccountReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.VERIFY_CODE_REQUEST:
      return { loading: true }
    case userConstants.VERIFY_CODE_SUCCESS:
      return { loading: false, verifyStatus: action.payload, success: true }
    case userConstants.VERIFY_CODE_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.VERIFY_CODE_RESET:
      return {}
    default:
      return state
  }
}