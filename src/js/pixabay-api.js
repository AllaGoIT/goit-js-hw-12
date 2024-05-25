
import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
axios.defaults.baseURL = BASE_URL ;
const API_KEY = '43918725-f2c9edad28ee6306c974c89a7';
export const PER_PAGE = 15;

export const fetchPhotosCats = async (query = "cat", imagePage = 1) => {
  try {
const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: 'horizontal',
    safesearch: "true",
    per_page: PER_PAGE,
    page:imagePage,
  });
    const { data } = await axios.get(`${BASE_URL}?${searchParams}`);
    return data;
  }
  catch (error){
    console.log(error);
  }
}
