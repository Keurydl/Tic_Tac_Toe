document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById('start-btn');
    const usernameInput = document.getElementById('username');

    startBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            
            localStorage.setItem('username', username);
            
            window.location.href = 'Game.html';
        } else {
            alert('Por favor, introduce tu nombre');
        }
    });
});
