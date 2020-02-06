import { combineReducers } from 'redux';
import { PagesReducer } from './reduxPages/pagesReducer'

export default combineReducers({
    page: PagesReducer,
})