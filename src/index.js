import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from "./js/fetchImg";
import { createCardMarkup } from "./js/img-card";

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gellaryCards: document.querySelector('.gallery')
}

const apiService = new ApiService();
console.log(apiService)

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


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