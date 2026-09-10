document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.service || 'flights';
    const form = document.getElementById('serviceForm');
    const results = document.getElementById('results');
    const count = document.getElementById('resultCount');
    const sort = document.getElementById('sort');

    const configs = {
        flights:{label:'Flights',fields:['from','to','date','travellers'],seed:['IndiGo','Air India','Vistara','Akasa Air'],icon:'✈'},
        hotels:{label:'Hotels',fields:['city','checkin','checkout','rooms'],seed:['TraviXa Grand','City View Residency','Green Valley Hotel','The Travel Nest'],icon:'⌂'},
        holidays:{label:'Holiday Packages',fields:['destination','date','travellers','budget'],seed:['Goa Escape','Kashmir Retreat','Dubai Explorer','Bali Bliss'],icon:'✦'},
        trains:{label:'Trains',fields:['from','to','date','class'],seed:['Rajdhani Express','Shatabdi Express','Vande Bharat','Intercity Express'],icon:'▣'},
        buses:{label:'Buses',fields:['from','to','date','travellers'],seed:['Volvo Multi-Axle','AC Sleeper','AC Seater','Express Coach'],icon:'▰'},
        cabs:{label:'Cabs',fields:['pickup','drop','date','time'],seed:['Prime Sedan','SUV Ride','Airport Cab','Outstation Cab'],icon:'◆'}
    };
    const cfg = configs[page] || configs.flights;
    const value = key => document.getElementById(key)?.value.trim() || '';

    function escapeHTML(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}

    function render(){
        const query = Object.fromEntries(cfg.fields.map(k => [k,value(k)]));
        const missing = cfg.fields.filter(k => !query[k]);
        if(missing.length){
            results.innerHTML='<div class="empty"><strong>Ready when you are.</strong><br>Complete the search details above to compare TraviXa options.</div>';
            if(count) count.textContent='0';
            return;
        }
        localStorage.setItem('travixaLastSearch', JSON.stringify({type:page,...query,at:Date.now()}));
        let cards = cfg.seed.map((name,i)=>({name,price:(i+1)*799+499,detail:Object.values(query).filter(Boolean).join(' • '),rating:(4.2+i/10).toFixed(1)}));
        if(sort?.value==='price-desc') cards.reverse();
        if(sort?.value==='price-asc') cards.sort((a,b)=>a.price-b.price);
        if(count) count.textContent=cards.length;
        results.innerHTML=cards.map(c=>`<article class="result"><div><div class="meta"><span>${cfg.icon} TraviXa option</span><span>✓ Flexible options</span><span>★ ${c.rating}</span></div><h3>${escapeHTML(c.name)}</h3><p class="result-detail">${escapeHTML(c.detail)}</p></div><div><div class="price">₹${c.price.toLocaleString('en-IN')}</div><button class="btn green select-btn" data-name="${escapeHTML(c.name)}">View Details</button></div></article>`).join('');
        results.querySelectorAll('.select-btn').forEach(btn=>btn.addEventListener('click',()=>{
            const selection={service:page,name:btn.dataset.name,query,selectedAt:new Date().toISOString()};
            localStorage.setItem('travixaSelectedOption',JSON.stringify(selection));
            if(localStorage.getItem('travixaLoggedIn')!=='true'){
                localStorage.setItem('travixaPendingService',JSON.stringify(selection));
                location.href='login.html?redirect='+encodeURIComponent(page+'.html');
                return;
            }
            const recent=JSON.parse(localStorage.getItem('travixaServiceSearches')||'[]');
            recent.unshift(selection); localStorage.setItem('travixaServiceSearches',JSON.stringify(recent.slice(0,10)));
            alert(`${btn.dataset.name} selected. Your selection is saved for the TraviXa travel workspace.`);
        }));
    }
    form?.addEventListener('submit',e=>{e.preventDefault();render();});
    sort?.addEventListener('change',render);
    document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');}));
});
