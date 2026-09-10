document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id);
 const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 let user={}; try{user=JSON.parse(localStorage.getItem('travixaUser')||'{}')}catch(e){}
 const name=user.name||user.fullName||'Traveler';
 if($('dashboardUserName'))$('dashboardUserName').textContent=name;
 if($('userInitial'))$('userInitial').textContent=name.charAt(0).toUpperCase();

 const sidebar=$('sidebar'),overlay=$('sidebarOverlay'),menu=$('mobileMenuBtn');
 const close=()=>{sidebar?.classList.remove('active');overlay?.classList.remove('active');document.body.classList.remove('menu-open')};
 menu?.addEventListener('click',()=>sidebar?.classList.contains('active')?close():(sidebar?.classList.add('active'),overlay?.classList.add('active'),document.body.classList.add('menu-open')));
 overlay?.addEventListener('click',close); window.addEventListener('resize',()=>{if(innerWidth>900)close()});

 const search=$('destinationSearch'), searchBtn=$('exploreSearchBtn');
 function doSearch(){const q=search?.value.trim();if(!q){search?.focus();return} localStorage.setItem('travixaLastSearch',JSON.stringify({type:'destination',query:q,at:Date.now()}));location.href='destinations.html?search='+encodeURIComponent(q)}
 searchBtn?.addEventListener('click',doSearch); search?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doSearch()}});

 const saved=()=>{try{return JSON.parse(localStorage.getItem('travixaSavedTrips')||'[]')}catch(e){return[]}};
 const latest=()=>{const a=saved();return a[0]||null};
 const days=t=>{if(!t)return 0;if(t.startDate&&t.endDate){const a=new Date(t.startDate),b=new Date(t.endDate);const d=Math.ceil((b-a)/86400000);return d>0?d:1}const m=String(t.duration||'').match(/\d+/);return m?Number(m[0]):0};
 const renderTrips=()=>{
  const trips=saved(), empty=$('tripEmptyState'), list=$('tripList');
  if(!trips.length){if(empty)empty.style.display='block';if(list)list.innerHTML='';return}
  if(empty)empty.style.display='none';
  if(list)list.innerHTML=trips.slice(0,3).map((t,i)=>`<article class="trip-card"><div class="trip-card-top"><span class="trip-index">0${i+1}</span><span class="trip-status">Saved plan</span></div><h3>${escape(t.destination||'Planned Journey')}</h3><p>${escape(t.startDate||'Date not set')} ${t.endDate?'→ '+escape(t.endDate):''}</p><div class="trip-meta"><span><i class="fa-solid fa-users"></i> ${escape(t.travellers||'1')}</span><span><i class="fa-solid fa-calendar-days"></i> ${days(t)||0} days</span></div><a href="saved-trips.html" class="trip-link">View trip <i class="fa-solid fa-arrow-right"></i></a></article>`).join('');
 };
 renderTrips();
 const trips=saved(), destinations=[...new Set(trips.map(t=>String(t.destination||'').trim()).filter(Boolean))];
 if($('tripCount'))$('tripCount').textContent=trips.length;
 if($('destinationCount'))$('destinationCount').textContent=destinations.length;
 if($('daysCount'))$('daysCount').textContent=trips.reduce((n,t)=>n+days(t),0);

 const recent=$('recentSearches');
 if(recent){let r;try{r=JSON.parse(localStorage.getItem('travixaLastSearch')||'null')}catch(e){r=null}; if(r?.query){recent.innerHTML=`<div class="recent-search-item"><div><i class="fa-solid fa-magnifying-glass"></i><strong>${escape(r.query)}</strong><span>Destination search</span></div><a class="view-link" href="destinations.html?search=${encodeURIComponent(r.query)}">Search again <i class="fa-solid fa-arrow-right"></i></a></div>`}}

 document.querySelectorAll('.quick-card').forEach(card=>card.addEventListener('click',e=>{const text=card.innerText.toLowerCase();if(text.includes('saved trips')&&card.getAttribute('href')==='#'){e.preventDefault();location.href='saved-trips.html'}}));
 document.querySelectorAll('[href="map.html"], [href="weather.html"]').forEach(a=>a.classList.remove('coming-soon'));
});
