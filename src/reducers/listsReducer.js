const initialState = {
  lists: [],
};

const storeLocallyAndReturn = store => {
  localStorage.setItem('trello-clone-lists', JSON.stringify(store))
  return store
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LISTS": {
      const store = { ...state, lists: action.data }
      return storeLocallyAndReturn(store);
    }
    case "ADD_NEW_LIST": {
      const store = { ...state, lists: [...state.lists, action.data] };
      return storeLocallyAndReturn(store);
    }

    case "UPDATE_LIST": {
      const store = { ...state, lists: state.lists.map(l => (l.id === action.data.id ? action.data : l)) }
      return storeLocallyAndReturn(store);
    }
    default:
      return state;
  }
};

export default listsReducer;
