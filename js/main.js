import { applyScrollSnap } from './intersection.js';
// import { plotDendrogram } from './d3-dendrogram.js';
// import { plotDendrogram } from './d3-dendrogram-2.js';
// import { plotDendrogram } from './d3-dendrogram-3.js';
import { plotDendrogram } from './d3-dendrogram-4.js';
import { plotAreaChart } from './d3-areachart.js';

let scene = {
    beforeSearch: null,
    afterSearch: null
};

export const metrics = {
    search_volume: 2182103917,
    keyword_difficulty: 72,
    cost_per_click: 9.1
};

let input;

let appendTemplate = (source, target, isOverwrite) => {
    const sourceEl = document.getElementById(source);
    const targetEl = document.getElementById(target);
    const clone = sourceEl.content.cloneNode(true);

    isOverwrite ? targetEl.innerHTML = null : '';

    // Append template clone to target container in DOM
    targetEl.appendChild(clone);

    return targetEl;
};

export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const loadMetricValues = () => {
    document.getElementById("metric-search-volume-value").innerHTML = metrics.search_volume.toLocaleString();
    document.getElementById("metric-kd-value").innerHTML = metrics.keyword_difficulty;
    document.getElementById("metric-cpc-value").innerHTML = metrics.cost_per_click;
};

scene.beforeSearch = appendTemplate("scene-before-search", "app", true);

// Loading Second Scene after "Search" btn click
scene.beforeSearch.querySelector("#search-btn")
    .addEventListener("click", (e) => {
        e.preventDefault();

        input = document.getElementById("search-input");
        
        document.body.classList.add("slide-bg");

        let sceneLoaded = new Promise((resolve, reject) => {
            scene.afterSearch = appendTemplate("scene-after-search", "app", true);
            return !!scene.afterSearch ? resolve("Promise Resolved: After Scene appended") : reject();
        });

        let sceneTransitioned = new Promise((resolve, reject) => {
            const animatedEl = scene.afterSearch.querySelectorAll(".animate__animated");

            animatedEl[1].classList.add('animate__delay-2s');
            animatedEl[2].classList.add('animate__delay-3s');
            animatedEl[3].classList.add('animate__delay-4s');
            animatedEl[4].classList.add('animate__delay-5s');

            // // Applying animations
            animatedEl[0].classList.add('animate__slideInRight');
            animatedEl[1].classList.add('animate__fadeInUp');
            animatedEl[2].classList.add('animate__fadeInUp');
            animatedEl[3].classList.add('animate__fadeInUp');
            animatedEl[4].classList.add('animate__fadeInRight');

            // animateBg();

            return resolve("Promise Resolved: Page transitions added");
        });

        sceneLoaded.then(response => {
            console.log(response);
            // scene.afterSearch.querySelector("#query-value").innerHTML = input.value;
            applyScrollSnap();
        });

        sceneTransitioned.then(response => {
            console.log(response);
            loadMetricValues();

            plotAreaChart();
            plotDendrogram();

            let chartKdWidth = document.getElementById("chart-kd").clientWidth;
            document.getElementById("metric-kd-mask").style.width = `${chartKdWidth - (metrics.keyword_difficulty/100)*chartKdWidth}px`;
        });
    });


// const animateBg = () => {
//     // document.body.style.backgroundPosition
//     // setInterval(()=> 
//     //     document.body.style.backgroundPosition = `1${randomIntFromInterval(15,40)}% 10${1,9}%`, 500);   

//     positionX += 0.5 * Math.sin(angle);
//     positionY += 0.5 * Math.cos(angle);
// }