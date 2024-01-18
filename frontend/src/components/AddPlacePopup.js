import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";

function AddPlacePopup(props) {
    const {values, errors, handleChange, setValues, resetValidation, isValid} = useFormValidation({});

    React.useEffect(() => {
        resetValidation();
        const values = {};
        setValues(values);
    }, [props.isOpen, setValues, resetValidation]);

    function handelSubmit(e) {
        e.preventDefault();
        props.onAddPlace(values);
    }

    return (
        <PopupWithForm
            onSubmit={handelSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onClickOverlay={props.onClickOverlay}
            name={"add_place"}
            title={"Новое место"}
            form={"form-info"}
            isDisabled={!isValid}
            buttonTitle={props.isLoading ? "Создание..." : "Создать"}
        >
            <input name="title"
                   className={`popup__input popup__input_type_title ${errors.title && 'popup__input_type_error'}`}
                   type="text"
                   placeholder="Название"
                   minLength="2" maxLength="30" onChange={handleChange} value={values.title || ''} required/>
            <span id="title-error" className={`popup__input-error ${errors.title}`}>{errors.title || ''}</span>
            <input name="link"
                   className={`popup__input popup__input_type_title ${errors.link && 'popup__input_type_error'}`}
                   type="url"
                   placeholder="Ссылка на картинку" onChange={handleChange} value={values.link || ''} required/>
            <span id="link-error" className={`popup__input-error ${errors.link}`}>{errors.link || ''}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;