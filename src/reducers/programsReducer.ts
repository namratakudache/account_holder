// programsReducer.ts
import { AnyAction } from 'redux';
import {
  FETCH_PROGRAMS_REQUEST,
  FETCH_PROGRAMS_SUCCESS,
  FETCH_PROGRAMS_FAILURE,
} from '../actions/actionTypes';

interface ProgramsState {
  data: any[]; // Array of program data
  loading: boolean;
  error: string | null;
}

const initialState: ProgramsState = {
  data: [],
  loading: false,
  error: null,
};

const programsReducer = (state = initialState, action: AnyAction): ProgramsState => {
  switch (action.type) {
    case FETCH_PROGRAMS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PROGRAMS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_PROGRAMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default programsReducer;
