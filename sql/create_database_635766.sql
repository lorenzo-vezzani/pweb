DROP DATABASE IF EXISTS MusicReviewSite;
CREATE DATABASE MusicReviewSite;
USE MusicReviewSite;

CREATE TABLE User (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Name VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    BirthDate DATE,
    EnrollDate DATE
) ENGINE=InnoDB;

CREATE TABLE Artist (
	ArtistID INT AUTO_INCREMENT PRIMARY KEY, 
    Name VARCHAR(100) NOT NULL UNIQUE,
    Story TEXT,
    Img BLOB
) ENGINE=InnoDB;

CREATE TABLE Album (
	AlbumID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Artist INT,
    ReleaseDate DATE,
    AvgStar FLOAT,
    Description TEXT,
    Cover VARCHAR(100),
    FOREIGN KEY (Artist) REFERENCES Artist(ArtistID)
) ENGINE=InnoDB;

CREATE TABLE Review (
	ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    User INT,
    Album INT,
    Stars INT CHECK (Stars BETWEEN 1 AND 5),
    Description TEXT,
    ReviewDate DATE,
    FOREIGN KEY (User) REFERENCES User(ID),
    FOREIGN KEY (Album) REFERENCES Album(AlbumID)
) ENGINE=InnoDB;

CREATE TABLE Feedback (
	FeedbackID INT AUTO_INCREMENT PRIMARY KEY,
    User INT,
    ReviewUser INT,
    Album INT,
    Artist INT,
    UpDown BOOLEAN,
    FeedbackDate DATE,
    FOREIGN KEY (User) REFERENCES User(ID),
    FOREIGN KEY (ReviewUser) REFERENCES Review(ReviewID)
) ENGINE=InnoDB;
USE MusicReviewSite;

-- Aggiorna il valore di AvgStar nella tabella Album
DELIMITER //

CREATE TRIGGER UpdateAvgStarAfterReviewInsert
AFTER INSERT ON Review
FOR EACH ROW
BEGIN
    UPDATE Album
    SET AvgStar = (
        SELECT AVG(Stars)
        FROM Review
        WHERE Album = NEW.Album
    )
    WHERE AlbumID = NEW.Album;
END //

DELIMITER ;

-- Popolamento della tabella User
INSERT INTO User (Username, Name, Surname, Password, BirthDate, EnrollDate) VALUES
('john_doe', 'John', 'Doe', 'password123', '1990-05-15', '2023-01-01'),
('alice_smith', 'Alice', 'Smith', 'password456', '1985-08-22', '2023-02-10'),
('bob_jones', 'Bob', 'Jones', 'password789', '1992-03-30', '2023-03-20'),
('charlie_brown', 'Charlie', 'Brown', 'password101', '1998-06-11', '2023-04-15'),
('emily_white', 'Emily', 'White', 'password102', '1995-12-05', '2023-05-25');

-- Popolamento della tabella Artist
INSERT INTO Artist (Name, Story, Img) VALUES
('AIR', 'A French electronic music duo consisting of Nicolas Godin and Jean-Benoit Dunckel.', NULL),
('Death Kennedys', 'An influential punk rock band from California known for their politically charged music.', NULL),
('Freddie Gibbs', 'An American rapper known for his gritty street rap and collaborations with producers like Madlib.', NULL);

-- Popolamento della tabella Album (setting AvgStar to NULL)
INSERT INTO Album (Name, Artist, ReleaseDate, AvgStar, Description, Cover) VALUES
('Moon Safari', 1, '1998-01-17', NULL, 'The debut album by French electronic duo AIR, a classic of the genre.', '../imgs/album1.png'),
('Out of Reach', 1, '2004-06-01', NULL, 'A more mature and experimental album by AIR.', '../imgs/album2.png'),
('Fresh Fruit for Rotting Vegetables', 2, '1980-09-02', NULL, 'The debut album by Death Kennedys, a punk rock masterpiece.', '../imgs/album3.png'),
('Plastic Surgery Disasters', 2, '1982-11-09', NULL, 'An album by Death Kennedys with strong political themes and complex music.', '../imgs/album4.png'),
('Pinata', 3, '2014-03-18', NULL, 'A critically acclaimed collaboration between Freddie Gibbs and producer Madlib.', '../imgs/album5.png'),
('Bandana', 3, '2019-06-28', NULL, 'A follow-up collaboration between Freddie Gibbs and Madlib, blending rap with soulful beats.', '../imgs/album6.png');

-- Popolamento della tabella Review
INSERT INTO Review (User, Album, Stars, Description, ReviewDate) VALUES
(1, 1, 5, 'A timeless electronic masterpiece. AIR created something truly magical.', '2023-06-01'),
(2, 2, 4, 'A good album but not as iconic as Moon Safari. Still a great listen.', '2023-07-15'),
(3, 3, 5, 'Death Kennedys changed punk music forever. This album is a must-have!', '2023-08-01'),
(4, 4, 4, 'A politically charged album with some of the best punk lyrics ever written.', '2023-09-05'),
(5, 5, 5, 'Gritty and raw. Freddie Gibbs is a lyrical genius, and Madlib’s beats are perfect.', '2023-10-10'),
(1, 6, 5, 'A brilliant follow-up to Piñata. Bandana is even better!', '2023-11-20'),
(2, 1, 5, 'Moon Safari is one of the best albums of the 90s, a masterpiece of ambient and electronic music.', '2023-12-01'),
(3, 2, 3, 'A bit slow for my taste, but AIR still knows how to make beautiful music.', '2023-12-10'),
(4, 3, 5, 'This album is pure punk rock energy. Death Kennedys are legends.', '2024-01-01'),
(5, 4, 4, 'Plastic Surgery Disasters is complex, political, and ahead of its time.', '2024-02-01'),
(1, 5, 5, 'Piñata is incredible. Gibbs and Madlib are a perfect combination.', '2024-03-01'),
(2, 6, 4, 'Bandana is a great album, but some tracks feel too long for my liking.', '2024-04-01');

-- Popolamento della tabella Feedback
INSERT INTO Feedback (User, ReviewUser, Album, Artist, UpDown, FeedbackDate) VALUES
(1, 1, 1, 1, TRUE, '2023-06-02'),
(2, 1, 2, 1, TRUE, '2023-07-16'),
(3, 1, 3, 2, TRUE, '2023-08-02'),
(4, 2, 3, 2, TRUE, '2023-09-06'),
(5, 2, 5, 3, TRUE, '2023-10-11'),
(1, 3, 4, 2, TRUE, '2023-06-02'),
(2, 3, 4, 2, TRUE, '2023-07-16'),
(3, 3, 6, 3, TRUE, '2023-08-02'),
(4, 4, 5, 3, TRUE, '2023-09-06'),
(5, 4, 6, 3, TRUE, '2023-10-11'),
(1, 5, 1, 1, FALSE, '2023-06-02'),
(2, 5, 2, 1, FALSE, '2023-07-16'),
(3, 6, 3, 1, FALSE, '2023-08-02'),
(4, 6, 4, 1, FALSE, '2023-09-06'),
(5, 6, 5, 1, FALSE, '2023-10-11'),
(1, 7, 1, 1, TRUE, '2023-06-03'),
(2, 7, 2, 1, TRUE, '2023-07-17'),
(3, 7, 3, 2, TRUE, '2023-08-03'),
(4, 8, 4, 2, TRUE, '2023-09-07'),
(5, 8, 5, 2, TRUE, '2023-10-12'),
(1, 9, 1, 1, TRUE, '2023-06-03'),
(2, 9, 2, 2, TRUE, '2023-07-17'),
(3, 9, 3, 2, TRUE, '2023-08-03'),
(4, 10, 4, 2, TRUE, '2023-09-07'),
(5, 10, 5, 3, TRUE, '2023-10-12');
