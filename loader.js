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

const screenWidth = Math.max(window.innerWidth, window.innerHeight);
let prefix = "Small";

if(deviceInfo.isIpad){
    console.log("Is An Ipad");
}
if(deviceInfo.isTablet){
    console.log("is a tablet");
}

loadSprite("levelP1", "./assets/levelP1.png");
loadSprite("levelP2", "./assets/levelP2.png");
loadSprite("levelP3", "./assets/levelP3.png");

loadFont("orbitron", "./fonts/static/Orbitron-Regular.ttf");