import React, {useState, useCallback} from "react";

function useFormValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (e) => {
        const {value, name} = e.target;
        const error = e.target.validationMessage;
        setValues((values) => ({...values, [name]: value}));
        setErrors((errors) => ({...errors, [name]: error}));
        const isValid = e.target.closest('form').checkValidity();
        setIsValid(isValid);
    }

    const resetValidation = React.useCallback(
            (values = {}, errors = {}, isValid = false) => {
                setValues(values);
                setErrors(errors);
                setIsValid(isValid);
            }, [setValues, setErrors, setIsValid]);


    return {
        values, errors, handleChange, setValues, setErrors, resetValidation, isValid
    };
}

export default useFormValidation;

