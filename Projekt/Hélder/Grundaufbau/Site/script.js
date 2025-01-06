const planets = [
    { name: 'Mercury', size: 3.8,  distance: 80,  color: '#A0522D', period: 88 },
    { name: 'Venus',   size: 9.5,  distance: 120, color: '#DEB887', period: 225 },
    { name: 'Earth',   size: 10,   distance: 160, color: '#4169E1', period: 365 },
    { name: 'Mars',    size: 5.3,  distance: 200, color: '#CD5C5C', period: 687 },
    { name: 'Jupiter', size: 112,  distance: 300, color: '#DAA520', period: 4333 },
    { name: 'Saturn',  size: 94.5, distance: 400, color: '#F4A460', period: 10759 },
    { name: 'Uranus',  size: 40,   distance: 500, color: '#87CEEB', period: 30687 },
    { name: 'Neptune', size: 38.8, distance: 600, color: '#1E90FF', period: 60190 }
];

const solarSystem = document.getElementById('solarSystem');
let scale = 1;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let speed = 1;

// Create planets
planets.forEach(planet => {
    // Create orbit
    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    orbit.style.width = `${planet.distance * 2}px`;
    orbit.style.height = `${planet.distance * 2}px`;
    solarSystem.appendChild(orbit);

    // Create planet
    const planetEl = document.createElement('div');
    planetEl.className = 'planet';
    planetEl.style.width = `${planet.size}px`;
    planetEl.style.height = `${planet.size}px`;
    planetEl.style.backgroundColor = planet.color;
    solarSystem.appendChild(planetEl);

    // Create trail element
    const trail = document.createElement('div');
    trail.className = 'trail';
    solarSystem.appendChild(trail);

    // Animate planet
    let angle = 0;
    setInterval(() => {
        angle += (2 * Math.PI) / (planet.period / 2 / speed);
        const x = Math.cos(angle) * planet.distance + solarSystem.clientWidth / 2;
        const y = Math.sin(angle) * planet.distance + solarSystem.clientHeight / 2;
        planetEl.style.left = `${x}px`;
        planetEl.style.top = `${y}px`;

        // Update trail
        const centerX = solarSystem.clientWidth / 2;
        const centerY = solarSystem.clientHeight / 2;
        const length = planet.distance;
        const rotation = (angle * 180 / Math.PI) - 90;

        trail.style.left = `${centerX}px`;
        trail.style.top = `${centerY}px`;
        trail.style.height = `${length}px`;
        trail.style.transform = `rotate(${rotation}deg)`;
    }, 50);
});

// Zoom functionality
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale *= delta;
    scale = Math.min(Math.max(0.1, scale), 5);
    solarSystem.style.transform = `scale(${scale})`;
}, { passive: false });

// Pan functionality
solarSystem.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - solarSystem.offsetLeft;
    startY = e.pageY - solarSystem.offsetTop;
    scrollLeft = solarSystem.scrollLeft;
    scrollTop = solarSystem.scrollTop;
});

solarSystem.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - solarSystem.offsetLeft;
    const y = e.pageY - solarSystem.offsetTop;
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;
    solarSystem.scrollLeft = scrollLeft - walkX;
    solarSystem.scrollTop = scrollTop - walkY;
});

solarSystem.addEventListener('mouseup', () => {
    isDragging = false;
});

// solarSystem.addEventListener('mouseleave', () => {
//     isDragging = false;
// });

var slider = document.getElementById("myRange");
var output = document.getElementById("slider-label");
output.innerHTML = "Speed: " + slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = "Speed: " + this.value;
    speed = this.value;
}