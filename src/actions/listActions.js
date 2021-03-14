export const setLists = data => {
  return async dispatch => {
    dispatch({ type: "SET_LISTS", data });
  };
};

export const addList = data => {
  return async dispatch => {
    dispatch({ type: "ADD_NEW_LIST", data });
  };
};

export const updateList = data => {
  return async dispatch => {
    dispatch({ type: "UPDATE_LIST", data });
  };
};
