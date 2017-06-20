import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import listReducer from './list.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  lists: listReducer
});

export default rootReducer;
