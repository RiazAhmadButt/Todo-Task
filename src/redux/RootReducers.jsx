import { combineReducers } from 'redux';
import crudReducer from './slice';

const rootReducer = combineReducers({
  todo: crudReducer,
});

export default rootReducer;
