<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Musica</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/error.css">
    <script src="../js/general.js" defer></script>
    <script src="../js/login.js" defer></script>
</head>
<body style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div class="container" id="mainContainer" style="width: 500px; height: 270px;">
        <form  class="musica-form" id="musicaLoginForm" style="padding: 0px; height: 100%;">
            <h1 class="musica-title">Login</h1>
            <input class="musica-input" id="username"  type="text" name="username" placeholder="Nome utente" required>
            <input class="musica-input" id="password" type="password" name="password" placeholder="Password" required>
            <div class="error" id="errorMsg"></div>
            <button class="musica-btn" type="submit">Accedi</button>
        </form>
    </div>
</body>
</html>