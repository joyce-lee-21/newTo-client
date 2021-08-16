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
        isLoggedIn: false,

        // used for Profile > child components
        citySelection: "",
        venuesResultsArray: [],
        venuesDetailsArray: [],
        savedVenuesArray: [],
        profileView: "categories",

        // category selections saved to the user city_profile
        categoryArray: [],
        // categories to be selected from seed data (foursquare's primary and secondary categories)
        selectCategoryArray: [],
        // categories selected from selectCategoryArray, not yet saved to the user city_profile
        selectedCategoryArray: [],
        categoryArrFirst: 0,
        categoryArrLast: 5,

        // private - external API credentials
        clientId: "TMPN4FQH3UGB0NX5JBBA0B4WBWRYMK51MTOO0YN10JDLDKDQ",
        clientSecret: "FXBLX5RUDZGZC34FNOVMNJTIMTLPTOIAINUO3FYUQNEQKGLN",
        version: "20210801"
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
        changeIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload
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
        },
        changeSelectCategoryArray(state, action) {
            state.selectCategoryArray = action.payload
        },
        changeCategoryArrFirst(state, action) {
            state.categoryArrFirst = action.payload
        },
        changeCategoryArrLast(state, action) {
            state.categoryArrLast = action.payload
        },
        changeSelectedCategoryArray(state, action) {
            state.selectedCategoryArray = action.payload
        },
        changeVenuesResultsArray(state, action) {
            state.venuesResultsArray = action.payload
        },
        changeVenuesDetailsArray(state, action) {
            state.venuesDetailsArray = action.payload
        },

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
    changeIsLoggedIn,
    changeCitySelection,
    changeSavedVenuesArray,
    changeCategoryArray,
    changeProfileView,
    changeSelectCategoryArray,
    changeCategoryArrFirst,
    changeCategoryArrLast,
    changeSelectedCategoryArray,
    changeVenuesResultsArray,
    changeVenuesDetailsArray,

} = usersSlice.actions; 

// exports

export { 
    changeUsernameInput, 
    changePasswordInput, 
    changeNameInput,
    changeCityInput,
    changeUser,
    changeIsLoggedIn,
    changeCitySelection,
    changeSavedVenuesArray,
    changeCategoryArray,
    changeProfileView,
    changeSelectCategoryArray,
    changeCategoryArrFirst,
    changeCategoryArrLast,
    changeSelectedCategoryArray,
    changeVenuesResultsArray,
    changeVenuesDetailsArray,
}

export default usersSlice.reducer;