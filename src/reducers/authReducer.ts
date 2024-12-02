// import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/authActions";

// interface AuthState {
//   token: string | null;
//   user: any | null;
//   error: string | null;
// }

// const initialState: AuthState = {
//   token: null,
//   user: null,
//   error: null,
// };

// const authReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         token: action.payload.token,
//         user: action.payload.user,
//         error: null,
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         error: action.payload.error,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;
// authReducer.ts../actions/actionTypes
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../types/loginTypes";

interface AuthState {
  token: string | null;
  user: any | null;
  error: string | null;
}

// Action types
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
    user: any;
  };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

type AuthActionTypes = LoginSuccessAction | LoginFailureAction;

const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
