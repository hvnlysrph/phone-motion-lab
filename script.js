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
    
    document.getElementById('a-x').textContent = acceleration.x?.toFixed(2) || '—';
    document.getElementById('a-y').textContent = acceleration.y?.toFixed(2) || '—';
    document.getElementById('a-z').textContent = acceleration.z?.toFixed(2) || '—';

    document.getElementById('r-alpha').textContent = `Alpha: ${rotationRate.alpha?.toFixed(2) || '—'}`;
    document.getElementById('r-beta').textContent = `Beta: ${rotationRate.beta?.toFixed(2) || '—'}`;
    document.getElementById('r-gamma').textContent = `Gamma: ${rotationRate.gamma?.toFixed(2) || '—'}`;
}

function updateIfChanged(elementId, newValue) {
    if(newValue === null || newValue === undefined) {
        return;
    }

    const previousValue = lastValues[elementId];
    if (previousValue === undefined || Math.abs(newValue - previousValue) >= CHANGE_THRESHOLD) {
        document.getElementById(elementId).textContent = newValue.toFixed(2);
        lastValues[elementId] = newValue;
    }
}