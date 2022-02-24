import { combineReducers } from "redux";
import { getUsersReducer, actuallyUserReducer } from "./usersReducer";
import { channelsReducer, actuallyChannelReducer } from "./channelsReducer";

export const allReducers = combineReducers({
    getUsersReducer,
    channelsReducer,
    actuallyChannelReducer,
    actuallyUserReducer
})