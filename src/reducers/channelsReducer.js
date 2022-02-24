import { ADD_MESSAGE_TO_CHANNEL, CREATE_CHANNEL, GET_CAHNNELS, GET_ONE_CHANNEL, ADD_USER_TO_CHANNEL } from "../Actions/channelsActions";

export const channelsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CAHNNELS:
            return [...state, ...action.payload]
        case CREATE_CHANNEL:
            return [action.payload, ...state]
        default:
            return state;
    }
}
export const actuallyChannelReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ONE_CHANNEL:
            return { ...action.payload }
        case ADD_MESSAGE_TO_CHANNEL:
            return { ...state, messages: [...state.messages, action.payload] }
        case ADD_USER_TO_CHANNEL:
            return {...state,members: [...state.members, action.payload]}
        default:
            return state;
    }
}