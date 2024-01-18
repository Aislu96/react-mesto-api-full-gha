import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";

function EditAvatarPopup(props) {
    const {values, errors, handleChange, resetValidation, isValid} = useFormValidation({});

    React.useEffect(() => {
        resetValidation();
    }, [props.isOpen, resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(values);
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onClickOverlay={props.onClickOverlay}
            name={"edit_avatar"}
            title={"Обновить аватар"}
            form={"info-avatar"}
            isDisabled={!isValid}
            buttonTitle={props.isLoading ? "Сохранение..." : "Сохранить"}
        >
            <input name="avatar"
                   className={`popup__input popup__input_type_title ${errors.avatar && 'popup__input_type_error'}`}
                   type="url"
                   placeholder="Ссылка на аватар" value={values.avatar || ''} onChange={handleChange} required/>
            <span id="input-url-avatar-error"
                  className={`popup__input-error ${errors.about}`}>{errors.about || ''}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;