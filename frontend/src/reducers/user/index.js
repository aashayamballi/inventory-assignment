import {
  SET_USER_LOADING,
  SET_USER,
  SET_USER_ERROR,
} from "../../actions/user/types";

const initialState = {
  user: {},
  authenticated: false,
  loading: false,
  error: {
    status: null,
    title: "",
    subTitle: "",
  },
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      const { user, authenticated } = action.payload;
      return {
        ...state,
        user,
        authenticated,
      };
    case SET_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_USER_ERROR:
      const { status, title, subTitle } = action.payload;
      return {
        ...state,
        error: {
          ...state.error,
          title,
          status,
          subTitle,
        },
      };
    default:
      return state;
  }
}
