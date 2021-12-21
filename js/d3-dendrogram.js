export const plotDendrogram = () => {
    //D3
    let containerWidth = document.getElementById("chart-column").clientWidth;
    let containerHeight = window.innerHeight;

    let graphLinksCount = {
        level01Count: 0,
        level12Count: 0,
    };


    // Collapse the node and all it's children
    let collapse = (d) => {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    };

    let svg = d3.select("#plot-questions")
        .append("svg")
        .attr("width", containerWidth)
        .attr("heigth", containerHeight)
        .append("g")
        .attr("transform", `translate(${containerWidth / 2}, ${containerHeight/2}) rotate(-170, 0,0)`);

    let radius = containerWidth / 2;

    d3.json("questions_index.json").then(data => {

        // Creating data-structure
        let dataStructure = d3.hierarchy({
            name: "Questions",
            children: data.map(item => {
                /* Data Preparation Stage */
                graphLinksCount.level01Count += 1;
                return {
                    name: item.question_text,
                    children: item.related_questions.map(rq => {
                        graphLinksCount.level12Count += 1;
                        return { name: rq.question };
                    })
                };
            })
        });

        let cluster = d3.cluster().size([2*Math.PI, radius - 100]);

        const root = cluster(dataStructure)
            .sort((a, b) => {
                d3.ascending(a.data.name, b.data.name);
            });
        
        console.log(root);
        
        // Collapse after the second level
        // root.children.forEach(collapse);

        // Drawing Nodes
        svg.append("g").selectAll("circle")
            .data(root.descendants())
            .enter()
            .append('circle')
            .classed('node', true)
            .attr('cx', 0)
            .attr('cy', d => -d.y)
            .attr('r', 2)
            .attr("fill", "lightblue")
            .attr("transform", d => `rotate(${d.x * (180/Math.PI)}, 0, 0)`);

        // Drawing Lines
        let lineGen = d3.lineRadial()
            .angle(d => d.x)
            .radius(d => d.y);

        let linkGen = d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y);

        svg.append("g").selectAll("path")
            .data(root.links())
            .enter()
            .append('path')
            .classed('link', true)
            .attr('stroke', "darkgray")
            .attr('stroke-width', 2)
            .attr("d", linkGen);
            // .attr("d", (d) => lineGen([d.target, d.source]));

        // Drawing Text Labels
        let names = svg.append("g").selectAll("text")
            .data(root.descendants());

        names.enter().append("text")
            .text(d => d.data.name)
            .attr('x', 0)
            .attr('y', d => -d.y)
            .attr("fill", "white")
            .attr("transform", d => `rotate(${d.x * (180/Math.PI)}, 0, 0)`);
    });
};