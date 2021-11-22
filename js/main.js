import { listenScroll } from './intersection.js';
// import { plotDendrogram } from './d3-dendrogram.js';
let scene = {
    beforeSearch: null,
    afterSearch: null
}

let input;

// let MY_SELECTOR = "#plot-questions" // Could be any selector
// let observer = new MutationObserver(function (mutations) {
//     for (let i = 0; i < mutations.length; i++) {
//         for (let j = 0; j < mutations[i].addedNodes.length; j++) {
//             // We're iterating through _all_ the elements as the parser parses them,
//             // deciding if they're the one we're looking for.
//             if (mutations[i].addedNodes[j].matches(MY_SELECTOR)) {

//                 // We found our element, we're done:
//                 observer.disconnect();
//             };
//         }
//     }
// });

// observer.observe(document.documentElement, {
//     childList: true,
//     subtree: true
// });

let appendTemplate = (source, target, isOverwrite) => {
    const sourceEl = document.getElementById(source);
    const targetEl = document.getElementById(target);
    const clone = sourceEl.content.firstElementChild.cloneNode(true);

    isOverwrite ? targetEl.innerHTML = null : '';

    // Append template clone to target container in DOM
    targetEl.appendChild(clone);

    return targetEl
}

scene.beforeSearch = appendTemplate("scene-before-search", "app", true);

scene.beforeSearch.querySelector("#search-btn")
    .addEventListener("click", (e) => {
        e.preventDefault();

        input = document.getElementById("search-input");
        scene.afterSearch = appendTemplate("scene-after-search", "app", true);
        scene.afterSearch
            .querySelector("#query-value")
            .innerHTML = input.value;

        listenScroll();

        // Test code (L27 - L40). Refactor it heavily

        let sceneLoaded = new Promise((resolve, reject) => {
            const animatedEl = scene.afterSearch.querySelectorAll(".animate__animated");

            animatedEl[1].classList.add('animate__delay-2s');
            animatedEl[2].classList.add('animate__delay-3s');
            animatedEl[3].classList.add('animate__delay-4s');
            animatedEl[4].classList.add('animate__delay-5s');

            // Applying animations
            animatedEl[0].classList.add('animate__slideInLeft');
            animatedEl[1].classList.add('animate__fadeInUp');
            animatedEl[2].classList.add('animate__fadeInUp');
            animatedEl[3].classList.add('animate__fadeInUp');
            animatedEl[4].classList.add('animate__fadeInRight');

            return resolve();
        });

        sceneLoaded.then(response => {
            //D3
            //some async function
            // console.log(d3);
            // let url = "university.json";
            // d3.json(url).then(data => {
            //     console.log(data);
            //     let root = d3.hierarchy(data, function (d) {return d.children});
            //     console.log(x);
            // });

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
                .text(d => d.data.child)
                .attr("x", d => d.x + 5)
                .attr("y", d => d.y + 2);
        });
    });