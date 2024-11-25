<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Musica</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/error.css">
    <script src="../js/general.js" defer></script>
    <script src="../js/signup.js" defer></script>
</head>
<body style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div class="container" id="mainContainer" style="width: 500px; height: 460px;">
        <form  class="musica-form" id="musicaSignupForm" style="padding: 0px; height: 100%;">
            <h1 class="musica-title">Sign-Up</h1>
            <input class="musica-input" id="name"  type="text" name="name" placeholder="Nome" required>
            <input class="musica-input" id="surname"  type="text" name="surname" placeholder="Cognome" required>
            <input class="musica-input" id="birthDate"  type="date" name="birthDate" placeholder="Data di nascita (MM-DD-YYYY)" required>
            <input class="musica-input" id="username"  type="text" name="username" placeholder="Nome utente" required>
            <input class="musica-input" id="password" type="password" name="password" placeholder="Password" required>
            <div class="error" id="errorMsg"></div>
            <button class="musica-btn" type="submit">Registrati</button>
        </form>
    </div>
</body>
</html>