// RANDOM VALUE

const random = document.querySelectorAll(".random");

random.forEach((item) => {
    item.style.setProperty("--rotate",`${Math.random() * 90 - 45}deg`);
    // ruimte voor meer
});

// SCROLL ANIMATIE

const heroScroll = document.querySelector(".contentScroll");
const cat = document.querySelector(".catGroup");
const text = document.querySelectorAll("[data-type='scroll']");
const label = document.querySelector(".contentLabel");
const tape = document.querySelector(".vhsStack");
const content = document.querySelectorAll("article[data-type='content']");

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

    const tapeProgress = Math.max(0, (progress - 0.7) / 0.3);
    const eased = 1 - Math.pow(1 - tapeProgress, 3);

    tape.style.translate = `0 ${-35 + eased * 43.5}vh`;
    tape.style.rotate = `${-3 + eased * 3}deg`;
    tape.style.opacity = tapeProgress;

    content.forEach((item) => {
        item.style.translate = `0 ${-35 + eased * 35}vh`;
        item.style.rotate = `${-3 + eased * 3}deg`;
        item.style.opacity = tapeProgress;
    });


    text.forEach((item) => {
        item.style.opacity = 1 - progress;
        item.style.translate = `0 ${progress * 20}vh`;
    });
});