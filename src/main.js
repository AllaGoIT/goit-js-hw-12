
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchPhotosCats } from "./js/pixabay-api.js";
import { createGalleryList } from "./js/render-functions.js";
import { PER_PAGE } from "./js/pixabay-api.js";

const formEl = document.querySelector(".form");
const loadEl = document.querySelector(".loader");
const galEl = document.querySelector("ul.gallery");
const btnmEl = document.querySelector(".btn-more");

 let searchQuery;
 let imagePage = 1;
 let totalPages = 0;

btnmEl.classList.add("d-none");

formEl.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements[0].value.trim();
  event.target.reset();
  loadEl.style.visibility = "visible";
  loadEl.style.pointerEvents = "all";

  if (searchQuery) {
    fetchPhotosCats(searchQuery).then(json => {
      try {
        if (json.total === 0) {
          loadEl.style.visibility = "hidden";
          loadEl.style.pointerEvents = "none";
          throw new Error((
            iziToast.show({
              position: 'topRight',
              message: "Sorry, there are no images matching your search query. Please try again!",
              color: 'red',
              close: true,
            })
          ));
        }
        createGalleryList(json.hits);
        if (PER_PAGE < json.total) {
          totalPages = Math.ceil(json.total / PER_PAGE);
          if (totalPages > 1) {
            btnmEl.classList.remove('d-none');
          }
        }
        console.log(json);
        console.log(totalPages);
      }
      catch (error) {
        console.log(error);
      };
      galEl.innerHTML = "";
    })
  };
}
    
const smoothScrollOnLoadMore = () => {
  const lastImage = galEl.querySelector('li.gallery-item');
  const imageHeight = lastImage.getBoundingClientRect().height;
  const scrollHeight = imageHeight * 2;
  console.log(scrollHeight);

  window.scrollBy({
    top: imageHeight,
    left: 0,
    behavior: 'smooth',
  });
};

const onLoadMorePressed = async event => {
  try {
       
    imagePage += 1;
    btnmEl.classList.remove('d-none');

    // Get news data
    const  data  = await fetchPhotosCats(searchQuery, imagePage);
    //console.log(data);
    // Render news
    if (data.total === 0) {
      loadEl.style.visibility = "hidden";
      loadEl.style.pointerEvents = "none";
      throw new Error((
        iziToast.show({
          position: 'topRight',
          message: "Sorry, there are no images matching your search query. Please try again!",
          color: 'red',
          close: true,
        })
      ));
    }
    createGalleryList(data.hits);
   
    btnmEl.classList.add('d-none');
    smoothScrollOnLoadMore();

    // Hide button if reach end of collection
    if (imagePage > totalPages) {
      btnmEl.classList.add('d-none');
      btnmEl.removeEventListener('click', onLoadMorePressed);
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results",
      position: 'topRight',
      timeout: 2000,
    });
  }
};
    
btnmEl.addEventListener("click", onLoadMorePressed);
