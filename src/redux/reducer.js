const initialState = {
  numOfuser: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_COUNT":
      return {
        ...state,
        numOfuser: action.payload,
      };
    default:
      return state;
  }
};
