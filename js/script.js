// RANDOM VALUE

const random = document.querySelectorAll(".random");

random.forEach((item) => {
    item.style.setProperty("--rotate",`${Math.random() * 90 - 45}deg`);
    // ruimte voor meer
});

// BUTTON 

const themeButton = document.querySelector(".themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("cursed-theme");

    if (document.body.classList.contains("cursed-theme")) {
        themeButton.textContent = "Normal VHS";
    } else {
        themeButton.textContent = "Cursed VHS";
    }
});

// SCROLL ANIMATIE

const heroScroll = document.querySelector(".contentScroll");
const cat = document.querySelector(".catGroup");
const text = document.querySelectorAll("[data-type='scroll']");
const label = document.querySelector(".labelGroup");
const tape = document.querySelector(".vhsStack");
const content = document.querySelectorAll(".wrapper");

const mobileView = window.matchMedia("(max-width: 699px)");

function getScrollSettings() {
    if (mobileView.matches) {
        return {
            catY: 60,
            textY: 14,
            tapeStart: -20,
            tapeEnd: 0,
            contentStart: -18,
            contentEnd: 0
        };
    }

    return {
        catY: 80,
        textY: 20,
        tapeStart: -35,
        tapeEnd: 8.5,
        contentStart: -35,
        contentEnd: 0
    };
}

function updateScrollAnimation() {
    const settings = getScrollSettings();
    const rect = heroScroll.getBoundingClientRect();
    const scrollLength = heroScroll.offsetHeight - window.innerHeight;

    let progress = -rect.top / scrollLength;
    progress = Math.max(0, Math.min(progress, 1));

    cat.style.transform = `
        translateX(-50%)
        translateY(${progress * settings.catY}vh)
        rotate(${progress * 8}deg)
    `;

    cat.style.opacity = 1 - progress;
    label.style.opacity = 1 - progress;

    const tapeProgress = Math.max(0, (progress - 0.7) / 0.3);
    const eased = 1 - Math.pow(1 - tapeProgress, 3);

    tape.style.translate = `0 ${settings.tapeStart + eased * (settings.tapeEnd - settings.tapeStart)}vh`;
    tape.style.rotate = `${-3 + eased * 3}deg`;
    tape.style.opacity = tapeProgress;

    content.forEach((item) => {
        item.style.translate = `0 ${settings.contentStart + eased * (settings.contentEnd - settings.contentStart)}vh`;
        item.style.rotate = `${-3 + eased * 3}deg`;
        item.style.opacity = tapeProgress;
    });


    text.forEach((item) => {
        item.style.opacity = 1 - progress;
        item.style.translate = `0 ${progress * settings.textY}vh`;
    });
}

window.addEventListener("scroll", updateScrollAnimation);
window.addEventListener("resize", updateScrollAnimation);
updateScrollAnimation();
