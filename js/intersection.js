//The Intersection Observer API
export const applyScrollSnap = () => {
    return;
    const sections = [...document.querySelectorAll('.graph')];

    const options = {
        rootMargin: '0px',
        threshold: 0.25
    };

    const nav = document.getElementById("navbar");

    const updateNav = el => {
        const anchor =  nav.querySelector(`[href="#${el.id}"]`);
        
        nav.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        anchor.parentNode.classList.add("active");
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            const { target } = entry;

            if (entry.intersectionRatio >= options.threshold) {
                target.classList.add("graph-visible");
                updateNav(target);
            } else {
                target.classList.remove("graph-visible");
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section, index) => {
        observer.observe(section);
    });
};