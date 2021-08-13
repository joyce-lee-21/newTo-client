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
        hp_view: "main",
        user: {},
        // status: "idle", // loading state
    },

    reducers: {
        changeUsernameInput(state, action) {
            state.usernameInput = action.payload
        },
        changePasswordInput(state, action) {
            state.passwordInput = action.payload
        },
        changeHpView(state, action) {
            state.hp_view = action.payload
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
    changeHpView, 
    changeUser
} = usersSlice.actions; 

// exports

export { 
    changeUsernameInput, 
    changePasswordInput, 
    changeHpView,
    changeUser
}

export default usersSlice.reducer;