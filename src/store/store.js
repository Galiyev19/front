import { configureStore } from "@reduxjs/toolkit";
import ReservationTheoryData from "./slices/ReservationTheoryData";
import userDataSlice from "./slices/userDataSlice";
import departmentListSlice from "./slices/departmentDataSlice";
import congratEnrollExam from "./slices/congratEnrollExam";

const store = configureStore({
    reducer: {
        data: ReservationTheoryData,
        userData: userDataSlice,
        departmentList: departmentListSlice,
        congratExamEnroll:congratEnrollExam,
    }
})

export default store;