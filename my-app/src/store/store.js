import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userListReducer, userDeleteReducer, userUpdateReducer, staffListReducer } from '../reducers/userReducers';
import { dishListReducer } from '../reducers/dishReduce';
import { addCategoryReducer } from '../reducers/categoryReduce';
const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    staffList: staffListReducer,
    dishList: dishListReducer,
    categoryAdd: addCategoryReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const middleware = [thunk]

//get user from local storage - something make it not active
const initialState = {
    // userLogin: { userInfo: userInfoFromStorage },
}

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;