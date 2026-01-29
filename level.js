import { createWorld } from "./animationManager.js";

export let levelControl = null;

export function level(k, dataLevel) {
    k.setGravity(1400);

    let mapParts = [];
    let colliderObjects = [];
    let player = null;
    let borders = null;
    let holograms = [];
    let gameManager = null;
    let FIXED_VIEW_WIDTH = 1820;
    const REFERENCE_SPRITE_WIDTH = 2176; // Largeur réelle de la sprite originale
    let spriteScaleRatio = 1; // Ratio entre sprite de desktop et sprite actuelle

    const world = createWorld();

    // Initialisation unique
    function initializeMap() {
        // Créer les trois parties du background une seule fois
        const mapPart1 = k.add([pos(0, 0), sprite("levelP1"), k.z(0)]);
        const mapPart2 = k.add([pos(0, 0), sprite("levelP2"), k.z(0)]);
        const mapPart3 = k.add([pos(0, 0), sprite("levelP3"), k.z(0)]);

        mapParts = [mapPart1, mapPart2, mapPart3];

        FIXED_VIEW_WIDTH = mapPart1.width;
        // Calculer le ratio de scaling de la sprite par rapport à la sprite "de référence" (1820)
        spriteScaleRatio = mapPart1.width / REFERENCE_SPRITE_WIDTH;

        const { scaleX, scaleY } = getCurrentScale(mapParts);

        // Créer les colliders une seule fois
        const levelLayers = dataLevel.layers;
        const colliders = [];
        for (const layer of levelLayers) {
            if (layer.name === "colliders") {
                colliders.push(...layer.objects);
                break;
            }
        }

        colliderObjects = setMapColliders(k, mapPart1, colliders);

        // Créer les bordures invisibles
        borders = setMapBorders(k, 128, height(), mapPart1.width);

        holograms = setHolograms(k, levelLayers[6].objects, scaleX, scaleY);

        // Appliquer le scaling initial
        updateScaling();
    }

    function setMapColliders(k, mapPart, colliders) {
        const colliderObjects = [];

        for (const collider of colliders) {
            // Stocker les valeurs ORIGINALES du JSON (pas de scaling ici!)
            const colliderObj = k.add([
                k.pos(0, 0),
                k.area({
                    shape: new k.Rect(k.vec2(0), 0, 0)
                }),
                k.body({ isStatic: true }),
                "collider",
            ]);

            // Stocker les données originales du JSON
            colliderObj.original = {
                width: collider.width,
                height: collider.height,
                x: collider.x,
                y: collider.y
            };

            colliderObjects.push(colliderObj);
        }
        return colliderObjects;
    }

    function setMapBorders(k, tilewidth, mapheight, mapWidth) {
        const borderLeft = k.add([
            k.rect(tilewidth, mapheight),
            k.area({ collisionIgnore: ["collider"] }),
            k.opacity(0),
            k.body({ isStatic: true }),
            k.pos(-128, 0),
            "borderLeft",
        ]);

        const borderRight = k.add([
            k.rect(tilewidth, mapheight),
            k.area({ collisionIgnore: ["collider"] }),
            k.opacity(0),
            k.body({ isStatic: true }),
            k.pos(mapWidth, 0),
            "borderRight",
        ]);

        return { left: borderLeft, right: borderRight };
    }

    function setHolograms(k, hologramsMapPosition, scaleX, scaleY) {
        const holograms = [];
        const map = mapParts[0];

        const hologramsConfig = {
            hologramPortfolio: {
                sprite: "hologramPortfolio",
                scale: 0.6,
                yOffset: 10,
            },
            hologramCV: {
                sprite: "hologramCV",
                scale: 0.6,
                yOffset: 10,
            },
            hologramContact: {
                sprite: "hologramContact",
                scale: 0.6,
                yOffset: 10,
            },
            citySign: {
                sprite: "citySign",
                scale: 1,
                yOffset: 0,
            },
        };

        for (const position of hologramsMapPosition) {
            const config = hologramsConfig[position.name];

            if (!config) continue; // Ignore positions not in the config
            //("---------------------------------------------------");
            const x = mapParts[0].pos.x + position.x * scaleX * spriteScaleRatio;
            const y = mapParts[0].pos.y + (position.y + config.yOffset) * scaleY * spriteScaleRatio;

            const hologram = world.add([
                k.sprite(config.sprite, position.name === "citySign" ? {} : { anim: "hologram" }),
                k.area({ isSensor: true, collisionIgnore: ["collider", "borderLeft", "borderRight", "collectible", "enemy"] }),
                k.anchor("bot"),
                k.pos(x, y), // Position originale de Tiled
                k.scale(config.scale * scaleX, config.scale * scaleY),
                k.offscreen({ hide: true, pause: true, distance:500, unpause: true}),
                k.z(1),
                config.sprite,
            ]);

            const originalAnimSpeed = hologram.animSpeed || 1;

            // If not a city sign then we want a pointer cursor when user hover the gameobject
            if (position.name !== "citySign") {
                hologram.onHover(() => {
                    k.setCursor("pointer");
                });

                hologram.onHoverEnd(() => {
                    k.setCursor("default");
                });
            }
            else {
                // Special animation for citySign
                // k.wait(0.1, () => {
                //     delayedLoop(k, hologram, "hologram", 5);
                // });
            }

            // Mémoriser la position originale et le scale
            holograms.push({
                object: hologram,
                originalX: position.x,
                originalY: position.y + config.yOffset,
                originalScale: config.scale,
            });
            //console.log(hologram.pos.x);
            //console.log(hologram.pos.y)
        }

        return holograms;
    }

    // Fonction pour calculer et appliquer le scaling
    function updateScaling() {

        if (mapParts.length === 0) return;

        const { scaleX, scaleY } = getCurrentScale(mapParts);

        // const canvasWidth = width();
        // const canvasHeight = height();

        // const scaleY = canvasHeight / mapParts[0].height;
        // const scaleX = canvasWidth / FIXED_VIEW_WIDTH;

        // Mettre à jour l'échelle et la position sans détruire
        mapParts.forEach((part) => {
            part.scale = vec2(scaleX, scaleY);
        });

        // Repositionner les parties
        mapParts[0].pos = vec2(0, 0);
        if (mapParts[1]) {
            mapParts[1].pos = vec2(mapParts[0].width * scaleX, 0);
        }
        if (mapParts[2]) {
            mapParts[2].pos = vec2((mapParts[0].width + mapParts[1].width) * scaleX, 0);
        }

        // Mettre à jour les bordures
        updateBorders(scaleX, scaleY);

        // Mettre à jour les colliders
        updateColliders(scaleX, scaleY);

        // Update Holograms
        updateHolograms(scaleX, scaleY);

        k.setGravity(1400 * scaleY);
    }

    // Fonction pour calculer le scale actuel
    function getCurrentScale(mapParts) {
        if (mapParts.length === 0) return { scaleX: 1, scaleY: 1 };

        // const canvasWidth = width();
        // const canvasHeight = height();
        // const scaleY = canvasHeight / mapParts[0].height;
        // const scaleX = canvasWidth / mapParts[0].width;
        const canvasWidth = width();
        const canvasHeight = height();

        const scaleY = canvasHeight / mapParts[0].height;
        const scaleX = canvasWidth / FIXED_VIEW_WIDTH;

        return { scaleX, scaleY };
    }

    function updateBorders(scaleX, scaleY) {
        if (!borders) return;

        const canvasHeight = height();
        const mapTotalWidth = (mapParts[0].width + mapParts[1].width + mapParts[2].width) * scaleX;
        const borderWidth = 128 * scaleX;

        borders.left.width = borderWidth;
        borders.left.height = canvasHeight;
        borders.left.pos = vec2(-borderWidth, 0);

        borders.right.width = borderWidth;
        borders.right.height = canvasHeight;
        borders.right.pos = vec2(mapTotalWidth, 0);
    }

    function updateColliders(scaleX, scaleY) {
        // Les colliders du JSON correspondent à la sprite ORIGINALE de référence (1820px)
        // Les colliders Y doivent aussi être scalés par spriteScaleRatio
        // Car ils sont basés sur les proportions de la sprite de référence

        colliderObjects.forEach(collider => {
            collider.pos = vec2(
                collider.original.x * scaleX,
                collider.original.y * scaleY * spriteScaleRatio
            );

            collider.area.shape.width = collider.original.width * scaleX;
            collider.area.shape.height = collider.original.height * scaleY * spriteScaleRatio;


        });
    }

    function updateHolograms(scaleX, scaleY) {
        if (!holograms || holograms.length === 0) return;

        // const mapHeight = mapParts[0].height * scaleY;
        // const canvasHeight = height();
        // const mapOffsetY = canvasHeight - mapHeight;

        // for (const data of holograms) {
        //     // Position map → écran
        //     data.object.pos.x = data.originalX * scaleX;
        //     data.object.pos.y = mapOffsetY + (data.originalY * scaleY);

        //     // SCALE NON UNIFORME COMME LA MAP
        //     data.object.scale = vec2(
        //         data.originalScale * scaleX,
        //         data.originalScale * scaleY
        //     );
        // }
        const map = mapParts[0];

        for (const data of holograms) {

            data.object.pos = vec2(
                map.pos.x + data.originalX * scaleX * spriteScaleRatio,
                map.pos.y + data.originalY * scaleY * spriteScaleRatio
            );

            data.object.scale = vec2(
                data.originalScale * scaleX,
                data.originalScale * scaleY
            );
        }
    }

    // Initialisation
    initializeMap();

    // When we resize the canvas we must recalculate the scale of the gameObjects in the scene.
    const resizeHandler = onResize(() => {
        updateScaling();
    });

    return levelControl;
}