import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: "" };
const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      const { message, type } = action.payload;
      state.type = type;
      state.message = message;
    },
  },
});

export const { createNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
