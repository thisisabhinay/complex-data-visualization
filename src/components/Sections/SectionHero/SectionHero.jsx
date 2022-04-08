import React, { useState, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Search from "../../Search/Search";
import Navbar from "../../Navigations/Navbar/Navbar";
import "./SectionHero.sass";

const SectionHero = () => {
    // STATES
    const [content, setContent] = useState({
        title: "<span>Discover</span> what people are asking about…", 
        description: "Get instant, raw search insights, direct from the minds of your customers", 
        helper: "Enter a topic, brand or product・Use 1-2 words for best results"
    });

    const animations = {};
    
    // FUNCTIONS
    animations.animScrollTo = () => {
        anime({
            targets: ".section-hero [data-anim=\"scroll-to\"]",
            translateY: "300%",
            loop: 2,
            easing: "spring(1, 80, 10, 0)",
            duration: 2000,
            delay: 1500
        });
    };

    animations.revealHeadlines = () => {
        anime({
            targets: ".section-hero [data-anim=\"heading\"]",
            translateX: ["-35%", 0],
            easing: "easeInOutQuad",
            duration: 500,
        });

        anime({
            targets: ".section-hero [data-anim=\"heading\"]",
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 500,
        });
    };

    animations.revealDescription = () => {
        anime({
            targets: ".section-hero [data-anim=\"description\"]",
            translateX: ["35%", 0],
            easing: "easeInOutQuad",
            duration: 500,
        });

        anime({
            targets: ".section-hero [data-anim=\"description\"]",
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 500,
        });
    };

    animations.revealSearch = () => {
        anime({
            targets: ".section-hero [data-anim=\"search\"]",
            translateY: ["50%", 0],
            easing: "easeInOutQuad",
            duration: 500,
            delay: 800
        });

        anime({
            targets: ".section-hero [data-anim=\"search\"]",
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 500,
            delay: 800
        });
    };

    animations.revealNavbar = () => {
        anime({
            targets: ".section-hero [data-anim=\"header\"]",
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1000,
        });
    };

    animations.frostGlass = () => {
        anime({
            targets: ".section-hero [data-anim=\"frosted-glass\"]",
            "backdrop-filter": "blur(3.5rem)",
            easing: "easeOutElastic(1, .6)",
            duration: 3000,
        });
    };

    useEffect(() => {
        animations.frostGlass();   
        animations.revealHeadlines();   
        animations.revealDescription();   
        animations.revealSearch();   
        animations.revealNavbar();   
        animations.animScrollTo(); 
    }, []);

    return (
        <>
            <div className="section section-hero">
                <div data-anim="frosted-glass" className="container">
                    <div data-anim="header" className="section-header">
                        <Navbar />
                        <div className="hr"></div>
                    </div>

                    <div className="wrapper">
                        <h1 data-anim="heading" className="h1">
                            <span className="weigh-bold">Discover</span> what people are asking about…
                        </h1>
                        <h4 data-anim="description" className="h4 weight-regular">
                            {content.description}
                        </h4>
                        <div data-anim="search" className="search-wrapper">
                            <Search />
                        </div>
                        <p  data-anim="search" className="search-helper-text">
                            {content.helper}
                        </p>
                    </div>
                    <div className="scroll-anim">
                        <div data-anim="scroll-to" className="scroll-anim__filled"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionHero;
