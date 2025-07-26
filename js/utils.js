import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

export function handleAuthUI(authSection, redirectIfNotLoggedIn = false) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const displayName = user.displayName || user.email;
            const initial = displayName.charAt(0).toUpperCase();
            authSection.innerHTML = `
                <div class="profile-container" id="profile-link" style="cursor: pointer;">
                    <span class="profile-name">Welcome, ${displayName}</span>
                    <div class="profile-icon">${initial}</div>
                </div>
                <button class="logout-btn" id="logout-btn">Logout</button>
            `;
            document.getElementById('profile-link').addEventListener('click', () => {
                window.location.href = 'profile.html';
            });
            document.getElementById('logout-btn').addEventListener('click', () => {
                signOut(auth).then(() => window.location.href = 'home.html');
            });
        } else if (redirectIfNotLoggedIn) {
            window.location.href = 'signin.html';
        }
    });
}
