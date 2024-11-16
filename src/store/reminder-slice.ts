import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface remindType {
    id: number,
    title: string,
    description: string | null,
    date: string,
    time: string | null,
}

interface initialStateType {
    remindList: remindType[],
    isOpenRemindForm: boolean,
    date: string,
    currentReminder: remindType | null
}

const initialState: initialStateType = {
    remindList: [],
    isOpenRemindForm: false,
    date: new Date().getDate().toString(),
    currentReminder: null
}


const remindSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {
        setOpenClickCard(state,action:PayloadAction<string>) {
            state.isOpenRemindForm = !state.isOpenRemindForm
            state.date = action.payload
        },
        addReminder(state,action:PayloadAction<remindType>) {
            if (state.remindList.find(el => el.id === state.currentReminder?.id)) {
                state.remindList.splice(state.remindList.findIndex(el => el.id === state.currentReminder?.id),1,action.payload)
            } else {
                state.remindList.push(action.payload)
            }
            state.isOpenRemindForm = false
            state.currentReminder = null
        },
        setCurrentReminder(state,action:PayloadAction<remindType>) {
            state.currentReminder = action.payload
        },
        setCurrentReminderToNull(state) {
            state.currentReminder = null
            state.isOpenRemindForm = false
        }
    }
})

export const remindReducer = remindSlice.reducer
export const {setOpenClickCard, addReminder, setCurrentReminder,setCurrentReminderToNull} = remindSlice.actions