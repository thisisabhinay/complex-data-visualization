import React, { useState } from "react";
import Search from "../../Search/Search";
import Navbar from "../../Navigations/Navbar/Navbar";
import "./SectionHero.sass";

const SectionHero = () => {
    // STATES
    const [content, setContent] = useState({
        title: "Discover what people are asking about…", 
        description: "Get instant, raw search insights, direct from the minds of your customers", 
        helper: "Enter a topic, brand or product・Use 1-2 words for best results"
    });

    // FUNCTIONS
    const onEnter = () => {};
    const onExit = () => {};
    const animationEnter = () => {};
    const animationExit = () => {};

    return (
        <>
            <div className="section section-hero">
                <div className="container">
                    <Navbar />
                    <div className="wrapper">
                        <h1 className="h1">
                            {content.title}
                        </h1>
                        <h4 className="h4 weight-medium">
                            {content.description}
                        </h4>
                        <div className="search-wrapper">
                            <Search />
                        </div>
                        <p className="search-helper-text">
                            {content.helper}
                        </p>
                    </div>
                    <div className="empty" />
                </div>
            </div>
        </>
    );
};

export default SectionHero;
