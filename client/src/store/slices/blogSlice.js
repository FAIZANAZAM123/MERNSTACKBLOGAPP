import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchblogs=createAsyncThunk('blogs/fetchBlogs',async()=>{
    const response = await fetch('/getBlogs', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });


    const data = await response.json();

    if (response.status !== 200 || !data) {
        throw new Error(data.error || "Error fetching blogs");
    }

    return data.blogs;

});
export const fetchUserBlogs = createAsyncThunk(
    'blogs/fetchUserBlogs',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/user/${userId}`);
            const data = await response.json();

            if (!response.ok) {
                console.log("NO BLOGS TP SHOW");

                throw new Error(data.message);
            }

            return data.user.blogs;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        allBlogs: {
            items: [],
            status: 'idle',
            error: null
        },
        userBlogs: {
            items: [],
            status: 'idle',
            error: null
        },
      

    },
   
    extraReducers: {
        [fetchblogs.pending]: (state, action) => {
            state.allBlogs.status = 'loading';
        },
        [fetchblogs.fulfilled]: (state, action) => {
            state.allBlogs.status = 'succeeded';
            state.allBlogs.items = action.payload;
        },
        [fetchblogs.rejected]: (state, action) => {
            state.allBlogs.status = 'failed';
            state.allBlogs.error = action.error.message;
        },
        [fetchUserBlogs.pending]: (state, action) => {
            state.userBlogs.status = 'loading';
        },
        [fetchUserBlogs.fulfilled]: (state, action) => {
            state.userBlogs.status = 'succeeded';
            state.userBlogs.items = action.payload;
        },
        [fetchUserBlogs.rejected]: (state, action) => {
            state.userBlogs.status = 'failed';
            state.userBlogs.error = action.error.message;
        }
    }
});

export default blogSlice.reducer;
