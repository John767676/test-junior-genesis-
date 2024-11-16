import React from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {setCurrentReminder} from "../../store/reminder-slice";

interface ReminderTypes {
    id: number,
    title: string
}

const Reminder:React.FC<ReminderTypes> = ({id,title}) => {

    const {remindList} = useAppSelector(state => state.reminder)
    const dispatch = useAppDispatch()

    return (
        <p className='card__body-p' onClick={() => dispatch(setCurrentReminder(remindList.filter(el => el.id === id)[0]))}>
            {title}
        </p>
    );
};

export default Reminder;