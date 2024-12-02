import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";

// Set up store using Redux Toolkit
const store = configureStore({
  reducer: rootReducer, // Use rootReducer directly if combining multiple reducers
});

export type RootState = ReturnType<typeof store.getState>; // Infer the state type
export type AppDispatch = typeof store.dispatch; // Infer the dispatch type

export default store;
