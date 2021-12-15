export const dispatchError = (error, dispatchAction) => async (dispatch) => {
  const { status, statusText } = error.response;

  let payloadData = {
    status,
    title: statusText,
  };

  if (status === 403) {
    dispatch({
      type: dispatchAction,
      payload: {
        ...payloadData,
        subTitle: "Please login to access the application!",
      },
    });
  }
  if (status === 404) {
    dispatch({
      type: dispatchAction,
      payload: {
        ...payloadData,
        subTitle: "OOOPS! we did not find this in our server",
      },
    });
  }

  if (status === 500) {
    dispatch({
      type: dispatchAction,
      payload: {
        ...payloadData,
        subTitle:
          "OOOPS! something went wrong. we're working on fixing this issue",
      },
    });
  }
};
