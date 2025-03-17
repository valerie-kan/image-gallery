export function renderGalleryItem(imgDetails) {
  return `
    <li class='gallery-item'>
        <a class='gallery-link' href='${imgDetails.largeImageURL}'>
        <img class='gallery-img' src='${imgDetails.webformatURL}' alt='${imgDetails.tags}'>
        </a>
        <div class='img-info'>
        <p><span>Likes</span> ${imgDetails.likes}</p>
        <p><span>Views</span> ${imgDetails.views}</p>
        <p><span>Comments</span> ${imgDetails.comments}</p>
        <p><span>Downloads</span> ${imgDetails.downloads}</p>
        </div>
    </li>`;
}
