import { randomIntFromInterval } from './main.js';

export const plotAreaChart = () => {
    //D3
    console.log(`Plotting Area Chart: ${d3}`);
    
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 50 },
        width = 280 - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#chart-search-volume")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")

    let generateSeedData = () => {
        let upperLimit = 2125453711;
        let domain = [];
        let lowerLimit = Math.floor(0.5 * upperLimit);
        let y;

        for (let x = 0; x < 5; x++) { 
            if (x < 60) continue;

            let a = 1;
            let b = 100;
            let c = 10;
            let d = 100;
            lowerLimit = a * x * x + randomIntFromInterval(-b * x / c, b * x / d);

            domain.push({date: x, value: lowerLimit});
        }

        return domain;
    }

    let data = generateSeedData();

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);
    // svg.append("g")
    //     .attr("transform", `translate(0,${height})`)
    //     .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.value)])
        .range([height, 0]);
    // svg.append("g")
    //     .call(d3.axisLeft(y));

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
            .x(d => x(d.date))
            .y0(y(0))
            .y1(d => y(d.value))
        )
        
};