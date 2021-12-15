import axios from "axios";
import humps from "humps";

import { API_URL, JWT_TOKEN, AUTH_PREFIX } from "../urls";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `${AUTH_PREFIX} ${JWT_TOKEN}`;

export const getUser = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}user/`,
    });
    return humps.camelizeKeys(response.data);
  } catch (error) {
    throw error;
  }
};
