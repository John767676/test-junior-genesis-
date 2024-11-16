import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {dateReducer} from "./date-slice";
import {remindReducer} from "./reminder-slice";


const rootReducer = combineReducers({
    datePick: dateReducer,
    reminder: remindReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch