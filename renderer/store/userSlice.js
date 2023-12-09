import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    currentUser: null,
    crmToken: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
            state.isAuthenticated = !!Object.keys(action.payload).length
        },
        login: (state, action) => {
            state.currentUser = action.payload
        },
        logout: (state) => {
            state.currentUser = null
            state.isAuthenticated = false
        }
    } 
})

export const {
    setCurrentUser,
    login,
    logout
} = userSlice.actions

// Selectors
export const selectUser = (state) => state.user.currentUser
export const selectIsAuthenticated = (state) => state.user.isAuthenticated

export default userSlice.reducer