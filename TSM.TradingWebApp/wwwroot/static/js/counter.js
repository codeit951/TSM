window.initializeCounter = (dotNetObject) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    dotNetObject.invokeMethodAsync("StartCounting");
                    //observer.disconnect(); // Stops observing once triggered
                }
            });
        },
        { threshold: 0.5 } // Triggers when at least 50% is in view
    );

    const section = document.getElementById("stats-section");
    if (section) {
        observer.observe(section);
    }
};
