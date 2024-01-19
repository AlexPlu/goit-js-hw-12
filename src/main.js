import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import axios from 'axios';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '41883234-6691d5bcae5feebb5d3051225';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentPage = 1;
let currentSearchTerm = '';

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    loader.style.display = 'block';
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    currentPage = 1;
    currentSearchTerm = searchTerm;

    try {
      await handleSearchResults(currentSearchTerm, currentPage);
    } catch (error) {
      handleRequestError(error);
    }
  }
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage++;
  loader.style.display = 'block';

  try {
    await handleSearchResults(currentSearchTerm, currentPage, true);
  } catch (error) {
    handleRequestError(error);
  }
});

async function handleSearchResults(searchTerm, page, append = false) {
  try {
    const data = await fetchData(searchTerm, page);
    loader.style.display = 'none';

    if (data.hits.length > 0) {
      if (append) {
        displayImages(data.hits);
        smoothScrollGallery();
      } else {
        gallery.innerHTML = '';
        displayImages(data.hits);
      }

      if (data.totalHits <= page * 40) {
        hideLoadMoreButton();
      } else {
        showLoadMoreButton();
      }
    } else {
      hideLoadMoreButton();
      showNoResultsMessage();
    }
  } catch (error) {
    handleRequestError();
  }
}

function fetchData(searchTerm, page) {
  const url = 'https://pixabay.com/api/';
  const params = {
    key: apiKey,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  };

  return axios.get(url, { params }).then(response => response.data);
}

function displayImages(images) {
  const galleryHTML = generateGalleryHTML(images);
  gallery.insertAdjacentHTML('beforeend', galleryHTML);
  searchInput.value = '';
  lightbox.refresh();
}

function generateGalleryHTML(images) {
  return images
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
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function showNoResultsMessage() {
  iziToast.error({
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again.',
  });
}

function handleRequestError(error) {
  loader.style.display = 'none';
  iziToast.error({
    position: 'topRight',
    message: error.message,
  });
}

function smoothScrollGallery() {
  const cardHeight = gallery.firstElementChild.clientHeight;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
