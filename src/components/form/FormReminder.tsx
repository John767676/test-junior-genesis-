import React, {useEffect, useRef} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setCurrentReminderToNull, addReminder} from "../../store/reminder-slice";
import {useAppSelector} from "../../hooks/useAppSelector";

type FormTypes = {
    title: string,
    description: string | null,
    date: string,
    time: string | null
}

const FormReminder:React.FC = () => {

    const ref = useRef<HTMLFormElement>(null)

    //перевірка чи є по-перше ref на формі, а по-друге чи НЕ є елемент по якому клікнули в формі (у вигляді ноди)
    const handleClose = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            dispatch(setCurrentReminderToNull());
        }
    };

    const dispatch = useAppDispatch()
    const {year,month} = useAppSelector(state => state.datePick)
    const {date, currentReminder} = useAppSelector(state => state.reminder)

    const { register, handleSubmit, formState: {isValid}} = useForm<FormTypes>({
        defaultValues: {
            title: currentReminder?.title,
            date: currentReminder?.date,
            time: currentReminder?.time,
            description: currentReminder?.description
        }
    })
    const onSubmit: SubmitHandler<FormTypes> = (data) => {
        data.title = data.title.trim()
        dispatch(addReminder({
            id: Date.now(),
            ...data
        }))
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClose);
        return () => {
            document.removeEventListener("mousedown", handleClose);
        };
    }, []);

    return (
        <div className="form__wrapper">
            <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
                <div className="form__header">
                    <p className="form__header-p">Add new idea item</p>
                    <IoMdClose onClick={() => dispatch(setCurrentReminderToNull())} cursor={'pointer'}/>
                </div>
                <label>Title*</label>
                <input {...register("title",{ required: true, maxLength: 35, min: 1 })} />
                <label>Description</label>
                <textarea {...register("description")} style={{height: '100px'}}/>
                <label>Date*</label>
                <input type="date" {...register("date", {required: true})} defaultValue={`${year}-${(month+1).toString().length === 1 ? '0'+(month+1) : month+1}-${date}`}/>
                <label>Time</label>
                <input type="time" {...register("time")}/>
                <button type="submit" disabled={!isValid}>SAVE</button>
            </form>
        </div>
    );
};

export default FormReminder;