import { Notify } from 'notiflix';
import { loadMoreBtn } from './js/load-more-btn';
import { pixabayApiService } from './js/pixabay-api-service';
import { refs } from './js/refs';
import { clearGallery, appendToGallery } from './js/render-markup';
import { lightbox } from './js/lightbox';


refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(evt) {
  evt.preventDefault();
  loadMoreBtn.hide();

  const inputValue = evt.target.elements.searchQuery.value.trim();
  if (inputValue === '') {
    Notify.failure('Please provide search data!');
    return;
  }
  pixabayApiService.searchQuery = inputValue;
  pixabayApiService.resetPage();

  clearGallery();

  processingReceivedImg();

  refs.formEl.reset();
}

function onLoadMoreBtnClick() {
  processingReceivedImg();
}

async function processingReceivedImg() {
  loadMoreBtn.loading();

  try {
    const { hits, totalHits } = await pixabayApiService.fetchPhotos();

    if (hits.length === 0) {
      loadMoreBtn.hide();
      clearGallery();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    appendToGallery(hits);
    loadMoreBtn.show();

    if (refs.galleryEl.children.length === hits.length) {
      Notify.info(`Hooray! We found ${totalHits} images.`);
    }

    if (refs.galleryEl.children.length >= totalHits) {
      loadMoreBtn.hide();
      Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
    }

    lightbox.refresh();

    loadMoreBtn.endLoading();
  } catch (error) {
    console.error(error);
  }
}