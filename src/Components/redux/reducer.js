const initialState = {
  post: [],
  userDetails: {},
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "post": {
      return {
        ...state,
        post: action.payload,
      };
    }
    case "username": {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
  }
  return state;
};
