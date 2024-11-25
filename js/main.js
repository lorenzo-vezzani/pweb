document.addEventListener('DOMContentLoaded', function() {
    let searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (event) => {
        let query = event.target.value;
        if (query.trim().length > 0) {
            searchAlbumWithDebounce(query);
        }
    });
    
    getAlbumList(0, 5, true);
});