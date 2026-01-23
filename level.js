
export let levelControl = null;

export function level(k, dataLevel) {
    k.setGravity(1400);

    let mapParts = [];
    let colliderObjects = [];
    let player = null;
    let borders = null;
    let holograms = [];
    let gameManager = null;
    const FIXED_VIEW_WIDTH = 1820;

    // Initialisation unique
    function initializeMap() {
        // Créer les trois parties du background une seule fois
        const mapPart1 = k.add([pos(0, 0), sprite("levelP1"), k.z(0)]);
        const mapPart2 = k.add([pos(0, 0), sprite("levelP2"), k.z(0)]);
        const mapPart3 = k.add([pos(0, 0), sprite("levelP3"), k.z(0)]);

        mapParts = [mapPart1, mapPart2, mapPart3];

        // Appliquer le scaling initial
        updateScaling();
    }

    // Fonction pour calculer et appliquer le scaling
    function updateScaling() {
        const canvasWidth = width();
        const canvasHeight = height();

        if (mapParts.length === 0) return;

        const scaleY = canvasHeight / mapParts[0].height;
        // const scaleX = canvasWidth / FIXED_VIEW_WIDTH;
        const scaleX = canvasWidth / mapParts[0].width;

        // Mettre à jour l'échelle et la position sans détruire
        mapParts.forEach((part, index) => {
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

        k.setGravity(1400 * scaleY);
    }

    // Initialisation
    initializeMap();

    return levelControl;

}

// Fonction pour calculer le scale actuel
function getCurrentScale(mapParts) {
    if (mapParts.length === 0) return { scaleX: 1, scaleY: 1 };

    const canvasWidth = width();
    const canvasHeight = height();
    const scaleY = canvasHeight / mapParts[0].height;
    const scaleX = canvasWidth / FIXED_VIEW_WIDTH;

    return { scaleX, scaleY };
}