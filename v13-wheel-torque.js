/* Track Day Log V13: prompt for wheel-nut torque after each newly logged session */
(()=>{
window.openWheelTorquePrompt=function(did,sid){
  const d=db.days.find(x=>x.id===did),s=d?.sessions.find(x=>x.id===sid);
  if(!s)return;
  modalTitle.textContent='Wheel Nut Torque';
  modalBody.innerHTML=`<p style="font-size:18px;font-weight:800;margin:8px 0 6px">Torque-check the wheel nuts before the next session.</p><p class="small muted">Session ${esc(s.number||'')} is saved. Mark this once the wheel nuts have been checked.</p><div class="grid" style="margin-top:16px"><button class="btn" onclick="confirmWheelTorque('${did}','${sid}')">✓ Checked</button><button class="btn secondary" onclick="deferWheelTorque('${did}','${sid}')">Not yet</button></div>`;
  modal.showModal();
};
window.confirmWheelTorque=function(did,sid){
  const d=db.days.find(x=>x.id===did),s=d?.sessions.find(x=>x.id===sid);
  if(!s)return;
  s.wheelNutTorqueChecked=true;
  s.wheelNutTorqueCheckedAt=new Date().toISOString();
  modal.close();save();toast('Wheel nut torque checked');
};
window.deferWheelTorque=function(did,sid){
  const d=db.days.find(x=>x.id===did),s=d?.sessions.find(x=>x.id===sid);
  if(s){s.wheelNutTorqueChecked=false;s.wheelNutTorqueCheckedAt=null;save()}
  modal.close();toast('Wheel nut torque still to check');
};
const previousSaveSession=saveSession;
saveSession=function(did){
  const d=db.days.find(x=>x.id===did),before=d?.sessions?.length||0;
  previousSaveSession(did);
  if(!d||d.sessions.length<=before)return;
  const s=d.sessions[d.sessions.length-1];
  setTimeout(()=>openWheelTorquePrompt(did,s.id),80);
};
})();