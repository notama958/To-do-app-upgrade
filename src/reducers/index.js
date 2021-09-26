import { combineReducers } from 'redux';
import alert from './alert';
// import dashboard from './dashboard';
import home from './home';
import dashboard from './dashboard';
export default combineReducers({ alert, home, dashboard });
