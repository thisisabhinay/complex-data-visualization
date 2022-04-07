import React, { useState } from "react";
import "./Category.sass";

const Category = ({ categoryNum, categoryName, onClick }) => {
    // STATES


    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="category" onClick={onClick}>
                <span className="category__num h2 weight-bold">{categoryNum}</span> 
                <span className="category__name h3 weight-bold">{categoryName}</span>
            </div>
        </>
    );
};

export default Category;
