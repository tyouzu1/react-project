import { combineReducers } from 'redux';
import dashboard from './dashboard';
import user from './user';

export default combineReducers({
  dashboard,
  user,
});
