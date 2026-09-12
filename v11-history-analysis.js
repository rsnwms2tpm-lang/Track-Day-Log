/* Track Day Log V11: analysis belongs with finished track days */
(()=>{
const prevHome=renderHome;
renderHome=function(){prevHome();document.getElementById('analyseDayBtn')?.remove()};
const prevDays=renderDays;
renderDays=function(){prevDays();for(const d of db.days||[]){if(!d.finished)continue;const open=[...document.querySelectorAll('#days button')].find(b=>b.getAttribute('onclick')===`openDayDetail('${d.id}')`);if(!open)continue;const actions=open.parentElement;if(actions&&![...actions.querySelectorAll('button')].some(b=>b.textContent.trim()==='Analyse')){const b=document.createElement('button');b.className='btn secondary smallbtn';b.textContent='Analyse';b.style.marginRight='6px';b.onclick=()=>openDayAnalysis(d.id);actions.insertBefore(b,open)}}};
render();
})();