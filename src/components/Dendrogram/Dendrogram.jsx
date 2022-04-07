import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Dendrogram.sass";

const Dendrogram = ({ dataset, parentRef }) => {
    // STATE
    const svgRef = useRef(null);
    const [hoverText, setHoverText] = useState("");

    useEffect(() => {
        if (dataset.constructor === Array && !dataset.length) return;
        console.log("Dendrogram (Effect)", dataset);

        let margin = { top: 0, right: 0, bottom: 0, left: 0 };

        let width = parentRef.current.offsetWidth - margin.left - margin.right;
        let height = parentRef.current.offsetHeight;

        const svg = d3.select(svgRef.current);
        console.log(svg);
        svg
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${width/2}, ${height/2})`);

        let i = 0;
        let root;
        let radius = 180;

        // 2. Preparing data
        let cluster = d3.cluster().size([2 * Math.PI, radius - 300]);
        root = d3.hierarchy(dataset);
        console.log("root", root);

        // 3. Defining update function
        let update = (source) => {
            let treeData = cluster(source);
            // .sort((a, b) => d3.ascending(a.data.name, b.data.name));

            // nodes
            let nodes = treeData.descendants();
            nodes.forEach(d => {
                // Children have depth. We are using that depth to set the y-value on the nodes
                d.y = d.depth * 180;
            });

            console.log(svg);

            // Creating Links
            let linkGen = d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y);

            svg
                .select("g")
                .selectAll("path.link")
                .data(treeData.links())
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("stroke", "darkgray")
                .attr("stroke-width", 1)
                .attr("fill", "none")
                .attr("d", linkGen);


            // Creating Nodes
            let node = svg
                .select("g")
                .selectAll("g.node")
                .data(nodes, d => {
                    // returning d.id or if it has a child
                    return d.id || (d.id = ++i);
                });

            let nodeEnter = node
                .enter()
                .append("g")
                .attr("class", "node")
                .on("mouseover", click);

            nodeEnter
                .append("circle")
                .attr("class", "node")
                .attr("r", 10)
                .attr("cx", 0)
                .attr("cy", d => -d.y)
                .attr("transform", d => `rotate(${d.x * (180 / Math.PI)}, 0, 0)`)
                .style("fill", "#1AB2F8"); //If node has children turn it red else black

        }; // End Update(source)

        let click = (event, d) => {
            console.log(d.data);
            setHoverText(d.data);
            return;
        }; // End click(event, d)

        // 4. Setting root position
        root.x0 = 400 / 2;
        root.y0 = 0;

        console.log(root);

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
            {hoverText}
        </>
    );
};

export default Dendrogram;