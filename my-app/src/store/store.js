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
import { addCategoryReducer, listCategoryReducer, listSubCategoryReducer, editCategoryReducer, addSubCategoryReducer, editSubCategoryReducer, changeCategoryStatusReducer, changeSubCategoryStatusReducer } from '../reducers/categoryReduce';
import { menuListReducer, menuChangeStatusReducer, menuAddReducer, menuEditReducer, menuGetByIdReducer } from '../reducers/menuReducers';
import { addBlogReducer, listBlogReducer, editBlogReducer, changeBlogStatusReducer, deleteBlogReducer, blogDetailReducer } from '../reducers/blogReducer';
import { listTableReducer, addTableReducer, changeTableStatusReducer, editTableReducer } from '../reducers/tableReducers';
import { listFeedBackReducer, deleteFeedBackReducer } from '../reducers/feedbackReducers';
import { listOrderReducer, getOrderByIdReducer, changeOrderStatusReducer } from '../reducers/orderReducers';
import { listBookingTableReducer, changeBookingTableStatusReducer } from '../reducers/bookingTableReducers';
import { listDashboardReducer } from '../reducers/dashboardReducers';
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
    categoryChangeStatus: changeCategoryStatusReducer,
    subcategoryList: listSubCategoryReducer,
    subCategoryAdd: addSubCategoryReducer,
    subCategoryEdit: editSubCategoryReducer,
    subCategoryChangeStatus: changeSubCategoryStatusReducer,
    //MENU ZONEE
    menuList: menuListReducer,
    menuChangeStatus: menuChangeStatusReducer,
    menuAdd: menuAddReducer,
    menuEdit: menuEditReducer,
    menuGetById: menuGetByIdReducer,
    //BLOG ZONE
    blogAdd: addBlogReducer,
    blogList: listBlogReducer,
    blogEdit: editBlogReducer,
    blogChangeStatus: changeBlogStatusReducer,
    blogDelete: deleteBlogReducer,
    blogDetail: blogDetailReducer,
    //TABLE ZONE
    tableList: listTableReducer,
    tableAdd: addTableReducer,
    tableChangeStatus: changeTableStatusReducer,
    tableEdit: editTableReducer,
    //FEEDBACK ZONE
    feedbackList: listFeedBackReducer,
    feedbackDelete: deleteFeedBackReducer,
    //ORDER ZONEE
    orderList: listOrderReducer,
    orderGetById: getOrderByIdReducer,
    orderChangeStatus: changeOrderStatusReducer,
    //Booking table ZONEE
    bookingTableList: listBookingTableReducer,
    bookingTableChangeStatus: changeBookingTableStatusReducer,
    //Dashboard Zonee
    dashboardList: listDashboardReducer,
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