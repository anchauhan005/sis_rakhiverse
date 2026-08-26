/* =========================================
   RAKHI SURPRISE WEBSITE
   PHASE 1 + PHASE 2 + PHASE 3 + PHASE 4
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const particlesContainer =
    document.getElementById("particles");

const heartsContainer =
    document.getElementById("hearts");

const openButton =
    document.getElementById("openButton");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const celebrationSection =
    document.getElementById(
        "celebrationSection"
    );

const celebrationCanvas =
    document.getElementById(
        "fireworksCanvas"
    );

const flowerLayer =
    document.getElementById(
        "flowerLayer"
    );

const continueButton =
    document.getElementById(
        "continueButton"
    );

const memorySectionTarget =
    document.getElementById(
        "memorySection"
    );


/* =========================================
   CONFIGURATION
========================================= */

const CONFIG = {

    particles: 90,

    heartInterval: 900,

    flowerInterval: 650,

    heartTypes: [
        "❤️",
        "💗",
        "💕",
        "💖",
        "💓"
    ],

    flowerTypes: [
        "🌸",
        "🌺",
        "🌷",
        "🌼",
        "✿"
    ]

};


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    if (!particlesContainer) {
        return;
    }


    for (
        let i = 0;
        i < CONFIG.particles;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.classList.add(
            "particle"
        );


        const size =
            Math.random() * 3 + 1;


        const left =
            Math.random() * 100;


        const duration =
            Math.random() * 12 + 8;


        const delay =
            Math.random() * 10;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${left}%`;

        particle.style.animationDuration =
            `${duration}s`;

        particle.style.animationDelay =
            `-${delay}s`;


        particlesContainer.appendChild(
            particle
        );
    }
}


/* =========================================
   FLOATING HEARTS
========================================= */

function createHeart() {

    if (!heartsContainer) {
        return;
    }


    const heart =
        document.createElement(
            "span"
        );


    heart.classList.add(
        "heart"
    );


    const randomIndex =
        Math.floor(
            Math.random() *
            CONFIG.heartTypes.length
        );


    heart.textContent =
        CONFIG.heartTypes[
            randomIndex
        ];


    heart.style.left =
        `${Math.random() * 100}%`;


    const size =
        Math.random() * 14 + 10;


    heart.style.fontSize =
        `${size}px`;


    const duration =
        Math.random() * 6 + 6;


    heart.style.animationDuration =
        `${duration}s`;


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        () => heart.remove(),
        duration * 1000
    );
}


function startHeartAnimation() {

    createHeart();

    setInterval(
        createHeart,
        CONFIG.heartInterval
    );
}


/* =========================================
   RAKHI SPARKLES
========================================= */

function createRakhiSparkle() {

    const rakhi =
        document.querySelector(
            ".rakhi-center"
        );


    if (!rakhi) {
        return;
    }


    const sparkle =
        document.createElement(
            "span"
        );


    sparkle.classList.add(
        "rakhi-sparkle"
    );


    sparkle.style.left =
        `${Math.random() * 150 + 10}px`;

    sparkle.style.top =
        `${Math.random() * 150 + 10}px`;


    rakhi.appendChild(
        sparkle
    );


    setTimeout(
        () => sparkle.remove(),
        1200
    );
}


function startRakhiSparkles() {

    setInterval(
        createRakhiSparkle,
        700
    );
}


/* =========================================
   PHASE 2
   FIREWORK ENGINE
========================================= */

let canvasContext;

let canvasWidth = 0;

let canvasHeight = 0;

let fireworks = [];

let particles = [];

let fireworksRunning = false;


/* =========================================
   FIREWORK COLORS
========================================= */

const FIREWORK_COLORS = [
    "#ff78b7",
    "#ffb45c",
    "#ffd86b",
    "#ff8fd2",
    "#f7c6ff",
    "#ffffff"
];


/* =========================================
   SET CANVAS SIZE
========================================= */

function resizeFireworksCanvas() {

    if (!celebrationCanvas) {
        return;
    }


    const pixelRatio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvasWidth =
        window.innerWidth;

    canvasHeight =
        window.innerHeight;


    celebrationCanvas.width =
        canvasWidth * pixelRatio;

    celebrationCanvas.height =
        canvasHeight * pixelRatio;


    celebrationCanvas.style.width =
        `${canvasWidth}px`;

    celebrationCanvas.style.height =
        `${canvasHeight}px`;


    canvasContext =
        celebrationCanvas.getContext(
            "2d"
        );


    canvasContext.scale(
        pixelRatio,
        pixelRatio
    );
}


/* =========================================
   RANDOM COLOR
========================================= */

function randomFireworkColor() {

    return FIREWORK_COLORS[
        Math.floor(
            Math.random() *
            FIREWORK_COLORS.length
        )
    ];
}


/* =========================================
   CREATE FIREWORK
========================================= */

function createFirework(
    startX = Math.random() * canvasWidth,
    startY = canvasHeight + 10
) {

    const targetX =
        Math.random() *
        (canvasWidth * 0.85)
        +
        canvasWidth * 0.075;


    const targetY =
        Math.random() *
        (canvasHeight * 0.45)
        +
        canvasHeight * 0.08;


    fireworks.push({

        x: startX,

        y: startY,

        targetX,

        targetY,

        speed:
            Math.random() * 3 + 6,

        color:
            randomFireworkColor(),

        trail: []

    });
}


/* =========================================
   CREATE HEART PARTICLES
========================================= */

function createExplosion(
    x,
    y,
    color
) {

    const particleCount = 65;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            Math.random() * 4 + 2;


        particles.push({

            x,

            y,

            vx:
                Math.cos(angle)
                * speed,

            vy:
                Math.sin(angle)
                * speed,

            life:
                1,

            decay:
                Math.random() *
                0.018
                +
                0.012,

            size:
                Math.random() * 2 + 1,

            color

        });
    }


    /*
       Additional heart particles
    */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            Math.random() * 3 + 2;


        particles.push({

            x,

            y,

            vx:
                Math.cos(angle)
                * speed,

            vy:
                Math.sin(angle)
                * speed,

            life:
                1,

            decay:
                0.012,

            size:
                5,

            color,

            heart:
                true

        });
    }
}


/* =========================================
   DRAW HEART
========================================= */

function drawHeart(
    context,
    x,
    y,
    size,
    color,
    alpha
) {

    context.save();

    context.globalAlpha =
        alpha;

    context.fillStyle =
        color;

    context.beginPath();


    const topCurve =
        size * 0.3;


    context.moveTo(
        x,
        y + topCurve
    );


    context.bezierCurveTo(
        x - size,
        y - size * 0.3,
        x - size,
        y + size * 0.8,
        x,
        y + size
    );


    context.bezierCurveTo(
        x + size,
        y + size * 0.8,
        x + size,
        y - size * 0.3,
        x,
        y + topCurve
    );


    context.fill();

    context.restore();
}


/* =========================================
   UPDATE FIREWORKS
========================================= */

function updateFireworks() {

    /*
       Update rockets
    */

    for (
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const firework =
            fireworks[i];


        firework.trail.push({
            x: firework.x,
            y: firework.y
        });


        if (
            firework.trail.length > 8
        ) {

            firework.trail.shift();

        }


        const dx =
            firework.targetX -
            firework.x;


        const dy =
            firework.targetY -
            firework.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distance < 15) {

            createExplosion(
                firework.x,
                firework.y,
                firework.color
            );


            fireworks.splice(
                i,
                1
            );


            continue;
        }


        const angle =
            Math.atan2(
                dy,
                dx
            );


        firework.x +=
            Math.cos(angle) *
            firework.speed;


        firework.y +=
            Math.sin(angle) *
            firework.speed;
    }


    /*
       Update explosion particles
    */

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            particles[i];


        particle.x +=
            particle.vx;


        particle.y +=
            particle.vy;


        particle.vy +=
            0.035;


        particle.vx *=
            0.985;


        particle.vy *=
            0.985;


        particle.life -=
            particle.decay;


        if (
            particle.life <= 0
        ) {

            particles.splice(
                i,
                1
            );
        }
    }
}


/* =========================================
   DRAW FIREWORKS
========================================= */

function drawFireworks() {

    if (!canvasContext) {
        return;
    }


    /*
       Transparent clear gives
       beautiful trails.
    */

    canvasContext.fillStyle =
        "rgba(8, 2, 12, 0.18)";


    canvasContext.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    /*
       Draw rockets
    */

    fireworks.forEach(
        firework => {

            canvasContext.beginPath();


            firework.trail.forEach(
                (point, index) => {

                    if (index === 0) {

                        canvasContext.moveTo(
                            point.x,
                            point.y
                        );

                    } else {

                        canvasContext.lineTo(
                            point.x,
                            point.y
                        );
                    }
                }
            );


            canvasContext.strokeStyle =
                firework.color;

            canvasContext.globalAlpha =
                0.35;

            canvasContext.lineWidth =
                2;

            canvasContext.stroke();

            canvasContext.globalAlpha =
                1;


            canvasContext.beginPath();

            canvasContext.arc(
                firework.x,
                firework.y,
                2.5,
                0,
                Math.PI * 2
            );

            canvasContext.fillStyle =
                "#ffffff";

            canvasContext.fill();

        }
    );


    /*
       Draw explosion particles
    */

    particles.forEach(
        particle => {

            if (particle.heart) {

                drawHeart(
                    canvasContext,
                    particle.x,
                    particle.y,
                    particle.size,
                    particle.color,
                    particle.life
                );

            } else {

                canvasContext.beginPath();

                canvasContext.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                canvasContext.globalAlpha =
                    particle.life;

                canvasContext.fillStyle =
                    particle.color;

                canvasContext.fill();

                canvasContext.globalAlpha =
                    1;
            }
        }
    );
}


/* =========================================
   FIREWORK LOOP
========================================= */

function fireworksLoop() {

    if (!fireworksRunning) {
        return;
    }


    updateFireworks();

    drawFireworks();


    requestAnimationFrame(
        fireworksLoop
    );
}


/* =========================================
   START FIREWORKS
========================================= */

function startFireworks() {

    if (!celebrationCanvas) {
        return;
    }


    resizeFireworksCanvas();


    fireworksRunning =
        true;


    fireworksLoop();


    /*
       Launch fireworks regularly
    */

    createFirework();


    setTimeout(
        () => createFirework(),
        450
    );


    setInterval(
        () => {

            if (
                fireworksRunning
            ) {

                createFirework();

            }

        },
        900
    );
}


/* =========================================
   FLOWER ANIMATION
========================================= */

function createFallingFlower() {

    if (!flowerLayer) {
        return;
    }


    const flower =
        document.createElement(
            "span"
        );


    flower.classList.add(
        "falling-flower"
    );


    const randomIndex =
        Math.floor(
            Math.random() *
            CONFIG.flowerTypes.length
        );


    flower.textContent =
        CONFIG.flowerTypes[
            randomIndex
        ];


    flower.style.left =
        `${Math.random() * 100}%`;


    flower.style.fontSize =
        `${Math.random() * 14 + 13}px`;


    const duration =
        Math.random() * 5 + 6;


    flower.style.animationDuration =
        `${duration}s`;


    flower.style.animationDelay =
        `${Math.random() * 2}s`;


    flowerLayer.appendChild(
        flower
    );


    setTimeout(
        () => flower.remove(),
        (duration + 2) * 1000
    );
}


function startFlowerAnimation() {

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            createFallingFlower,
            i * 300
        );
    }


    setInterval(
        createFallingFlower,
        CONFIG.flowerInterval
    );
}


/* =========================================
   OPEN SURPRISE
========================================= */

function openSurprise() {
    if (typeof unlockFirecracker === "function") { unlockFirecracker(); }

    if (
        !openButton ||
        !welcomeScreen ||
        !celebrationSection
    ) {
        return;
    }


    openButton.disabled =
        true;


    /*
       Fade out Phase 1
    */

    welcomeScreen.classList.add(
        "fade-out"
    );


    /*
       Reveal Phase 2
    */

    setTimeout(
        () => {

            celebrationSection.classList.add(
                "active"
            );


            celebrationSection.scrollIntoView({
                behavior: "smooth"
            });


            startFireworks();

            startFlowerAnimation();

        },
        700
    );
}


/* =========================================
   CONTINUE TO PHASE 3
========================================= */

function continueToMemories() {

    if (!memorySectionTarget) {
        return;
    }

    memorySectionTarget.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================
   EVENTS
========================================= */

if (openButton) {

    openButton.addEventListener(
        "click",
        openSurprise
    );
}


if (continueButton) {

    continueButton.addEventListener(
        "click",
        continueToMemories
    );
}


window.addEventListener(
    "resize",
    resizeFireworksCanvas
);


/* =========================================
   INITIALIZE
========================================= */

function initializeWebsite() {

    createParticles();

    startHeartAnimation();

    startRakhiSparkles();
}


initializeWebsite();

/* =========================================
   PHASE 3 + PHASE 4
   MEMORY DATA
========================================= */

const memories = [
    {
        image: "assets/photos/photo1.jpg",
        title: "A Moment To Remember",
        caption: "One of those little moments I'll always remember. ❤️"
    },
    {
        image: "assets/photos/photo2.jpg",
        title: "My Favorite Person",
        caption: "Life gave me a sister, but I got a best friend too. 💕"
    },
    {
        image: "assets/photos/photo3.jpg",
        title: "Just Us",
        caption: "Some memories become special simply because you were there."
    },
    {
        image: "assets/photos/photo4.jpg",
        title: "Growing Up Together",
        caption: "Through every silly moment and every serious one..."
    },
    {
        image: "assets/photos/photo5.jpg",
        title: "Countless Smiles",
        caption: "Growing up with you gave me countless reasons to smile."
    },
    {
        image: "assets/photos/photo6.jpg",
        title: "Little Things",
        caption: "Even the smallest moments with you mean a lot."
    },
    {
        image: "assets/photos/photo7.jpg",
        title: "Always My Sister",
        caption: "No matter how much we grow up, you'll always be my little sister. ❤️"
    },
    {
        image: "assets/photos/photo8.jpg",
        title: "Only The Beginning",
        caption: "And this is only a tiny part of everything I want to remember."
    }
];


/* =========================================
   PHASE 3 ELEMENTS
========================================= */

const memoryGrid =
    document.getElementById("memoryGrid");

const memorySection =
    document.getElementById("memorySection");

const letterTeaserButton =
    document.getElementById("letterTeaserButton");

const finalLetterButton =
    document.getElementById("finalLetterButton");


/* =========================================
   PHASE 4 MODAL ELEMENTS
========================================= */

const memoryModal =
    document.getElementById("memoryModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalClose =
    document.getElementById("modalClose");

const modalPhoto =
    document.getElementById("modalPhoto");

const modalCounter =
    document.getElementById("modalCounter");

const modalTotal =
    document.getElementById("modalTotal");

const modalMemoryTitle =
    document.getElementById("modalMemoryTitle");

const modalMemoryMessage =
    document.getElementById("modalMemoryMessage");

const previousMemory =
    document.getElementById("previousMemory");

const nextMemory =
    document.getElementById("nextMemory");

const memoryHeartButton =
    document.getElementById("memoryHeartButton");

const lastMemoryButton =
    document.getElementById("lastMemoryButton");

let currentMemoryIndex = 0;


/* =========================================
   BUILD MEMORY CARDS
========================================= */

function buildMemoryGallery() {

    if (!memoryGrid) {
        return;
    }

    memoryGrid.innerHTML = "";

    memories.forEach(
        (memory, index) => {

            const card =
                document.createElement("article");

            card.className =
                "memory-card";

            card.style.setProperty(
                "--card-delay",
                `${index * 90}ms`
            );

            card.dataset.index =
                index;


            card.innerHTML = `
                <img
                    class="memory-card-image"
                    src="${memory.image}"
                    alt="${memory.title}"
                    loading="${index < 2 ? "eager" : "lazy"}"
                >

                <div class="memory-card-overlay">

                    <div class="memory-card-content">

                        <span class="memory-number">
                            Memory ${String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 class="memory-card-title">
                            ${memory.title}
                        </h3>

                        <p class="memory-card-caption">
                            ${memory.caption}
                        </p>

                    </div>

                    <span
                        class="memory-open"
                        aria-hidden="true"
                    >
                        ↗
                    </span>

                </div>
            `;


            card.addEventListener(
                "click",
                () => openMemory(index)
            );


            memoryGrid.appendChild(card);
        }
    );


    if (modalTotal) {
        modalTotal.textContent =
            memories.length;
    }
}


/* =========================================
   OPEN MEMORY
========================================= */

function openMemory(index) {

    if (
        !memoryModal ||
        !memories[index]
    ) {
        return;
    }


    currentMemoryIndex =
        index;


    updateMemoryModal();


    memoryModal.classList.add(
        "open"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


/* =========================================
   CLOSE MEMORY
========================================= */

function closeMemory() {

    if (!memoryModal) {
        return;
    }


    memoryModal.classList.remove(
        "open"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


/* =========================================
   UPDATE MODAL
========================================= */

function updateMemoryModal() {

    const memory =
        memories[currentMemoryIndex];


    if (!memory) {
        return;
    }


    modalPhoto.src =
        memory.image;

    modalPhoto.alt =
        memory.title;

    modalCounter.textContent =
        currentMemoryIndex + 1;

    modalMemoryTitle.textContent =
        memory.title;

    modalMemoryMessage.textContent =
        memory.caption;


    if (memoryHeartButton) {
        memoryHeartButton.classList.remove(
            "loved"
        );
    }


    /*
       Give the new image a tiny
       cinematic refresh.
    */

    modalPhoto.style.opacity =
        "0";


    requestAnimationFrame(
        () => {

            modalPhoto.style.transition =
                "opacity 0.35s ease";

            modalPhoto.style.opacity =
                "1";

        }
    );
}


/* =========================================
   NEXT MEMORY
========================================= */

function showNextMemory() {

    currentMemoryIndex =
        (
            currentMemoryIndex + 1
        ) %
        memories.length;


    updateMemoryModal();

    createModalHeartBurst();
}


/* =========================================
   PREVIOUS MEMORY
========================================= */

function showPreviousMemory() {

    currentMemoryIndex =
        (
            currentMemoryIndex - 1 +
            memories.length
        ) %
        memories.length;


    updateMemoryModal();

    createModalHeartBurst();
}


/* =========================================
   HEART BURST
========================================= */

function createModalHeartBurst(
    originX = window.innerWidth / 2,
    originY = window.innerHeight / 2
) {

    const heartTypes = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "💓"
    ];


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const heart =
            document.createElement("span");


        heart.className =
            "memory-burst-heart";


        heart.textContent =
            heartTypes[
                Math.floor(
                    Math.random() *
                    heartTypes.length
                )
            ];


        heart.style.left =
            `${originX}px`;

        heart.style.top =
            `${originY}px`;


        heart.style.setProperty(
            "--burst-x",
            `${(Math.random() - 0.5) * 260}px`
        );


        heart.style.setProperty(
            "--burst-y",
            `${(Math.random() - 0.5) * 220}px`
        );


        heart.style.setProperty(
            "--burst-r",
            `${(Math.random() - 0.5) * 90}deg`
        );


        heart.style.animationDelay =
            `${Math.random() * 100}ms`;


        document.body.appendChild(
            heart
        );


        setTimeout(
            () => heart.remove(),
            1100
        );
    }
}


/* =========================================
   SEND LOVE
========================================= */

function sendLove() {

    if (!memoryHeartButton) {
        return;
    }


    memoryHeartButton.classList.add(
        "loved"
    );


    const rect =
        memoryHeartButton.getBoundingClientRect();


    createModalHeartBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
    );
}


/* =========================================
   PHASE 4 → FINAL BRIDGE
========================================= */

function goToMessageBridge() {

    closeMemory();


    const bridge =
        document.getElementById(
            "messageBridge"
        );


    if (!bridge) {
        return;
    }


    bridge.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !memoryModal ||
            !memoryModal.classList.contains("open")
        ) {
            return;
        }


        if (event.key === "Escape") {
            closeMemory();
        }


        if (event.key === "ArrowRight") {
            showNextMemory();
        }


        if (event.key === "ArrowLeft") {
            showPreviousMemory();
        }
    }
);


/* =========================================
   MEMORY EVENTS
========================================= */

if (modalClose) {
    modalClose.addEventListener(
        "click",
        closeMemory
    );
}

if (modalBackdrop) {
    modalBackdrop.addEventListener(
        "click",
        closeMemory
    );
}

if (nextMemory) {
    nextMemory.addEventListener(
        "click",
        showNextMemory
    );
}

if (previousMemory) {
    previousMemory.addEventListener(
        "click",
        showPreviousMemory
    );
}

if (memoryHeartButton) {
    memoryHeartButton.addEventListener(
        "click",
        sendLove
    );
}

if (lastMemoryButton) {
    lastMemoryButton.addEventListener(
        "click",
        goToMessageBridge
    );
}

if (letterTeaserButton) {
    letterTeaserButton.addEventListener(
        "click",
        goToMessageBridge
    );
}

if (finalLetterButton) {
    finalLetterButton.addEventListener("click", () => {
        const letterSection = document.getElementById("letterSection");
        if (letterSection) {
            letterSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}


/* =========================================
   PHASE 5 — LETTER INTERACTION
========================================= */

const openRealLetter =
    document.getElementById("openRealLetter");

const letterIntro =
    document.getElementById("letterIntro");

const letterScene =
    document.getElementById("letterScene");

const letterFinalMessage =
    document.getElementById("letterFinalMessage");

const restartSurprise =
    document.getElementById("restartSurprise");


function createLetterHeartRain() {

    const hearts = ["❤️", "💗", "💕", "💖", "🌸", "✨"];

    for (let i = 0; i < 28; i++) {

        const heart = document.createElement("span");

        heart.className = "memory-burst-heart";
        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = `${20 + Math.random() * 60}vw`;
        heart.style.top = `${35 + Math.random() * 30}vh`;

        heart.style.setProperty(
            "--burst-x",
            `${(Math.random() - 0.5) * 700}px`
        );

        heart.style.setProperty(
            "--burst-y",
            `${(Math.random() - 0.5) * 600}px`
        );

        heart.style.setProperty(
            "--burst-r",
            `${(Math.random() - 0.5) * 180}deg`
        );

        heart.style.animationDuration =
            `${900 + Math.random() * 900}ms`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }
}


function openLetterScene() {

    if (!letterIntro || !letterScene) return;

    letterIntro.classList.add("hidden");
    letterScene.classList.add("active");

    setTimeout(() => {
        letterScene.classList.add("opening");
        createLetterHeartRain();
    }, 450);

    setTimeout(() => {
        letterScene.classList.add("letter-open");
    }, 1250);

    // The final message is intentionally NOT shown automatically.
    // It appears only after the user finishes reading the letter.
}


if (openRealLetter) {
    openRealLetter.addEventListener("click", openLetterScene);
}


const finishLetterButton =
    document.getElementById("finishLetterButton");

if (finishLetterButton) {
    finishLetterButton.addEventListener("click", () => {

        if (letterScene) {
            letterScene.classList.add("letter-finished");
        }

        setTimeout(() => {
            if (letterFinalMessage) {
                letterFinalMessage.classList.add("show");
                letterFinalMessage.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }
        }, 650);
    });
}


if (restartSurprise) {
    restartSurprise.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => window.location.reload(), 700);
    });
}


/*
   CHANGE "My Sister" TO HER REAL NAME
   WHEN YOU ARE READY.
*/

const sisterName =
    document.getElementById("sisterName");

if (sisterName) {
    sisterName.textContent = "Naya Vagarni";
}



/* =========================================
   INITIALIZE PHASE 3
========================================= */

buildMemoryGallery();


/* =========================================
   PHASE 6 — FINAL POLISH
========================================= */

const musicToggle =
    document.getElementById("musicToggle");

const rakhiMusic =
    document.getElementById("rakhiMusic");

const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/*
   Optional music:
   Put your own file here:
   assets/music/rakhi.mp3

   The site does NOT autoplay music.
   The visitor must tap the music button.
*/

if (musicToggle && rakhiMusic) {

    const musicSource =
        rakhiMusic.querySelector("source");

    const hasMusic =
        musicSource &&
        musicSource.getAttribute("src");

    if (!hasMusic) {
        musicToggle.disabled = true;
        musicToggle.setAttribute(
            "aria-label",
            "Add music to enable this button"
        );
        musicToggle.title =
            "Add assets/music/rakhi.mp3 to enable music";
    }

    musicToggle.addEventListener(
        "click",
        async () => {

            if (!hasMusic) return;

            try {

                if (rakhiMusic.paused) {

                    await rakhiMusic.play();

                    musicToggle.classList.add(
                        "is-playing"
                    );

                    musicToggle.setAttribute(
                        "aria-pressed",
                        "true"
                    );

                    musicToggle.textContent = "♫";

                } else {

                    rakhiMusic.pause();

                    musicToggle.classList.remove(
                        "is-playing"
                    );

                    musicToggle.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                    musicToggle.textContent = "♪";
                }

            } catch (error) {

                console.warn(
                    "Music could not be played:",
                    error
                );

            }
        }
    );
}


/*
   Make sure the main navigation buttons always
   target the real sections.
*/

function smoothGoTo(id) {

    const target =
        document.getElementById(id);

    if (!target) {
        console.warn(
            `Navigation target #${id} was not found.`
        );
        return;
    }

    target.scrollIntoView({
        behavior: prefersReducedMotion
            ? "auto"
            : "smooth",
        block: "start"
    });
}


const memoriesButton =
    document.querySelector(
        "#heroSection .continue-button, " +
        "#heroSection #continueMemories, " +
        ".continue-to-memories"
    );

if (memoriesButton) {
    memoriesButton.addEventListener(
        "click",
        () => smoothGoTo("memorySection")
    );
}


/*
   If the project uses an ID instead of a class,
   support the common button names too.
*/

[
    "continueMemories",
    "continueToMemories",
    "memoryButton"
].forEach((buttonId) => {

    const button =
        document.getElementById(buttonId);

    if (button) {

        button.addEventListener(
            "click",
            () => smoothGoTo("memorySection")
        );

    }
});



/* ===== Photos are images only ===== */
(function(){
    const grid=document.getElementById("memoryGrid");
    if(!grid)return;

    const photos=[
        "assets/photos/photo1.jpg",
        "assets/photos/photo2.jpg",
        "assets/photos/photo3.jpg",
        "assets/photos/photo4.jpg",
        "assets/photos/photo5.jpg",
        "assets/photos/photo6.jpg",
        "assets/photos/photo7.jpg",
        "assets/photos/photo8.jpg"
    ];

    function render(){
        grid.innerHTML="";
        photos.forEach((src,i)=>{
            const card=document.createElement("button");
            card.type="button";
            card.className="memory-card photo-only-card";
            card.setAttribute("aria-label",`Open photo ${i+1}`);
            card.innerHTML=`<img class="memory-card-image" src="${src}" alt="Photo ${i+1}" loading="${i<2?"eager":"lazy"}">`;
            card.addEventListener("click",()=>{
                if(typeof openMemory==="function")openMemory(i);
            });
            grid.appendChild(card);
        });
    }
    render();
})();




/* Bouquet particles/falling flowers from the supplied reference. */
(function(){
    const section=document.getElementById("bouquetSection");
    if(!section)return;
    const symbols=["🌸","🌺","🌷","✿","❀"];
    for(let i=0;i<35;i++){
        const p=document.createElement("span");
        p.className="bouquet-particle";
        p.style.left=Math.random()*100+"%";
        p.style.setProperty("--size",2+Math.random()*5+"px");
        p.style.setProperty("--delay",-Math.random()*8+"s");
        section.appendChild(p);
    }
    for(let i=0;i<18;i++){
        const p=document.createElement("span");
        p.className="bouquet-falling";
        p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
        p.style.left=Math.random()*100+"%";
        p.style.setProperty("--size",12+Math.random()*15+"px");
        p.style.setProperty("--duration",7+Math.random()*8+"s");
        p.style.setProperty("--delay",-Math.random()*10+"s");
        section.appendChild(p);
    }
    const br=document.getElementById("bouquetRestart");
    if(br) br.onclick=(e)=>{e.preventDefault();try{sessionStorage.setItem("rakhi_restart_top","1")}catch(_){}
        location.href=location.href.split("#")[0];};
})();





/* =========================================================
   AUTHORITATIVE BACKGROUND MUSIC CONTROL
========================================================= */

(function () {
    const music = document.getElementById("rakhiMusic");
    const button = document.getElementById("rakhiMusicToggle");
    const volume = document.getElementById("rakhiMusicVolume");
    const openBtn = document.getElementById("openButton");

    if (!music) {
        return;
    }

    music.preload = "auto";
    music.volume = 0.38;

    function syncMusicUI() {
        if (!button) return;

        const playing = !music.paused;

        button.textContent = playing ? "♫" : "♪";
        button.classList.toggle("is-on", playing);
        button.classList.toggle("is-off", !playing);

        button.setAttribute(
            "aria-pressed",
            String(playing)
        );

        button.setAttribute(
            "aria-label",
            playing
                ? "Pause background music"
                : "Play background music"
        );
    }

    async function startMusic() {
        try {
            await music.play();
        } catch (error) {
            /*
               Browser autoplay policy may block this.
               The dedicated music button remains available.
            */
        }

        syncMusicUI();
    }

    async function toggleMusic() {
        try {
            if (music.paused) {
                await music.play();
            } else {
                music.pause();
            }
        } catch (error) {
            console.warn(
                "Background music could not play:",
                error
            );
        }

        syncMusicUI();
    }

    if (button) {
        button.onclick = toggleMusic;
    }

    music.addEventListener("play", syncMusicUI);
    music.addEventListener("pause", syncMusicUI);
    music.addEventListener("ended", syncMusicUI);

    if (volume) {
        volume.value = "0.38";

        volume.oninput = () => {
            music.volume = Number(volume.value);
        };
    }

    /*
       The Open Surprise click is a user gesture, so try to start
       the music there. If autoplay is blocked, the button still
       works immediately.
    */
    if (openBtn) {
        openBtn.addEventListener(
            "click",
            startMusic,
            { once: true, passive: true }
        );
    }

    syncMusicUI();

    /*
       If the browser only allows playback after another user
       gesture, retry on the first later pointer/key interaction.
    */
    let retried = false;

    function retryOnce() {
        if (retried || !music.paused) return;

        retried = true;
        startMusic();
    }

    document.addEventListener(
        "pointerdown",
        retryOnce,
        { once: true, passive: true }
    );

    document.addEventListener(
        "keydown",
        retryOnce,
        { once: true }
    );
})();
