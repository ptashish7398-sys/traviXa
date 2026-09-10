document.addEventListener('DOMContentLoaded',()=>{
 const list=document.getElementById('savedList');
 if(list){
  const trips=JSON.parse(localStorage.getItem('travixaSavedTrips')||'[]');
  const last=JSON.parse(localStorage.getItem('travixaLastTrip')||'null');
  const all=trips.length?trips:(last?[last]:[]);
  list.innerHTML=all.length?all.map((t,i)=>`<article class="card"><h3>${t.destination||t.place||'Trip'}</h3><p class="muted">${t.duration||t.days||''}</p><a class="btn green" href="planner.html">Open Planner</a></article>`).join(''):'<div class="empty">No saved trips yet. Create one from Smart Planner.</div>';
 }
 const profile=document.getElementById('profileForm');
 if(profile){
  const u=JSON.parse(localStorage.getItem('travixaUser')||'{}');
  ['name','email','mobile'].forEach(k=>{const e=document.getElementById('p_'+k);if(e)e.value=u[k]||u.fullName||''});
  profile.addEventListener('submit',e=>{e.preventDefault();const u=JSON.parse(localStorage.getItem('travixaUser')||'{}');u.name=document.getElementById('p_name').value.trim();u.email=document.getElementById('p_email').value.trim();u.mobile=document.getElementById('p_mobile').value.trim();localStorage.setItem('travixaUser',JSON.stringify(u));alert('Profile updated.');});
 }
});
