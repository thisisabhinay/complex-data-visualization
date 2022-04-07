import React, { useState } from "react";
import Navigation from "../../Navigations/Navigation/Navigation";
import RelatedMetric from "../../RelatedMetric/RelatedMetric";
import "./SectionMetrics.sass";

const SectionMetrics = () => {
    // STATES
    const [metrics, setMetrics] = useState([
        { name: "Search Volume", chart: "assets/areaGraph.png", value: "2,456,119" },
        { name: "Keyword Difficulty", chart: "assets/areaGraph.png", value: "86.1" },
        { name: "Cost-Per-Click", chart: "assets/areaGraph.png", value: "$15.7" }
    ]);

    const relatedMetricsList = metrics.map((item, index) => <RelatedMetric index={index} key={index} chart={item.chart} metricName={item.name} metricValue={item.value} />);

    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="section section-metrics">
                <div className="container">
                    <div className="wrapper">
                        <div className="row section-header">
                            <div className="page-title h1 weight-bold">
                                <p>Metrics for <em>keyword</em></p>
                            </div>
                            <div className="metrics-intro__text font-body weight-regular">
                                <p>
                                    To succeed in the future, organizations must abandon pre-pandemic thinking. Balancing new and existing employee expectations, along with the pressures to innovate, be agile, and cultivate deep customer loyalty requires a new approach.
                                </p>
                            </div>
                        </div>

                        <div className="row metrics">
                            {relatedMetricsList}
                        </div>

                        <div className="row">
                            <Navigation />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionMetrics;
