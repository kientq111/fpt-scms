import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userLoginReducer, userRegisterReducer,
    userListReducer, userDeleteReducer,
    userUpdateReducer, staffListReducer,
    userCheckAccountReducer, AddStaffReducer
} from '../reducers/userReducers';
import {
    dishListReducer, dishChangeStatusReducer,
    dishAddReducer, dishEditReducer, dishGetByIdReducer
} from '../reducers/dishReduce';
import { addCategoryReducer, listCategoryReducer, listSubCategoryReducer, editCategoryReducer } from '../reducers/categoryReduce';
import { menuListReducer, menuChangeStatusReducer, menuAddReducer, menuEditReducer, menuGetByIdReducer } from '../reducers/menuReducers';
const reducers = combineReducers({
    //ACCOUNT ZONEEE
    userCheckAcc: userCheckAccountReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    staffList: staffListReducer,
    staffAdd: AddStaffReducer,
    //DISH ZONEEEEE
    dishList: dishListReducer,
    dishAdd: dishAddReducer,
    dishChangestatus: dishChangeStatusReducer,
    dishEdit: dishEditReducer,
    dishGetById: dishGetByIdReducer,
    //CATEGORY & SUBCATEGORY ZONEEE
    categoryAdd: addCategoryReducer,
    categoryEdit: editCategoryReducer,
    categoryList: listCategoryReducer,
    subcategoryList: listSubCategoryReducer,
    //MENU ZONEE
    menuList: menuListReducer,
    menuChangeStatus: menuChangeStatusReducer,
    menuAdd: menuAddReducer,
    menuEdit: menuEditReducer,
    menuGetById: menuGetByIdReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const middleware = [thunk]

//get user from local storage
let initialState = {};
if (userInfoFromStorage) {
    initialState = {
        userLogin: { userInfo: userInfoFromStorage.data },
    }
}


const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;