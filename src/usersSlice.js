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
        // used for SignUp / Login / Account components
        usernameInput: "",
        passwordInput: "",
        nameInput: "",
        cityInput: "",

        // used for all components after Login/Sign Up steps
        user: null,

        // used for Profile > child components
        citySelection: "",
        savedVenuesArray: [],
        categoryArray: [],
        profileView: "",
    },

    reducers: {
        changeUsernameInput(state, action) {
            state.usernameInput = action.payload
        },
        changePasswordInput(state, action) {
            state.passwordInput = action.payload
        },
        changeNameInput(state, action) {
            state.nameInput = action.payload
        },
        changeCityInput(state, action) {
            state.cityInput = action.payload
        },
        changeUser(state, action) {
            state.user = action.payload
        },
        changeCitySelection(state, action) {
            state.citySelection = action.payload
        },
        changeSavedVenuesArray(state, action) {
            state.savedVenuesArray = action.payload
        },
        changeCategoryArray(state, action) {
            state.categoryArray = action.payload
        },
        changeProfileView(state, action) {
            state.profileView = action.payload
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
    changeUser,
    changeCitySelection,
    changeSavedVenuesArray,
    changeCategoryArray,
    changeProfileView,

} = usersSlice.actions; 

// exports

export { 
    changeUsernameInput, 
    changePasswordInput, 
    changeNameInput,
    changeCityInput,
    changeUser,
    changeCitySelection,
    changeSavedVenuesArray,
    changeCategoryArray,
    changeProfileView,
}

export default usersSlice.reducer;