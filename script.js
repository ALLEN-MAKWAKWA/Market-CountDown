const sessions = [
  { name: "Asia", start: 2, end: 11, icon: "🌏" },
  { name: "London", start: 10, end: 19, icon: "🇬🇧" },
  { name: "New York", start: 15, end: 24, icon: "🗽" },
];

function updateCountdown() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const currentTime = hours + minutes / 60 + seconds / 3600;

  const sessionsDiv = document.getElementById("sessions");
  sessionsDiv.innerHTML = "";

  sessions.forEach(session => {
    let status, countdown, statusIcon;
    if (currentTime >= session.start && currentTime < session.end) {
      status = "Open";
      statusIcon = '<i class="fas fa-circle" style="color:green"></i>';
      let remainingHours = Math.floor(session.end - currentTime);
      let remainingMinutes = Math.floor((session.end - currentTime - remainingHours) * 60);
      countdown = `${remainingHours}h ${remainingMinutes}m`;
    } else {
      status = "Closed";
      statusIcon = '<i class="fas fa-circle" style="color:red"></i>';
      let nextOpen = session.start;
      if (currentTime >= session.end) {
        nextOpen += 24; // next day
      }
      let hoursUntilOpen = Math.floor(nextOpen - currentTime);
      let minutesUntilOpen = Math.floor((nextOpen - currentTime - hoursUntilOpen) * 60);
      countdown = `${hoursUntilOpen}h ${minutesUntilOpen}m`;
    }

    const sessionDiv = document.createElement("div");
    sessionDiv.className = `session ${status.toLowerCase()}`;
    sessionDiv.innerHTML = `
      <h2>${session.icon} ${session.name} Session</h2>
      <p>Status: ${statusIcon} <strong>${status}</strong></p>
      <p>${status === "Open" ? "Time left to close:" : "Time until open:"} ${countdown}</p>
    `;
    sessionsDiv.appendChild(sessionDiv);
  });

  // Display current time
  const timeDisplay = document.getElementById("current-time");
  timeDisplay.textContent = `\u23F0 Current Time: ${now.toLocaleTimeString()}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
const darkModeBtn = document.getElementById("dark-mode-toggle");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Change button text/icon
  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "☀️ Light Mode";
  } else {
    darkModeBtn.textContent = "🌙 Dark Mode";
  }
});

