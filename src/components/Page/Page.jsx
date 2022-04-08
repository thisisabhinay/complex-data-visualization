import React, { useEffect, useState, useRef } from "react";
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

    // const fetchCategories = (query) => { };
    // const generateCategories = () => { };
    // const fetchRelatedKeywords = (query) => { };
    // const generateRelatedKeywords = () => { };
    // const fetchKeywordMetrics = (query) => { };
    // const generateKeywordMetrics = () => { };
    // const fetchDendrogram = (type, query) => { };
    // const generateDendrogram = () => { };
    // const displaySections = () => { };
    // const onEnter = () => { };
    // const onExit = () => { };
    // const animationEnter = () => { };
    // const animationExit = () => { };

    const getScrollPercent = () => {
        var h = document.documentElement,
            b = document.body,
            st = "scrollTop",
            sh = "scrollHeight";
        return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    };

    const sectionHeroRef = useRef();
    const sectionCategoriesRef = useRef();
    const sectionMetricsRef = useRef();
    const sectionPrimaryRelationsRef = useRef();

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.01
    };

    useEffect(()=> {
        const observer = new IntersectionObserver((enteries) => {        
            enteries.forEach(entry => {
                if (entry.isIntersecting) {
                    // entry.target.classList.add("parallel");
                    console.log("Showing:", entry.target);
                    console.log(getScrollPercent());
                }
                else {
                    console.log("To remove:", entry.target);
                    entry.target.classList.remove("parallel");
                }
            });
        } , options);

        observer.observe(sectionHeroRef.current);
        observer.observe(sectionCategoriesRef.current);
        observer.observe(sectionMetricsRef.current);
        observer.observe(sectionPrimaryRelationsRef.current);
    }, []);

    return (
        <>
            <div className="page">
                <SectionHero sectionHeroRef={sectionHeroRef} />
                <SectionCategories sectionCategoriesRef={sectionCategoriesRef} />
                <SectionMetrics sectionMetricsRef={sectionMetricsRef} />
                <SectionPrimaryRelation sectionPrimaryRelationsRef={sectionPrimaryRelationsRef} dataset={dataset} />
            </div>
        </>
    );
};

export default Page;
