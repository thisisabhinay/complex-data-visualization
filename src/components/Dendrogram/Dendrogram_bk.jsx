import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Dendrogram.sass";

const Dendrogram = ({ dataset, parentRef }) => {
    // STATE
    const svgRef = useRef(null);

    useEffect(() => {
        if (dataset.constructor === Array && !dataset.length) return;
        console.log("Dendrogram (Effect)", dataset);

        let margin = { top: 0, right: 80, bottom: 0, left: 80 };

        let width = parentRef.current.offsetWidth - margin.left - margin.right;
        let height = parentRef.current.offsetHeight;

        const svg = d3.select(svgRef.current);
        console.log(svg);
        svg
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g");

        let i = 0;
        let duration = 750;
        let root;
        let radius = 180;

        // 2. Preparing data
        let cluster = d3.cluster().size([2 * Math.PI, radius - 300]);
        root = d3.hierarchy(dataset);
        console.log("root", root);

        // let diagonal = (s, d) => {
        //     return `
        //     M ${s.y} ${s.x}
        //     C ${(s.y + d.y / 2)} ${s.x}
        //     C ${(s.y + d.y / 2)} ${d.x}
        //     ${d.y} ${d.x}
        // `;
        // };

        // 3. Defining update function
        let update = (source) => {
            let treeData = cluster(root);
            // .sort((a, b) => d3.ascending(a.data.name, b.data.name));

            // nodes
            let nodes = treeData.descendants();
            nodes.forEach(d => {
                // Children have depth. We are using that depth to set the y-value on the nodes
                d.y = d.depth * 180;
            });

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
                // .attr("transform", d => `translate(${source.y0}, ${source.x0})`)
                .on("click", click);

            nodeEnter
                .append("circle")
                .attr("class", "node")
                .attr("r", 0)
                .attr("cx", 0)
                .attr("cy", d => -d.y)
                .attr("transform", d => `rotate(${d.x * (180 / Math.PI)}, 0, 0)`)
                .style("fill", d => d._children ? "red" : "#1AB2F8"); //If node has children turn it red else black

            nodeEnter
                .append("text")
                .classed("label", true)
                .attr("transform", d => `
                rotate(${d.x * (180 / Math.PI)}, 0, 0)
                translate(${d.y},0)                 
            `)
                .attr("dy", "0.5em") //What size text is going to be
                // .attr("x", "1em")
                .attr("x", d => {
                    console.log(d);
                    // Text position will be on left if it has children
                    // And at right if it don't
                    return d.children || d._children ? -50 : 10;
                })
                .attr("text-anchor", "start")
                // .attr("text-anchor", d => {
                //     return d.children || d._children ? "start" : "end";
                // })
                .text(d => d.data.name)
                .attr("fill", "#FFF");
            // .clone(true).lower()
            // .attr("stroke-linejoin", "round")
            // .attr("stroke-width", 2)
            // .attr("stroke", "black");

            let nodeUpdate = nodeEnter.merge(node);

            nodeUpdate
                .transition()
                .duration(duration)
                .attr("transform", d => {
                    // We started at source x0 y0 and now transitioning to d.x d.y
                    // return `translate(${d.y}, ${d.x})`;
                });

            // TODO: Need to transition circles in update
            nodeUpdate
                .select("circle.node")
                .attr("r", 4)
                .attr("transform", d => `rotate(${d.x * (180 / Math.PI)}, 0, 0)`)
                .style("fill", d => d._children ? "red" : "#1ab2f8")
                .attr("cursor", "pointer");

            nodeUpdate
                .select("text.label")
                .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90}) 
                translate(${d.y},0)                 
            `)
                // .attr("dy", "0.35em") //What size text is going to be
                .attr("x", d => {
                    console.log(d);
                    // Text position will be on left if it has children
                    // And at right if it don't
                    return d.children || d._children ? -50 : 10;
                });

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

            // let node = svg
            //     .selectAll("g.node")
            //     .data(nodes, d => {
            //         // returning d.id or if it has a child
            //         return d.id || (d.id = ++i);
            //     });

            // let nodeEnter = node
            //     .enter()
            //     .append("g")
            //     .attr("class", "node")
            //     .attr("transform", d => `translate(${source.y0}, ${source.x0})`)
            //     .on("click", click);

            let link = svg
                .selectAll("path.link")
                .data(treeData.links());

            let linkEnter = link
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("stroke", "darkgray")
                .attr("stroke-width", 2)
                .attr("d", linkGen)
                .attr("transform", d => `translate(${d.y}, ${d.x})`);

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
        root.x0 = 400 / 2;
        root.y0 = 0;

        console.log(root);

        let collapse = (d) => {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        };
        // Collapse after the second level
        root.children.forEach(collapse);

        update(root);

    }, [dataset]);

    // FUNCTIONS
    const onEnter = () => { };
    const onExit = () => { };
    const animationEnter = () => { };
    const animationExit = () => { };

    return (
        <>
            <div className="dendrogram">
                <svg
                    width={680}
                    height={680}
                    ref={svgRef}
                />
            </div>
        </>
    );
};

export default Dendrogram;