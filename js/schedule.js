document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();

    const toolsBtn = document.getElementById('tools-btn');
    const toolsDropdown = document.getElementById('tools-dropdown');
    const platformsBtn = document.getElementById('platforms-btn');
    const platformsDropdown = document.getElementById('platforms-dropdown');
    const authSection = document.getElementById('auth-section');
    const form = document.getElementById('schedule-form');
    const scheduledPostsDiv = document.getElementById('scheduled-posts');

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
        return; // Exit if not logged in
    }

    // User-specific key for scheduled posts
    const userScheduledPostsKey = `scheduledPosts_${currentUser.username}`;

    // Load and display scheduled posts for the current user
    function loadScheduledPosts() {
        const scheduledPosts = JSON.parse(localStorage.getItem(userScheduledPostsKey) || '[]');
        if (scheduledPosts.length === 0) {
            scheduledPostsDiv.innerHTML = '<p class="text-center">No posts were scheduled yet.</p>';
        } else {
            scheduledPostsDiv.innerHTML = scheduledPosts.map(post => `
                <div class="border-b py-4">
                    <p><strong>Content:</strong> ${post.content}</p>
                    <p><strong>Platforms:</strong> ${post.platforms.join(', ')}</p>
                    <p><strong>Scheduled:</strong> ${new Date(post.datetime).toLocaleString()}</p>
                </div>
            `).join('');
        }
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const content = document.getElementById('post-content').value;
        const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(input => input.value);
        const datetime = document.getElementById('schedule-datetime').value;

        if (platforms.length === 0) {
            alert('Please select at least one platform.');
            return;
        }

        const scheduledPosts = JSON.parse(localStorage.getItem(userScheduledPostsKey) || '[]');
        const newPost = {
            content,
            platforms,
            datetime
            // No need for user field since the key is user-specific
        };
        scheduledPosts.push(newPost);
        localStorage.setItem(userScheduledPostsKey, JSON.stringify(scheduledPosts));

        alert('Post scheduled successfully!');
        form.reset();
        loadScheduledPosts(); // Refresh the list
    });

    // Initial load of scheduled posts
    loadScheduledPosts();
});