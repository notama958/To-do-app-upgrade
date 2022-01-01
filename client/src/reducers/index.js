import { combineReducers } from 'redux';
import alert from './alert';
import home from './home';
import dashboard from './dashboard';
import auth from './auth';
// combine all reducer files
export default combineReducers({ alert, home, dashboard, auth });
