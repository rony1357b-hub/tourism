const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

// Mobile navigation
const menu=$('.menu-btn'), links=$('.nav-links');
menu?.addEventListener('click',()=>{links.classList.toggle('open');menu.setAttribute('aria-expanded',links.classList.contains('open'))});
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>links?.classList.remove('open')));

// Theme toggle
const root=document.documentElement, themeBtn=$('.theme-toggle');
const saved=localStorage.getItem('rony-theme'); if(saved) root.dataset.theme=saved;
function themeIcon(){if(themeBtn) themeBtn.innerHTML=root.dataset.theme==='dark'?'☀':'☾'} themeIcon();
themeBtn?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('rony-theme',root.dataset.theme);themeIcon()});

// Reveal animations
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

// Counter animation
$$('[data-counter]').forEach(el=>{const target=Number(el.dataset.counter);let done=false;const io=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!done){done=true;let start=0;const step=Math.max(1,Math.ceil(target/55));const tick=()=>{start=Math.min(target,start+step);el.textContent=start.toLocaleString('en-IN')+(target>=1000?'+':'');if(start<target)requestAnimationFrame(tick)};tick();io.disconnect()}},{threshold:.6});io.observe(el)});

// Active navigation
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();$$('.nav-links a').forEach(a=>{if(a.getAttribute('href')===page)a.classList.add('active')});

// FAQ
$$('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));

// Tour filters + search
const cards=$$('.filter-card'); const filters=$$('.filter'); const search=$('.tour-search');
function applyFilters(){const active=$('.filter.active')?.dataset.filter||'all';const term=(search?.value||'').toLowerCase().trim();cards.forEach(card=>{const text=card.innerText.toLowerCase();const cat=card.dataset.category||'';card.style.display=(active==='all'||cat.includes(active))&&(!term||text.includes(term))?'':'none'})}
filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');applyFilters()}));search?.addEventListener('input',applyFilters);

// Contact / booking demo
function toast(msg){const t=$('.toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200)}
$$('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();toast('Thanks! Rony will get back to you shortly.');form.reset()}));
const modal=$('.modal'); const modalTitle=$('.modal-title');
$$('[data-book]').forEach(btn=>btn.addEventListener('click',()=>{if(modal){modalTitle.textContent=`Plan your ${btn.dataset.book} escape`;modal.classList.add('show')}}));
$('.modal-close')?.addEventListener('click',()=>modal.classList.remove('show'));modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});

// Smooth CTA booking fallback
$$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
