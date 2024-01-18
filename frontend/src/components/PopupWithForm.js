import React from "react";

function PopupWithForm(props) {
    return (
        <>
            <div className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ""}`}
                 onClick={props.onClickOverlay}>
                <div className="popup__body">
                    <button type="button" className="popup__close" onClick={props.onClose}/>
                    <form className="popup__container" name={props.form} onSubmit={props.onSubmit} noValidate>
                        <h3 className="popup__title">{props.title}</h3>
                        {props.children}
                        <button type="submit" className={props.isDisabled ? "popup__button popup__button_type_text popup__button-color" : "popup__button popup__button_type_text"}>
                            {props.buttonTitle}
                            </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PopupWithForm;