import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goal/goalSlice";


export default configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer
    }
});