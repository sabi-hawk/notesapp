const { createSlice } = require('@reduxjs/toolkit');

const initialState = {};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state = initialState, action) => {
      if (Object.keys(action.payload).length !== 0) {
        return { ...state, user: action.payload };
      }
      return action.payload;
    },
  },
});

export default auth.reducer;
export const { setUser } = auth.actions;
