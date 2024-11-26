// actions.ts
import { Dispatch } from 'redux';
import { fetchPrograms } from '../services/apiService'; // Import the fetch function
import {
  FETCH_PROGRAMS_REQUEST,
  FETCH_PROGRAMS_SUCCESS,
  FETCH_PROGRAMS_FAILURE,
} from './actionTypes';

// Action to fetch programs
export const fetchProgramsData = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_PROGRAMS_REQUEST }); // Dispatching loading state

  try {
    const data = await fetchPrograms(); // Call the function to fetch data
    dispatch({
      type: FETCH_PROGRAMS_SUCCESS,
      payload: data, // Send fetched data to the store
    });
  } catch (error:any) {
    dispatch({
      type: FETCH_PROGRAMS_FAILURE,
      payload: error.message, // Handle error
    });
  }
};
