import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Page/Page.sass";
import SectionHero from "../Sections/SectionHero/SectionHero";
import SectionCategories from "../Sections/SectionCategories/SectionCategories";
import SectionMetrics from "../Sections/SectionMetrics/SectionMetrics";
import SectionPrimaryRelation from "../Sections/SectionPrimaryRelation/SectionPrimaryRelation";


const Page = () => {
    // STATES
    const [userQuery, setUserQuery] = useState("");
    const [dataset, setDataset] = useState([]);

    console.log("dataset", dataset);

    useEffect(() => {
        axios
            .get("http://localhost:3002/questions")
            .then(res => setDataset(res.data));
        console.log("dataset", dataset);
    }, []);

    // FUNCTIONS
    const showSearchResults = (query) => {
        console.log("User Sent Query", query);
    };

    const fetchCategories = (query) => { };
    const generateCategories = () => { };
    const fetchRelatedKeywords = (query) => { };
    const generateRelatedKeywords = () => { };
    const fetchKeywordMetrics = (query) => { };
    const generateKeywordMetrics = () => { };
    const fetchDendrogram = (type, query) => { };
    const generateDendrogram = () => { };
    const displaySections = () => { };
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="page">
                <SectionHero />
                <SectionCategories />
                <SectionMetrics />
                <SectionPrimaryRelation dataset={dataset} />
            </div>
        </>
    );
};

export default Page;
