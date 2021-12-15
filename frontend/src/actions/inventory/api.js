import axios from "axios";
import humps from "humps";

import { API_URL, JWT_TOKEN, AUTH_PREFIX } from "../urls";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `${AUTH_PREFIX} ${JWT_TOKEN}`;

export const getProducts = async ({ search = "", product_id = "" }) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}inventory/product/`,
      params: {
        search,
        product_id,
      },
    });

    return humps.camelizeKeys(response.data);
  } catch (error) {
    throw error;
  }
};

export const getCategory = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}inventory/category/`,
    });

    return humps.camelizeKeys(response.data);
  } catch (error) {
    throw error;
  }
};

export const createProduct = async ({ create_product }) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}inventory/product/`,
      data: {
        create_product,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editProduct = async ({ edit_product_data, product_id }) => {
  try {
    const response = await axios({
      method: "put",
      url: `${API_URL}inventory/product/`,
      data: {
        edit_product_data,
        product_id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async ({ product_id }) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}inventory/product/`,
      data: {
        product_id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
