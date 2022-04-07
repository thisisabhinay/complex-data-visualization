import React, { useState } from "react";
import "./RelatedMetric.sass";

const RelatedMetric = ({ index, chart, metricName }) => {
    // STATES


    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="related-metric">
                <div className="related-metric__num">0{index}</div>
                <div className="related-metric__chart">
                    <img src={chart} alt="Chart" />
                </div>
                <div className="related-metric__name">{metricName}</div>
            </div>
        </>
    );
};

export default RelatedMetric;
