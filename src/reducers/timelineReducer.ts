// src/reducers/timelineReducer.ts
import {
  FETCH_TIMELINE_REQUEST,
  FETCH_TIMELINE_SUCCESS,
  FETCH_TIMELINE_FAILURE,
} from "../actions/timelineActions";
import { TimelineState } from "../types/timelineTypes";

// Initial State
const initialState: TimelineState = {
  isLoggedIn: !!sessionStorage.getItem("token"),
  timeline: [],
  loading: false,
  error: null,
};

// Reducer Function
const timelineReducer = (state = initialState, action: any): TimelineState => {
  switch (action.type) {
    case FETCH_TIMELINE_REQUEST:
      return { ...state, loading: true };

    case FETCH_TIMELINE_SUCCESS:
      return {
        ...state,
        loading: false,
        timeline: action.payload.data,
        error: null,
      };

    case FETCH_TIMELINE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default timelineReducer;
