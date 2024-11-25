<?php
    function db_connection() {
        $host = 'localhost';
        $dbname = 'MusicReviewSite';
        $username = 'root';
        $password = '';

        try {
            $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
            $pdo = new PDO($dsn, $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } 
        catch (PDOException $e) {
            die("Errore di connessione: " . json_encode($e->getMessage()));
        }
    }
?>