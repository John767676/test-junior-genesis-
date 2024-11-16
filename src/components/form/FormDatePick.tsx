import React, {useEffect, useRef} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setDate, setFormOpen} from "../../store/date-slice";

type FormTypes = {
    inputData: string
}

const FormDatePick:React.FC = () => {

    const ref = useRef<HTMLFormElement>(null)

    //перевірка чи є по-перше ref на формі, а по-друге чи НЕ є елемент по якому клікнули в формі (у вигляді ноди)
    const handleClose = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            dispatch(setFormOpen());
        }
    };

    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: {isValid}} = useForm<FormTypes>()
    const onSubmit: SubmitHandler<FormTypes> = (data) => {
        dispatch(setDate(data.inputData))
    }

    //хук для відслідковування кліків та перевірки на відповідність до функції
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
                    <p className="form__header-p">Select the date</p>
                    <IoMdClose onClick={() => dispatch(setFormOpen())} cursor={'pointer'}/>
                </div>
                <label>Please select the month/year (1900 - 2100)</label>
                <input type='month' {...register("inputData",{required: true,
                    validate: value => {
                    const year = +value.substring(0,4)
                        if (year < 1900 || year > 2100) {
                            return 'Year must be between 1900 and 2100'
                        }
                }
                })}/>
                <button type="submit" disabled={!isValid}>SELECT</button>
            </form>
        </div>
    );
};

export default FormDatePick;