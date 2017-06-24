import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import listReducer from './list.reducer';
import taskReducer from './task.reducer';
import activeListReducer from './activeList.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  lists: listReducer,
  tasks: taskReducer,
  activeList: activeListReducer
});

export default rootReducer;
