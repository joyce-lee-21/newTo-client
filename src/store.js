import { configureStore } from "@reduxjs/toolkit"
import Reducer from "./usersSlice";

const store = configureStore({
    reducer: Reducer
})

export default store;