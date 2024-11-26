import { combineReducers } from "redux";
import authReducer from "./authReducer";
import programsReducer from "./programsReducer";
import accountReducer from "./accountReducer";
import timelineReducer from "./timelineReducer";
import { statementReducer } from "./statementReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  programs: programsReducer,
  account: accountReducer,
  timeline: timelineReducer,
  statements: statementReducer,
  transaction: transactionReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
