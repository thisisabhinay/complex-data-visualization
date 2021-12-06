export const plotDendrogram = () => {
    //D3

    let containerWidth = document.getElementById("chart-column").clientWidth;
    let containerHeight = document.getElementById("chart-column").clientHeight;

    let svg = d3.select("#plot-questions")
        .append("svg")
        .attr("width", containerWidth)
        .attr("heigth", containerHeight)
        .append("g")
        .attr("transform", `translate(${containerWidth / 2}, ${containerHeight / 2.5})`);

    let radius = containerWidth / 2;

    console.log(radius);

    d3.json("questions_index.json").then(data => {
        console.log(data);
        let family = d3.hierarchy({
            name: "root",
            children: data.map(item => {
                /* Data Preparation Stage */
                return {
                    name: item.question_text,
                    children: item.related_questions.map(rq => {
                        return { name: rq.question };
                    })
                };
            })
        });

        console.log(family);

        let tree = d3.cluster().size([2 * Math.PI, radius - 100]);

        const root = tree(family)
            .sort((a, b) => {
                d3.ascending(a.data.name, b.data.name);
            });

        console.log(family);
        console.log(root.descendants());
        console.log(root.links());
        // console.log(root.labels());

        let information = root;

        let connections = svg.append("g").selectAll("path")
            .data(information.links());

        connections.enter()
            .append("path")
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y));
        //     return d3.linkVertical()({
        //         source: [d.source.x * 100, d.source.y],
        //         target: [d.target.x * 100, d.target.y],
        //     });
        // });

        let names = svg.append("g").selectAll("text")
            .data(information.descendants());

        // names.enter().append("text")
        //     .text(d => d.target.data.name)
        //     .attr("x", d => (d.source.y + d.target.y) / 2)
        //     .attr("y", d => (d.source.x + d.target.x) / 2);

        // names.append("text")
        //     .attr("y", 3)
        //     .attr("x", function (d) { return d.children ? -8 : 8; })
        //     .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
        //     .text(function (d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });

        let linkg = svg.selectAll("g.link")
            .data(information.links())
            .enter().append("g")
            .attr("class", "link");

        linkg.append("path")
            .attr("class", "link")
            .attr("d", "diagonal");

        linkg.append("text")
            .attr("x", d => (d.source.y + d.target.y) / 2)
            .attr("y", d => (d.source.x + d.target.x) / 2)
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.target.data.name;
            });

        let circles = svg.append("g").selectAll("circle")
            .data(information.links());
        circles.enter().append("circle")
            .attr("cx", d => (d.source.y + d.target.y) / 2)
            .attr("cy", d => (d.source.x + d.target.x) / 2)
            .attr("r", 2);
    });
};