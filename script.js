const enableMotionButton = document.getElementById('enable-motion');
const accelerationSection = document.getElementById('acceleration');
const rotationSection = document.getElementById('rotation');
const CHANGE_THRESHOLD = 1.0; // Threshold for detecting significant changes

let lastValues = {};

enableMotionButton.addEventListener('click', () => {
    if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                }
            })
            .catch(console.error);
    }
});

function handleMotion(event) {
    const { acceleration, rotationRate } = event;
    
    document.getElementById('a-x').textContent = "X: " + updateIfChanged('a-x', acceleration.x);
    document.getElementById('a-y').textContent = "Y: " + updateIfChanged('a-y', acceleration.y);
    document.getElementById('a-z').textContent = "Z: " + updateIfChanged('a-z', acceleration.z);

    document.getElementById('r-alpha').textContent = "Alpha: " + updateIfChanged('r-alpha', rotationRate.alpha, 5.0);
    document.getElementById('r-beta').textContent = "Beta: " + updateIfChanged('r-beta', rotationRate.beta, 5.0);
    document.getElementById('r-gamma').textContent = "Gamma: " + updateIfChanged('r-gamma', rotationRate.gamma, 5.0);
}

function updateIfChanged(elementId, newValue, threshold = CHANGE_THRESHOLD) {
    if(newValue === null || newValue === undefined) {
        return;
    }

    const previousValue = lastValues[elementId];

    if (previousValue === undefined || 
        Math.abs(newValue - previousValue) >= threshold) {
        document.getElementById(elementId).textContent = newValue.toFixed(2);
        lastValues[elementId] = newValue;
    }
}