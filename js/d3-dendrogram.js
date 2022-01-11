export const plotDendrogram = () => {
    //D3
    let containerWidth = document.getElementById("chart-column").clientWidth;
    let containerHeight = window.innerHeight;

    let graphLinksCount = {
        level01Count: 0,
        level12Count: 0,
    };

    let curAngle = 0;
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
        .call(d3.zoom().on('zoom', e => {
            console.log(e);
            svg.attr('transform', e.transform);
        }))
        // .on('mousedown', e => {
        //     console.log(e);
        //     curAngle += 1;
        //     svg.attr("transform", "rotate(" + curAngle + "," + 0 + "," + 0 + ")");
        // })
        .append("g")
        .attr("transform", `translate(${containerWidth / 2}, ${containerHeight / 2}) rotate(-170, 0,0)`);

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

        let cluster = d3.cluster().size([2 * Math.PI, radius - 300]);

        const root = cluster(dataStructure)
            .sort((a, b) => {
                d3.ascending(a.data.name, b.data.name);
            });

        console.log(root);

        // Collapse after the second level
        root.children.forEach(collapse);

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
            .on("click", click)
            // .call(force.drag)
            .attr("transform", d => `rotate(${d.x * (180 / Math.PI)}, 0, 0)`);

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
            .attr("d", linkGen)
            .on('mouseover', (e, d) => {
                console.log(d3.select(this));
                d3.select(this)
                    .style('stroke-width', '3')
                    .style('stroke', '#FFF');
            })
            .on('mouseout', (e, d) => {
                d3.select(this)
                    .style('stroke-width', '2')
                    .style('stroke', 'darkgray');
            });
        // .attr("d", (d) => lineGen([d.target, d.source]));

        // Drawing Text Labels
        let names = svg.append("g").selectAll("text")
            .data(root.descendants());

        names.join("text")
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90}) 
                translate(${d.y},0)                 
            `)
            .attr("dy", "0.5em")
            .attr("x", "10")
            // .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
            // .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
            .attr("text-anchor", "start")
            .text(d => d.data.name)
            // .clone(true).lower()
            .attr("fill", "white");
    });


    // Toggle children on click.
    let click = (e, d) => {
        debugger;
        d.children.forEach(collapse);
    };

    // function collapse(d){
    //     if (d.children){
    //         d._children = d.children;
    //         d._children.forEach(collapse);
    //         d.children = null;
    //     }
    // }

};