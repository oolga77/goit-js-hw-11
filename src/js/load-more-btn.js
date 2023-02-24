export default class LoadMoreBtn {
    constructor({selector, hiden = false }) {
        //this.refs = this.getRefs(selector);
        this.button = this.getButton(selector);

        hiden && this.hide();
    }

    getButton(selector) {
        return document.querySelector(selector);
      }

//     getRefs(selector) {
//         //const refs = {}
//         refs.button = document.querySelector(selector);
//     return refs;
// }

enable(){
    this.refs.button.disabled = false;
    this.refs.button.textContent = 'Load more';
}

disable(){
    this.refs.button.disabled = true;
    this.refs.button.textContent = 'Loading...';
}

show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}