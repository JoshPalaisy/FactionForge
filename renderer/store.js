import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./store/userSlice";
import langReducer from './store/langSlice';
import chatReducer from './store/chatSlice';

export const store = configureStore({
    reducer: {
        user: useReducer,
        lang: langReducer,
        chat: chatReducer,
    }
})