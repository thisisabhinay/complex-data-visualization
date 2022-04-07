import React, { useState } from "react";
import "./Navbar.sass";
import Button from "../../Button/Button";

const Navbar = ({ index, chart, metricName }) => {
    // STATES


    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="navbar-primary">
                <img src="/assets/attryb.svg" className="logo-brand" />
                <div className="navbar-priamry__menu">
                    <Button 
                        classList="btn-primary"
                        label="Book Demo" 
                    />
                </div>
            </div>
        </>
    );
};

export default Navbar;
