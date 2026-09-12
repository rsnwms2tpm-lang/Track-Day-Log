/* Track Day Log V12: full recurring checklist editor */
(()=>{
function ensureChecklistTemplates(){
 if(!db.checklistTemplates){
  db.checklistTemplates={
   prep:[...prepDefault,...(db.customPrep||[])],
   preTrack:[...trackDefault,...(db.customTrack||[])],
   pack:[...packDefault,...(db.customPack||[])]
  };
  db.customPrep=[];db.customTrack=[];db.customPack=[];
  localStorage.setItem(KEY,JSON.stringify(db));
 }
 for(const k of ['prep','preTrack','pack'])if(!Array.isArray(db.checklistTemplates[k]))db.checklistTemplates[k]=[];
}
ensureChecklistTemplates();

const prevSettings=renderSettings;
renderSettings=function(){
 prevSettings();ensureChecklistTemplates();
 const card=[...settings.querySelectorAll('.card')].find(c=>c.querySelector('h3')?.textContent.trim()==='Custom checklist items');
 if(card){
  const total=db.checklistTemplates.prep.length+db.checklistTemplates.preTrack.length+db.checklistTemplates.pack.length;
  card.innerHTML=`<h3>Checklist items</h3><p class="small muted">Edit the full recurring lists used when you create a new track day.</p><div class="small muted" style="margin-bottom:10px">${db.checklistTemplates.prep.length} at home · ${db.checklistTemplates.preTrack.length} before track · ${db.checklistTemplates.pack.length} packing · ${total} total</div><button class="btn secondary" style="width:100%" onclick="openChecklistTemplateEditor()">Edit checklists</button>`;
 }
};

window.openChecklistTemplateEditor=function(){
 ensureChecklistTemplates();
 window._checklistDraft=structuredClone(db.checklistTemplates);
 modalTitle.textContent='Edit checklists';
 renderChecklistTemplateEditor();
 modal.showModal();
};
function listHtml(key,title,sub){
 const arr=window._checklistDraft[key]||[];
 return `<div class="card"><div class="row"><div><h3>${title}</h3><div class="small muted">${sub}</div></div><span class="pill">${arr.length}</span></div><div style="margin-top:10px">${arr.map((t,i)=>`<div class="row" style="align-items:center;margin-bottom:8px"><input value="${esc(t)}" onchange="editChecklistTemplateItem('${key}',${i},this.value)" aria-label="${esc(title)} item ${i+1}"><button class="btn danger smallbtn" style="flex:0 0 auto" onclick="removeChecklistTemplateItem('${key}',${i})">Remove</button></div>`).join('')||'<div class="small muted">No items yet.</div>'}</div><button class="btn secondary smallbtn" style="width:100%;margin-top:6px" onclick="addChecklistTemplateItem('${key}')">+ Add item</button></div>`;
}
window.renderChecklistTemplateEditor=function(){
 modalBody.innerHTML=`<p class="small muted">These are the master lists for future track days. Edit any wording, remove anything you do not want, or add your own.</p>${listHtml('prep','At home','Mechanical and safety preparation')}${listHtml('preTrack','Before going on track','Quick circuit checks')}${listHtml('pack','Packing','Things to bring')}<button class="btn" style="width:100%;margin-top:8px" onclick="saveChecklistTemplates()">Save checklist changes</button>`;
};
window.editChecklistTemplateItem=function(key,i,value){if(window._checklistDraft?.[key])window._checklistDraft[key][i]=value};
window.addChecklistTemplateItem=function(key){const t=prompt('Checklist item');if(!t?.trim())return;window._checklistDraft[key].push(t.trim());renderChecklistTemplateEditor()};
window.removeChecklistTemplateItem=function(key,i){window._checklistDraft[key].splice(i,1);renderChecklistTemplateEditor()};
window.saveChecklistTemplates=function(){
 for(const k of ['prep','preTrack','pack'])window._checklistDraft[k]=window._checklistDraft[k].map(x=>String(x).trim()).filter(Boolean);
 db.checklistTemplates=structuredClone(window._checklistDraft);
 db.customPrep=[];db.customTrack=[];db.customPack=[];
 modal.close();save();toast('Checklist templates updated');
};

saveDay=function(){
 ensureChecklistTemplates();
 if(!dtrack.value.trim()||!ddate.value)return toast('Add circuit and date');
 const mk=arr=>arr.map(t=>({id:id(),text:t,done:false}));
 db.days.push({id:id(),track:dtrack.value.trim(),layout:dlayout.value.trim(),date:ddate.value,carId:dcar.value,organiser:dorg.value.trim(),eventType:dtype.value,startColdF:dstartf.value,startColdR:dstartr.value,startFuel:dfuel.value,conditions:dconditions.value,weather:dweather.value.trim(),prep:mk(db.checklistTemplates.prep),preTrack:mk(db.checklistTemplates.preTrack),pack:mk(db.checklistTemplates.pack),sessions:[],jobs:[],finished:false});
 modal.close();save();nav('home');toast('Track day created');
};
render();
})();