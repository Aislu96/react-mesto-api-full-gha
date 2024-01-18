import React from "react"

const Menu = ({ user, signOut, isMobile }) => {

    return (
        <div className={ `header__nav ${ isMobile ? "header__nav_active-mobile" : "header__nav_active-desktop" } ` }>
            { user.email
                ?
                <p className="header__email">
                    { user.email }
                </p>
                : "" }

            <button
                className="header__button_link header__button_link-type link"
                type="button"
                onClick={ signOut }
            >
                Выйти
            </button>
        </div>
    )
}

export default Menu