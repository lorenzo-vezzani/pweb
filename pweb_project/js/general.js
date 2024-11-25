function displayError(e){
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.style.display = 'flex';
    errorMsg.textContent = e;
}

class Album {
    constructor(albumID, name, artist, releaseDate, avgStar, description, cover) {
        this.albumID = albumID || null;
        this.name = name;
        this.artist = artist;
        this.releaseDate = releaseDate;
        this.avgStar = avgStar;
        this.description = description;
        this.cover = cover;
    }
    static fromJSON(json) {
        return new Album(
            json.albumID,
            json.name,
            json.artist,
            json.releaseDate,
            json.avgStar,
            json.description,
            json.cover
        );
    }
}
function getAlbumList(searchType, searchValue) {
    var resultAlbums = [];

    fetch('../php/searchAlbum.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchType, searchValue })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta');
        }
        return response.json();
    })
    .then(data => {
        resultAlbums = data.message.map(albumJSON => Album.fromJSON(albumJSON));
        buildAlbumTable(resultAlbums);
    })
    .catch(error => {
        console.error("Errore durante la ricerca dell'album")
    });

    return resultAlbums;
}

function buildAlbumTable(targetAlbums) {
    var tab = document.getElementById('album-table');
    tab.innerHTML = ''; 

    var header = document.createElement('tr');
    var headers = ['Name', 'Artist', 'Release Date', 'Avg Star', 'Description', 'Cover'];
    headers.forEach(head => {
        var th = document.createElement('th');
        th.textContent = head;
        header.appendChild(th);
    });
    tab.appendChild(header);

    targetAlbums.forEach(album => {
        var tr = document.createElement('tr');
        
        var fields = [
            album.name, 
            album.artist, 
            album.releaseDate, 
            album.avgStar, 
            album.description, 
            album.cover
        ];

        fields.forEach((field, index) => {
            var td = document.createElement('td');

            if (index === 5) {
                var img = document.createElement('img');
                img.src = field;
                td.appendChild(img);
            }
            else if (index === 3) {
                td.textContent = renderStars(field);
                td.style.color = 'gold';
            }  
            else {
                td.textContent = field || 'N/A';
            }

            tr.appendChild(td);
        });

        tab.appendChild(tr);
    });
}

function renderStars(rating) {
    const maxStars = 5;
    const fullStar = '★';
    const halfStar = '⯪';
    const emptyStar = '☆';

    var starOutput = '';
    const wholeStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (var i = 0; i < wholeStars; i++) {
        starOutput += fullStar;
    }

    if (hasHalfStar) {
        starOutput += halfStar;
    }

    const emptyStars = maxStars - wholeStars - (hasHalfStar ? 1 : 0);
    for (var i = 0; i < emptyStars; i++) {
        starOutput += emptyStar;
    }

    return starOutput;
}
