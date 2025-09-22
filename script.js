const apps = [
  { name: "Microsoft", img: "/Microsoft.svg" },
  { name: "AWS", img: "/AWS.svg" },
  { name: "teams", img: "/TEAMS.svg" },
  { name: "Salesforce", img: "/Salesforce.svg" },
  { name: "SAP", img: "/SAP.svg" },
  { name: "Azure", img: "/Azure.svg" },
  { name: "Apple", img: "/Apple.svg" },
  { name: "Google Cloud", img: "/GoogleCloud.svg" },
  { name: "Okta", img: "/OKTA.svg" },
  { name: "Oracle", img: "/oracle.svg" },
  { name: "Adobe", img: "/adobe_marketo_engage.svg" },
  { name: "Sage", img: "/sage.svg" }
];

const container = document.getElementById('circle-container');
const radius = 220;
const totalIcons = apps.length;
const angleStep = (2 * Math.PI) / totalIcons;
const orbitSpeed = 0.3; // Controls rotation speed
const integrationInterval = 3000; // Time between integrations

// Create and position icons and lines
const icons = apps.map((app, i) => {
  const div = document.createElement('div');
  div.className = "app-icon";
  div.innerHTML = `<img src="${app.img}" alt="${app.name}">`;
  div.title = app.name;
  container.appendChild(div);

  const line = document.createElement('div');
  line.className = "connection-line";
  container.appendChild(line);

  return { el: div, line, baseAngle: i * angleStep, integrating: false };
});

// Create integration effect element
const integrationEffect = document.createElement('div');
integrationEffect.className = "integration-effect";
container.appendChild(integrationEffect);

// Animate orbit
function animateOrbit() {
  const time = Date.now() * 0.001;
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;

  icons.forEach((icon) => {
    const angle = icon.baseAngle + time * orbitSpeed;
    const x = centerX + radius * Math.cos(angle) - 35;
    const y = centerY + radius * Math.sin(angle) - 35;

    icon.el.style.left = `${x}px`;
    icon.el.style.top = `${y}px`;

    const dx = x + 35 - centerX;
    const dy = y + 35 - centerY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);

    icon.line.style.width = `${length}px`;
    icon.line.style.left = `${centerX}px`;
    icon.line.style.top = `${centerY}px`;
    icon.line.style.transform = `rotate(${angleDeg}deg)`;
    icon.line.style.opacity = "0.4";
  });

  requestAnimationFrame(animateOrbit);
}

// Randomly integrate icons into center
function integrateIcon() {
  const availableIcons = icons.filter(i => !i.integrating);
  if (availableIcons.length === 0) return;

  const icon = availableIcons[Math.floor(Math.random() * availableIcons.length)];
  icon.integrating = true;

  // Create clone for integration animation
  const clone = icon.el.cloneNode(true);
  clone.style.transition = "all 1.5s ease-in-out";
  clone.style.position = "absolute";
  clone.style.left = icon.el.style.left;
  clone.style.top = icon.el.style.top;
  clone.style.zIndex = "12"; // Above original
  clone.style.animation = "none"; // Disable pulse for clone
  container.appendChild(clone);

  const centerX = container.offsetWidth / 2 - 35;
  const centerY = container.offsetHeight / 2 - 35;

  // Animate clone to center
  setTimeout(() => {
    clone.style.left = `${centerX}px`;
    clone.style.top = `${centerY}px`;
    clone.style.transform = "scale(0.8)";
    clone.style.opacity = "0";
  }, 10);

  // Show integration effect
  integrationEffect.style.animation = 'none';
  setTimeout(() => {
    integrationEffect.style.animation = 'integrate 1.5s forwards';
  }, 10);

  // Remove clone after animation
  setTimeout(() => {
    container.removeChild(clone);
    icon.integrating = false;
  }, 1600);
}

// Start integration interval
function startIntegration() {
  setInterval(integrateIcon, integrationInterval);
}

// Initialize
animateOrbit();
setTimeout(integrateIcon, 1000); // Initial integration after a short delay
startIntegration();