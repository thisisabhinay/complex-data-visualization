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
        { "child": "Angel", "parent": "Sarah", "grandparent": "Adam" }
    ];

    // let parsed = d3.stratify()
    //     .id(d => d.child)
    //     .parentId(d => d.parent)
    //     (data);

    // let parsed = d3.stratify()([
    //     { id: "Chaos" },
    //     { id: "Gaia", parentId: "Chaos" },
    //     { id: "Eros", parentId: "Chaos" },
    //     { id: "Erebus", parentId: "Chaos" },
    //     { id: "Tartarus", parentId: "Chaos" },
    //     { id: "Mountains", parentId: "Gaia" },
    //     { id: "Pontus", parentId: "Gaia" },
    //     { id: "Uranus", parentId: "Gaia" }
    // ]);

    // let parsed = d3.hierarchy(
    //     "This is not proper parsing. But certainly fun!",
    //     id => {
    //         for (const split of [/[^\w\s]/, /\s/]) {
    //             const children = id && id.split(split).filter(id => id.length > 0);
    //             if (children.length > 1) return children;
    //         }
    //     }
    // );

    //    let dataStructure = d3.hierarchy(parsed, function (d) { return d.children });

    //     const csv = `id,parentId
    // level1,
    // level2,level1
    // level3,level2
    // level4,level3
    // level5,level4
    // level6,level5
    // level7,level6
    // level8,level7
    // level9,level8
    // level10,level9
    // level11,level10`;

    //     const data = d3.csvParse(csv);

    //     const root = d3.stratify()(data);

    //     console.log("This hierarchy has " + root.height + " levels")

    //     console.log(root);

    // console.log(dataStructure)

    let radius = 500;

    let family = d3.hierarchy({
        name: "root",
        children: [
            { name: "child #1" },
            {
                name: "child #2",
                children: [
                    { name: "grandchild #1" },
                    { name: "grandchild #2" },
                    { name: "grandchild #3" }
                ]
            }
        ]
    })

    let tree = d3.cluster().size([2 * Math.PI, radius - 100])

    console.log(tree);

    const root = tree(family)
        .sort((a, b) => {
            console.log(a);
            console.log(b);
            console.log("-----")
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
        // .attr("d", d3.linkRadial()
        //     .angle(d => d.x)
        //     .radius(d => d.y));
    .attr("d", d => {
        console.log(d);
        // return d3.linkRadial()({
        //     angle: d.source.x,
        //     radius: d.source.y
        // })
            // .angle(d => d.x * 100)
            // .radius(d => d.y)

        return d3.linkVertical()({
            source: [d.source.x * 100, d.source.y],
            target: [d.target.x * 100, d.target.y],
        })
    });

    let names = svg.append("g").selectAll("text")
        .data(information.descendants());

    names.enter().append("text")
        .text(d => d.data.name)
        .attr("x", d => d.x * 100 + 15)
        .attr("y", d => d.y + 2);

    let circles = svg.append("g").selectAll("circle")
        .data(information.descendants());
    circles.enter().append("circle")
        .attr("cx", d => d.x * 100)
        .attr("cy", d => d.y)
        .attr("r", 10);
};