<?php
    require_once 'db_connection.php';
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $searchType = trim($data['searchType']);
        $searchValue = trim($data['searchValue']);

        $pdo = db_connection();

        try {
            switch($searchType){
                case 0:
                    $sql = 'SELECT al.albumID, al.name, ar.name as artist, al.avgStar, al.description, al.cover, al.releaseDate
                            FROM album al INNER JOIN artist ar ON al.artist = ar.artistID 
                                INNER JOIN review re ON al.albumID = re.album
                            GROUP BY al.albumID
                            ORDER BY COUNT(re.reviewID) DESC
                            LIMIT :parameter';
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':parameter', $searchValue, PDO::PARAM_INT);
                    break;

                case 1:
                    $sql = 'SELECT al.id, al.name, ar.name as artist, al.avgStar, al.description, al.cover, al.releaseDate 
                            FROM album al INNER JOIN artist ar ON al.artist = ar.artistID 
                            WHERE al.name = :parameter';
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':parameter', $searchValue);
                    break;

                default:
                    throw new Exception('Tipologia di ricerca non esistente');
            }
            
            $stmt->execute();
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'message' => $results]);
        } 
        catch (PDOException $e) { 
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        catch (Exception $e){
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    else{
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
    }
?>