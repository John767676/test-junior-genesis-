import React from 'react';
import { FaRegCalendar } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {decrementMonth, incrementMonth, setFormOpen} from "../../store/date-slice";
import {setOpenClickCard} from "../../store/reminder-slice";

const Picker = () => {

    const {year,month} = useAppSelector(state => state.datePick)
    const dispatch = useAppDispatch()

    const numToString = (month:number):string => {
        switch (month) {
            case 0:
                return 'January'
            case 1:
                return 'February'
            case 2:
                return 'March'
            case 3:
                return 'April'
            case 4:
                return 'May'
            case 5:
                return 'June'
            case 6:
                return 'July'
            case 7:
                return 'August'
            case 8:
                return 'September'
            case 9:
                return 'October'
            case 10:
                return 'November'
            case 11:
                return 'December'
            default:
                return 'Not found'

        }
    }

    const handleClickDecreaseMonth = () => {
        dispatch(decrementMonth())
    }

    const handleClickIncreaseMonth = () => {
        dispatch(incrementMonth())
    }

    return (
        <div className="picker__wrapper">
            <button className="picker__add-button" onClick={() => dispatch(setOpenClickCard(''))}>
                Add the reminder
            </button>
            <div className="picker__select-month">
                <FaChevronLeft size={14} cursor={'pointer'} onClick={() => handleClickDecreaseMonth()}/>
                <p className="picker__select-p">
                    {numToString(month)} {year}
                </p>
                <FaChevronRight size={14} cursor={'pointer'} onClick={() => handleClickIncreaseMonth()} />
            <FaRegCalendar size={22} cursor={'pointer'} onClick={() => dispatch(setFormOpen())}/>
            </div>
        </div>
    );
};

export default Picker;