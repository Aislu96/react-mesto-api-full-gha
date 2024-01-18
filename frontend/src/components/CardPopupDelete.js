import React from "react";
import PopupWithForm from "./PopupWithForm";

function CardPopupDelete(props){
    function handleSubmit(evt) {
        evt.preventDefault();

        props.onDelete(props.card);
    }

    return(
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            form={"popupDelete"}
            name={"delete_card"}
            title={"Вы уверены?"}
            onSubmit={handleSubmit}
            buttonTitle={props.isLoading ? "Удаление..." : "Да"}
            />
    )
}

export default CardPopupDelete;