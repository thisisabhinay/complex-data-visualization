import React, { useState } from "react";
import "./Navigation.sass";

const Navigation = () => {
    // STATES


    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="navigation">
                <div className="navigation-wrapper h4 weight-regular">
                    <div className="navigation__item">Related Questions</div>
                    <div className="navigation__item divider">|</div>
                    <div className="navigation__item">Comparisons</div>
                    <div className="navigation__item divider">|</div>
                    <div className="navigation__item">Prepositions</div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
