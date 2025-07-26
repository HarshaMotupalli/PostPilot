document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();

    const toolsBtn = document.getElementById('tools-btn');
    const toolsDropdown = document.getElementById('tools-dropdown');
    const platformsBtn = document.getElementById('platforms-btn');
    const platformsDropdown = document.getElementById('platforms-dropdown');
    const authSection = document.getElementById('auth-section');
    const platformFilter = document.getElementById('platform-filter');

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

    // Load analytics
    async function loadAnalytics(platform = 'all') {
        try {
            const response = await fetch(`http://localhost:3000/api/analytics/${currentUser.username}?platform=${platform}`);
            const data = await response.json();

            document.getElementById('likes').textContent = data.likes;
            document.getElementById('shares').textContent = data.shares;
            document.getElementById('comments').textContent = data.comments;

            const ctx = document.getElementById('engagement-chart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Engagement',
                        data: data.engagement,
                        borderColor: '#1E40AF',
                        fill: false
                    }]
                },
                options: {
                    scales: { y: { beginAtZero: true } }
                }
            });
        } catch (error) {
            console.error('Error loading analytics:', error);
            document.getElementById('likes').textContent = 'Error';
        }
    }

    loadAnalytics();
    platformFilter.addEventListener('change', (e) => loadAnalytics(e.target.value));
});