import React, { useState } from "react";
import Category from "./Category/Category";
import "./SectionCategories.sass";

const SectionCategories = ({sectionCategoriesRef}) => {
    // STATES
    const [categories, setCategories] = useState([
        "Category Name",
        "Category Name",
        "Category Name",
        "Category Name",
        "Category Name",
        "Category Name",
        "Category Name"
    ]);

    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    const categoriesComp = categories.map((item, index) => <Category key={index} categoryNum={`0${++index}`} categoryName={item} />);

    return (
        <>
            <div ref={sectionCategoriesRef} className="section section-categories">
                <div className="container">
                    <div className="wrapper">
                        <div className="page-title h1">
                            <p>Seven <em>layers</em> of <br /> <em>categories</em> hierarchy</p>
                        </div>
                        <div className="categories">
                            {categoriesComp}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionCategories;
