import { message } from "antd";

import {
  SET_PRODUCTS,
  SET_PRODUCT_LOADING,
  SET_DETAIL_PRODUCT,
  SET_PRODUCT_ERROR,
  REMOVE_PRODUCT,
} from "./types";
import { getProducts, deleteProduct } from "./api";
import { dispatchError } from "../general";

export const disaptchProductsList =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: SET_PRODUCT_LOADING, payload: true });
      const result = await getProducts({ search });
      dispatch({ type: SET_PRODUCTS, payload: result });
    } catch (error) {
      message.error("something went wrong while fetching  data");
    } finally {
      dispatch({ type: SET_PRODUCT_LOADING, payload: false });
    }
  };

export const dispatchDetailProduct = (product_id) => async (dispatch) => {
  try {
    dispatch({ type: SET_PRODUCT_LOADING, payload: true });
    const result = await getProducts({ product_id });
    dispatch({ type: SET_DETAIL_PRODUCT, payload: result });
  } catch (error) {
    dispatch(dispatchError(error, SET_PRODUCT_ERROR));
  } finally {
    dispatch({ type: SET_PRODUCT_LOADING, payload: false });
  }
};

export const dispatchProductDeletion = (product_id) => async (dispatch) => {
  try {
    await deleteProduct({ product_id });
    dispatch({ type: REMOVE_PRODUCT, payload: product_id });
  } catch (error) {
    message.error("Something went wrong while deleting the product");
  }
};
