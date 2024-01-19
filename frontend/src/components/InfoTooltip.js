import React from 'react';
import union from "../images/Union.svg";
import error from "../images/autoUnion.svg";

const InfoTooltip = (props) => {
    return (
        <>
            <div className={`popup popup_infoTooltip ${props.isOpen ? `popup_opened` : ""}`}
                 onClick={props.onClickOverlay}>
                <div className="popup__body">
                    <button type="button" className="popup__close" onClick={props.onClose}/>
                    <form className="popup__container">
                        <img className="popup__image" src={props.isModal ? union : error} alt="Эмблема регистрации"/>
                        <h3 className="popup__title">
                            {props.isModal ?
                                "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
                            }
                        </h3>
                    </form>
                </div>
            </div>
        </>
    );
};

export default InfoTooltip;