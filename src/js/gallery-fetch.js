import axios from 'axios';
export { fetchImages };



export default class GalleryApi {
  constructor() {
    this.API_KEY = '?key=25716133-5af1cc1f28b9664f0c877d305';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.image_type = "image_type=photo";
    this.orientation = "orientation=horizontal"
    this.safesearch = "safesearch=true";
    this.per_page = 40;
    this.page = 1;
    this.searchQuery = '';
  }


  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '25766392-01b12b6ed5ab34bc2910d9c3e';

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response;
}