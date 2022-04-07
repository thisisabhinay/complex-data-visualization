import React, { useState } from "react";
import "./RelatedMetric.sass";

const RelatedMetric = ({ index, chart, metricName, metricValue }) => {
    // STATES


    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="related-metric-wrapper">
                <div className="related-metric">
                    <div className="related-metric__name weight-bold h4">{metricName}</div>
                    <div className="related-metric__chart">
                        <img src={chart} alt="Chart" className="chart-img" />
                    </div>
                    <div className="related-metric__value weight-bold h2">
                        <span>{metricValue}</span>
                    </div>
                </div>

                <div className="related-metric-detail">
                    <div className="related-metric__num weight-bold h4">{++index}</div>
                    <div className="related-metric__content">
                        <p className="content-heading weight-bold h4">{metricName}</p>
                        <p className="content-text weight-regular font-small">
                            To succeed in the future, organizations must abandon pre-pandemic thinking.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RelatedMetric;
