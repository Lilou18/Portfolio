import { k } from "./loader.js";
import { level } from "./level.js";

k.scene("level", async () => {
    // Load level data
    const levelData = await fetch("level2.json");
    const levelDataJson = await levelData.json();

    k.onLoad(() => {
        const levelControl = level(k, levelDataJson);
    });

    // Display FPS in game
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    // Affichage dans Kaplay
    const fpsText = k.add([
        k.text("FPS: 0"),
        k.pos(10, 10),
        k.fixed(),
        k.z(1000),
    ]);

    function updateFPS() {
        frames++;
        const now = performance.now();

        if (now - lastTime >= 1000) {
            fps = frames;
            frames = 0;
            lastTime = now;
            fpsText.text = `FPS: ${fps}`;
        }

        requestAnimationFrame(updateFPS);
    }

    updateFPS();

});

k.go("level");