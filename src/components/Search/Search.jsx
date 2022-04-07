import React, { useState } from "react";
import "./Search.sass";

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
                <input type="text" placeholder="Search keyword..." />
                <button type="submit">Search</button>
            </div>
        </>
    );
};

export default Search;
