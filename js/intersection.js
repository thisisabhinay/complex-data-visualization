//The Intersection Observer API
export const applyScrollSnap = () => {
    const sections = [...document.querySelectorAll('.graph')]

    const options = {
        rootMargin: '0px',
        threshold: 0.25
    }

    const callback = (entries) => {
        entries.forEach((entry) => {
            const { target } = entry;
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
};