import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '41883234-6691d5bcae5feebb5d3051225';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    loader.style.display = 'block';
    gallery.innerHTML = '';

    fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`
    )
      .then(response => response.json())
      .then(data => {
        loader.style.display = 'none';
        if (data.hits.length > 0) {
          displayImages(data.hits);
        } else {
          iziToast.error({
            position: 'topRight',
            message:
              'Sorry, there are no images matching your search query. Please try again.',
          });
        }
      })
      .catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching data:', error);
        iziToast.error({
          position: 'topRight',
          message: 'An error occurred. Please try again later.',
        });
      });
  }
});

function displayImages(images) {
  const galleryHTML = images
    .map(
      image => `
      <div class="image-container">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}">
        </a>
        <div class="image-panel">
          <div class="statistic">
            <p>Likes</p>
            <p>${image.likes}</p>
          </div>
          <div class="statistic">
            <p>Views</p>
            <p>${image.views}</p>
          </div>
          <div class="statistic">
            <p>Comments</p>
            <p>${image.comments}</p>
          </div>
          <div class="statistic">
            <p>Downloads</p>
            <p>${image.downloads}</p>
          </div>
        </div>
      </div>
      `
    )
    .join('');
  gallery.innerHTML = galleryHTML;
  searchInput.value = '';
  lightbox.refresh();
}
