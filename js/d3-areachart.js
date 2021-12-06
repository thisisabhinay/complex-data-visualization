import { randomIntFromInterval, metrics } from './main.js';

export const plotAreaChart = () => {
    //D3

    console.log(metrics);

    // append the svg object to the body of the page
    const svg = d3.select("#chart-search-volume")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g");

    let generateSeedData = () => {
        let dataArr = [];
        let base = 0.2;
        let upperLimit = 0;

        const steps = 5;

        for (let i = 1; i < steps; i++) {
            upperLimit = upperLimit < metrics.search_volume ? base * 2 * i : metrics.search_volume;

            dataArr.push({
                date: i,
                value: randomIntFromInterval((base * metrics.search_volume), (upperLimit * metrics.search_volume))
            });

            base = upperLimit;
        }

        return dataArr;
    }

    let data = generateSeedData();

    console.log(data);

    let containerWidth = document.getElementById("chart-search-volume").clientWidth;
    let containerHeight = document.getElementById("chart-search-volume").clientHeight;
    console.log(containerWidth);
    console.log(containerHeight);

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, containerWidth]);
    // svg.append("g")
    //     .attr("transform", `translate(0,${height})`)
    //     .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.value)])
        .range([containerHeight, 0]);
    // svg.append("g")
    //     .call(d3.axisLeft(y));

    // Creating components
    const defs = svg.append("defs")
        .append("linearGradient")
        .attr("id", "grd1")
        .attr("x1", "0")
        .attr("x2", "0")
        .attr("y1", "0")
        .attr("y2", "1")

    defs.append("stop")
        .attr("offset", "5%")
        .attr("stop-color", "#22c1c380");

    defs.append("stop")
        .attr("offset", "95%")
        .attr("stop-color", "#22c1c300")

    // Add the area
    svg.append("path")
        .datum(data)
        .attr("fill", "url(#grd1)")
        .attr("d", d3.area()
            .curve(d3.curveBasis)
            .x(d => x(d.date))
            .y0(y(0))
            .y1(d => y(d.value))
        )

    // Stroke
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .curve(d3.curveBasis)
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.value) })
        );


};