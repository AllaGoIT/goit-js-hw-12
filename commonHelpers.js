import{a as h,S,i as u}from"./assets/vendor-ee72e1a4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const g="https://pixabay.com/api/";h.defaults.baseURL=g;const P="43918725-f2c9edad28ee6306c974c89a7",y=15,p=async(r="cat",e=1)=>{try{const s=new URLSearchParams({key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:y,page:e}),{data:n}=await h.get(`${g}?${s}`);return n}catch(s){console.log(s)}},q=document.querySelector("ul.gallery");document.querySelector(".btn-more");const $=new S(".gallery a",{captionPosition:"bottom",captionDelay:250,captionsData:"alt"}),f=async r=>{const e=await r.map(({webformatURL:n,largeImageURL:t,tags:o,likes:c,views:b,comments:E,downloads:w})=>`
     <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img
          class="gallery-image"
          src="${n}"
          alt="${o}"
        />
        <div class="text-list">
          <p class="text-likes">Likes:${c}</p> 
          <p class="text-views">Views: ${b}</p>
          <p class="text-coments">Comments: ${E}</p>
         <p class="text-downloads">Downloads: ${w}</p>
        </div>
      </a>
    </li>
    `).join("");q.insertAdjacentHTML("beforeend",e),$.refresh();const s=document.querySelector(".loader");s.style.visibility="hidden",s.style.pointerEvents="none"},x=document.querySelector(".form"),a=document.querySelector(".loader"),v=document.querySelector("ul.gallery"),i=document.querySelector(".btn-more");let d,l=1,m=0;i.classList.add("d-none");x.addEventListener("submit",R);function R(r){r.preventDefault(),d=r.target.elements[0].value.trim(),r.target.reset(),a.style.visibility="visible",a.style.pointerEvents="all",d.length===0&&(a.style.visibility="hidden",a.style.pointerEvents="none",i.classList.add("d-none")),d&&p(d).then(e=>{try{if(e.total===0)throw a.style.visibility="hidden",a.style.pointerEvents="none",new Error(u.show({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",color:"red",close:!0}));f(e.hits),y<e.total&&(m=Math.ceil(e.total/y),m>1&&i.classList.remove("d-none"))}catch{}v.innerHTML="",l=1})}const O=()=>{const s=v.querySelector("li.gallery-item").getBoundingClientRect().height*5*l+100;console.log(s),window.scrollBy({top:s,left:0,behavior:"smooth"})},L=async r=>{try{l+=1,i.classList.remove("d-none");const e=await p(d,l);if(e.total===0)throw a.style.visibility="hidden",a.style.pointerEvents="none",i.classList.add("d-none"),new Error(u.show({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",color:"red",close:!0}));await f(e.hits),O(),y<e.total-y*l?m>1&&i.classList.remove("d-none"):i.classList.add("d-none"),l>=m&&(i.removeEventListener("click",L),u.show({position:"topRight",message:"We're sorry, but you've reached the end of search results",color:"red",close:!0}))}catch(e){console.log(e)}};i.addEventListener("click",L);
//# sourceMappingURL=commonHelpers.js.map
