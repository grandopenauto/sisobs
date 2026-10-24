'use strict';
(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const closeMenu = () => {
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  }
  const flows = {
    leads: {label:'REVENUE',title:'Every real inquiry gets a clear next step.',
      description:'Connect an incoming request to qualification, appropriate follow-up, human review when needed, and a recorded result.',
      outcome:'A qualified next step is confirmed and tracked.',
      stages:[['Capture inquiry','Receive & record'],['Qualify context','Rules + intelligence'],['Route follow-up','Authorized next step'],['Verify result','Log status']]},
    operations: {label:'SERVICE OPERATIONS',title:'From new request to completed work.',
      description:'Make a work order visible, identify the responsible team or system, request approval where necessary, and verify closeout.',
      outcome:'The job has a recorded owner, status, and completion evidence.',
      stages:[['Receive request','Intake & scope'],['Assign ownership','Skills + capacity'],['Track execution','Escalate exceptions'],['Confirm closeout','Evidence & receipt']]},
    backoffice: {label:'BACK OFFICE',title:'Put routine administration on a dependable path.',
      description:'Coordinate documents, validation, approvals, and records so repetitive internal tasks stop living only in someone’s inbox.',
      outcome:'Approved records move forward, and exceptions remain visible.',
      stages:[['Collect records','Files & requests'],['Check inputs','Validation rules'],['Request approval','Human when needed'],['Record outcome','Verified update']]}
  };
  const buttons = Array.from(document.querySelectorAll('[data-scenario]'));
  const title = document.getElementById('flow-title');
  const description = document.getElementById('flow-description');
  const label = document.getElementById('flow-label');
  const outcome = document.getElementById('flow-outcome');
  const stageHolder = document.getElementById('flow-nodes');
  const render = key => {
    const flow = flows[key]; if (!flow || !title || !stageHolder) return;
    title.textContent=flow.title; description.textContent=flow.description; label.textContent=flow.label; outcome.textContent=flow.outcome;
    stageHolder.replaceChildren();
    flow.stages.forEach(([name,sub],idx) => {
      const node = document.createElement('div'); node.className='flow-node';
      const number = document.createElement('span'); number.textContent=String(idx+1).padStart(2,'0');
      const strong = document.createElement('strong'); strong.textContent=name;
      const small = document.createElement('small'); small.textContent=sub;
      node.append(number,strong,small); stageHolder.appendChild(node);
      if(idx<flow.stages.length-1){const arrow=document.createElement('div');arrow.className='flow-connector';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';stageHolder.appendChild(arrow);}
    });
    buttons.forEach(b=>{const active=b.dataset.scenario===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  };
  buttons.forEach(b=>b.addEventListener('click',()=>render(b.dataset.scenario)));
  const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
})();