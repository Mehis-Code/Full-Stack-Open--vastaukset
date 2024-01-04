import { createSlice } from "@reduxjs/toolkit"

const filtSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        Applyfilter: (state, action) => action.payload
    }
})

export const { Applyfilter } = filtSlice.actions

export default filtSlice.reducer