import React from 'react';
import useFormValidation from "../hooks/useFormValidation";

const Login = ({onSignin}) => {
    const {values, errors, handleChange, setValues, resetValidation, isValid} = useFormValidation({});

    React.useEffect(() => {
        resetValidation();
        const values = {};
        setValues(values);
    }, [setValues, resetValidation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignin(values);
    }

    return (
        <main>
            <section className="auth">
                <h3 className="auth__title">Вход</h3>
                <form className="auth__from" name="from-login" onSubmit={handleSubmit}>
                    <input name="email" className={`auth__input ${errors.email && 'auth__input_type_error'}`}
                           type="email" placeholder="Email" minLength="2"
                           maxLength="40" onChange={handleChange} value={values.email || ''} required/>
                    <span id="email-error" className={`auth__input-error ${errors.email}`}>{errors.email || ''}</span>
                    <input name="password" className={`auth__input ${errors.password && 'popup__input_type_error'}`}
                           type="password" placeholder="Пароль" minLength="2"
                           maxLength="40" onChange={handleChange} value={values.password || ''} required/>
                    <span id="password-error" className={`auth__input-error ${errors.password}`}>{errors.password || ''}</span>
                    <button type="submit" className={!isValid? "auth__button auth__button_text" : "auth__button"} onSubmit={handleSubmit}>Войти</button>
                </form>
            </section>
        </main>
    );
};

export default Login;