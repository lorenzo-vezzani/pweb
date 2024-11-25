document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('musicaSignupForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        let name = document.getElementById('name').value.trim();
        let surname = document.getElementById('surname').value.trim();
        let birthDate = document.getElementById('birthDate').value.trim();
        let username = document.getElementById('username').value.trim();
        let password = document.getElementById('password').value.trim();

        if (!name || !surname || !birthDate || !username || !password) {
            document.getElementById('mainContainer').style.height = '540px';
            displayError('Compila ogni campo')
            return;
        }

        console.log(JSON.stringify({ name, surname, birthDate, username, password }));

        fetch('../php/signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, birthDate, username, password })
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
                document.getElementById('mainContainer').style.height = '540px';
                displayError(data.message);
            }
        })
        .catch(error => {
            document.getElementById('mainContainer').style.height = '540px';
            displayError('Errore durante il Sign-Up: riprovare piu tardi')
        });
    });
});