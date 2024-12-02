import { combineReducers } from "redux";

import accountReducer from "./accountReducer"; // example of another reducer
import statementsReducer from "./statementsReducer";
import timelineReducer from "./timelineReducer";
import authReducer from "./authReducer";
import programsReducer from "./programsReducer";
import transactionReducer from "./transactionReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  program: programsReducer,
  account: accountReducer,
  timeline: timelineReducer,
  statements: statementsReducer,
  transactions: transactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
