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
    } else {
        // Handle non-iOS devices
        window.addEventListener('devicemotion', handleMotion);
    }
});

function handleMotion(event) {
    const { acceleration, rotationRate } = event;
    
    if(acceleration) {
        updateIfChanged('a-x', acceleration.x);
        updateIfChanged('a-y', acceleration.y);
        updateIfChanged('a-z', acceleration.z);
    }
    if(rotationRate) {
        updateIfChanged('r-alpha', rotationRate.alpha);
        updateIfChanged('r-beta', rotationRate.beta);
        updateIfChanged('r-gamma', rotationRate.gamma);
    }
}

function updateIfChanged(elementId, newValue, threshold = CHANGE_THRESHOLD) {
    if(newValue === null || newValue === undefined) {
        return;
    }

    

    const previousValue = lastValues[elementId];

    if (previousValue === undefined || 
        Math.abs(newValue - previousValue) >= threshold) {

            const label = {
                'a-x': 'X',
                'a-y': 'Y',
                'a-z': 'Z',
                'r-alpha': 'Alpha',
                'r-beta': 'Beta',
                'r-gamma': 'Gamma'
            }[elementId];
            
        document.getElementById(elementId).textContent = label + ": " + newValue.toFixed(2);
        lastValues[elementId] = newValue;
    }
}