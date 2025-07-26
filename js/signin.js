document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimation();

    const toolsBtn = document.getElementById('tools-btn');
    const toolsDropdown = document.getElementById('tools-dropdown');
    const platformsBtn = document.getElementById('platforms-btn');
    const platformsDropdown = document.getElementById('platforms-dropdown');

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

    const form = document.getElementById('signin-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const togglePassword = document.getElementById('toggle-password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            email.classList.add('error');
            emailError.classList.remove('hidden');
            valid = false;
        } else {
            email.classList.remove('error');
            emailError.classList.add('hidden');
        }
    
        if (password.value.length < 6) {
            password.classList.add('error');
            passwordError.classList.remove('hidden');
            valid = false;
        } else {
            password.classList.remove('error');
            passwordError.classList.add('hidden');
        }
    
        if (valid) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email.value && u.password === password.value);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log('Redirecting to dashboard.html');
                window.location.href = 'dashboard.html'; // Changed from home.html
            } else {
                alert('Invalid email or password.');
            }
        }
    });

    togglePassword.addEventListener('click', () => {
        password.type = password.type === 'password' ? 'text' : 'password';
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
});