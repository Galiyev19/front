import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    userData: [],
    error: "Error",

};

const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setDataUser: (state,action) => {
        state.userData = action.payload
        const obj = JSON.stringify(action.payload.fields)
        sessionStorage.setItem("user",obj)
    }
  },

});

export const {setDataUser} = userData.actions
export default userData.reducer;
