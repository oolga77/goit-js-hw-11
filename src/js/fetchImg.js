const KEY = '33803480-c198f92a0268be048f536b98b';
        const URL = 'https://pixabay.com/api/';
        const parameters = 'image_type=photo&orientation=horizontal&safesearch=true'

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImg(){
         return fetch (`${URL}?key=${KEY}&q=${this.searchQuery}&${parameters}&page=${this.page}&per_page=40`)
        .then(responce => responce.json())
        .then(({hits}) => {
            
            this.inkrementPage();
            return hits;
            
        });
        } 

    inkrementPage(){
        this.page += 1;    
        }
    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.searchQuery;
    };

    set query(newQuery){
        this.searchQuery = newQuery;
    }
};

    
