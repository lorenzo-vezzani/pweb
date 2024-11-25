<?php
    require_once 'db_connection.php'; 
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['name']) && 
            isset($data['surname']) && 
            isset($data['birthDate']) && 
            isset($data['username']) && 
            isset($data['password'])) {

            $name = trim($data['name']);
            $surname = trim($data['surname']);
            $birthDate = trim($data['birthDate']);
            $username = trim($data['username']);
            $password = trim($data['password']);
            $enrollDate = date('Y-m-d');
        } else {
            echo json_encode(['success' => false, 'message' => 'Tutti i campi sono obbligatori']);
            exit;
        }

        try {
            $pdo = db_connection();
            $stmt = $pdo->prepare('SELECT * FROM User WHERE Username = :username');
            $stmt->execute(['username' => $username]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => false, 'message' => 'Username gia presente, selezionare un altro username']);
                exit;
            }

            $stmt = $pdo->prepare('
                INSERT INTO User (Username, Name, Surname, Password, BirthDate, EnrollDate) 
                VALUES (:username, :name, :surname, :password, :birthdate, :enrolldate)
            ');

            $stmt->execute([
                'username' => $username,
                'name' => $name,
                'surname' => $surname,
                'password' => $password,
                'birthdate' => $birthDate,
                'enrolldate' => $enrollDate
            ]);

            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
    }
?>
