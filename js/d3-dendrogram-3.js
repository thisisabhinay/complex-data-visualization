export const plotDendrogram = () => {
    d3.json("questions_index.json").then(data => {

        /**
         
        Table of Index
         1. Setting variables
         2. Preparing data
         3. Defining update function
         4. Setting root position
         5. 

         */

        // 1. Setting variables
        let margin = { top: 20, right: 80, bottom: 20, left: 80 };
        // let width = 960 - margin.left - margin.right;
        // let height = 680 - margin.top - margin.bottom;

        let width = document.getElementById("chart-column").clientWidth - margin.left - margin.right;
        let height = window.innerHeight - margin.top - margin.bottom;

        let graphLinksCount = {
            level01Count: 0,
            level12Count: 0,
        };

        let svg = d3
            .select("#plot-questions")
            .append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            // .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("transform", `translate(${(width + margin.left + margin.right) / 2}, ${(height + margin.top + margin.bottom) / 2}) rotate(0, 0,0)`);

        console.log(svg);

        let i = 0;
        let duration = 750;
        let root;
        let radius = (document.getElementById("chart-column").clientWidth - margin.left - margin.right) / 2;

        // 2. Preparing data
        let cluster = d3.cluster().size([2 * Math.PI, radius - 300]);
        root = d3.hierarchy({
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

        let diagonal = (s, d) => {
            return `
                M ${s.y} ${s.x}
                C ${(s.y + d.y / 2)} ${s.x}
                C ${(s.y + d.y / 2)} ${d.x}
                ${d.y} ${d.x}
            `;
        };

        // 3. Defining update function
        let update = (source) => {
            let treeData = cluster(root)
                .sort((a, b) => d3.ascending(a.data.name, b.data.name));

            // nodes
            let nodes = treeData.descendants();
            // nodes.forEach(d => {
            //     // Children have depth. We are using that depth to set the y-value on the nodes
            //     d.y = d.depth * 180;
            // });

            console.log(svg);
            let node = svg
                .selectAll("g.node")
                .data(nodes, d => {
                    // returning d.id or if it has a child
                    return d.id || (d.id = ++i);
                });

            let nodeEnter = node
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", d => `translate(${source.y0}, ${source.x0})`)
                .on("click", click);

            nodeEnter
                .append("circle")
                .attr("class", "node")
                .attr("r", 0)
                .attr('cx', 0)
                .attr('cy', d => -d.y)
                .attr("transform", d => `rotate(${d.x * (180 / Math.PI)}, 0, 0)`)
                .style("fill", d => d._children ? "red" : "lightblue"); //If node has children turn it red else black

            nodeEnter
                .append("text")
                .attr("transform", d => `
                    rotate(${d.x * 180 / Math.PI - 90}) 
                    translate(${d.y},0)                 
                `)
                .attr("dy", "0.5em") //What size text is going to be
                .attr("x", "1em")
                // .attr("x", d => {
                //     console.log(d);
                //     // Text position will be on left if it has children
                //     // And at right if it don't
                //     return d.children || d._children ? -13 : 13;
                // })
                .attr("text-anchor", d => {
                    return d.children || d._children ? "end" : "start";
                })
                .text(d => d.data.name)
                .attr("fill", "#FFF")
                .clone(true).lower()
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 2)
                .attr("stroke", "black");

            let nodeUpdate = nodeEnter.merge(node);

            nodeUpdate
                .transition()
                .duration(duration)
                .attr("transform", d => {
                    // We started at source x0 y0 and now transitioning to d.x d.y
                    return `translate(${d.y}, ${d.x})`;
                });

            nodeUpdate
                .select("circle.node")
                .attr("r", 2)
                .style("fill", d => d._children ? "red" : "lightblue")
                .attr("cursor", "pointer");

            let nodeExit = node
                .exit()
                .transition()
                .duration(duration)
                .attr("transition", d => {
                    // We are going from child to parent now
                    return `translate(${source.y}, ${source.x})`;
                })
                .remove();

            nodeExit
                .select("circle")
                .attr("r", 0);

            nodeExit
                .select("text")
                .style("fill-opacity", 0);

            // Creating Links
            let linkGen = d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y);

            let links = treeData.descendants().slice(1);
            let link = svg
                .selectAll("path.link")
                .data(treeData.links());

            let linkEnter = link
                .enter()
                .insert("path", "g")
                .attr("class", "link")
                .attr('stroke', "darkgray")
                .attr('stroke-width', 2)
                .attr("d", linkGen);

            let linkUpdate = linkEnter.merge(link);

            linkUpdate
                .transition()
                .duration(duration)
                .attr("d", linkGen);

            let linkExit = link
                .exit()
                .transition()
                .duration(duration)
                .attr("d", linkGen)
                .remove();

            // Storing old positions in order to transition back in case we collapse our graph or node
            nodes.forEach(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });

        }; // End Update(source)

        let click = (event, d) => {
            console.log(d);
            if (d.children) {
                d._children = d.children;
                d.children = null;
            }
            else {
                d.children = d._children;
                d._children = null;
            }

            update(d);
        }; // End click(event, d)

        // 4. Setting root position
        root.x0 = height / 2;
        root.y0 = 0;

        console.log(root);

        update(root);

    });
};