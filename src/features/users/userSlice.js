import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client';
const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
    const response = await client.get('/fakeapi/users/');
    return response.data
})
const users = createSlice({
    name: "users",
    initialState,
    reducers : {

    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            return action.payload;
        })
    }
})



export default users.reducer;