import React from 'react';
import CalendarCard from "./CalendarCard";
import {useAppSelector} from "../../hooks/useAppSelector";

const Calendar:React.FC = () => {

    const datePick = useAppSelector(state => state.datePick)

    const addSpaces = (date:string):number => {
        switch (date) {
            case 'Mon':
                return 0
            case 'Tue':
                return 1
            case 'Wed':
                return 2
            case 'Thu':
                return 3
            case 'Fri':
                return 4
            case 'Sat':
                return 5
            case 'Sun':
                return 6
            default:
                return 0
        }
    }

    let spaces:number[] = Array(addSpaces(new Date(datePick.year, datePick.month, 1).toLocaleString('en', {weekday: 'short'}))).fill(0)

    const getDaysInMonth = (year:number, month:number) => {
        const days = [];
        const date = new Date(year, month, 1);

        while (date.getMonth() === month) {
            const day = date.getDate();
            const dayOfWeek = date.toLocaleString('en', { weekday: 'short' });
            days.push({ day, dayOfWeek });
            date.setDate(day + 1);
        }
        return days;
    }

    return (
        <div className="calendar__wrapper">
            <div className="card__wrapper">
                {spaces.map((el,i) => (
                    <div className="card__item" key={i}></div>
                ))}
                {getDaysInMonth(datePick.year,datePick.month).map((el,i) => <CalendarCard date={el.day} day={el.dayOfWeek} key={i}/>)}
            </div>
        </div>
    );
};

export default Calendar;