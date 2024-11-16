import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialStateType {
    year: number,
    month: number,
    isOpenDateForm: boolean
}

const initialState: initialStateType = {
    year: localStorage.getItem('year') !== null ? +localStorage.getItem('year')! : new Date().getFullYear(),
    month: localStorage.getItem('month') !== null ? +localStorage.getItem('month')! : new Date().getMonth(),
    isOpenDateForm: false
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(state, action: PayloadAction<string>) {
            state.month = +action.payload.substring(5,7) - 1
            state.year = +action.payload.substring(0,4)
            localStorage.setItem('year', state.year.toString())
            localStorage.setItem('month', state.month.toString())
            state.isOpenDateForm = false
        },
        setFormOpen(state) {
            state.isOpenDateForm = !state.isOpenDateForm
        },
        incrementMonth(state) {
            if (state.month === 11) {
                state.month = 0
                state.year += 1
                localStorage.setItem('year', state.year.toString())
                localStorage.setItem('month', state.month.toString())
            } else {
                state.month += 1
                localStorage.setItem('month', state.month.toString())
            }
        },
        decrementMonth(state) {
            if (state.month === 0) {
                state.month = 11
                state.year -= 1
                localStorage.setItem('year', state.year.toString())
                localStorage.setItem('month', state.month.toString())
            } else {
                state.month -= 1
                localStorage.setItem('month', state.month.toString())
            }
        }
    }
})

export const dateReducer = dateSlice.reducer
export const {setDate, incrementMonth, decrementMonth, setFormOpen} = dateSlice.actions