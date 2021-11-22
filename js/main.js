let scene = {
    beforeSearch: null,
    afterSearch: null
}

let input;

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

        //Intersection Observer API
        (() => {
            const sections = [...document.querySelectorAll('.graph')]

            const options = {
                rootMargin: '0px',
                threshold: 0.25
            }
        
            const callback = (entries, observer) => {
                entries.forEach((entry) => {
                    const { target } = entry;
                    console.log(entry, target)
                    if (entry.intersectionRatio >= options.threshold) {
                        target.classList.add("graph-visible");
                    } else {
                        target.classList.remove("graph-visible");
                    }
                })
            }
        
            const observer = new IntersectionObserver(callback, options)
        
            sections.forEach((section, index) => {
                observer.observe(section)
            })
        })();

        // Test code (L27 - L40). Refactor it heavily
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
    });