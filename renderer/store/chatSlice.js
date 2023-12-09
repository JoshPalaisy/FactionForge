import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeMessage: null
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveMessage: (state, action) => {
            state.activeMessage = action.payload
            console.log(action.payload)
        }
    } 
})

export const {
    setActiveMessage
} = chatSlice.actions

// Selectors
export const selectActiveMessage = (state) => state.activeMessage

export default chatSlice.reducer