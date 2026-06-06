// Sterren achtergrond

const sterren = document.querySelectorAll(".star");

sterren.forEach((ster) => {
    ster.style.setProperty("--star-top", `${Math.random() * 100}%`);
    ster.style.setProperty("--star-left", `${Math.random() * 100}%`);
    ster.style.setProperty("--star-size", `${Math.random() * .5 + 1}px`);
    ster.style.setProperty("--star-color", "white");
});

// Bronnen
// Sterren achtergrond uit Hackathon project