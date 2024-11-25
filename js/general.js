function displayError(e){
    let errorMsg = document.getElementById('errorMsg');
    errorMsg.style.display = 'flex';
    errorMsg.textContent = e;
}
