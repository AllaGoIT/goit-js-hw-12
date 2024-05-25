import{a as g,S,i as u}from"./assets/vendor-ee72e1a4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const h="https://pixabay.com/api/";g.defaults.baseURL=h;const P="43918725-f2c9edad28ee6306c974c89a7",y=15,p=async(r="cat",e=1)=>{try{const s=new URLSearchParams({key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:y,page:e}),{data:i}=await g.get(`${h}?${s}`);return i}catch(s){console.log(s)}},q=document.querySelector("ul.gallery"),$=document.querySelector(".btn-more"),x=new S(".gallery a",{captionPosition:"bottom",captionDelay:250,captionsData:"alt"}),f=async r=>{const e=await r.map(({webformatURL:i,largeImageURL:t,tags:o,likes:n,views:b,comments:E,downloads:w})=>`
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
          <p class="text-coments">Comments: ${E}</p>
         <p class="text-downloads">Downloads: ${w}</p>
        </div>
      </a>
    </li>
    `).join("");q.insertAdjacentHTML("beforeend",e),x.refresh();const s=document.querySelector(".loader");s.style.visibility="hidden",s.style.pointerEvents="none",$.classList.remove("d-none")},R=document.querySelector(".form"),l=document.querySelector(".loader"),v=document.querySelector("ul.gallery"),a=document.querySelector(".btn-more");let c,m=1,d=0;a.classList.add("d-none");R.addEventListener("submit",O);function O(r){r.preventDefault(),c=r.target.elements[0].value.trim(),r.target.reset(),l.style.visibility="visible",l.style.pointerEvents="all",c&&p(c).then(e=>{try{if(e.total===0)throw l.style.visibility="hidden",l.style.pointerEvents="none",new Error(u.show({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",color:"red",close:!0}));f(e.hits),y<e.total&&(d=Math.ceil(e.total/y),d>1&&a.classList.remove("d-none")),console.log(e),console.log(d)}catch(s){console.log(s)}v.innerHTML=""})}const M=()=>{const e=v.querySelector("li.gallery-item").getBoundingClientRect().height,s=e*2;console.log(s),window.scrollBy({top:e,left:0,behavior:"smooth"})},L=async r=>{try{m+=1,a.classList.remove("d-none");const e=await p(c,m);if(e.total===0)throw l.style.visibility="hidden",l.style.pointerEvents="none",new Error(u.show({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",color:"red",close:!0}));f(e.hits),a.classList.add("d-none"),M(),m>d&&(a.classList.add("d-none"),a.removeEventListener("click",L))}catch(e){console.log(e),u.error({message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:2e3})}};a.addEventListener("click",L);
//# sourceMappingURL=commonHelpers.js.map
