const galEl = document.querySelector("ul.gallery");
const btnmEl = document.querySelector(".btn-more");
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new SimpleLightbox('.gallery a', {
    captionPosition: 'bottom',
    captionDelay: 250,
    captionsData: 'alt',
});

  export const createGalleryList = async images => {
    const markUp = await images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
     <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
        />
        <div class="text-list">
          <p class="text-likes">Likes:${likes}</p> 
          <p class="text-views">Views: ${views}</p>
          <p class="text-coments">Comments: ${comments}</p>
         <p class="text-downloads">Downloads: ${downloads}</p>
        </div>
      </a>
    </li>
    `).join("");

    galEl.insertAdjacentHTML("beforeend", markUp);
    lightbox.refresh();
    
    const loadEl = document.querySelector(".loader");
    loadEl.style.visibility = "hidden";
    loadEl.style.pointerEvents = "none";
  }
