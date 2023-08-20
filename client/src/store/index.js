import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';

const store = configureStore({
    reducer: {
        blogs: blogReducer
    }
});

export default store;