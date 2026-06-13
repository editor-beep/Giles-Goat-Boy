/* ==========================================================================
   The Revised New Syllabus Companion — engine
   --------------------------------------------------------------------------
   State, persistence, the register / spoiler / instructor systems, the modal
   and ID-card, the router and core views (Matriculation, Assignment, Module,
   Catalogue, Finals, Posttape), the Belly examination, and boot.
   Study-Hall tools live in features.js and are reached through the router.
   ========================================================================== */
"use strict";
window.RNS = window.RNS || {};

/* ----- small helpers ----------------------------------------------------- */
RNS.util = {
  escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); },
  el(html){ const t=document.createElement("template"); t.innerHTML=String(html).trim(); return t.content.firstElementChild; },
  shuffled(n){ const a=[...Array(n).keys()]; for(let i=n-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; },
  stripHtml(html){ const d=document.createElement("div"); d.innerHTML=html; return (d.textContent||"").replace(/\s+/g," ").trim(); }
};
const U = RNS.util;
const $ = sel => document.querySelector(sel);

/* ----- state ------------------------------------------------------------- */
const STORE_KEY = "rns-companion-v2";
const REDUCED = (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || false;
const defaultState = {
  matriculated:false, name:"",
  signed:[false,false,false,false,false,false,false],
  finalsPassed:false, idPresented:false,
  register:"voice", spoilers:true, instructor:false,
  bleats:0, brayShown:[], cards:{}
};
RNS.state = loadState();
function loadState(){
  try{ const raw=localStorage.getItem(STORE_KEY); if(!raw) return {...defaultState};
    return {...defaultState, ...JSON.parse(raw)}; }
  catch(e){ return {...defaultState}; }
}
RNS.save = function(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(RNS.state)); }catch(e){} };

const signedCount = ()=>RNS.state.signed.filter(Boolean).length;
const allSigned = ()=>signedCount()===7;
const studentName = ()=>RNS.state.name.trim() || "Candidate Bocksfuss";

/* ----- register (voice / plain) + spoilers ------------------------------- */
RNS.reg = (voice, plain)=> RNS.state.register==="plain" ? plain : voice;
RNS.spoilerGate = function(html, opts={}){
  if(RNS.state.spoilers) return html;
  const label = opts.label || "Reveal (contains spoilers)";
  return `<details class="spoiler-shutter"><summary>${U.escapeHtml(label)}</summary><div class="spoiler-inner">${html}</div></details>`;
};

/* ----- toast ------------------------------------------------------------- */
let toastTimer=null;
RNS.toast = function(msg, ms=3600){
  const t=$("#toast"); if(!t) return;
  t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"), ms);
};

/* ----- modal ------------------------------------------------------------- */
function showModal(html, opts={}){
  const root=$("#modal-root"); root.innerHTML="";
  const overlay=U.el(`<div class="overlay" role="dialog" aria-modal="true"><div class="modal">${html}</div></div>`);
  root.appendChild(overlay);
  const focusables=()=>overlay.querySelectorAll("button, a[href], input, [tabindex]:not([tabindex='-1'])");
  (focusables()[0]||overlay).focus();
  overlay.addEventListener("keydown", e=>{
    if(e.key==="Escape" && opts.dismissible!==false) closeModal();
    if(e.key==="Tab"){
      const f=[...focusables()]; if(!f.length) return;
      const i=f.indexOf(document.activeElement);
      if(e.shiftKey && i<=0){ e.preventDefault(); f[f.length-1].focus(); }
      else if(!e.shiftKey && i===f.length-1){ e.preventDefault(); f[0].focus(); }
    }
  });
  return overlay;
}
function closeModal(){ $("#modal-root").innerHTML=""; }

/* ----- the Publisher's Disclaimer gate (first run) ----------------------- */
function showDisclaimer(){
  const overlay = showModal(`
    <p class="kicker">Before anything else</p>
    <h2>Publisher's Disclaimer</h2>
    <p class="smallprint">The Publisher, having circulated this Companion among four editors, reproduces their reports
    below and declines responsibility for them, for the Companion, and for declining responsibility.</p>
    <div class="editor-report"><b>Editor A:</b> Against. The author of record is a computer; the hero is a goat; the
    subject is a novel of seven hundred pages the public has had sixty years to read and largely hasn't. Publication
    would embarrass the house and, worse, might succeed.</div>
    <div class="editor-report"><b>Editor B:</b> For. It is presumptuous, derivative, and weirdly sincere — that is,
    faithful to its original. Also it is short, which the original is not. We may charge for the difference.</div>
    <div class="editor-report"><b>Editor C:</b> I resign. Not over this Companion exactly; over what reading the novel
    twice has done to my certainty about who writes anything.</div>
    <div class="editor-report"><b>Editor D:</b> For, with the caution that the thing can discuss the whole plot,
    endings included, and that the novel it teaches contains sexual violence and racial caricature, which the Companion
    addresses critically rather than omits. Let the Candidate be told at the gate. (Candidate: you have now been told at
    the gate.)</div>
    <p>One question before you matriculate, so the Companion can fold or unfold its spoilers accordingly:</p>
    <p class="gate-q"><strong>Are you meeting <cite>Giles Goat-Boy</cite> for the first time, or returning to it?</strong></p>
    <div class="btn-row">
      <button class="btn" id="gate-first">First time — keep the big spoilers folded</button>
      <button class="btn" id="gate-fan">I know the book — show me everything</button>
    </div>
    <p class="smallprint">Either way you can flip spoilers (and switch between the in-character voice and plain English)
    anytime, up in the masthead. Or you may <button class="btn danger" id="gate-reject" style="font-size:.8rem;padding:.25em .7em">flunk all this</button>.</p>
  `, {dismissible:false});
  const enter = (spoilers)=>{
    RNS.state.matriculated=true; RNS.state.spoilers=spoilers; RNS.save(); closeModal(); syncMasthead();
    RNS.toast(`Welcome to New Tammany College, ${studentName()}. Your Assignment awaits.`);
    RNS.go("assignment");
  };
  overlay.querySelector("#gate-first").addEventListener("click", ()=>enter(false));
  overlay.querySelector("#gate-fan").addEventListener("click", ()=>enter(true));
  overlay.querySelector("#gate-reject").addEventListener("click", ()=>{
    overlay.querySelector(".modal").innerHTML = `
      <h2>The Dean o' Flunks Commends You</h2>
      <p>Wisely flunked, friend! Why pass, when failure asks nothing and delivers it promptly? Stay; be comfortable;
      learn nothing. The hammock is eternal.</p>
      <p class="smallprint">…and yet the Gate stands open. It always does. That is the trouble with Gates.</p>
      <div class="btn-row"><button class="btn" id="gate-repent">Repent &amp; Matriculate</button></div>`;
    const r=overlay.querySelector("#gate-repent");
    r.addEventListener("click", ()=>enter(false)); r.focus();
  });
}

/* ----- Bray's unsolicited certifications --------------------------------- */
function maybeBray(itemIdx){
  const triggers={1:"first",4:"second"};
  if(!(itemIdx in triggers) || RNS.state.brayShown.includes(itemIdx)) return;
  RNS.state.brayShown.push(itemIdx); RNS.save();
  const overlay=showModal(`
    <p class="kicker">Unsolicited</p>
    <h2>CERTIFICATION</h2>
    <p><em>Know all studentdom by these presents</em> that the bearer, <strong>${U.escapeHtml(studentName())}</strong>,
    is hereby Certified a Candidate for Graduation, Commencement, Tenure, Sainthood, and Whatever Else May Be Going, on
    the grounds that Certification is my pleasure and costs me nothing.</p>
    <p style="text-align:right;font-style:italic">— Harold Bray, Grand Tutor (self-styled), ${triggers[itemIdx]} appearance</p>
    <p class="smallprint">${RNS.reg(
      "A note from WESCAC: this is what Bray does all novel long — passes everyone, asks nothing, means nothing. Notice how pleasant it feels anyway. That feeling is the lesson; distrust it.",
      "Note: this is exactly what Bray does throughout the novel — he certifies everyone, demands nothing, and it means nothing. Notice that it still feels good. That feeling is the point.")}</p>
    <div class="btn-row">
      <button class="btn secondary" id="bray-accept">Accept (it means nothing)</button>
      <button class="btn danger" id="bray-unmask">Unmask him (it still means nothing)</button>
    </div>
  `);
  overlay.querySelector("#bray-accept").addEventListener("click", ()=>{ closeModal(); RNS.toast("The diploma smells faintly of goat. You file it anyway."); });
  overlay.querySelector("#bray-unmask").addEventListener("click", ()=>{ closeModal(); RNS.toast("Beneath the mask: another mask. He flaps off belfry-ward, Certifying as he goes."); });
}

/* ----- core views -------------------------------------------------------- */
const VIEWS = {
  home(){ return `
    <p class="kicker">Matriculation Office</p>
    <h2>What This Is</h2>
    <p>A study companion to <strong>John Barth's <cite>Giles Goat-Boy; or, The Revised New Syllabus</cite> (1966)</strong>:
    the tale of a boy raised as a goat who sets out to become Grand Tutor — messiah — of a University that is the
    universe, in a testament allegedly composed by a computer. It is one of the strangest and most ambitious American
    novels of its century, and it is famously hard to start. This Companion gets you started, keeps you oriented, and
    hands you back to the book.</p>
    <p>It teaches the novel <em>in the novel's own manner</em>: you matriculate; you work the Goat-Boy's seven-item
    Assignment (each item is a lesson on one face of the book); your ID-card collects signatures; and when all seven are
    signed you may descend into WESCAC's Belly to attempt the Finals. Beyond the Assignment, the <strong>Study Hall</strong>
    holds six deeper tools — a plot timeline, vocabulary flashcards, a hero-pattern scorecard, the Taliped/Oedipus
    walkthrough, a doctrine simulator, and an instructor's prompt sheet.</p>
    <div class="notice"><strong>For first-timers and long-time fans both.</strong> Two switches up in the masthead tune
    the Companion to you: <strong>Voice / Plain</strong> swaps the in-character campus idiom for direct plain English, and
    <strong>Spoilers</strong> folds or unfolds the passages that give away the ending. ${
      RNS.state.spoilers ? "Right now spoilers are <strong>shown</strong>." : "Right now major spoilers are <strong>folded</strong> behind reveal shutters."}</div>
    <h3>How to proceed</h3>
    <p>Open <strong>The Assignment</strong> and take the items in order (they build), or wander. Consult
    <strong>The Catalogue</strong> whenever a campus term baffles you, and drill it in <strong>Study Hall → Flashcards</strong>.
    Your progress lives in this browser, on your ID-card.</p>
    <details>
      <summary>Cover-letter to the Editors and Publisher (on the provenance of this Companion)</summary>
      <p>Gentles: the repository, when we found it, contained a single file, <code>index.html</code>, and the file was
      blank — one line, no characters. A young man who signed himself <em>Stoker Giles</em> assures us this blankness was
      not an oversight but a first draft of everything, awaiting revision. We have revised it. Whether what follows is the
      file's true content or only ours, we decline, in the tradition, to say. — The Eds.</p>
    </details>
    <div class="btn-row">
      <button class="btn" data-go="assignment">Open the Assignment</button>
      <button class="btn secondary" data-go="studyhall">Enter the Study Hall</button>
      <button class="btn secondary" data-go="catalogue">Browse the Catalogue</button>
    </div>
    <p class="smallprint">To begin again from nothing (the file's original state), you may
    <button class="btn danger" id="btn-reset" style="font-size:.85rem;padding:.3em .8em">Rematriculate</button> —
    this erases your signatures, your name, and your flashcard progress. The Dean o' Flunks approves.</p>
  `;},

  assignment(){
    const items = RNS.MODULES.map((m,i)=>`
      <li class="${RNS.state.signed[i]?"signed":""}">
        <span class="num" aria-hidden="true">${i+1}</span>
        <span class="grow"><strong>${U.escapeHtml(m.title)}</strong><br><span class="smallprint">${U.escapeHtml(m.subtitle)}</span></span>
        ${RNS.state.signed[i]?`<span class="stamp">&#10003; signed</span>`:""}
        <button class="btn secondary" data-module="${i}">${RNS.state.signed[i]?"Revisit":"Begin"}</button>
      </li>`).join("");
    return `
      <p class="kicker">From WESCAC, for the Candidate ${U.escapeHtml(studentName())}</p>
      <h2>The Assignment</h2>
      <blockquote>To Be Done At Once, In No Time</blockquote>
      <p>${RNS.reg(
        "Seven items, as the Goat-Boy received them from the Scapegoat Grate. Each is a lesson on one face of the novel; each ends with a single question, and a correct answer signs that item on your ID-card. Sign all seven and the way to the Finals opens. George worked the list three times under three doctrines before it came right; you are permitted the same patience.",
        "Seven tasks, the same seven George is given in the novel. Each is a lesson on one aspect of the book and ends with one question; answer it correctly to sign that item on your ID-card. Sign all seven to unlock the Finals. (In the novel George works through the whole list three times before he understands it.)")}</p>
      <ol class="module-list" style="list-style:none">${items}</ol>
      <p class="smallprint">${allSigned()
        ? "All seven items are signed. The Belly is open to you, Candidate. (See: The Finals.)"
        : `Signed: ${signedCount()} of 7. The Finals remain sealed until the card is full.`}</p>
    `;
  },

  module(i){
    const m=RNS.MODULES[i];
    const done=RNS.state.signed[i];
    const lessonHtml = RNS.reg(m.lesson.voice, m.lesson.plain);
    const opts=U.shuffled(m.quiz.options.length).map(j=>`
      <label><input type="radio" name="q" value="${j}"> ${U.escapeHtml(m.quiz.options[j])}</label>`).join("");
    const quizFs = `
      <fieldset class="quiz">
        <legend>Sign this item</legend>
        ${done?`<p class="verdict pass">&#10003; Already signed. (You may answer again for the pleasure of it.)</p>`:""}
        <p><strong>${U.escapeHtml(m.quiz.q)}</strong></p>
        ${opts}
        <div class="btn-row" style="margin:.6rem 0 0"><button class="btn" id="quiz-submit">Submit to WESCAC</button></div>
        <p class="verdict" id="quiz-verdict" aria-live="polite"></p>
      </fieldset>`;
    const chips = `<p class="chips" aria-label="Catalogue cross-references">${m.refs.map(r=>`<span>${U.escapeHtml(r)}</span>`).join("")}</p>`;
    const gated = RNS.spoilerGate(lessonHtml + chips + quizFs, {label:`Reveal lesson ${i+1} (full spoilers for this part of the book)`});
    const tape = ("speechSynthesis" in window) ? `
      <div class="tape-deck" id="tape-deck">
        <button class="btn secondary" id="tape-play" aria-pressed="false">&#9654; Read this lesson aloud</button>
        <button class="btn secondary" id="tape-stop" disabled>&#9632; Stop</button>
        <span class="smallprint">Tape mode &middot; the R.N.S. was, after all, a recording.</span>
      </div>` : "";
    const instructorBlock = RNS.state.instructor ? `
      <div class="instructor-inline">
        <p class="kicker">Instructor</p>
        <p><strong>Discussion</strong></p>
        <ul>${m.discussion.map(q=>`<li>${U.escapeHtml(q)}</li>`).join("")}</ul>
        <p><strong>Essay prompts</strong></p>
        <ul>${m.essay.map(q=>`<li>${U.escapeHtml(q)}</li>`).join("")}</ul>
      </div>` : "";
    return `
      <p class="kicker">Assignment item the ${m.ordinal}</p>
      <h2>${i+1}. ${U.escapeHtml(m.title)}</h2>
      <p><em>${U.escapeHtml(m.subtitle)}</em></p>
      <div class="notice">${U.escapeHtml(m.meaning)}</div>
      <blockquote class="epigraph">&ldquo;${U.escapeHtml(m.quote.text)}&rdquo;<span class="cite"> — ${m.quote.note}; ${RNS.CITE}</span></blockquote>
      ${tape}
      ${gated}
      ${instructorBlock}
      <div class="btn-row">
        <button class="btn secondary" data-go="assignment">&larr; Back to the Assignment</button>
        ${i<6?`<button class="btn secondary" data-module="${i+1}">Next item &rarr;</button>`:`<button class="btn secondary" data-go="finals">To the Finals &rarr;</button>`}
      </div>
    `;
  },

  catalogue(){
    const extra = RNS.state.bleats>=3 ? [["Capra hircus","The domestic goat","you, possibly, at heart"]] : [];
    const rows = RNS.CATALOGUE.concat(extra)
      .map(([t,c,w])=>`<tr><td><strong>${U.escapeHtml(t)}</strong></td><td>${U.escapeHtml(c)}</td><td>${U.escapeHtml(w)}</td></tr>`).join("");
    return `
      <p class="kicker">The Library &middot; Sub-Archives</p>
      <h2>The Catalogue</h2>
      <p>${RNS.reg(
        "The campus idiom, term by term. The left column is the novel's word; the middle, what it denotes on campus; the right, its echo in the world you (allegedly) come from. The mapping is the joke — and the joke is serious.",
        "A glossary of the novel's invented campus vocabulary. Left: the book's word. Middle: what it means within the story. Right: the real-world thing it stands for.")}</p>
      <p class="smallprint">Want to memorize these? Drill them in <button class="btn secondary" data-go="flashcards" style="font-size:.8rem;padding:.2em .6em">Flashcards</button>.</p>
      <label for="cat-filter" class="smallprint">Filter the Catalogue:</label>
      <input id="cat-filter" class="text-input" placeholder="e.g. WESCAC, goat, Bray…">
      <table>
        <thead><tr><th>Term</th><th>On campus</th><th>In your world</th></tr></thead>
        <tbody id="cat-body">${rows}</tbody>
      </table>
    `;
  },

  finals(){
    if(!allSigned()){
      return `
        <p class="kicker">Below Tower Hall</p>
        <h2>The Finals</h2>
        <p>A riveted hatch, goat-warm to the touch, and stenciled on it:</p>
        <blockquote>NO CANDIDATE DESCENDS WHOSE CARD WANTS SIGNATURES.<br>SIGNED: ${signedCount()} OF 7. WESCAC IS PATIENT. WESCAC IS NOT THAT PATIENT.</blockquote>
        <p>Complete the seven items of <strong>The Assignment</strong> and the hatch will know.</p>
        <div class="btn-row"><button class="btn" data-go="assignment">To the Assignment</button></div>`;
    }
    return `
      <p class="kicker">Below Tower Hall</p>
      <h2>The Finals</h2>
      <p>The hatch stands open. Below: the <strong>Belly of WESCAC</strong>, where Candidates are examined by the only
      examiner with no outside. The questions are few and capitalized. The last one cannot be answered the way the machine
      appears to want — remember the sixth module, and what the third answer was <em>not</em>. You may rehearse first in
      <button class="btn secondary" data-go="doctrines" style="font-size:.85rem;padding:.25em .7em">the Three Doctrines</button>.</p>
      <div class="notice warn smallprint">The Belly is dark, monospaced, and mildly dramatic. No actual EATing occurs.
      ${RNS.state.finalsPassed?"You have passed before; descend again freely, for the pleasure of the dark.":""}</div>
      <div class="btn-row"><button class="btn danger" id="btn-descend">Descend</button></div>
    `;
  },

  posttape(){
    if(!RNS.state.finalsPassed){
      return `
        <p class="kicker">Restricted reel</p>
        <h2>Posttape</h2>
        <p>The Sub-Archivist regrets: this reel is released only to those who have been through the Belly. Pass the
        <strong>Finals</strong> and return.</p>
        <div class="btn-row"><button class="btn" data-go="finals">To the Finals</button></div>`;
    }
    const presented = RNS.state.idPresented;
    return `
      <p class="kicker">The last reel${presented?"":" · one formality remains"}</p>
      <h2>Posttape</h2>
      <p>So, Candidate: passed, and (the stamp was clear) failed, and passed. You have what this Companion can give —
      which the Companion is required, on its last reel, to appraise honestly: <strong>a map is not a territory, a
      syllabus is not a Tutor, and a companion is, at its smiling worst, a Bray</strong>, certifying cheaply what only the
      long book itself can teach dearly. The difference between knowing the three answers and having read them happen to
      George is the difference between a diploma and an education; the campus is littered with the first.</p>
      <p>Therefore the Posttape's one commandment: <strong>close this tape and open the novel.</strong> Seven hundred
      pages, two volumes, reels uncounted; bring patience, and forgive it its decade where you can. Read it twice — once
      for the joke, once for the grief — and when studentdom asks you what it was like, answer as the third answer
      answers: not with either button.</p>
      ${presented ? `
        <p>Your ID-card is signed, presented, accepted. There is nothing further. There was never going to be a ceremony;
        the ceremony was the reading. Go in Passage, Candidate — and mind the Gate on your way out, it sticks.</p>
      ` : `
        <p>One formality remains. Item the seventh, in full: <em>present your ID-card, appropriately signed, to the proper
        authority.</em> Your card is signed. The authority question the novel left with the reader, and this Companion can
        do no better. Present it, then — to the only authority in the room.</p>
        <div class="btn-row"><button class="btn" id="btn-present">Present ID-card to the Proper Authority</button></div>
      `}
      <hr>
      <h3>Postscript to the Posttape</h3>
      <p class="smallprint">The Editors doubt the authenticity of the foregoing Posttape. Its tone is suspiciously kind,
      and the original George, we are advised, was never once heard to apologize for a length.</p>
      <h3>Footnote to the Postscript to the Posttape</h3>
      <p class="smallprint">The Editors are themselves an invention of this Companion. The one verifiable fact in the whole
      apparatus is this: the file you are reading was, when discovered, <strong>blank</strong> — one line, no characters.
      Whether what it now contains is a revision, a restoration, or a usurpation, the Sub-Archivist declines to say. He
      declines almost everything. —Ed.</p>
      ${certificateHtml()}
      <div class="btn-row"><button class="btn secondary" id="btn-print">Print the Certification</button></div>
    `;
  }
};

function certificateHtml(){
  return `
  <div class="certificate" role="img" aria-label="Certificate of Candidacy">
    <h3>New Tammany College</h3>
    <p style="margin:.2rem 0">By authority of nobody, and by these presents, WESCAC certifies that</p>
    <p class="name">${U.escapeHtml(studentName())}</p>
    <p style="margin:.4rem 0">has completed the <strong>Revised New Syllabus Companion</strong>, descended into the
    Belly, declined both buttons, and is hereby declared</p>
    <p style="font-variant:small-caps;font-size:1.2rem;margin:.3rem 0">Candidate for Graduation</p>
    <p class="passfail">PASS ALL FAIL ALL</p>
    <div class="sigs">
      <span class="sig">WESCAC, Tutor of Record</span>
      <span class="sig">H. Bray, G.T. (unsolicited)</span>
      <span class="sig">The Proper Authority (you)</span>
    </div>
    <p class="smallprint" style="margin-top:1rem">Valid everywhere the University extends. Void where prohibited;
    prohibited nowhere; therefore valid. Confers nothing but what the reading conferred.</p>
  </div>`;
}

/* ----- Tape mode (speech synthesis) -------------------------------------- */
let tapeUtterance=null;
function wireTape(i){
  if(!("speechSynthesis" in window)) return;
  const playBtn=$("#tape-play"), stopBtn=$("#tape-stop");
  if(!playBtn) return;
  const m=RNS.MODULES[i];
  const text = m.meaning + " " + U.stripHtml(RNS.reg(m.lesson.voice, m.lesson.plain));
  const stop = ()=>{ window.speechSynthesis.cancel(); playBtn.setAttribute("aria-pressed","false"); playBtn.innerHTML="&#9654; Read this lesson aloud"; stopBtn.disabled=true; };
  playBtn.addEventListener("click", ()=>{
    if(window.speechSynthesis.speaking && !window.speechSynthesis.paused){
      window.speechSynthesis.pause(); playBtn.innerHTML="&#9654; Resume"; return;
    }
    if(window.speechSynthesis.paused){ window.speechSynthesis.resume(); playBtn.innerHTML="&#10073;&#10073; Pause"; return; }
    tapeUtterance=new SpeechSynthesisUtterance(text);
    tapeUtterance.rate=0.97; tapeUtterance.onend=stop;
    window.speechSynthesis.speak(tapeUtterance);
    playBtn.setAttribute("aria-pressed","true"); playBtn.innerHTML="&#10073;&#10073; Pause"; stopBtn.disabled=false;
  });
  stopBtn.addEventListener("click", stop);
}

/* ----- router ------------------------------------------------------------ */
const TABS=[
  ["home","Matriculation"], ["assignment","The Assignment"], ["catalogue","The Catalogue"],
  ["studyhall","Study Hall"], ["finals","The Finals"], ["posttape","Posttape"]
];
const FEATURE_VIEWS=["studyhall","reels","flashcards","hero","taliped","doctrines","instructor"];
let current={view:"home", arg:null};

RNS.go = function(view, arg=null){
  current={view,arg};
  if(document.body.classList.contains("belly")){ window.speechSynthesis && window.speechSynthesis.cancel(); document.body.classList.remove("belly"); }
  location.hash = view==="module" ? `#/module/${arg+1}` : `#/${view}`;
  render();
};

function render(){
  const main=$("#main");
  const v=current.view;
  if(v==="module"){ main.innerHTML=VIEWS.module(current.arg); }
  else if(VIEWS[v]){ main.innerHTML=VIEWS[v](); }
  else if(RNS.features[v]){ main.innerHTML=RNS.features[v].render({}); }
  else { current={view:"home",arg:null}; main.innerHTML=VIEWS.home(); }

  renderTabs(); renderIdCard(); syncMasthead();
  main.scrollTop=0; window.scrollTo && window.scrollTo(0,0);

  // generic nav wiring
  main.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>RNS.go(b.dataset.go)));
  main.querySelectorAll("[data-module]").forEach(b=>b.addEventListener("click",()=>RNS.go("module", +b.dataset.module)));

  // view-specific wiring
  if(v==="home") wireHome();
  else if(v==="module"){ wireModule(current.arg); wireTape(current.arg); }
  else if(v==="catalogue") wireCatalogue();
  else if(v==="finals") wireFinals();
  else if(v==="posttape") wirePosttape();
  else if(RNS.features[v]) RNS.features[v].wire(main, {});
}

function wireHome(){
  const reset=$("#btn-reset");
  if(reset) reset.addEventListener("click", ()=>{
    if(confirm("Erase all signatures, your name, your flashcards, and your pass? The file returns to (near) blankness.")){
      RNS.state={...defaultState, matriculated:true, register:RNS.state.register, spoilers:RNS.state.spoilers};
      RNS.save(); render();
      RNS.toast("Rematriculated. The Syllabus, like the file, begins again from nothing.");
    }
  });
}

function wireModule(i){
  const m=RNS.MODULES[i];
  const submit=$("#quiz-submit");
  if(!submit) return;
  submit.addEventListener("click", ()=>{
    const sel=$("#main").querySelector("input[name=q]:checked");
    const verdict=$("#quiz-verdict");
    if(!sel){ verdict.className="verdict flunk"; verdict.textContent="WESCAC observes: no answer is also an answer, but not today. Select one."; return; }
    if(+sel.value===m.quiz.answer){
      const newly=!RNS.state.signed[i];
      RNS.state.signed[i]=true; RNS.save();
      verdict.className="verdict pass";
      verdict.textContent="✓ Passèd. " + m.quiz.explain;
      renderIdCard(); renderTabs();
      if(newly){
        RNS.toast(`Item the ${m.ordinal} is signed (${signedCount()}/7).`);
        if(allSigned()) RNS.toast("All seven signed. The hatch below Tower Hall has unsealed. (See: The Finals.)", 5200);
        maybeBray(i);
      }
    } else {
      verdict.className="verdict flunk";
      verdict.textContent="✗ Flunked — but the Belly is patient, and so is this fieldset. The lesson above contains the answer. (Hint: " + m.quiz.explain.split(".")[0] + ".)";
    }
  });
}

function wireCatalogue(){
  const filt=$("#cat-filter");
  if(!filt) return;
  filt.addEventListener("input", ()=>{
    const q=filt.value.toLowerCase();
    $("#cat-body").querySelectorAll("tr").forEach(tr=>{ tr.style.display = tr.textContent.toLowerCase().includes(q) ? "" : "none"; });
  });
}

function wireFinals(){
  const d=$("#btn-descend");
  if(d) d.addEventListener("click", startBelly);
}

function wirePosttape(){
  const present=$("#btn-present");
  if(present) present.addEventListener("click", ()=>{
    RNS.state.idPresented=true; RNS.save(); render();
    RNS.toast("The Proper Authority (you) accepts the card, and finds the signature appropriate.");
  });
  const print=$("#btn-print");
  if(print) print.addEventListener("click", ()=>window.print());
}

function renderTabs(){
  const nav=$("#tabs"); nav.innerHTML="";
  TABS.forEach(([id,label])=>{
    const locked = (id==="finals" && !allSigned()) || (id==="posttape" && !RNS.state.finalsPassed);
    const isCurrent = current.view===id || (FEATURE_VIEWS.includes(current.view) && id==="studyhall");
    const b=U.el(`<button ${isCurrent?'aria-current="page"':""} class="${locked?"locked":""}">${label}${locked?" &#128274;":""}</button>`);
    b.addEventListener("click", ()=>RNS.go(id));
    nav.appendChild(b);
  });
}

function renderIdCard(){
  const list=$("#idcard-items"); if(!list) return;
  list.innerHTML="";
  RNS.MODULES.forEach((m,i)=>{
    list.appendChild(U.el(`<li class="${RNS.state.signed[i]?"signed":""}">${U.escapeHtml(m.title)} ${RNS.state.signed[i]?"— &#10003;":"— ____"}</li>`));
  });
  $("#idcard-stamp").innerHTML =
    RNS.state.idPresented ? `<span class="bigstamp">Appropriately Signed · Presented · Accepted</span>` :
    RNS.state.finalsPassed ? `<span class="bigstamp">Passed (Failed) (Passed)</span>` :
    allSigned() ? `<span class="bigstamp">Cleared for the Belly</span>` : "";
}

/* ----- masthead controls ------------------------------------------------- */
function syncMasthead(){
  const r=$("#reg-toggle"), s=$("#spoiler-toggle"), it=$("#instructor-toggle");
  if(r){ r.textContent = RNS.state.register==="plain" ? "Voice: Plain English" : "Voice: New Tammany"; r.setAttribute("aria-pressed", RNS.state.register==="plain"?"true":"false"); }
  if(s){ s.textContent = RNS.state.spoilers ? "Spoilers: Shown" : "Spoilers: Folded"; s.setAttribute("aria-pressed", RNS.state.spoilers?"true":"false"); }
  if(it){ it.textContent = RNS.state.instructor ? "Instructor: On" : "Instructor: Off"; it.setAttribute("aria-pressed", RNS.state.instructor?"true":"false"); }
}
RNS.syncMasthead = syncMasthead;

/* ----- the Belly (Finals engine) ----------------------------------------- */
let belly=null;
function typeOut(elScreen, text, then){
  if(REDUCED){ elScreen.textContent += text; if(then) then(); return; }
  let i=0;
  (function tick(){
    if(i<text.length){ elScreen.textContent += text[i++]; setTimeout(tick, text[i-2]==="\n" ? 130 : 16); }
    else if(then){ then(); }
  })();
}
function startBelly(){
  document.body.classList.add("belly");
  belly={ q:0, errors:0, both:new Set() };
  const main=$("#main");
  main.innerHTML=`<div class="belly-screen" id="belly-screen"></div><div id="belly-controls" class="btn-row"></div>`;
  main.focus();
  typeOut($("#belly-screen"),
`> LIFT DESCENDING . . . . . .
> CHAMBER: BELLY. LIGHT: NONE. EXITS: NONE LISTED.
> CANDIDATE: ${studentName().toUpperCase()}
> THIS IS THE EXAMINATION CALLED FINALS.
> ANSWER WHAT IS ASKED.\n\n`, askBelly);
}
function askBelly(){
  const controls=$("#belly-controls"); controls.innerHTML="";
  if(belly.q < RNS.FINALS.length){
    const item=RNS.FINALS[belly.q];
    typeOut($("#belly-screen"), `> Q${belly.q+1}. ${item.q}\n`, ()=>{
      U.shuffled(item.options.length).forEach((j,pos)=>{
        const letter=String.fromCharCode(65+pos);
        const b=U.el(`<button class="btn quizopt">${letter}. ${U.escapeHtml(item.options[j])}</button>`);
        b.addEventListener("click", ()=>{
          controls.innerHTML="";
          if(j===item.answer){ typeOut($("#belly-screen"), `> ${letter}. — CORRECT. CONTINUE.\n\n`, ()=>{ belly.q++; askBelly(); }); }
          else { belly.errors++; typeOut($("#belly-screen"), `> ${letter}. — FLUNKED. THE BELLY IS PATIENT. AGAIN:\n\n`, askBelly); }
        });
        controls.appendChild(b);
      });
      controls.firstElementChild.focus();
    });
  } else { finalQuestion(); }
}
function finalQuestion(){
  const controls=$("#belly-controls"); controls.innerHTML="";
  typeOut($("#belly-screen"),
`> FINAL QUESTION.
> CANDIDATE: ARE YOU PASSED, OR ARE YOU FAILED?
> SELECT AND COMMIT.\n`, ()=>{
    const mk=(label,key)=>{
      const b=U.el(`<button class="btn" aria-pressed="false" style="font-size:1.3rem;padding:.8em 1.6em">${label}</button>`);
      b.addEventListener("click", ()=>{ belly.both.has(key)?belly.both.delete(key):belly.both.add(key); b.setAttribute("aria-pressed", belly.both.has(key)?"true":"false"); });
      return b;
    };
    const bp=mk("PASSED","p"), bf=mk("FAILED","f");
    const commit=U.el(`<button class="btn" style="border-style:dashed">COMMIT ANSWER</button>`);
    commit.addEventListener("click", ()=>{
      const both = belly.both.has("p") && belly.both.has("f");
      if(both){
        controls.innerHTML="";
        typeOut($("#belly-screen"),
`> . . .
> BOTH. NEITHER. THE BUTTONS ARE TOOLS, NOT TRUTHS.
> IN THE DARK, AT LAST, A CANDIDATE WHO READ THE BOOK.
> VERDICT: CANDIDATE PASSED (FAILED) (PASSED).
> COMMENCEMENT GATE IS WHEREVER YOU ARE STANDING.
> ASCEND.\n`, ()=>{
          const out=U.el(`<button class="btn">ASCEND TO THE POSTTAPE</button>`);
          out.addEventListener("click", ()=>{
            RNS.state.finalsPassed=true; RNS.save();
            document.body.classList.remove("belly");
            RNS.toast("CANDIDATE PASSED (FAILED) (PASSED). The Posttape is unsealed.");
            RNS.go("posttape");
          });
          controls.appendChild(out); out.focus();
        });
      } else if(belly.both.size===1){
        belly.both.clear(); bp.setAttribute("aria-pressed","false"); bf.setAttribute("aria-pressed","false");
        typeOut($("#belly-screen"),
`> ONE BUTTON ONLY? FLUNKED, BILLY.
> HINT, AS FROM THE SIXTH MODULE: THE THIRD ANSWER WAS NOT EITHER BUTTON.
> THE BELLY PERMITS WHAT EXAMINERS FORBID: SELECTING MORE THAN YOU WERE OFFERED.\n`);
      } else {
        typeOut($("#belly-screen"), `> SILENCE IS THE SAKHYAN'S ANSWER. YOU ARE NOT THE SAKHYAN. SELECT.\n`);
      }
    });
    const flee=U.el(`<button class="btn" style="opacity:.7">FLEE (ASCEND UNEXAMINED)</button>`);
    flee.addEventListener("click", ()=>{ document.body.classList.remove("belly"); RNS.toast("You ascend unexamined. The hatch does not judge. The hatch absolutely judges."); RNS.go("finals"); });
    controls.append(bp,bf,commit,flee); bp.focus();
  });
}

/* ----- masthead wiring (one-time), clock, crest, routing ----------------- */
function wireChrome(){
  const idToggle=$("#idcard-toggle");
  if(idToggle) idToggle.addEventListener("click", ()=>{
    const card=$("#idcard"); const open=card.classList.toggle("open");
    idToggle.setAttribute("aria-expanded", open?"true":"false");
  });
  const nameInput=$("#student-name");
  if(nameInput){ nameInput.value=RNS.state.name; nameInput.addEventListener("input", ()=>{ RNS.state.name=nameInput.value; RNS.save(); }); }

  const reg=$("#reg-toggle");
  if(reg) reg.addEventListener("click", ()=>{ RNS.state.register = RNS.state.register==="plain"?"voice":"plain"; RNS.save(); render(); RNS.toast(RNS.state.register==="plain"?"Plain English. The costume hangs on its peg.":"New Tammany voice. Mind the campus idiom."); });
  const sp=$("#spoiler-toggle");
  if(sp) sp.addEventListener("click", ()=>{ RNS.state.spoilers=!RNS.state.spoilers; RNS.save(); render(); RNS.toast(RNS.state.spoilers?"Spoilers shown. Endings and all.":"Spoilers folded behind reveal shutters."); });
  const it=$("#instructor-toggle");
  if(it) it.addEventListener("click", ()=>{ RNS.state.instructor=!RNS.state.instructor; RNS.save(); render(); RNS.toast(RNS.state.instructor?"Instructor mode on. Prompts appear with each lesson.":"Instructor mode off."); });

  const crest=$("#crest");
  if(crest) crest.addEventListener("click", ()=>{
    RNS.state.bleats++; RNS.save();
    const bleats=["Behhh.","BEHHH!","Bah. (A third bleat! The Catalogue gains an entry: Capra hircus.)","Behhh?","The goat regards you with rectangular patience."];
    RNS.toast(bleats[Math.min(RNS.state.bleats-1,bleats.length-1)] || "Behhh.");
    if(RNS.state.bleats===3 && current.view==="catalogue") render();
  });

  const tickEl=$("#tick");
  if(tickEl){
    tickEl.title="The tock is silent.";
    if(REDUCED){ tickEl.textContent="TICK (the tock is silent)"; }
    else { let dot=false; setInterval(()=>{ dot=!dot; tickEl.textContent = dot?"TICK.":"TICK"; }, 1000); }
  }
  const motto=$("#motto");
  if(motto) motto.textContent = " · " + RNS.MOTTOES[Math.floor(Math.random()*RNS.MOTTOES.length)];
}

function fromHash(){
  const h=location.hash.replace(/^#\//,"");
  const mod=h.match(/^module\/([1-7])$/);
  if(mod) return {view:"module", arg:+mod[1]-1};
  const known = TABS.some(([id])=>id===h) || FEATURE_VIEWS.includes(h);
  return {view: known ? h : "home", arg:null};
}

/* ----- boot -------------------------------------------------------------- */
let booted=false;
RNS.boot = function(){
  if(booted) return; booted=true;
  wireChrome();
  window.addEventListener("hashchange", ()=>{ current=fromHash(); if(document.body.classList.contains("belly")) document.body.classList.remove("belly"); render(); });
  current=fromHash();
  render();
  if(!RNS.state.matriculated) showDisclaimer();
};
// features.js loads after this file; defer boot one macrotask so RNS.features exists.
setTimeout(()=>RNS.boot(), 0);
