import React from 'react';
import Calendar from "./components/calendar/Calendar";
import Picker from "./components/filters/Picker";
import {useAppSelector} from "./hooks/useAppSelector";
import FormReminder from "./components/form/FormReminder";
import FormDatePick from "./components/form/FormDatePick";


const App = () => {

    const {isOpenRemindForm} = useAppSelector(state => state.reminder)
    const {isOpenDateForm} = useAppSelector(state => state.datePick)

    return (
        <>
        <div className='wrapper' style={isOpenRemindForm || isOpenDateForm ? {filter: 'blur(1px)', transition: 'all 0.25s'} : undefined}>
                <Picker/>
                <Calendar/>
        </div>
            {isOpenRemindForm && <FormReminder/>}
            {isOpenDateForm && <FormDatePick/>}
        </>
    );
};

export default App;