const SESSION_NAME = "welcomeName";
const SESSION_START = "welcomeStartTime";

const loginView = document.getElementById("loginView");
const welcomeView = document.getElementById("welcomeView");
const logoutView = document.getElementById("logoutView");
const loginForm = document.getElementById("loginForm");
const nameInput = document.getElementById("name");
const loginMessage = document.getElementById("loginMessage");
const userName = document.getElementById("userName");
const loggedOutName = document.getElementById("loggedOutName");
const startTime = document.getElementById("startTime");
const durationMessage = document.getElementById("durationMessage");
const footerStatus = document.getElementById("footerStatus");
const logoutButton = document.getElementById("logoutButton");

function formatTime(timestamp) {
    return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    }).format(new Date(timestamp));
}

function formatDuration(milliseconds) {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minute${minutes === 1 ? "" : "s"} and ${seconds} second${seconds === 1 ? "" : "s"}`;
}

function showWelcome(name, timestamp) {
    loginView.hidden = true;
    logoutView.hidden = true;
    welcomeView.hidden = false;
    userName.textContent = name;
    startTime.textContent = `Started at ${formatTime(timestamp)}`;
    startTime.hidden = false;
    footerStatus.textContent = "Session active";
}

function showLogin() {
    loginView.hidden = false;
    welcomeView.hidden = true;
    logoutView.hidden = true;
    startTime.hidden = true;
    footerStatus.textContent = "Ready to begin";
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
        loginMessage.textContent = "Please enter your name.";
        nameInput.focus();
        return;
    }

    const timestamp = Date.now();
    sessionStorage.setItem(SESSION_NAME, name);
    sessionStorage.setItem(SESSION_START, String(timestamp));
    loginMessage.textContent = "";
    showWelcome(name, timestamp);
});

logoutButton.addEventListener("click", () => {
    const name = sessionStorage.getItem(SESSION_NAME) || "Guest";
    const timestamp = Number(sessionStorage.getItem(SESSION_START));
    const duration = Number.isFinite(timestamp) && timestamp > 0
        ? formatDuration(Date.now() - timestamp)
        : "an unknown amount of time";

    sessionStorage.removeItem(SESSION_NAME);
    sessionStorage.removeItem(SESSION_START);
    loginView.hidden = true;
    welcomeView.hidden = true;
    logoutView.hidden = false;
    startTime.hidden = true;
    loggedOutName.textContent = name;
    durationMessage.textContent = `You used this page for ${duration}.`;
    footerStatus.textContent = "Session ended";
});

const savedName = sessionStorage.getItem(SESSION_NAME);
const savedTimestamp = Number(sessionStorage.getItem(SESSION_START));
if (savedName && Number.isFinite(savedTimestamp) && savedTimestamp > 0) {
    showWelcome(savedName, savedTimestamp);
} else {
    showLogin();
}
