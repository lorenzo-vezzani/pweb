<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Musica</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/searchBar.css">
    <link rel="stylesheet" href="../css/information.css">
    <link rel="stylesheet" href="../css/albumTable.css">
    <script src="../js/general.js" defer></script>
    <script src="../js/main.js" defer></script>
    <script src="../js/album.js" defer></script>
</head>
<body style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; min-height: 115vh">
    <h1 class="musica-title">Musica: la tua guida definitiva, a 360°</h1>
    <div id="searchBar">
        <input type="text" id="searchInput" name="query" placeholder="Cerca...">
        <button type="submit">Cerca<img src="../icons/magnifyingGlass.png"></img></button>
    </div>
    <table class="album-table" id="album-table"></table>
    <footer class="information">© 2024 Lorenzo Vezzani 635766 || Progettazione Web, CdL Ingegneria Informatica, Università di Pisa</footer>
</body>
</html>