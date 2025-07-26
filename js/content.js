document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();

    const toolsBtn = document.getElementById('tools-btn');
    const toolsDropdown = document.getElementById('tools-dropdown');
    const platformsBtn = document.getElementById('platforms-btn');
    const platformsDropdown = document.getElementById('platforms-dropdown');
    const authSection = document.getElementById('auth-section');
    const form = document.getElementById('content-form');
    const savedTemplatesDiv = document.getElementById('saved-templates');

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
    } else {
        window.location.href = 'signin.html';
        return;
    }

    // Load saved templates
    async function loadTemplates() {
        try {
            const response = await fetch('http://localhost:3000/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, name, content })
            });
            const result = await response.json();
            if (result.success) {
                alert('Template saved successfully!');
                form.reset();
                loadTemplates();
            } else {
                alert('Failed to save template.');
            }
        } catch (error) {
            console.error('Error saving template:', error);
            alert('Error saving template.');
        }
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('template-name').value;
        const content = document.getElementById('template-content').value;

        try {
            const response = await fetch('http://localhost:3000/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, name, content })
            });
            const result = await response.json();
            if (result.success) {
                alert('Template saved successfully!');
                form.reset();
                loadTemplates();
            } else {
                alert('Failed to save template.');
            }
        } catch (error) {
            console.error('Error saving template:', error);
            alert('Error saving template.');
        }
    });

    loadTemplates();
});