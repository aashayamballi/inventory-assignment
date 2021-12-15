import {
  SET_PRODUCTS,
  SET_PRODUCT_LOADING,
  SET_DETAIL_PRODUCT,
  SET_PRODUCT_ERROR,
  REMOVE_PRODUCT,
} from "../../actions/inventory/types";

const initialState = {
  products: [],
  loading: false,
  detailProduct: {},
  error: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_PRODUCT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_DETAIL_PRODUCT:
      return {
        ...state,
        detailProduct: action.payload,
      };
    case SET_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((data) => data.id !== action.payload),
      };
    default:
      return state;
  }
}
