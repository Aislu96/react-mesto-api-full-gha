import React, {useState} from "react";
import logo from "../images/logo.svg";
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import Menu from "./Menu";

function Header({user, onSignOut, loggedIn, isMenuActive, showMenu}) {
    const toggleMenu = () => {
        showMenu(!isMenuActive);
    };

    return (
        <header className="header header__page">
            {(loggedIn && isMenuActive) && <Menu
                user={user}
                isMenuActive={isMenuActive}
                signOut={onSignOut}
                isMobile={true}
            />}
            <div className="header__wrapper">
                <Routes>
                    <Route path="/signup" element={
                        <>
                            <Link to="/myprofile" className="header__button"><img src={logo}
                                                                                  className="header__logo"
                                                                                  alt="Логотип проекта Mesto"/></Link>
                            <Link to="/signin" className="header__button header__button_link link">Войти</Link>
                        </>}>
                    </Route>

                    <Route path="/signin" element={
                        <>
                            <Link to="/myprofile" className="header__button"><img src={logo}
                                                                                  className="header__logo"
                                                                                  alt="Логотип проекта Mesto"/></Link>
                            <Link to="/signup"
                                  className="header__button header__button_link link">Регистрация</Link>
                        </>}>
                    </Route>

                    <Route path="/myprofile" element={
                        <>
                            <Link to="/myprofile" className="header__button"><img src={logo}
                                                                                  className="header__logo"
                                                                                  alt="Логотип проекта Mesto"/></Link>
                            <div className="header__menu-wrapper">
                                <Menu
                                    user={user}
                                    isMenuActive={isMenuActive}
                                    signOut={onSignOut}
                                    isMobile={false}
                                />
                                {
                                    loggedIn && (
                                        <button
                                            className={`header__menu-button ${isMenuActive ? 'header__menu-button_active' : ''}`}
                                            onClick={toggleMenu}
                                            type="button"
                                        >
                                            <span/>
                                        </button>)
                                }
                            </div>
                        </>
                    }>
                    </Route>
                </Routes>
            </div>
        </header>
    )
}

export default Header;