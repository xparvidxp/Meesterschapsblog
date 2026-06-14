// Sterren achtergrond

const sterren = document.querySelectorAll(".star");

sterren.forEach((ster) => {
    ster.style.setProperty("--star-top", `${Math.random() * 100}%`);
    ster.style.setProperty("--star-left", `${Math.random() * 100}%`);
    ster.style.setProperty("--star-size", `${Math.random() * .5 + 1}px`);
    ster.style.setProperty("--star-color", "white");
});

// Hero scrollen

const heroScroll = document.querySelector(".heroScroll");
const cat = document.querySelector(".catGroup");
const text = document.querySelectorAll("[data-type='scroll']");
const label = document.querySelector(".heroLabel");

window.addEventListener("scroll", () => {
    const rect = heroScroll.getBoundingClientRect();
    const scrollLength = heroScroll.offsetHeight - window.innerHeight;

    let progress = -rect.top / scrollLength;
    progress = Math.max(0, Math.min(progress, 1));

    cat.style.transform = `
        translateX(-50%)
        translateY(${progress * 80}vh)
        rotate(${progress * 8}deg)
    `;

    cat.style.opacity = 1 - progress;

    text.forEach((item) => {
        item.style.opacity = 1 - progress;
        item.style.translate = `0 ${progress * 20}vh`;
    });
});

// Bronnen
// Sterren achtergrond uit Hackathon project