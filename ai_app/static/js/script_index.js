document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { 
            navbar.classList.add('scrolled'); 
        } else {
            navbar.classList.remove('scrolled'); 
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.icon-button[aria-label="Sign Up"]');
    const modal = document.getElementById('loginModal');
    const closeButton = modal.querySelector('.close');

    loginButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Login submitted');
        modal.style.display = 'none';
    });
});