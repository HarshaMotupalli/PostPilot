document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();

    const toolsBtn = document.getElementById('tools-btn');
    const toolsDropdown = document.getElementById('tools-dropdown');
    const platformsBtn = document.getElementById('platforms-btn');
    const platformsDropdown = document.getElementById('platforms-dropdown');
    const authSection = document.getElementById('auth-section');

    toolsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toolsDropdown.classList.toggle('hidden');
        platformsDropdown.classList.add('hidden');
    });

    platformsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        platformsDropdown.classList.toggle('hidden');
        toolsDropdown.classList.add('hidden');
    });

    document.addEventListener('click', () => {
        toolsDropdown.classList.add('hidden');
        platformsDropdown.classList.add('hidden');
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        authSection.innerHTML = `
            <div class="profile-container" id="profile-link" style="cursor: pointer;">
                <span class="profile-name">Welcome, ${currentUser.username}</span>
                <div class="profile-icon">${currentUser.username[0].toUpperCase()}</div>
            </div>
            <button class="logout-btn" id="logout-btn">Logout</button>
        `;
        document.getElementById('profile-link').addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'home.html';
        });

        // Populate profile details
        document.getElementById('profile-username').textContent = currentUser.username;
        document.getElementById('profile-email').textContent = currentUser.email;
        document.getElementById('profile-icon').textContent = currentUser.username[0].toUpperCase();
        document.getElementById('profile-joined').textContent = currentUser.joined ? new Date(currentUser.joined).toLocaleDateString() : new Date().toLocaleDateString();
    } else {
        window.location.href = 'signin.html';
    }
});