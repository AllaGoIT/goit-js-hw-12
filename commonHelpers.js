import{a as g,S,i as m}from"./assets/vendor-ee72e1a4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const h="https://pixabay.com/api/";g.defaults.baseURL=h;const P="43918725-f2c9edad28ee6306c974c89a7",u=15,p=async(r="cat",e=1)=>{try{const s=new URLSearchParams({key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:u,page:e}),{data:i}=await g.get(`${h}?${s}`);return i}catch(s){console.log(s)}},q=document.querySelector("ul.gallery");document.querySelector(".btn-more");const $=new S(".gallery a",{captionPosition:"bottom",captionDelay:250,captionsData:"alt"}),f=async r=>{const e=await r.map(({webformatURL:i,largeImageURL:t,tags:o,likes:n,views:b,comments:w,downloads:E})=>`
     <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img
          class="gallery-image"
          src="${i}"
          alt="${o}"
        />
        <div class="text-list">
          <p class="text-likes">Likes:${n}</p> 
          <p class="text-views">Views: ${b}</p>
          <p class="text-coments">Comments: ${w}</p>
         <p class="text-downloads">Downloads: ${E}</p>
        </div>
      </a>
    </li>
    `).join("");q.insertAdjacentHTML("beforeend",e),$.refresh();const s=document.querySelector(".loader");s.style.visibility="hidden",s.style.pointerEvents="none"},x=document.querySelector(".form"),l=document.querySelector(".loader"),v=document.querySelector("ul.gallery"),a=document.querySelector(".btn-more");let d,c=1,y=0;a.classList.add("d-none");x.addEventListener("submit",R);function R(r){r.preventDefault(),d=r.target.elements[0].value.trim(),r.target.reset(),l.style.visibility="visible",l.style.pointerEvents="all",d&&p(d).then(e=>{try{if(e.total===0)throw l.style.visibility="hidden",l.style.pointerEvents="none",new Error(m.show({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",color:"red",close:!0}));f(e.hits),u<e.total&&(y=Math.ceil(e.total/u),y>1&&a.classList.remove("d-none"))}catch{}v.innerHTML="",c=1})}const O=()=>{const s=v.querySelector("li.gallery-item").getBoundingClientRect().height*5*c+100;console.log(s),window.scrollBy({top:s,left:0,behavior:"smooth"})},L=async r=>{try{c+=1,a.classList.remove("d-none");const e=await p(d,c);if(e.total===0)throw l.style.visibility="hidden",l.style.pointerEvents="none",new Error(m.show({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",color:"red",close:!0}));await f(e.hits),a.classList.add("d-none"),c>y?(a.classList.add("d-none"),a.removeEventListener("click",L),m.show({position:"topRight",message:"We're sorry, but you've reached the end of search results",color:"red",close:!0})):a.classList.remove("d-none"),O()}catch(e){console.log(e)}};a.addEventListener("click",L);
//# sourceMappingURL=commonHelpers.js.map
