import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'first notification!',
  reducers: {
    setNotification: (state, action) => action.payload
  }
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer