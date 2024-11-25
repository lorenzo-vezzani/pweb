<?php
    session_start(); 

    require_once 'db_connection.php';
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['username']) && isset($data['password'])) {
            $username = trim($data['username']);
            $password = trim($data['password']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Username o password mancanti']);
            exit;
        }

        $username = trim($data['username']);
        $password = trim($data['password']);

        $pdo = db_connection();

        try {
            $sql = "SELECT * FROM user WHERE username = :username";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user && $password === $user['Password']) {
                $_SESSION['user_id'] = $user['ID']; 
                $_SESSION['username'] = $user['Username'];
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Nome utente o password errati']);
            }
        } 
        catch (PDOException $e) { 
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    else{
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
    }
?>
