import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from "./js/fetchImg";
import { createCardMarkup } from "./js/img-card";
import LoadMoreBtn from './js/load-more-btn';

const refs = {
    searchForm: document.querySelector('.search-form'),
    //loadMoreBtn: document.querySelector('.load-more'),
    gellaryCards: document.querySelector('.gallery')
}
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
  });
console.log(loadMoreBtn);

const apiService = new ApiService();
console.log(apiService)

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


function onSearch(e){ 
    e.preventDefault();
    
    
    apiService.searchQuery = e.currentTarget.elements.searchQuery.value;
    
    apiService.resetPage();
    apiService.fetchImg().then(hits => {
        
        if(!hits.length){
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
              );
              clearGellaryContainer(); 
            return
        }
        clearGellaryContainer();
        appendGellaryCardsMarkup(hits)});
}

function onLoadMore() {
apiService.fetchImg().then(appendGellaryCardsMarkup);  
}

function appendGellaryCardsMarkup(cards) {
refs.gellaryCards.insertAdjacentHTML("beforeend", createCardMarkup(cards))
}

function clearGellaryContainer() {
refs.gellaryCards.innerHTML = '';
}