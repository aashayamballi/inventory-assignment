import { combineReducers } from "redux";

import inventoryReducer from "./inventory";
import userReducer from "./user";

// project imports

export default combineReducers({
  inventoryReducer,
  userReducer,
});
