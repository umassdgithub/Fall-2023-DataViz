function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Function to calculate the length of a LINESTRING geometry in kilometers
function calculateLineLength(coordinates) {
    let length = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
        let p1 = coordinates[i];
        let p2 = coordinates[i + 1];
        length += haversineDistance(p1[1], p1[0], p2[1], p2[0]);
    }
    return length;
}