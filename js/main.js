import { applyScrollSnap } from './intersection.js';
import { plotDendrogram } from './d3-dendrogram.js';
import { plotAreaChart } from './d3-areachart.js';
import { plotLinearScale } from './d3-linearscale.js';

let scene = {
    beforeSearch: null,
    afterSearch: null
}

let input;

let appendTemplate = (source, target, isOverwrite) => {
    const sourceEl = document.getElementById(source);
    const targetEl = document.getElementById(target);
    const clone = sourceEl.content.cloneNode(true);

    isOverwrite ? targetEl.innerHTML = null : '';

    // Append template clone to target container in DOM
    targetEl.appendChild(clone);

    return targetEl;
}

export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

scene.beforeSearch = appendTemplate("scene-before-search", "app", true);

scene.beforeSearch.querySelector("#search-btn")
    .addEventListener("click", (e) => {
        e.preventDefault();

        input = document.getElementById("search-input");

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

            // Applying animations
            animatedEl[0].classList.add('animate__slideInLeft');
            animatedEl[1].classList.add('animate__fadeInUp');
            animatedEl[2].classList.add('animate__fadeInUp');
            animatedEl[3].classList.add('animate__fadeInUp');
            animatedEl[4].classList.add('animate__fadeInRight');

            return resolve("Promise Resolved: Page transitions added");
        });

        sceneLoaded.then(response => {
            console.log(response);
            scene.afterSearch.querySelector("#query-value").innerHTML = input.value;
            applyScrollSnap();
        });

        sceneTransitioned.then(response => {
            console.log(response);
            plotAreaChart();
            plotLinearScale();
            plotDendrogram();
        });
    });
