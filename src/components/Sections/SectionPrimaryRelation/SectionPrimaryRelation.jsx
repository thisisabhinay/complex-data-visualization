import React, { useState, useRef } from "react";
import Dendrogram from "../../Dendrogram/Dendrogram";
import SectionSecondaryRelation from "../SectionSecondaryRelation/SectionSecondaryRelation";
import "./SectionPrimaryRelation.sass";

const SectionPrimaryRelation = ({ dataset }) => {
    // STATES
    const RefSectionWrapper = useRef(null);
    const [activeSecondaryRelations, setActiveSecondaryRelations] = useState([]);

    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    const onClickDatapoint = () => {
        console.log("Click");
        setActiveSecondaryRelations(["a"]);
        console.log("State", activeSecondaryRelations);
    };
    
    const onClickClose = (id) => {
        console.log("Closing Section", id);
        setActiveSecondaryRelations([]);
        console.log("State", activeSecondaryRelations);
    };

    return (
        <>
            <div className="section section-primary-relation">
                <div className="container">
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
                    <div className="wrapper" ref={RefSectionWrapper}>
                        {/* <Dendrogram 
                            dataset={dataset} 
                            parentRef={RefSectionWrapper} /> */}

                        <img src="assets/dendrogram.svg" className="sample-img" onClick={ () => onClickDatapoint() } />
                    </div>
                    <div className="empty"></div>
                </div>
                {!!activeSecondaryRelations.length && <SectionSecondaryRelation onClickClose={onClickClose} /> }
            </div>
        </>
    );
};

export default SectionPrimaryRelation;
