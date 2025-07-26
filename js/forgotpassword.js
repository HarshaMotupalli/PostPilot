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

    const emailForm = document.getElementById('email-form');
    const codeForm = document.getElementById('code-form');
    const email = document.getElementById('email');
    const code = document.getElementById('code');
    const emailError = document.getElementById('email-error');
    const codeError = document.getElementById('code-error');

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            email.classList.add('error');
            emailError.classList.remove('hidden');
        } else {
            email.classList.remove('error');
            emailError.classList.add('hidden');
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (!users.some(u => u.email === email.value)) {
                alert('Email not found.');
                return;
            }
            const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = Date.now() + 15 * 60 * 1000;
            localStorage.setItem('resetCode', JSON.stringify({ email: email.value, code: resetCode, expires }));
            alert(`Code: ${resetCode} (Demo)`);
            emailForm.classList.add('hidden');
            codeForm.classList.remove('hidden');
        }
    });

    codeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (code.value.length !== 6 || isNaN(code.value)) {
            code.classList.add('error');
            codeError.classList.remove('hidden');
        } else {
            code.classList.remove('error');
            codeError.classList.add('hidden');
            const resetData = JSON.parse(localStorage.getItem('resetCode') || '{}');
            if (!resetData || resetData.code !== code.value || resetData.email !== email.value) {
                alert('Invalid code.');
            } else if (resetData.expires < Date.now()) {
                alert('Code expired.');
                localStorage.removeItem('resetCode');
            } else {
                localStorage.removeItem('resetCode');
                alert('Code verified! Redirecting to sign in.');
                window.location.href = 'signin.html';
            }
        }
    });
});