export const plotDendrogram = () => {
    //D3
    let svg = d3.select("#plot-questions")
        .append("svg")
        .attr("width", 800)
        .attr("heigth", 800)
        .append("g")
        .attr("transform", "translate(50, 50)");

    let data = [
        { "child": "John", "parent": "" },
        { "child": "Aaron", "parent": "John" },
        { "child": "Kevin", "parent": "Kevin" },
        { "child": "Hannah", "parent": "Ann" },
        { "child": "Rose", "parent": "Sarah" },
        { "child": "Ann", "parent": "John" },
        { "child": "Sarah", "parent": "Kevin" },
        { "child": "Mark", "parent": "Ann" },
        { "child": "Angel", "parent": "Sarah" }
    ];

    // let dataStructure = d3.stratify()
    //     .id(d => d.child)
    //     .parentId(d => d.parent)
    //     (data);

    let chaos = d3.stratify()([
        { id: "Chaos" },
        { id: "Gaia", parentId: "Chaos" },
        { id: "Eros", parentId: "Chaos" },
        { id: "Erebus", parentId: "Chaos" },
        { id: "Tartarus", parentId: "Chaos" },
        { id: "Mountains", parentId: "Gaia" },
        { id: "Pontus", parentId: "Gaia" },
        { id: "Uranus", parentId: "Gaia" }
    ]);

    let parsed = d3.hierarchy(
        "This is not proper parsing. But certainly fun!",
        id => {
            for (const split of [/[^\w\s]/, /\s/]) {
                const children = id && id.split(split).filter(id => id.length > 0);
                if (children.length > 1) return children;
            }
        }
    );

    let dataStructure = d3.hierarchy(data, function (d) { return d.children });

    console.log(dataStructure)

    let treeStructure = d3.tree().size([600, 600]);
    let information = treeStructure(parsed);

    console.log(information);

    let circles = svg.append("g").selectAll("circle")
        .data(information.descendants());
    circles.enter().append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 5);

    let connections = svg.append("g").selectAll("path")
        .data(information.links());

    connections.enter()
        .append("path")
        .attr("d", d => {
            return "M" + d.source.x + "," + d.source.y + " C " +
                d.source.x + "," + (d.source.y + d.target.y) / 2 + " " +
                d.target.x + "," + (d.source.y + d.target.y) / 2 + " " +
                d.source.x + "," + d.target.y;
        });

    let names = svg.append("g").selectAll("text")
        .data(information.descendants());

    names.enter().append("text")
        .text(d => d.data)
        .attr("x", d => d.x + 5)
        .attr("y", d => d.y + 2);
};