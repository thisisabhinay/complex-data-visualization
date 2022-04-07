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
                <div className="container">
                    <div className="section-header">
                        <div className="breadcrumb">
                            <div className="breadcrumb__item font-body">
                                Keyword
                            </div>
                            <div className="breadcrumb__item">
                                <img src="assets/chevron-right.svg" className="icon-arrow"/>
                            </div>
                            <div className="breadcrumb__item font-body">
                                Related Questions
                            </div>
                        </div>  

                        <img src="assets/close.svg" className="icon-close" onClick={ ()=> onClickClose("a")} />  
                    </div>
                    
                    <div className="wrapper">
                        <img className="sample" src="assets/sample.svg" width="100%" height="auto" /> 
                    </div>

                    <div className="empty"></div>
                </div>
            </div>
        </>
    );
};

export default SectionSecondaryRelation;
