import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user : [],
    loading : false,
    error : "",
    searchData : []
}

// create action (post method)
export const submitForm = createAsyncThunk(
    "form/submitForm", 
    async (formdata)=>{
    const response = await axios.post("https://651bca9f194f77f2a5aedd73.mockapi.io/crud", formdata )
    return response.data
  })

// read action (get method)
export const getUsers =createAsyncThunk(
    'form/getUsers', 
    async ()=>{
    const response = await axios.get("https://651bca9f194f77f2a5aedd73.mockapi.io/crud")    
    return response.data
  })

// Delete action (delete method)
export const deleteUser = createAsyncThunk(
    "form/deleteUser",
    async (id)=>{
    await axios.delete(`https://651bca9f194f77f2a5aedd73.mockapi.io/crud/${id}`)
        return id
    })

// Edit action 
export const updateUser = createAsyncThunk(
    "form/updateUser",
    async (data)=>{
    const response = await axios.put(`https://651bca9f194f77f2a5aedd73.mockapi.io/crud/${data.id}`,data)
    return response.data 
})


const formSlice =  createSlice({
    name : "userDetail",
    initialState,
    reducers : {
        searchUser : (state, action)=>{
            state.searchData = action.payload
        }
    },
    extraReducers : (builder)=>{
        // submit form
        builder.addCase(submitForm.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(submitForm.fulfilled, (state, action)=>{
            state.loading = false
            state.user = action.payload
            state.error = ""
        })
        builder.addCase(submitForm.rejected, (state, action)=>{
            state.loading = false
            state.user = []
            state.error = action.error.message
        })

        // get form data
        builder.addCase(getUsers.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action)=>{
            state.loading = false
            state.user = action.payload
            state.error = ""
        })
        builder.addCase(getUsers.rejected, (state, action)=>{
            state.loading = false
            state.user = []
            state.error = action.error.message
        })

        // delete form data
        builder.addCase(deleteUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = state.user.filter((ele)=> ele.id !== action.payload) ;
            state.error = "";
        })
        builder.addCase(deleteUser.rejected, (state, action)=>{
            state.loading = false
            state.user = []
            state.error = action.error.message
        })

        // update the data form
        builder.addCase(updateUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action)=>{
            state.loading = false
            state.user = state.user.map(ele=> ele.id === action.payload.id ? action.payload : ele) 
            state.error = ""
        })
        builder.addCase(updateUser.rejected, (state, action)=>{
            state.loading = false
            state.user = []
            state.error = action.error.message
        })
    }
})

export const {searchUser} = formSlice.actions
export default formSlice.reducer