document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();

    const toolsBtn = document.getElementById('tools-btn');
    const toolsDropdown = document.getElementById('tools-dropdown');
    const platformsBtn = document.getElementById('platforms-btn');
    const platformsDropdown = document.getElementById('platforms-dropdown');
    const authSection = document.getElementById('auth-section');
    const form = document.getElementById('contact-form');

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
        authSection.innerHTML = `
            <a href="signin.html" class="auth-btn">Sign In</a>
            <a href="signup.html" class="auth-btn">Sign Up</a>
        `;
    }

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        let valid = true;

        if (!name.value.trim()) {
            name.classList.add('error');
            nameError.classList.remove('hidden');
            valid = false;
        } else {
            name.classList.remove('error');
            nameError.classList.add('hidden');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            email.classList.add('error');
            emailError.classList.remove('hidden');
            valid = false;
        } else {
            email.classList.remove('error');
            emailError.classList.add('hidden');
        }

        if (!message.value.trim()) {
            message.classList.add('error');
            messageError.classList.remove('hidden');
            valid = false;
        } else {
            message.classList.remove('error');
            messageError.classList.add('hidden');
        }

        if (valid) {
            try {
                const response = await fetch('http://localhost:3000/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        message: message.value
                    })
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please try again later.');
                console.error('Error sending message:', error);
            }
        }
    });
});