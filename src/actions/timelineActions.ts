// src/actions/timelineActions.ts
import { Dispatch } from "redux";
import { TimelineResponse } from "../types/timelineTypes";

// Action Types
export const FETCH_TIMELINE_REQUEST = "FETCH_TIMELINE_REQUEST";
export const FETCH_TIMELINE_SUCCESS = "FETCH_TIMELINE_SUCCESS";
export const FETCH_TIMELINE_FAILURE = "FETCH_TIMELINE_FAILURE";

// Action Creators with Typing
export const fetchTimelineRequest = () => ({
  type: FETCH_TIMELINE_REQUEST,
});

export const fetchTimelineSuccess = (data: TimelineResponse) => ({
  type: FETCH_TIMELINE_SUCCESS,
  payload: data,
});

export const fetchTimelineFailure = (error: string) => ({
  type: FETCH_TIMELINE_FAILURE,
  payload: error,
});

// Thunk Action to Fetch Timeline Data
export const fetchTimeline = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchTimelineRequest());

    try {
      const token = sessionStorage.getItem("token"); // Get token from sessionStorage
      if (!token) {
        throw new Error("User is not logged in");
      }

      const response = await fetch(
        "https://sandbox-apiconnect.42cards.in/pismo-api/events/v1/timeline?page=1&perPage=20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch timeline");
      }

      const data: TimelineResponse = await response.json();
      dispatch(fetchTimelineSuccess(data));
    } catch (error: any) {
      dispatch(fetchTimelineFailure(error.message));
    }
  };
};
