import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import { axiosPhotos } from './js/pixabay-api.js';
import { renderGalleryItem } from './js/render-functions.js';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.form-input');
const gallery = document.querySelector('.gallery-list');
export const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

formEl.addEventListener('submit', submitForm);
loadMoreBtn.addEventListener('click', loadMoreImg);

const lightbox = new SimpleLightbox('.gallery-item a', { captionsData: 'alt' });

let searchedInfo = '';
let currentPage = 1;

async function submitForm(event) {
    event.preventDefault();
    if (!loadMoreBtn.classList.contains('is-hidden')) {
        loadMoreBtn.classList.add('is-hidden');
    }
    gallery.innerHTML = '';
    searchedInfo = inputEl.value;
    if (searchedInfo === '' || searchedInfo.trim() === '') {
        return
    }

    currentPage = 1;

    try {
        const infoFromServer = await axiosPhotos(searchedInfo, currentPage);
        if (infoFromServer.data.hits.length === 0) {
            loader.classList.add('is-hidden');
            loadMoreBtn.classList.add('is-hidden');
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                messageSize: '16',
                color: 'red',
                iconColor: 'white',
            });
            return 
        }
        
        const createGallery = infoFromServer.data.hits
            .map(imgDetail => renderGalleryItem(imgDetail))
            .join('');
        
        loader.classList.add('is-hidden');
        gallery.innerHTML = createGallery;
        lightbox.refresh();
        loadMoreBtn.classList.remove('is-hidden');

        if (infoFromServer.data.total <= 15) {
            loadMoreBtn.classList.add('is-hidden');
        }

        formEl.reset();

    } catch (err) {
        iziToast.error({
            message: err,
            position: 'center',
            messageSize: '16',
            color: 'red',
            iconColor: 'white',
        })
        }
}

async function loadMoreImg() {
    currentPage++;
    try {
        const infoFromServer = await axiosPhotos(searchedInfo, currentPage);

        loader.classList.add('is-hidden');
        const createGallery = infoFromServer.data.hits
            .map(imgDetail => renderGalleryItem(imgDetail))
            .join('');

        gallery.insertAdjacentHTML('beforeend', createGallery);
        lightbox.refresh();

        const galleryElement = document.querySelector('li');
        const imgHeight = galleryElement.getBoundingClientRect().height;
        window.scrollBy({
            top: 2 * imgHeight,
            behavior: "smooth",
        });

        if (currentPage === Number.parseInt(infoFromServer.data.total / 15)) {
            loadMoreBtn.classList.add('is-hidden');
            iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
            messageSize: '16',
        })
        }

    } catch (err) {
        iziToast.error({
            message: err,
            position: 'center',
            messageSize: '16',
            color: 'red',
            iconColor: 'white'
        })
    }
}