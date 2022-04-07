import React, { useState } from "react";
import "./Button.sass";

const Button = ({ classList, label}) => {
    // STATES


    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className={`font-button btn ${classList} `}>
                {label}
            </div>
        </>
    );
};

export default Button;
