function THView(root,o){const D=window.__TH,B=o.base||'';let h=0,p=0,sel=-1,last=null;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
root.classList.add('th');
root.innerHTML=`<div class="th-bar"><div class="th-line" data-l></div><div class="th-ps" data-ps></div></div><section class="th-stage"><div class="th-pic"><div class="th-ttl" data-t></div><div class="th-box"><img data-im alt=""><div data-mk></div></div></div></section><section class="th-sec"><h3 data-tt></h3><p>Red marks a loss. Select any point.</p><div class="th-tl" data-tl></div></section><section class="th-sec"><h3 data-ft></h3><p>What was in use in this house, and what had left.</p><div class="th-lg"><span class="th-bd in">In use</span><span class="th-bd new">New here</span><span class="th-bd chg">Changed</span><span class="th-bd gone">Not here</span><span class="th-bd none">No record</span></div><div class="th-fg" data-fu></div><div data-fx></div></section><section class="th-sec"><h3>Go deeper</h3><p>The same years from other indexes.</p><div class="th-lk" data-lk></div></section><div class="th-strip" data-st style="margin-top:24px"></div><section class="th-key"><h3 data-kt></h3><p class="th-nt" data-nt></p><div class="th-kg" data-kg></div><p class="th-src">Scripture text is the KJV. Images are AI illustrations made for the School of the Nabi. They are reconstructions, not photographs or surveyed plans. Later sources are named wherever they are used: 1 Maccabees, Josephus, and the Mishnah and Talmud, which were written after the Temple fell.</p></section>`;
const md=document.createElement('div');md.className='th-md';md.setAttribute('role','dialog');md.setAttribute('aria-modal','true');md.innerHTML='<div class="th-mi"><img alt=""></div><div class="th-mt"></div><button class="th-x" aria-label="Close">×</button>';document.body.appendChild(md);
const $=s=>root.querySelector(s);
const seg=(x,i)=>`<button class="th-seg" style="flex:${x.y[1]-x.y[0]} 1 0" data-h="${i}"><b>${esc(x.n)}</b><small>${esc(x.dt)}</small></button>`;
$('[data-l]').innerHTML=seg(D[0],0)+seg(D[1],1)+'<div class="th-gap">Exile<br>586–516</div>'+seg(D[2],2)+seg(D[3],3)+'<div class="th-end">Fall<br>AD 70</div>';
const SEQ=[[1,0],[2,0],[3,0],[0,0]];D.forEach((x,i)=>x.p.forEach((_,j)=>{if(j>0)SEQ.push([i,j])}));
$('[data-st]').innerHTML=SEQ.map(([i,j])=>{const x=D[i],q=x.p[j];return `<button class="th-th" data-h="${i}" data-p="${j}"><img loading="lazy" src="${B}img/${q.img}.jpg" alt=""><span>${esc(x.n)}: ${esc(q.t)}</span></button>`}).join('');
const cur=()=>D[h].p[p];let rendered=-1,ctx=null;
const ST={in:'In use',new:'New here',chg:'Changed',gone:'Not here',none:'No record'};
function rh(X){if(rendered===h)return;rendered=h;$('[data-tt]').textContent=X.n+': its timeline';$('[data-ft]').textContent=X.n+': its furniture';
$('[data-tl]').innerHTML=X.tl.map((e,i)=>`<button class="th-ev${e.l?' lost':''}" data-e="${i}"><img loading="lazy" src="${B}${e.i}" alt=""><small>${esc(e.ds)}</small><b>${esc(e.n)}</b></button>`).join('');
const card=(f,i)=>`<button class="th-fc ${f.st}" data-f="${i}"><img loading="lazy" src="${B}${f.i}" alt=""><div><span class="th-bd ${f.st}">${ST[f.st]}</span><h4>${i+1}. ${esc(f.n)}</h4><em>${esc(f.lab)}</em><u>${esc(f.l)}</u></div></button>`;
const here=X.fu.map((f,i)=>[f,i]).filter(a=>a[0].st!=='gone'&&a[0].st!=='none'),out=X.fu.map((f,i)=>[f,i]).filter(a=>a[0].st==='gone'||a[0].st==='none');
$('[data-fu]').innerHTML=here.map(a=>card(a[0],a[1])).join('');$('[data-fx]').innerHTML=out.length?`<div class="th-gh">Not in this house, or no record</div><div class="th-fg">${out.map(a=>card(a[0],a[1])).join('')}</div>`:'';
$('[data-lk]').innerHTML=X.lk.map(l=>`<a href="${l.u}"><b>${esc(l.t)}</b><span>${esc(l.d)}</span></a>`).join('')}
function go(H,P,push,scroll){h=H;p=P;const X=D[h],c=X.p[p];
root.querySelectorAll('.th-seg').forEach(e=>e.setAttribute('aria-current',+e.dataset.h===h));
root.querySelectorAll('.th-th').forEach(e=>{const on=+e.dataset.h===h&&+e.dataset.p===p;e.setAttribute('aria-current',on);if(on){const s=e.parentElement;s.scrollLeft=e.offsetLeft-s.offsetLeft-s.clientWidth/2+75}});
$('[data-ps]').innerHTML='<button data-go="-1" aria-label="Previous picture">‹</button>'+X.p.map((_,i)=>`<button data-p2="${i}" aria-current="${i===p}" aria-label="Picture ${i+1}">${i+1}</button>`).join('')+'<button data-go="1" aria-label="Next picture">›</button>';
$('[data-t]').innerHTML=`<small>${esc(X.n)} · ${esc(X.dt)} · ${p+1} of ${X.p.length}</small><h3>${esc(c.t)}</h3><p>${esc(c.sub)}${c.link?' <a class="th-go" style="margin:0 0 0 8px;padding:3px 9px" href="../who-served/index.html">See who served where ›</a>':''}</p>`;
const im=$('[data-im]');im.src=B+'img/'+c.img+'.jpg';im.alt=c.t+', an aerial illustration';
$('[data-mk]').innerHTML=c.m.map((m,i)=>`<button class="th-mk ${m.s}" style="left:${m.x}%;top:${m.y}%" data-m="${i}" aria-label="${i+1}. ${esc(m.n)}"><i>${i+1}</i><b>${esc(m.n)}</b></button>`).join('');
rh(X);$('[data-kt]').textContent='Every number: '+c.t;$('[data-nt]').textContent=c.note;
$('[data-kg]').innerHTML=c.m.map((m,i)=>`<button class="th-kc" data-m="${i}"><img loading="lazy" src="${B}${m.i}" alt=""><h4><i>${i+1}</i>${esc(m.n)}</h4></button>`).join('');
if(o.hash){const tag='#'+X.k+'-'+(p+1);try{history[push?'pushState':'replaceState'](null,'',tag)}catch(_){}document.title=c.t+' | The Temples | School of the Nabi'}
if(scroll)root.scrollIntoView({block:'start'})}
function show(i){const L=ctx.list,m=L[i],n=L.length;if(sel<0)last=document.activeElement;sel=i;
const im=md.querySelector('.th-mi img');im.src=B+m.i;im.alt=m.n;
const vs=m.v.map(v=>`<div class="th-v"><b>${esc(v.r)}</b>${v.t?`<span>${esc(v.t)}</span>`:'<span>Read the whole passage.</span>'}</div>`).join('');const num=ctx.kind==='e'?'':`<i>${i+1}</i>`;
const top=ctx.kind==='e'?`<h5>What happened</h5><p>${esc(m.f)}</p>`:`<h5>What it was</h5><p>${esc(m.f)}</p><h5>Its use: who served, and how</h5><p>${esc(m.d)}</p>${m.l&&ctx.kind==='f'?`<h5>What became of it</h5><p class="th-left">${esc(m.l)}</p>`:''}`;
md.querySelector('.th-mt').innerHTML=`<h2>${num}${esc(m.n)}</h2><p class="th-where">${esc(D[h].n)} · ${esc(ctx.kind==='e'?m.ds:ctx.kind==='f'?'Furniture':cur().t)}</p>${m.st?`<span class="th-bd ${m.st}">${ST[m.st]}</span>`:''}${top}${vs?`<h5>Verses (KJV)</h5>${vs}`:''}${m.o?`<h5>Other sources</h5><p>${esc(m.o)}</p>`:''}${m.pk?`<a class="th-go" href="../kings-time/index.html#${m.pk}">Who reigned then: Kings and Priests in Time at ${m.pk} BC</a>`:''}<div class="th-pg"><button data-s="-1">‹ ${esc(L[(i-1+n)%n].n)}</button><button data-s="1">${esc(L[(i+1)%n].n)} ›</button></div>`;
md.querySelector('.th-mt').scrollTop=0;md.classList.add('o');document.documentElement.style.overflow='hidden';md.querySelector('.th-x').focus()}
function open(i){ctx={kind:'m',list:cur().m};show(i)}
function close(){if(sel<0)return;sel=-1;md.classList.remove('o');document.documentElement.style.overflow='';if(last&&last.focus)last.focus({preventScroll:true})}
function step(d){const i=SEQ.findIndex(s=>s[0]===h&&s[1]===p),n=SEQ.length,s=SEQ[(i+d+n)%n];go(s[0],s[1],true)}
root.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;if(d.m!==undefined)open(+d.m);else if(d.e!==undefined){ctx={kind:'e',list:D[h].tl};show(+d.e)}else if(d.f!==undefined){ctx={kind:'f',list:D[h].fu};show(+d.f)}else if(d.go)step(+d.go);else if(d.p2!==undefined)go(h,+d.p2,true);else if(d.h!==undefined)go(+d.h,d.p!==undefined?+d.p:0,true,true)});
md.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;if(t.classList.contains('th-x'))close();else if(t.dataset.s){const n=ctx.list.length;show((sel+ +t.dataset.s+n)%n)}});
document.addEventListener('keydown',e=>{const on=sel>=0;if(e.key==='Escape'&&on){close();return}if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const d=e.key==='ArrowRight'?1:-1;if(on){const n=ctx.list.length;show((sel+d+n)%n)}else if(o.hash)step(d)}});
function fromHash(){const m=location.hash.match(/^#([a-z]+)-(\d+)$/);if(o.hash&&m){const H=D.findIndex(x=>x.k===m[1]);if(H>=0&&D[H].p[m[2]-1])return go(H,m[2]-1)}go(SEQ[0][0],SEQ[0][1])}
if(o.hash)addEventListener('popstate',()=>{close();fromHash()});fromHash()}
