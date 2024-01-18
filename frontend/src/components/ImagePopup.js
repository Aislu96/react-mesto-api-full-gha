import React from "react";

function ImagePopup(props) {
    return(
        <div className={`popup popup_photo_cards ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClickOverlay}>
            <div className="popup__container-cards">
                <button type="button" className="popup__close popup__close_image" aria-label="Закрыть" onClick={props.onClose}/>
                <img type="url" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}
                     className="popup__cards-image"/>
                <h3 className="popup__cards-text">{props.card ? props.card.name : ''}</h3>
            </div>
        </div>
    );
}

export default ImagePopup;