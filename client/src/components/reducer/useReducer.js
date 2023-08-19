export const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    userId: JSON.parse(localStorage.getItem('userId')) || null,
};

export const reducer = (state, action) => {
  let newState;
  switch (action.type) {
      case "SET_USER_ID":
          newState = { ...state, userId: action.payload };
          localStorage.setItem('userId', JSON.stringify(action.payload));
          return newState;
      case "USER":
          newState = { ...state, isLoggedIn: action.payload };
          localStorage.setItem('isLoggedIn', JSON.stringify(action.payload));
          return newState;
      default:
          return state;
  }
};
