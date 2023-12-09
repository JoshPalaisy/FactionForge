import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lang: 'en-US'
}

export const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        }
    } 
})

export const {
    setLang
} = langSlice.actions

// Selectors
export const selectLang = (state) => state.lang

export default langSlice.reducer