// all states here 
export const initialState = {
    usernameInput: "",
    passwordInput: "",
    hp_view: "main",
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_USERNAME_INPUT": 
        return {
            ...state, usernameInput: action.payload
        }
        
        case "CHANGE_PASSWORD_INPUT": 
        return {
            ...state, passwordInput: action.payload
        }
        
        case "CHANGE_HOMEPAGE_VIEW": 
        return {
            ...state, hp_view: action.payload
        }
        
    } 
    return state
}