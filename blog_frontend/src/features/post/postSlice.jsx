import { createSlice } from '@reduxjs/toolkit'


export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [], // Initialize posts as an empty array
        title: '',
        content: '',
    },
    reducers: {
        setPosts: (state, action) => {
          state.posts = action.payload; // Set posts to the payload (fetched data)
        },
        setTitle: (state, action) => {
          state.title = action.payload;
        },
        setContent: (state, action) => {
          state.content = action.payload;
        }
    }})



export const { setPosts, setTitle, setContent } = postSlice.actions;


export default postSlice.reducer

