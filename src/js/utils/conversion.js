export function convertCoordsToVector(lat, lng, radius = 1){
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 90) * (Math.PI / 180);

    return {
        x: -radius * Math.sin(phi) * Math.cos(theta),
        z: radius * Math.sin(phi) * Math.sin(theta),
        y: radius * Math.cos(phi)
    };
}

export function convertSphericalToVector({ radius, phi, theta }){
    return {
        x: -radius * Math.sin(phi) * Math.cos(theta),
        z: radius * Math.sin(phi) * Math.sin(theta),
        y: radius * Math.cos(phi)
    };
}