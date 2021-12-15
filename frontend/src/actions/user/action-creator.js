import { SET_USER, SET_USER_LOADING, SET_USER_ERROR } from "./types";
import { getUser } from "./api";
import { dispatchError } from "../general";

export const disaptchUser = () => async (dispatch) => {
  try {
    dispatch({ type: SET_USER_LOADING, payload: true });
    const result = await getUser();
    dispatch({ type: SET_USER, payload: result });
  } catch (error) {
    dispatch(dispatchError(error, SET_USER_ERROR));
  } finally {
    dispatch({ type: SET_USER_LOADING, payload: false });
  }
};
