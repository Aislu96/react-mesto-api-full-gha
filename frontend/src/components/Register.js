import React from 'react';
import {Link} from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";

const Register = ({onSignup}) => {
    const {values, errors, handleChange, setValues, resetValidation, isValid} = useFormValidation({});

    React.useEffect(() => {
        resetValidation();
        const values = {};
        setValues(values);
    }, [setValues, resetValidation]);


    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(values);
    }
    return (
        <main>
            <section className="auth">
                <h3 className="auth__title">Регистрация</h3>
                <form className="auth__from" name="from-register" onSubmit={handleSubmit}>
                    <input name="email" className={`auth__input ${errors.email && 'auth__input_type_error'}`}
                           type="email" placeholder="Email" minLength="2"
                           maxLength="40" onChange={handleChange} value={values.email || ''} required/>
                    <span id="email-error" className={`auth__input-error ${errors.email}`}>{errors.email || ''}</span>
                    <input name="password" className={`auth__input ${errors.password && 'popup__input_type_error'}`}
                           type="password" placeholder="Пароль" minLength="2"
                           maxLength="40" onChange={handleChange} value={values.password || ''} required/>
                    <span id="password-error" className={`auth__input-error ${errors.password}`}>{errors.password || ''}</span>
                    <button type="submit" className={!isValid? "auth__button auth__button_text" : "auth__button"} onSubmit={handleSubmit}>Зарегистрироваться</button>
                </form>
                <Link to="/signin" className="auth__text">Уже зарегистрированы? Войти</Link>
            </section>
        </main>
    );
};

export default Register;