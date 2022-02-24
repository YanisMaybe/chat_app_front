import { CHANGE_USER_PICTURE, GET_ONE_USER, GET_USERS } from '../Actions/usersActions'

export const getUsersReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USERS:
            return [...state, ...action.payload]
        default:
            return state
    }
}
export const actuallyUserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ONE_USER:
            return {...action.payload}
        case CHANGE_USER_PICTURE:
            return {...state,picture:action.payload}
        default:
            return state;
    }
}