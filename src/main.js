
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

  if (searchQuery.length === 0) {
    loadEl.style.visibility = "hidden";
    loadEl.style.pointerEvents = "none";
    btnmEl.classList.add("d-none");
  }

  if (searchQuery) {
    btnmEl.classList.add("d-none");
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
        else {
          iziToast.show({
            position: 'topRight',
            message: "We're sorry, but you've reached the end of search results",
            color: 'red',
            close: true,
          });
        }
      }
      catch (error) {
        console.log(error);
      }
      galEl.innerHTML = "";
      imagePage = 1;
    })
  }
}
    
const smoothScrollOnLoadMore = () => {
  const lastImage = galEl.querySelector('li.gallery-item');
  const imageHeight = lastImage.getBoundingClientRect().height;
  const scrollHeight = imageHeight * 5 * imagePage + 100;

  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}

const onLoadMorePressed = async event => {
  try {
    imagePage += 1;
    btnmEl.classList.remove('d-none');

    const  data  = await fetchPhotosCats(searchQuery, imagePage);

    if (data.total === 0) {
      loadEl.style.visibility = "hidden";
      loadEl.style.pointerEvents = "none";
      btnmEl.classList.add("d-none");
      throw new Error((
        iziToast.show({
          position: 'topRight',
          message: "Sorry, there are no images matching your search query. Please try again!",
          color: 'red',
          close: true,
        })
      ));
    }

    await createGalleryList(data.hits);
    
    smoothScrollOnLoadMore();
    if (PER_PAGE < (data.total -(PER_PAGE*imagePage))) {
      if (totalPages > 1) {
        btnmEl.classList.remove('d-none');
      }
    }
    else {
      btnmEl.classList.add('d-none');
    }
    if (imagePage >= totalPages) {
      iziToast.show({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results",
        color: 'red',
        close: true,
      })
    }
  } catch (error) {
    console.log(error);
  }
}
    
btnmEl.addEventListener("click", onLoadMorePressed);
