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
    console.log('Home page - Current user:', currentUser); // Debug
    if (currentUser) {
        console.log('Redirecting to dashboard.html'); // Debug
        window.location.href = 'dashboard.html';
    } else {
        console.log('Showing Sign In/Sign Up buttons'); // Debug
        authSection.innerHTML = `
            <a href="signin.html" class="auth-btn">Sign In</a>
            <a href="signup.html" class="auth-btn">Sign Up</a>
        `;
    }
});