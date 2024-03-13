const API_KEY = '42251720-f06dc33ab2865bd9c0363536a';
const PER_PAGE = 10;
let currentPage = 1;
let totalPages = 1;
let searchText = '';
let selectedColor = '';

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    searchImages();
});

function searchImages() {
    searchText = document.getElementById('searchInput').value;
    selectedColor = document.getElementById('colorSelect').value;
    currentPage = 1;
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchText)}&colors=${selectedColor}&per_page=${PER_PAGE}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
            totalPages = Math.ceil(data.totalHits / PER_PAGE);
            updatePageButtons();
        })
        .catch(error => console.error('Error, something went wrong. Please try again:', error));
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        searchAndUpdate();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        searchAndUpdate();
    }
}

function searchAndUpdate() {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchText)}&colors=${selectedColor}&per_page=${PER_PAGE}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
            totalPages = Math.ceil(data.totalHits / PER_PAGE);
            updatePageButtons();
        })
        .catch(error => console.error('Error, something went wrong. Please try again:', error));
}

function displayImages(images) {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;

        const tagsElement = document.createElement('p');
        tagsElement.textContent = `Tags: ${image.tags}`;

        const photographerElement = document.createElement('p');
        photographerElement.textContent = `Photographer: ${image.user}`;

        const container = document.createElement('div');
        container.classList.add('image');
        container.appendChild(imgElement);
        container.appendChild(tagsElement);
        container.appendChild(photographerElement);

        gallery.appendChild(container);
    });
}

function updatePageButtons() {
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
}