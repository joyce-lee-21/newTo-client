import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


// Action Creators

// async actions
// export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
//     // return a Promise containing the data we want
//     return fetch("https://localhost:3001/users")
//       .then((response) => response.json())
//       .then((data) => data);
//   }); 

// Reducer

// const usersSlice = createSlice({
// name: "user",
// initialState: {
//     user: {
//         id: 0,
//         name: "",
//         username: "",
//         password: ""
//     }
//     // status: "idle", // loading state
// },

const usersSlice = createSlice({
    name: "auth",
    initialState: {
        usernameInput: "",
        passwordInput: "",
        nameInput: "",
        cityInput: "",
        user: null,
    },

    reducers: {
        changeUsernameInput(state, action) {
            state.usernameInput = action.payload
        },
        changePasswordInput(state, action) {
            state.passwordInput = action.payload
        },
        changeUser(state, action) {
            state.user = action.payload
        }
    },
    // extraReducers: {
    //     // handle async action types
    //     [fetchUsers.pending](state) {
    //     state.status = "loading";
    //     },
    //     [fetchUsers.fulfilled](state, action) {
    //     state.entities = action.payload;
    //     state.status = "idle";
    //     },
    // },
    })

// actions
const { 
    changeUsernameInput, 
    changePasswordInput, 
    changeNameInput,
    changeCityInput,
    changeUser
} = usersSlice.actions; 

// exports

export { 
    changeUsernameInput, 
    changePasswordInput, 
    changeNameInput,
    changeCityInput,
    changeUser
}

export default usersSlice.reducer;