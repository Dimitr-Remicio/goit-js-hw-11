import './css/styles.css';
import './css/partials/search-field.css';
import './css/partials/load-more.css';
import './css/partials/header.css';
import './css/partials/btn-up-to-top.css';
import './css/others.css';

import GalleryApi from './js/gallery-fetch';
import './sass/gallery.scss';
import { fetchImages } from './js/gallery-fetch';
import { renderGallery } from './js/make-gallery';
import { onScroll, onToTopBtn } from './js/button-scroll';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);


const galleryApi = new GalleryApi();

onScroll();
onToTopBtn();

function onSearchForm(e) {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');



  galleryApi.query = e.currentTarget.elements.searchQuery.value.trim();

  if (galleryApi.query === '') {
      clearAll();
      return Notify.info("Ingrese su consulta de búsqueda.");
  }


  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoImagesFound();
      } else {
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        alertImagesFound(data);

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
}

function onLoadMoreBtn() {
  page += 1;
  simpleLightBox.destroy();

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        alertEndOfSearch();
      }
    })
    .catch(error => console.log(error));
}

function alertImagesFound(data) {
  Notiflix.Notify.success(`¡Hurra! Encontramos ${data.totalHits} imágenes.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure('La búsqueda no puede estar vacía. Por favor, especifique su consulta de búsqueda.');
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Lo sentimos, no hay imágenes que coincidan con su consulta de búsqueda. Inténtalo de nuevo.',
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.failure("Lo sentimos, pero ha llegado al final de los resultados de búsqueda.");
}
