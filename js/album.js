
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

function renderStars(rating) {
    let maxStars = 5;
    let fullStar = '★';
    let halfStar = '⯪';
    let emptyStar = '☆';

    let starOutput = '';
    let wholeStars = Math.floor(rating);
    let hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < wholeStars; i++) {
        starOutput += fullStar;
    }

    if (hasHalfStar) {
        starOutput += halfStar;
    }

    let emptyStars = maxStars - wholeStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starOutput += emptyStar;
    }

    return starOutput;
}

function getAlbumList(searchType, searchValue, shouldBuildTable = false) {
    let resultAlbums = [];

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
        if(shouldBuildTable)
            buildAlbumTable(resultAlbums);
        console.log(resultAlbums);
    })
    .catch(error => {
        console.error("Errore durante la ricerca dell'album")
    });

    return resultAlbums;
}

function buildAlbumTable(targetAlbums) {
    let tab = document.getElementById('album-table');
    tab.innerHTML = ''; 

    let header = document.createElement('tr');
    let headers = ['Name', 'Artist', 'Release Date', 'Avg Star', 'Description', 'Cover'];
    headers.forEach(head => {
        let th = document.createElement('th');
        th.textContent = head;
        header.appendChild(th);
    });
    tab.appendChild(header);

    targetAlbums.forEach(album => {
        let tr = document.createElement('tr');
        
        let fields = [
            album.name, 
            album.artist, 
            album.releaseDate, 
            album.avgStar, 
            album.description, 
            album.cover
        ];

        fields.forEach((field, index) => {
            let td = document.createElement('td');

            switch(index){
                case 0:
                    var a = document.createElement('a');
                    a.href = `artista.php?name=${encodeURIComponent(field)}`;
                    a.innerHTML = field;
                    a.style.color = 'black';
                    a.style.textDecoration = 'none';
                    a.addEventListener('mouseover', () => { a.style.textDecoration = 'underline';});
                    a.addEventListener('mouseout', () => { a.style.textDecoration = 'none'; });
                    td.appendChild(a);
                    break;
                case 1:
                    var a = document.createElement('a');
                    a.href = `album.php?name=${encodeURIComponent(field)}`;
                    a.innerHTML = field;
                    a.style.color = 'black';
                    a.style.textDecoration = 'none';
                    a.addEventListener('mouseover', () => { a.style.textDecoration = 'underline'; });
                    a.addEventListener('mouseout', () => { a.style.textDecoration = 'none'; });
                    td.appendChild(a);
                    break;
                case 3:
                    td.textContent = renderStars(field);
                    td.style.color = 'gold';
                    break;
                case 5:
                    let img = document.createElement('img');
                    img.src = field;
                    td.appendChild(img);
                    break;
                default:
                    td.textContent = field || 'N/A';
            }

            tr.appendChild(td);
        });

        tab.appendChild(tr);
    });
}

let debounceTimeout;
function searchAlbumWithDebounce(query){
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        getAlbumList(1, query);
    }, 3000);
}