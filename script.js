const story=[
 {t:'Wi Come From The Hill',p:'Before the chapters and reunions, there was the place that helped shape us.',l:'From Mandeville wid love — di Hill still call we home.',rt:'Where The Story Took Root',rp:'Campus days gave us lessons, laughter and memories that travelled far beyond Mandeville.',rl:'No matter how far we roam, a piece of di Hill travel wid we.',a:[120,59,132,14],b:[30,67,101,36,145,78]},
 {t:'Old Friends, Same Sweet Spirit',p:'The years move on, but some friendships pick up exactly where they left off.',l:'Long time we nuh see — but di love never lef’!',rt:'Friendship Never Retires',rp:'A familiar smile can bring back a whole season of life in one beautiful moment.',rl:'One likkle reunion and is pure story, joke an’ laughter again.',a:[49,96,73,17],b:[134,55,8,137,74,151]},
 {t:'Faith Carry We Through',p:'Worship, fellowship and shared faith remain part of the NCU story wherever alumni gather.',l:'God good, all di time. From di Hill straight through.',rt:'Rooted In Faith',rp:'Across the years, prayer, praise and fellowship have remained a steady thread between us.',rl:'Through every season, we still know who keep we.',a:[12,45,88,22],b:[105,61,107,25,109,150]},
 {t:'Look Pon We Now!',p:'A little style, plenty smiles, and the unmistakable joy of being together again.',l:'Everybody clean, everybody nice — NCU family show up!',rt:'Still Looking Sharp',rp:'The years may change the calendar, but the NCU spirit still knows how to make an entrance.',rl:'Age is just number — di style still deh yah!',a:[5,7,11,23],b:[80,6,82,47,84,131]},
 {t:'Big Up Di NCU Family',p:'Every face carries a story; together they make a legacy that stretches far beyond campus.',l:'Nuff love fi di ones who carry di Hill wherever dem go.',rt:'A Legacy In Every Face',rp:'Each graduate carried something from NCU into family, community, service and the wider world.',rl:'From one generation to di next, di legacy keep growing.',a:[35,3,126,10],b:[79,28,77,116,86,43]},
 {t:'Come, Mek We Reason',p:'Around a table, after worship or at a celebration, fellowship has always made room for one more.',l:'Pull up a chair. Food, story and laughter always deh yah.',rt:'Good Company, Sweet Memories',rp:'Some of the best memories live in the conversations between the official moments.',rl:'When good people gather, time move too fast.',a:[9,16,29,33],b:[110,52,112,19,114,146]},
 {t:'From Jamaica To Jersey',p:'The island may be miles away, but heritage, humor and hospitality travel beautifully.',l:'Yard inna we heart, Jersey under we feet.',rt:'Carrying Home With Us',rp:'New places became home without replacing the culture, values and warmth we brought with us.',rl:'You can leave Yard, but Yard never really leave you.',a:[147,89,41,149],b:[124,63,127,26,129,154]},
 {t:'Still Connected, Still Growing',p:'New memories keep joining the old ones — proof that the alumni family is still writing its story.',l:'Same roots. New chapters. One NCU family.',rt:'The Story Continues',rp:'Every gathering adds another page to a connection that has already lasted for decades.',rl:'Plenty more memories still fi make.',a:[128,153,46,70],b:[140,57,1,31,144,103]},
 {t:'Love From The Hill',p:'For the friendships, the faith, the laughter and the place that still feels like home.',l:'Walk good, stay blessed, an’ carry di love with yuh.',rt:'Until We Meet Again',rp:'The album may reach its final chapter, but the friendships and memories continue beyond these pages.',rl:'Tek care of unnu self — till we link up again.',a:[18,64,100,20,130],b:[21,75,24,119,27,152]}
];
const all=Array.from({length:155},(_,i)=>i);
// Distribute all 155 memories evenly across sixteen scrapbook pages so the final page stays full.
const pageCount=16, base=Math.floor(all.length/pageCount), extra=all.length%pageCount;
const galleryPages=[];let gp=0;for(let i=0;i<pageCount;i++){const take=base+(i<extra?1:0);galleryPages.push(all.slice(gp,gp+take));gp+=take}
const gallery=[];for(let i=0;i<galleryPages.length;i+=2)gallery.push({left:galleryPages[i],right:galleryPages[i+1]||[]});
const spreads=[...story.map(s=>({kind:'story',...s})),...gallery.map((g,i)=>({kind:'gallery',t:i===0?'Every Face, Every Memory':'More Love From The Hill',p:`The full NCU family collection · Memories shared with love`,a:g.left,b:g.right}))];
const left=document.querySelector('#leftPage'),right=document.querySelector('#rightPage'),turner=document.querySelector('#turner'),tf=document.querySelector('#turnFront'),tb=document.querySelector('#turnBack');let current=0,opened=false,busy=false;
function photo(n){return `photos/photo_${String(n).padStart(3,'0')}.jpg`}
function imgs(nums,cls=''){return `<div class="collage ${cls}">${nums.map(n=>`<img data-i="${n}" src="${photo(n)}" alt="NCU alumni memory">`).join('')}</div>`}
function storyPage(s,side){const nums=side==='left'?s.a:s.b;const title=side==='left'?s.t:s.rt;const prompt=side==='left'?s.p:s.rp;const lingo=side==='left'?s.l:s.rl;const si=story.indexOf(s);const safe=si>=0&&si<8?' story-safe story-'+(si+1):'';return `<div class="page${safe}"><h2 class="chapter">${title}</h2><div class="gold-rule"></div><p class="prompt">${prompt}</p><p class="patwa">“${lingo}”</p>${imgs(nums,nums.length>5?'six':nums.length===4?'four':'five')}<div class="corner-note">Love From The Hill <span class="tiny-flag"><i></i><i></i><i></i></span></div></div>`}
const memoryPhrases=[
 'Every picture holds a piece of the journey.',
 'Good memories never grow old — dem just get sweeter.',
 'From di Hill to wherever life carry we, the connection remains.',
 'A familiar face can bring back a whole chapter.',
 'Nuff years, nuff stories, same NCU love.',
 'Some moments pass; the love behind them stays.',
 'Look how far we come — and still we remember.',
 'Friends, fellowship and memories worth keeping close.',
 'Di years roll on, but these smiles still feel like yesterday.',
 'Every gathering adds another beautiful piece to the story.',
 'From old friends to new memories, the family keeps growing.',
 'One photo, one smile, one story at a time.',
 'The Hill gave us roots; life gave us chapters.',
 'Wherever we meet, a little piece of home shows up too.',
 'Still connected, still laughing, still making memories.',
 'Walk good, stay blessed, and carry these memories with you.'
];
function galleryPage(s,side){
 const nums=side==='left'?s.a:s.b;
 const spreadIdx=spreads.indexOf(s)-story.length;
 const pageIdx=spreadIdx*2+(side==='right'?1:0);
 const title=pageIdx===0?'Every Face, Every Memory':pageIdx===memoryPhrases.length-1?'Love That Lives On':'More Love From The Hill';
 const quote=memoryPhrases[pageIdx]||'Every memory is another piece of the NCU story.';
 return `<div class="page gallery-page"><h2 class="chapter">${title}</h2><div class="gold-rule"></div><p class="prompt">A scrapbook of faces, fellowship and moments we still carry with us.</p><p class="patwa">“${quote}”</p><div class="gallery-grid">${nums.map(n=>`<img data-i="${n}" src="${photo(n)}" alt="NCU alumni memory">`).join('')}</div></div>`
}
function renderPage(s,side){return s.kind==='gallery'?galleryPage(s,side):storyPage(s,side)}
function renderSpread(idx){const s=spreads[idx];left.innerHTML=renderPage(s,'left');right.innerHTML=renderPage(s,'right');bindImages();updateControls()}
function bindImages(){document.querySelectorAll('.paper img,.turn-face img').forEach(img=>img.onclick=e=>{e.stopPropagation();document.querySelector('#modalImg').src=img.src;document.querySelector('#modal').classList.add('show')})}
const albumMusic=document.querySelector('#albumMusic');
const musicToggle=document.querySelector('#musicToggle');
function syncMusicButton(){const playing=!albumMusic.paused;musicToggle.textContent=playing?'❚❚ PAUSE MUSIC':'▶ PLAY MUSIC';musicToggle.setAttribute('aria-pressed',String(playing))}
function startAlbumMusic(){albumMusic.volume=.55;const attempt=albumMusic.play();if(attempt&&attempt.catch)attempt.catch(()=>syncMusicButton());syncMusicButton()}
function toggleMusic(){if(albumMusic.paused){const attempt=albumMusic.play();if(attempt&&attempt.catch)attempt.catch(()=>{});}else albumMusic.pause();syncMusicButton()}
function openBook(){if(opened)return;opened=true;startAlbumMusic();document.querySelector('#spread').classList.remove('hidden');renderSpread(0);document.querySelector('#coverOverlay').classList.add('opened');setTimeout(()=>{document.querySelector('#underbar').classList.remove('hidden');document.querySelector('#cornerPrev').classList.remove('hidden');document.querySelector('#cornerNext').classList.remove('hidden')},850)}
function turn(dir){if(!opened||busy)return;const target=current+dir;if(target<0||target>=spreads.length)return;busy=true;const old=spreads[current],neu=spreads[target];turner.className='turner';if(dir>0){tf.innerHTML=renderPage(old,'right');tb.innerHTML=renderPage(neu,'left');right.innerHTML=renderPage(neu,'right');turner.classList.add('forward')}else{turner.style.left='0';turner.style.right='auto';tf.innerHTML=renderPage(old,'left');tb.innerHTML=renderPage(neu,'right');left.innerHTML=renderPage(neu,'left');turner.classList.add('backward')}bindImages();setTimeout(()=>{current=target;renderSpread(current);turner.className='turner';turner.style.left='';turner.style.right='';tf.innerHTML='';tb.innerHTML='';busy=false},1060)}
function updateControls(){document.querySelector('#cornerPrev').disabled=!opened||current===0;document.querySelector('#cornerNext').disabled=!opened||current===spreads.length-1;document.querySelector('#counter').textContent=!opened?'COVER':`SPREAD ${current+1} / ${spreads.length}`}
function goHome(){if(busy)return;opened=false;current=0;['underbar','cornerPrev','cornerNext'].forEach(id=>document.querySelector('#'+id).classList.add('hidden'));document.querySelector('#coverOverlay').classList.remove('opened');setTimeout(()=>document.querySelector('#spread').classList.add('hidden'),500);updateControls()}
document.querySelector('#openBook').onclick=e=>{e.stopPropagation();openBook()};document.querySelector('#coverOverlay').onclick=openBook;document.querySelector('#cornerNext').onclick=e=>{e.stopPropagation();turn(1)};document.querySelector('#cornerPrev').onclick=e=>{e.stopPropagation();turn(-1)};document.querySelector('#home').onclick=goHome;musicToggle.onclick=e=>{e.stopPropagation();toggleMusic()};albumMusic.addEventListener('play',syncMusicButton);albumMusic.addEventListener('pause',syncMusicButton);right.onclick=e=>{if(e.target.tagName!=='IMG')turn(1)};left.onclick=e=>{if(e.target.tagName!=='IMG')turn(-1)};
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')turn(1);if(e.key==='ArrowLeft')turn(-1);if(e.key==='Home')goHome();if(e.key==='Escape')document.querySelector('#modal').classList.remove('show')});document.querySelector('#close').onclick=()=>document.querySelector('#modal').classList.remove('show');document.querySelector('#modal').onclick=e=>{if(e.target.id==='modal')e.currentTarget.classList.remove('show')};updateControls();
