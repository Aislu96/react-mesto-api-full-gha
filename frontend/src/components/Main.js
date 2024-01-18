import React from "react";
import Card from "./Card";
import vector from "../images/Vector.svg"
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <img src={currentUser.avatar} alt="Изображение аватара."
                         className="profile__avatar"/>
                    <div className="profile__overlay" onClick={props.onEditAvatar}>
                        <img src={vector} className="profile__icon"
                             alt="Иконка для редактирования"/>
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button type="button" onClick={props.onEditProfile} className="profile__edit-button"/>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" onClick={props.onAddPlace} className="profile__add-button"/>
            </section>

            <section className="elements">
                {props.cards.map((card, id) => (
                    <Card
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                        key={id}
                        card={card}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;