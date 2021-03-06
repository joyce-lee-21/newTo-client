import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// Async actions
export const fetchPrimaryCats = createAsyncThunk("auth/fetchPrimaryCats", () => {
    return fetch("https://newto-backend.herokuapp.com/primary_categories")
      .then((response) => response.json())
      .then((data) => data);
}); 

// Reducer
const usersSlice = createSlice({
    name: "auth",
    initialState: {
        primaryCategories: [], // array of secondary_categories
        status: "idle", // loading state

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
        addSecondCity: false,
        savedVenuesArray: [],
        completedVenuesArray: [],
        profileView: "categories",

        // used for Results components
        venuesResultsArray: [],
        venuesDetailsArray: [],
        filteredVenueResults: [],
        randomizeCatArray: [],
        randomizeResultsArray: [],
        mapCenter: [],

        // category selections saved to the user city_profile
        categoryArray: [],

        // categories to be selected from seed data (foursquare's primary and secondary categories)
        resCategoryArray: [],
        selectCategoryArray: [],
        filterByPrimaryCategory: 0,

        // categories selected from selectCategoryArray, not yet saved to the user city_profile
        selectedCategoryArray: [],
        categoryArrFirst: 0,
        categoryArrLength: 12,

        // private - external API credentials
        clientId: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
        clientSecret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
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
        changeFilterByPrimaryCategory(state, action) {
            state.filterByPrimaryCategory = action.payload
        },
        changeRandomizeResultsArray(state, action) {
            state.randomizeResultsArray = action.payload
        },
        changeCompletedVenuesArray(state, action) {
            state.completedVenuesArray = action.payload
        },
        changeMapCenter(state, action) {
            state.mapCenter = action.payload
        },
        changeRandomizeCatArray(state, action) {
            state.randomizeCatArray = action.payload
        },
        changeResCategoryArray(state, action) {
            state.resCategoryArray = action.payload
        },
        changeAddSecondCity(state, action) {
            state.addSecondCity = action.payload
        }
    },
    extraReducers: {
        [fetchPrimaryCats.pending](state) {
        state.status = "loading";
        },
        [fetchPrimaryCats.fulfilled](state, action) {
        state.primaryCategories = action.payload;
        state.status = "idle";
        },
    },
})

// Actions
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
    changeFilterByPrimaryCategory,
    changeRandomizeResultsArray,
    changeCompletedVenuesArray,
    changeMapCenter,
    changeRandomizeCatArray,
    changeResCategoryArray,
    changeAddSecondCity,

} = usersSlice.actions; 

// Exports

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
    changeFilterByPrimaryCategory,
    changeRandomizeResultsArray,
    changeCompletedVenuesArray,
    changeMapCenter,
    changeRandomizeCatArray,
    changeResCategoryArray,
    changeAddSecondCity,
}

export default usersSlice.reducer;