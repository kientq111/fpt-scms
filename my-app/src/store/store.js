import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducers';


const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

const middleware = [thunk]
const initialState = {}


const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;