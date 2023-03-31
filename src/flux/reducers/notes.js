const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setUserNotes: (state = initialState, action) => {
      if (Object.keys(action.payload).length !== 0) {
        return action.payload;
      }
      return action.payload;
    },
  },
});

export default notes.reducer;
export const { setUserNotes } = notes.actions;
