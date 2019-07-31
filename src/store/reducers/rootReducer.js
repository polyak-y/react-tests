import {combineReducers} from 'redux'
import quizReducer from './qiuzReducer'
import createReducer from './createQuizReducer';
import authReducer from './authReducer';

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
}) 