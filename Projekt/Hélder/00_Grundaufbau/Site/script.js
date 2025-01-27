const planets = [
    { name: 'Mercury', size: 3.8,  distance: 80,  color: '#A0522D', period: 88,    id: 0},
    { name: 'Venus',   size: 9.5,  distance: 120, color: '#DEB887', period: 225,   id: 1},
    { name: 'Earth',   size: 10,   distance: 160, color: '#4169E1', period: 365,   id: 2},
    { name: 'Mars',    size: 5.3,  distance: 200, color: '#CD5C5C', period: 687,   id: 3},
    { name: 'Jupiter', size: 112,  distance: 300, color: '#DAA520', period: 4333,  id: 4},
    { name: 'Saturn',  size: 94.5, distance: 400, color: '#F4A460', period: 10759, id: 5},
    { name: 'Uranus',  size: 40,   distance: 500, color: '#87CEEB', period: 30687, id: 6},
    { name: 'Neptune', size: 38.8, distance: 600, color: '#1E90FF', period: 60190, id: 7}
];

const planet_descriptions = [
    {
        name: "Mercury",
        text: "The smallest and closest planet to the Sun. It has no atmosphere to retain heat, leading to extreme temperature fluctuations. Its surface is heavily cratered, resembling Earth's Moon. A day on Mercury lasts 176 Earth days.",
        image: "images/mercury.jpg"
    },
    {
        name: "Venus",
        text: "The second planet, known for its thick atmosphere. It experiences a runaway greenhouse effect, making it the hottest planet in the solar system. Venus has a dense atmosphere of carbon dioxide and sulfuric acid clouds. A day on Venus is longer than its year.",
        image: "images/venus.jpg"
    },
    {
        name: "Earth",
        text: "Our home planet, the third from the Sun. It is the only known planet to support life, thanks to its liquid water and breathable atmosphere. Earth has a strong magnetic field that protects it from solar radiation. Its diverse ecosystems range from polar ice caps to tropical rainforests.",
        image: "images/earth.jpg"
    },
    {
        name: "Mars",
        text: "The Red Planet, known for its iron oxide surface. Mars has the largest volcano in the solar system, Olympus Mons, and a canyon system that dwarfs the Grand Canyon. Scientists believe Mars once had liquid water and may have supported microbial life. Its thin atmosphere makes it a cold desert world.",
        image: "images/mars.jpg"
    },
    {
        name: "Jupiter",
        text: "The largest planet, a gas giant with a Great Red Spot. Jupiter has a powerful magnetic field and dozens of moons, including the volcanic Io and icy Europa. Its atmosphere is primarily composed of hydrogen and helium. Jupiter's rapid rotation causes its clouds to form distinct bands.",
        image: "images/jupiter.jpg"
    },
    {
        name: "Saturn",
        text: "Famous for its prominent ring system. Saturn's rings are made of countless icy particles, ranging from tiny grains to house-sized chunks. It has more than 80 moons, including Titan, which has a thick atmosphere and liquid lakes of methane. Saturn is a gas giant with a low density, making it lighter than water.",
        image: "images/saturn.jpg"
    },
    {
        name: "Uranus",
        text: "An ice giant with a unique sideways rotation. Uranus' atmosphere contains methane, giving it a pale blue color. It has faint rings and a system of 27 known moons. The planet's extreme tilt results in long seasons that last for decades.",
        image: "images/uranus.jpg"
    },
    {
        name: "Neptune",
        text: "The farthest planet, known for its deep blue color. Neptune has the fastest winds in the solar system, reaching speeds of over 2,000 km/h. It is home to the Great Dark Spot, a storm similar to Jupiter's. Its largest moon, Triton, orbits in the opposite direction of the planet's rotation.",
        image: "images/neptune.jpg"
    }
];

function openDialog(index) {
    if (index >= 0 && index < planet_descriptions.length) {
        document.getElementById('dialogTitle').textContent = planet_descriptions[index].name;
        document.getElementById('dialogText').innerText = planet_descriptions[index].text;
        document.getElementById('dialogImage').src = planet_descriptions[index].image || "placeholder.jpg";
        document.getElementById('dialogImage').alt = planet_descriptions[index].name;
        document.getElementById('myDialog').showModal();
    } else {
        alert("Invalid planet index.");
    }
}

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
    planetEl.addEventListener('click', () => {
        openDialog(planet.id)
    });
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