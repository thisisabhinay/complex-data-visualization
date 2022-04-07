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
                <span className="category__num">{categoryNum}</span> 
                <span className="category__name">{categoryName}</span>
            </div>
        </>
    );
};

export default Category;
