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
        medium: {
            src: "./assets/levelP1Medium.png",
            options: {},
        },
        large: {
            src: "./assets/levelP1.png",
            options: {},
        },
    },
    levelP2: {
        medium: {
            src: "./assets/levelP2Medium.png",
            options: {},
        },
        large: {
            src: "./assets/levelP2.png",
            options: {},
        },
    },
    levelP3: {
        medium: {
            src: "./assets/levelP3Medium.png",
            options: {},
        },
        large: {
            src: "./assets/levelP3.png",
            options: {},
        },
    },
    citySign: {
        medium: {
            src: "./assets/citySignMedium.png",
            options: {
                sliceX: 3,
                sliceY: 3,
                anims: {
                    hologram: {
                        from: 0,
                        to: 6,
                        speed: 10,
                        loop: false,
                    }
                }
            },
        },
        large: {
            src: "./assets/citySign.png",
            options: {
                sliceX: 5,
                sliceY: 4,
                anims: {
                    hologram: {
                        from: 0,
                        to: 16,
                        speed: 15,
                        loop: false,
                    }
                }
            },
        },
    },
    hologramCV: {
        medium: {
            src: "./assets/hologramCVMedium.png",
            options: {
                sliceX: 3,
                sliceY: 3,
                anims: {
                    hologram: {
                        from: 0,
                        to: 8,
                        speed: 8,
                        loop: true,
                    }
                }
            },
        },
        large: {
            src: "./assets/hologramCV.png",
            options: {
                sliceX: 3,
                sliceY: 3,
                anims: {
                    hologram: {
                        from: 0,
                        to: 8,
                        speed: 8,
                        loop: true,
                    }
                }
            },
        },
    },
    hologramPortfolio: {
        medium: {
            src: "./assets/hologramPortfolioMedium.png",
            options: {
                sliceX: 3,
                sliceY: 3,
                anims: {
                    hologram: {
                        from: 0,
                        to: 8,
                        speed: 8,
                        loop: true,
                    }
                }
            },
        },
        large: {
            src: "./assets/hologramPortfolio.png",
            options: {
                sliceX: 3,
                sliceY: 3,
                anims: {
                    hologram: {
                        from: 0,
                        to: 8,
                        speed: 8,
                        loop: true,
                    }
                }
            },
        },
    },
    hologramContact: {
        medium: {
            src: "./assets/hologramContactMedium.png",
            options: {
                sliceX: 3,
                sliceY: 3,
                anims: {
                    hologram: {
                        from: 0,
                        to: 8,
                        speed: 8,
                        loop: true,
                    }
                }
            },
        },
        large: {
            src: "./assets/hologramContact.png",
            options: {
                sliceX: 3,
                sliceY: 3,
                anims: {
                    hologram: {
                        from: 0,
                        to: 8,
                        speed: 8,
                        loop: true,
                    }
                }
            },
        },
    },
};

function getSpriteSizeCategory() {
    if (deviceInfo.isIpad || deviceInfo.isTablet || deviceInfo.isMobile) {
        //console.log("is a tablet");
        return "medium";
    }
    // else if(deviceInfo.isMobile){

    // }
    else {
        // Desktop
        //console.log("is desktop");
        return "large";
    }
};

function loadAppropriateSprites(spriteName) {
    const sizeCategory = getSpriteSizeCategory();
    const config = spriteConfig[spriteName];

    if (!config) {
        console.warn(`Sprite ${spriteName} not found in config`);
        return `./assets/${spriteName}.png`; // fallback
    }
    //console.log(sizeCategory);

    const spriteData = config[sizeCategory] || config.large;

    k.loadSprite(spriteName, spriteData.src, spriteData.options);
    console.log(spriteData.src);
};

loadAppropriateSprites("levelP1");
loadAppropriateSprites("levelP2");
loadAppropriateSprites("levelP3");

loadAppropriateSprites("citySign");
loadAppropriateSprites("hologramCV");
loadAppropriateSprites("hologramPortfolio");
loadAppropriateSprites("hologramContact");