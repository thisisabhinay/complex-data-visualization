import { randomIntFromInterval } from './main.js';

export const plotLinearScale = () => {
    //D3
    let data = [76]

    let width = 280,
        barHeight = 20,
        margin = 1;

    let scale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 100]);

    let svg = d3.select("#chart-kd")
        .append("svg")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    let g = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * barHeight + ")";
        });

    g.append('rect')
        .attr("width", 100)
        .attr("height", barHeight - margin)
        .attr("fill", "#DDD");

    g.append("rect")
        .attr("width", function (d) {
            return scale(d);
        })
        .attr("height", barHeight - margin)
        .attr("fill", "#000");
};