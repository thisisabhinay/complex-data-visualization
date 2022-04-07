import React, { useState } from "react";
import "./Search.sass";
import Button from "../Button/Button";

const Search = () => {
    // STATES
    const [userInput, setUserInput] = useState("");
    
    // FUNCTIONS
    const onEnter = () => {};
    const onExit = () => {};
    const animationEnter = () => {};
    const animationExit = () => {};

    return (
        <>
            <div className="search">
                <input className="search__input h4" type="text" placeholder="Search keyword..." />
                <Button 
                    classList="btn-secondary search__btn"
                    label="Search"
                />
            </div>
        </>
    );
};

export default Search;
