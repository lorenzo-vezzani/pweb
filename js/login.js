document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('musicaLoginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        let username = document.getElementById('username').value.trim();
        let password = document.getElementById('password').value.trim();

        if (!username || !password) {
            document.getElementById('mainContainer').style.height = '350px';
            displayError('Inserisci username e password')
            return;
        }

        fetch('../php/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = 'main.php';
            } 
            else {
                document.getElementById('mainContainer').style.height = '350px';
                displayError(data.message);
            }
        })
        .catch(error => {
            document.getElementById('mainContainer').style.height = '350px';
            displayError('Errore durante il Login: riprovare piu tardi')
        });
    });
});