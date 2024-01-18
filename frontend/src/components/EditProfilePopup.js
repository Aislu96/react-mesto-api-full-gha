import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";

function EditProfilePopup(props) {
    const {values, errors, handleChange, setValues, resetValidation, isValid} = useFormValidation({});

    React.useEffect(() => {
        resetValidation();
        const values = {};
        setValues(values);
    }, [props.isOpen, setValues, resetValidation]);

    function handelSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(values);
    }

    return (
        <PopupWithForm
            onSubmit={handelSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onClickOverlay={props.onClickOverlay}
            name={"edit_profile"}
            title={"Редактировать профиль"}
            form={"popupForm"}
            isDisabled={!isValid}
            buttonTitle={props.isLoading ? "Сохранение..." : "Сохранить"}
        >
            <input name="name"
                   className={`popup__input popup__input_type_title ${errors.name && 'popup__input_type_error'}`}
                   type="text"
                   placeholder="Имя"
                   minLength="2" maxLength="40" required
                   value={values.name || ''} onChange={handleChange}/>
            <span id="input-name-error" className={`popup__input-error ${errors.name}`}>{errors.name || ''}</span>
            <input name="about"
                   className={`popup__input popup__input_type_title ${errors.about && 'popup__input_type_error'}`}
                   type="text"
                   placeholder="О себе"
                   minLength="2" maxLength="200" required
                   value={values.about || ''} onChange={handleChange}/>
            <span id="input-job-error" className={`popup__input-error ${errors.about}`}>{errors.about || ''}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;