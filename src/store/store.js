import { configureStore } from "@reduxjs/toolkit";
import ReservationTheoryData from "./slices/ReservationTheoryData";
import userDataSlice from "./slices/userDataSlice";
import departmentListSlice from "./slices/departmentDataSlice";


const store = configureStore({
    reducer: {
        data: ReservationTheoryData,
        userData: userDataSlice,
        departmentList: departmentListSlice,
    }
})

export default store;