import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some((id) => id === currentUser._id);
    const cardLikeButtonClassName = `element__button ${
        isLiked && "element__button_active"
    }`;
    const cardDeleteButtonClassName = `element__delete ${isOwn && "element__delete_active"}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleCardLike() {
        props.onCardLike(props.card);
    }

    function handelDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="element">
            <img src={props.link} alt={props.name} className="element__image" onClick={handleClick}/>
            <button className={cardDeleteButtonClassName}  onClick={handelDeleteClick}/>
            <div className="element__group">
                <h2 className="element__text">{props.name}</h2>
                <div className="element__group_cards">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike} />
                    <p className="element__number">{props.likes}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;