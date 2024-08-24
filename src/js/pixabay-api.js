import axios from 'axios';
import { loader } from '../main';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export function axiosPhotos(value, page) {
    loader.classList.remove('is-hidden');
    
    const axiosParams = {
        params: {
            key: '45515322-6acc0c0fe7102921e2f085c71',
            q: value,
            per_page: 15,
            page: page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true
        }
    }
    
    return axios.get('', axiosParams);
}