import React from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setOpenClickCard} from "../../store/reminder-slice";
import Reminder from "../reminder/Reminder";

interface CalendarCardProps {
    date: number,
    day: string
}

const CalendarCard:React.FC<CalendarCardProps> = ({day, date})=> {

    const {month,year} = useAppSelector(state => state.datePick)
    const {remindList} = useAppSelector(state => state.reminder)
    const dispatch = useAppDispatch()

    return (
        <div className="card__item" onClick={() => dispatch(setOpenClickCard(date.toString().length === 1 ? '0'+date.toString() : date.toString()))} style={(month === new Date().getMonth() && year === new Date().getFullYear() && date === new Date().getDate()) ? {backgroundColor: 'lightgreen', cursor: 'pointer'} : {cursor: 'pointer'}}>
            <div className="card__head">
                <p className="card__date">
                    {date}
                </p>
                <p className="card__day">
                    {day}
                </p>
            </div>
            <div className="card__body">
                {remindList.map(el => (
                    (+el.date.substring(0,4)=== year) && (+el.date.substring(5,7)-1 === month) && (+el.date.substring(8,10) === date)) ? <Reminder key={el.id} id={el.id} title={el.title}/> : undefined
                )}
            </div>
        </div>
    );
};

export default CalendarCard;