import{S as v,a as L,i as h}from"./assets/vendor-5efda6b9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const b="41883234-6691d5bcae5feebb5d3051225",w=document.getElementById("searchForm"),m=document.getElementById("searchInput"),a=document.querySelector(".loader"),c=document.querySelector(".gallery"),l=document.getElementById("loadMoreBtn");let i=1,u="";var M=new v(".gallery a",{captionDelay:250,captionsData:"alt",captionPosition:"bottom"});w.addEventListener("submit",async function(o){o.preventDefault();const e=m.value.trim();if(e!==""){a.style.display="block",c.innerHTML="",l.style.display="none",i=1,u=e;try{await g(u,i)}catch(n){p(n)}}});l.addEventListener("click",async function(){i++,a.style.display="block";try{await g(u,i,!0)}catch(o){p(o)}});async function g(o,e,n=!1){try{const r=await S(o,e);a.style.display="none",r.hits.length>0?(n?(y(r.hits),I()):(c.innerHTML="",y(r.hits)),r.totalHits<=e*40?f():E()):(f(),H())}catch{p()}}function S(o,e){const n="https://pixabay.com/api/",r={key:b,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:40};return L.get(n,{params:r}).then(t=>t.data)}function y(o){const e=B(o);c.insertAdjacentHTML("beforeend",e),m.value="",M.refresh()}function B(o){return o.map(e=>`
      <div class="image-container">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}">
        </a>
        <div class="image-panel">
          <div class="statistic">
            <p>Likes</p>
            <p>${e.likes}</p>
          </div>
          <div class="statistic">
            <p>Views</p>
            <p>${e.views}</p>
          </div>
          <div class="statistic">
            <p>Comments</p>
            <p>${e.comments}</p>
          </div>
          <div class="statistic">
            <p>Downloads</p>
            <p>${e.downloads}</p>
          </div>
        </div>
      </div>
      `).join("")}function f(){l.style.display="none"}function E(){l.style.display="block"}function H(){h.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."})}function p(o){a.style.display="none",h.error({position:"topRight",message:o.message})}function I(){const o=c.firstElementChild.clientHeight;window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
