import React, { useState, useRef } from "react";
import Dendrogram from "../../Dendrogram/Dendrogram";
import "./SectionSecondaryRelation.sass";

const SectionSecondaryRelation = ({ dataset, onClickClose }) => {
    // STATES
    const RefSectionWrapper = useRef(null);

    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="section section-secondary-relation">
                <div className="container" onClick={ ()=> onClickClose("a")}>
                    <div className="wrapper">

                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionSecondaryRelation;
