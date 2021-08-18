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
        editStatus: false,
        addCity: false,
        cityProfiles: null,

        // used for all components after Login/Sign Up steps
        user: null,
        isLoggedIn: false,

        // used for Profile > child components
        citySelection: "",
        savedVenuesArray: [],
        profileView: "categories",

        // used for Results components

        venuesResultsArray: [],
        venuesDetailsArray: [],
        filteredVenueResults: [],

        // category selections saved to the user city_profile
        categoryArray: null,
        // categories to be selected from seed data (foursquare's primary and secondary categories)
        selectCategoryArray: [],
        // categories selected from selectCategoryArray, not yet saved to the user city_profile
        selectedCategoryArray: [],
        categoryArrFirst: 0,
        categoryArrLength: 10,

        // CSS class
        classes: "",

        // private - external API credentials
        clientId: "TMPN4FQH3UGB0NX5JBBA0B4WBWRYMK51MTOO0YN10JDLDKDQ",
        clientSecret: "2DBBU5NEY4QZF2DYPXVRUZ5CZJALBQ3QMLNBSWE4V403UFL4",
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
        changeEditStatus(state, action) {
            state.editStatus = action.payload
        },
        changeAddCity(state, action) {
            state.addCity = action.payload
        },
        changeUser(state, action) {
            state.user = action.payload
        },
        changeCityProfiles(state, action) {
            state.cityProfiles = action.payload
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
        changeCategoryArrLength(state, action) {
            state.categoryArrLast = action.payload
        },
        changeSelectedCategoryArray(state, action) {
            state.selectedCategoryArray = action.payload
        },
        changeVenuesResultsArray(state, action) {
            state.venuesResultsArray = action.payload
        },
        changeFilteredVenueResults(state, action) {
            state.filteredVenueResults = action.payload
        },
        changeVenuesDetailsArray(state, action) {
            state.venuesDetailsArray = action.payload
        },
        changeClasses(state, action) {
            state.classes = action.payload
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
    changeCategoryArrLength,
    changeSelectedCategoryArray,
    changeVenuesResultsArray,
    changeVenuesDetailsArray,
    changeFilteredVenueResults,
    changeEditStatus,
    changeAddCity,
    changeCityProfiles,
    changeClasses,

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
    changeCategoryArrLength,
    changeSelectedCategoryArray,
    changeVenuesResultsArray,
    changeVenuesDetailsArray,
    changeFilteredVenueResults,
    changeEditStatus,
    changeAddCity,
    changeCityProfiles,
    changeClasses,
}

export default usersSlice.reducer;