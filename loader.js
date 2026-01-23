import kaplay from "https://unpkg.com/kaplay@4000.0.0-alpha.26/dist/kaplay.mjs";
import { deviceInfo } from "./deviceInfo.js";

export const k = kaplay({
    canvas: document.getElementById("gameCanvas"),
    background: "#5ba675",
    texFilter: "linear",
    crisp: false,
    touchToMouse: true,
    maxFPS: 60,
    pixelDensity: 1,
    narrowPhaseCollisionAlgorithm: "sat",
    broadPhaseCollisionAlgorithm: "sap",
});

k.loadFont("orbitron", "./fonts/static/Orbitron-Regular.ttf");

const spriteConfig = {
    levelP1: {
        medium: "./assets/levelP1Medium.png",
        large: "./assets/levelP1.png"
    },
    levelP2: {
        medium: "./assets/levelP2Medium.png",
        large: "./assets/levelP2.png"
    },
    levelP3: {
        medium: "./assets/levelP3Medium.png",
        large: "./assets/levelP3.png"
    },
};

function getSpriteSizeCategory() {
    if (deviceInfo.isIpad || deviceInfo.isTablet) {
        console.log("is a tablet");
        return "medium";
    }
    // else if(deviceInfo.isMobile){

    // }
    else {
        // Desktop
        console.log("is desktop");
        return "large";
    }
};

function getSpritePath(spriteName) {
    const sizeCategory = getSpriteSizeCategory();
    const config = spriteConfig[spriteName];

    if (!config) {
        console.warn(`Sprite ${spriteName} not found in config`);
        return `./assets/${spriteName}.png`; // fallback
    }
    console.log(sizeCategory);

    return config[sizeCategory] || config.large;
};

function loadAppropriateSprites(spriteName, options) {
    const spritePath = getSpritePath(spriteName);
    k.loadSprite(spriteName, spritePath, options);
};

loadAppropriateSprites("levelP1", {});
loadAppropriateSprites("levelP2", {});
loadAppropriateSprites("levelP3", {});