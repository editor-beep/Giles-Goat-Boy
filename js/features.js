/* ==========================================================================
   The Revised New Syllabus Companion — Study Hall features
   --------------------------------------------------------------------------
   Five interactive study tools plus the Instructor view. Each exposes
   { render(ctx) -> htmlString, wire(main, ctx) } on RNS.features, and the
   router in app.js calls them. Shared helpers (RNS.util, RNS.state, RNS.go,
   RNS.reg, RNS.spoilerGate, RNS.toast, RNS.save) are defined in app.js; since
   these functions only run after boot, the load order (content, app, features)
   is safe.
   ========================================================================== */
"use strict";
window.RNS = window.RNS || {};
RNS.features = {};

/* ----- Study Hall hub ---------------------------------------------------- */
RNS.STUDY_TOOLS = [
  ["reels","The Reels","A spoiler-gated walk through the novel's framing apparatus and its volumes, reel by reel — for readers who are somewhere in the middle and want their bearings."],
  ["flashcards","Flashcards","Spaced-repetition drill on the campus idiom, built from the Catalogue. Learn which worldly thing each campus word stands for."],
  ["hero","Hero-Pattern Scorecard","Grade George against Lord Raglan's twenty-two hero-incidents, side by side with Oedipus — then see Campbell's monomyth, one stage of which the novel takes literally."],
  ["taliped","Taliped Decanus","Step through the play-within-the-novel beat by beat against Sophocles' Oedipus Rex."],
  ["doctrines","The Three Doctrines","Replay George's Assignment under each of his three philosophies and watch the first two fail in mirror image."],
  ["instructor","Instructor Mode","Discussion questions and essay prompts for every module, gathered on one printable page."]
];

RNS.features.studyhall = {
  render(){
    const U = RNS.util;
    const cards = RNS.STUDY_TOOLS.map(([id,title,desc])=>`
      <li>
        <div class="grow"><strong>${U.escapeHtml(title)}</strong><br><span class="smallprint">${U.escapeHtml(desc)}</span></div>
        <button class="btn secondary" data-tool="${id}">Open</button>
      </li>`).join("");
    return `
      <p class="kicker">${RNS.reg("The Library &middot; Reading Rooms","Study tools")}</p>
      <h2>Study Hall</h2>
      <p>${RNS.reg(
        "Six rooms off the main Library, for when the Assignment alone won't hold the whole book. None of them is required; all of them are open.",
        "Six extra study tools to go deeper than the seven lessons. None are required.")}</p>
      <ul class="module-list" style="list-style:none">${cards}</ul>`;
  },
  wire(main){
    main.querySelectorAll("[data-tool]").forEach(b=>b.addEventListener("click",()=>RNS.go(b.dataset.tool)));
  }
};

/* ----- The Reels (plot timeline) ----------------------------------------- */
RNS.features.reels = {
  render(){
    const U = RNS.util;
    const frames = RNS.FRAMES.map(([t,d])=>`
      <li><strong>${U.escapeHtml(t)}</strong> — ${U.escapeHtml(d)}</li>`).join("");
    const reels = RNS.REELS.map(r=>{
      const chs = r.chapters.map(([t,d])=>`
        <li><strong>${U.escapeHtml(t)}</strong> — ${U.escapeHtml(d)}</li>`).join("");
      const note = r.note ? `<p class="smallprint" style="margin:.3rem 0 0">${U.escapeHtml(r.note)}</p>` : "";
      const tag = r.known ? "" : ` <span class="chip-soft">summary</span>`;
      return `
        <details class="reel">
          <summary><strong>${U.escapeHtml(r.vol)}</strong> &middot; ${U.escapeHtml(r.reel)}${tag}</summary>
          <ol class="reel-list">${chs}</ol>${note}
        </details>`;
    }).join("");
    const body = `
      <h3>The framing apparatus</h3>
      <ul class="plain-list">${frames}</ul>
      <h3>The Revised New Syllabus, reel by reel</h3>
      <p class="smallprint">Chapter titles, where shown, follow the novel's own table of contents. Reels marked
      <span class="chip-soft">summary</span> are described at the level of narrative movement rather than reproduced
      title by title.</p>
      ${reels}
      <p class="smallprint" style="margin-top:1rem">Then the frames resume: <strong>Posttape</strong>,
      <strong>Postscript</strong> doubting it, <strong>footnote</strong> doubting the Postscript.</p>`;
    return `
      <p class="kicker">The Library &middot; Tape Stacks</p>
      <h2>The Reels</h2>
      <p>${RNS.reg(
        "The whole arc of the testament, for the Candidate who is somewhere mid-book and has lost the thread. It is, of course, all spoiler.",
        "A full walkthrough of the novel's plot and structure, for readers who are partway through and want orientation. Contains spoilers.")}</p>
      ${RNS.spoilerGate(body, {label:"Reveal the reel-by-reel walkthrough (spoilers)"})}`;
  },
  wire(){}
};

/* ----- Flashcards (Leitner spaced repetition over the Catalogue) --------- */
RNS.features.flashcards = {
  render(){
    return `
      <p class="kicker">The Library &middot; Drill Room</p>
      <h2>Flashcards</h2>
      <p>${RNS.reg(
        "Learn the campus idiom the way studentdom does — by drill. Each card shows a campus term; recall what it stands for, then grade yourself. The cards you miss come round more often.",
        "Practice the campus vocabulary. Each card shows a term; try to recall its meaning, reveal, then mark whether you knew it. Missed cards repeat sooner (a Leitner spaced-repetition system).")}</p>
      <div id="fc-progress" class="fc-progress"></div>
      <div id="fc-card" class="fc-card"></div>
      <div id="fc-controls" class="btn-row"></div>
      <p class="smallprint"><button class="btn danger" id="fc-reset" style="font-size:.8rem;padding:.3em .8em">Reset all flashcard progress</button></p>`;
  },
  wire(main){
    const U = RNS.util, st = RNS.state;
    const DECK = RNS.CATALOGUE.map((row,i)=>({key:String(i), term:row[0], campus:row[1], world:row[2]}));
    st.cards = st.cards || {};
    DECK.forEach(c=>{ if(!st.cards[c.key]) st.cards[c.key] = {box:1, seen:0}; });
    RNS.save();

    const sess = { revealed:false, current:null };
    const pickNext = ()=>{
      // weight toward lower boxes; mastered (box 5) cards appear least
      const pool = [];
      DECK.forEach(c=>{
        const box = st.cards[c.key].box;
        const weight = Math.max(1, 6 - box); // box1 -> 5 tickets, box5 -> 1 ticket
        for(let k=0;k<weight;k++) pool.push(c);
      });
      // avoid immediate repeat of the same card when possible
      let pick = pool[Math.floor(Math.random()*pool.length)];
      if(sess.current && pool.length>1){
        let guard=0;
        while(pick.key===sess.current.key && guard++<8) pick = pool[Math.floor(Math.random()*pool.length)];
      }
      return pick;
    };

    const progressEl = main.querySelector("#fc-progress");
    const cardEl = main.querySelector("#fc-card");
    const ctrlEl = main.querySelector("#fc-controls");

    const drawProgress = ()=>{
      const total = DECK.length;
      const mastered = DECK.filter(c=>st.cards[c.key].box>=5).length;
      const pct = Math.round(mastered/total*100);
      const boxes = [1,2,3,4,5].map(b=>{
        const n = DECK.filter(c=>st.cards[c.key].box===b).length;
        return `<span class="fc-box">Box ${b}: ${n}</span>`;
      }).join("");
      progressEl.innerHTML = `
        <div class="fc-bar" role="img" aria-label="Mastered ${mastered} of ${total}">
          <div class="fc-bar-fill" style="width:${pct}%"></div>
        </div>
        <p class="smallprint">${mastered} of ${total} mastered (in Box 5). ${boxes}</p>`;
    };

    const drawCard = ()=>{
      const c = sess.current;
      cardEl.className = "fc-card" + (sess.revealed ? " flipped" : "");
      cardEl.innerHTML = sess.revealed ? `
        <p class="fc-term">${U.escapeHtml(c.term)}</p>
        <hr>
        <p class="fc-campus"><strong>On campus:</strong> ${U.escapeHtml(c.campus)}</p>
        <p class="fc-world"><strong>In your world:</strong> ${U.escapeHtml(c.world)}</p>
        <p class="smallprint">Currently in Box ${st.cards[c.key].box} of 5.</p>
      ` : `
        <p class="fc-term">${U.escapeHtml(c.term)}</p>
        <p class="smallprint">What does it stand for? (Recall, then reveal.)</p>`;
    };

    const drawControls = ()=>{
      ctrlEl.innerHTML = "";
      if(!sess.revealed){
        const b = U.el(`<button class="btn">Reveal</button>`);
        b.addEventListener("click", ()=>{ sess.revealed=true; drawCard(); drawControls(); });
        ctrlEl.appendChild(b);
      } else {
        const knew = U.el(`<button class="btn">Knew it &nearr;</button>`);
        const miss = U.el(`<button class="btn secondary">Missed it &searr;</button>`);
        knew.addEventListener("click", ()=>grade(true));
        miss.addEventListener("click", ()=>grade(false));
        ctrlEl.append(knew, miss);
      }
    };

    const grade = (knew)=>{
      const rec = st.cards[sess.current.key];
      rec.seen++;
      rec.box = knew ? Math.min(5, rec.box+1) : 1;
      RNS.save();
      next();
    };

    const next = ()=>{
      sess.current = pickNext();
      sess.revealed = false;
      drawProgress(); drawCard(); drawControls();
    };

    main.querySelector("#fc-reset").addEventListener("click", ()=>{
      if(confirm("Reset all flashcard boxes to the beginning?")){
        DECK.forEach(c=>{ st.cards[c.key] = {box:1, seen:0}; });
        RNS.save(); next();
        RNS.toast("Flashcard progress reset. Back to Box 1, all of it.");
      }
    });

    next();
  }
};

/* ----- Hero-Pattern scorecard (Raglan + Campbell) ------------------------ */
RNS.features.hero = {
  render(){
    const U = RNS.util;
    const tally = RNS.RAGLAN.reduce((a,[,g,o])=>({g:a.g+g.s, o:a.o+o.s}),{g:0,o:0});
    const max = RNS.RAGLAN.length*2;
    const rows = RNS.RAGLAN.map(([inc,g,o],i)=>{
      const mark = s => s===2 ? '<span class="mark yes">●</span>' : s===1 ? '<span class="mark part">◐</span>' : '<span class="mark no">○</span>';
      return `
        <tr class="hero-row" data-i="${i}" tabindex="0" role="button" aria-expanded="false">
          <td class="hero-inc">${i+1}. ${U.escapeHtml(inc)}</td>
          <td class="hero-score">${mark(g.s)}</td>
          <td class="hero-score">${mark(o.s)}</td>
        </tr>
        <tr class="hero-detail" id="hero-detail-${i}" hidden>
          <td colspan="3">
            <p><strong>George:</strong> ${U.escapeHtml(g.note)}</p>
            <p><strong>Oedipus:</strong> ${U.escapeHtml(o.note)}</p>
          </td>
        </tr>`;
    }).join("");
    const campbell = RNS.CAMPBELL.map(c=>{
      const [stage,desc,lit] = c;
      return `<li class="${lit?"campbell-lit":""}"><strong>${U.escapeHtml(stage)}:</strong> ${U.escapeHtml(desc)}${lit?' <span class="chip-soft">taken literally</span>':''}</li>`;
    }).join("");
    const body = `
      <p>${RNS.RAGLAN_INTRO}</p>
      <p class="smallprint"><span class="mark yes">●</span> fits &nbsp; <span class="mark part">◐</span> partial or pointedly inverted &nbsp; <span class="mark no">○</span> does not fit. Click any incident to expand.</p>
      <table class="hero-table">
        <thead><tr><th>Raglan's incident</th><th>George</th><th>Oedipus</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><th>Score (of ${max})</th><th>${tally.g}</th><th>${tally.o}</th></tr></tfoot>
      </table>
      <p class="smallprint">The two zeroes in George's column (incidents 9 and 14) are the tell: Barth follows the pattern
      precisely enough that his deliberate inversions become legible as commentary.</p>
      <details class="reel" id="campbell">
        <summary><strong>And Campbell's monomyth</strong></summary>
        <p>${RNS.CAMPBELL_INTRO}</p>
        <ol class="plain-list">${campbell}</ol>
      </details>`;
    return `
      <p class="kicker">The Library &middot; Comparative Mythology</p>
      <h2>Hero-Pattern Scorecard</h2>
      <p>${RNS.reg(
        "The Goat-Boy was assembled from the manuals. Here is the manual, with George graded against it beside the canonical high-scorer.",
        "George's life is deliberately built to match scholarly checklists of the 'hero pattern.' Here he is scored against Lord Raglan's, next to Oedipus.")}</p>
      ${RNS.spoilerGate(body, {label:"Reveal the scorecard (spoilers — it covers the whole arc)"})}`;
  },
  wire(main){
    main.querySelectorAll(".hero-row").forEach(row=>{
      const toggle = ()=>{
        const i = row.dataset.i;
        const d = main.querySelector("#hero-detail-"+i);
        const open = d.hasAttribute("hidden");
        if(open){ d.removeAttribute("hidden"); } else { d.setAttribute("hidden",""); }
        row.setAttribute("aria-expanded", open?"true":"false");
      };
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); toggle(); }});
    });
  }
};

/* ----- Taliped Decanus viewer (beat-by-beat vs Oedipus) ------------------ */
RNS.features.taliped = {
  render(){
    const body = `
      <p>${RNS.TALIPED_INTRO}</p>
      <div class="taliped-stage">
        <div class="taliped-beat" id="taliped-beat"></div>
        <div class="btn-row" style="justify-content:space-between">
          <button class="btn secondary" id="tal-prev">&larr; Previous beat</button>
          <span class="smallprint" id="tal-count" aria-live="polite"></span>
          <button class="btn secondary" id="tal-next">Next beat &rarr;</button>
        </div>
      </div>`;
    return `
      <p class="kicker">The Amphitheatre</p>
      <h2>The Tragedy of Taliped Decanus</h2>
      <p>${RNS.reg(
        "Barth halts the novel to stage a whole Oedipus in cap and gown. Walk the parallels; George, in the audience, will not see what you see.",
        "The novel pauses to stage a campus parody of Sophocles' Oedipus Rex. Step through the matching beats.")}</p>
      ${RNS.spoilerGate(body, {label:"Reveal the Taliped / Oedipus walkthrough (spoilers)"})}`;
  },
  wire(main){
    const U = RNS.util;
    const beatEl = main.querySelector("#taliped-beat");
    if(!beatEl) return; // spoiler gate not yet opened
    RNS.features._tal = 0;
    const draw = ()=>{
      const i = RNS.features._tal;
      const [campus, greek, note] = RNS.TALIPED[i];
      beatEl.innerHTML = `
        <div class="taliped-cols">
          <div class="taliped-col"><span class="taliped-label">Taliped Decanus (campus)</span><p>${U.escapeHtml(campus)}</p></div>
          <div class="taliped-col"><span class="taliped-label">Oedipus Rex (Sophocles)</span><p>${U.escapeHtml(greek)}</p></div>
        </div>
        <p class="taliped-note">${U.escapeHtml(note)}</p>`;
      main.querySelector("#tal-count").textContent = `Beat ${i+1} of ${RNS.TALIPED.length}`;
      main.querySelector("#tal-prev").disabled = i===0;
      main.querySelector("#tal-next").disabled = i===RNS.TALIPED.length-1;
    };
    main.querySelector("#tal-prev").addEventListener("click", ()=>{ if(RNS.features._tal>0){RNS.features._tal--; draw();}});
    main.querySelector("#tal-next").addEventListener("click", ()=>{ if(RNS.features._tal<RNS.TALIPED.length-1){RNS.features._tal++; draw();}});
    draw();
  }
};

/* ----- The Three Doctrines replay ---------------------------------------- */
RNS.features.doctrines = {
  render(){
    const U = RNS.util;
    const picker = RNS.DOCTRINES.map(s=>`<button class="btn secondary doctrine-pick" data-id="${s.id}">${U.escapeHtml(s.title)}</button>`).join("");
    const body = `
      <p>${RNS.DOCTRINE_INTRO}</p>
      <div class="btn-row">${picker}</div>
      <div id="doctrine-stage"></div>`;
    return `
      <p class="kicker">The Belly &middot; Rehearsal</p>
      <h2>The Three Doctrines</h2>
      <p>${RNS.reg(
        "Before you face the Finals, rehearse George's three answers on live cases. The buttons remember what the machine cannot teach.",
        "Practice George's three philosophies on real situations from the book. Apply each and see the consequence.")}</p>
      ${RNS.spoilerGate(body, {label:"Reveal the doctrine rehearsal (spoilers)"})}`;
  },
  wire(main){
    const U = RNS.util;
    const stage = main.querySelector("#doctrine-stage");
    if(!stage) return;
    main.querySelectorAll(".doctrine-pick").forEach(b=>b.addEventListener("click", ()=>openScenario(b.dataset.id)));

    function openScenario(id){
      const sc = RNS.DOCTRINES.find(s=>s.id===id);
      const tried = new Set();
      main.querySelectorAll(".doctrine-pick").forEach(b=>b.setAttribute("aria-pressed", b.dataset.id===id?"true":"false"));
      stage.innerHTML = `
        <div class="doctrine-card">
          <p class="kicker">${U.escapeHtml(sc.title)}</p>
          <p class="doctrine-prompt">${U.escapeHtml(sc.prompt)}</p>
          <div class="btn-row">
            <button class="btn" data-d="differentiate">Differentiate</button>
            <button class="btn" data-d="embrace">Embrace</button>
            <button class="btn" data-d="transcend">Transcend</button>
          </div>
          <div id="doctrine-out" aria-live="polite"></div>
          <div id="doctrine-synth"></div>
        </div>`;
      const out = stage.querySelector("#doctrine-out");
      stage.querySelectorAll("[data-d]").forEach(btn=>btn.addEventListener("click", ()=>{
        const d = btn.dataset.d;
        const [act, outcome] = sc[d];
        tried.add(d);
        const cls = d==="transcend" ? "doctrine-transcend" : "doctrine-fail";
        out.innerHTML = `
          <div class="doctrine-result ${cls}">
            <p><strong>${d.charAt(0).toUpperCase()+d.slice(1)}.</strong> ${U.escapeHtml(act)}</p>
            <p class="doctrine-outcome">${U.escapeHtml(outcome)}</p>
          </div>`;
        stage.querySelectorAll("[data-d]").forEach(b=>b.setAttribute("aria-pressed", b.dataset.d===d?"true":"false"));
        if(tried.has("differentiate") && tried.has("embrace") && tried.has("transcend")){
          stage.querySelector("#doctrine-synth").innerHTML = `
            <div class="notice"><strong>${RNS.reg("The lesson of the rehearsal:","The takeaway:")}</strong>
            the first two doctrines fail as mirror images — too separate, then too merged. The third was not a third
            rule but a way of holding the question. That is what the Belly tests, and what no single button can say.</div>`;
        }
      }));
    }
  }
};

/* ----- Instructor view (aggregated prompts, printable) ------------------- */
RNS.features.instructor = {
  render(){
    const U = RNS.util;
    const blocks = RNS.MODULES.map((m,i)=>`
      <section class="instructor-block">
        <h3>${i+1}. ${U.escapeHtml(m.title)}</h3>
        <p class="smallprint">${U.escapeHtml(m.subtitle)}</p>
        <p><strong>Discussion</strong></p>
        <ul>${m.discussion.map(q=>`<li>${U.escapeHtml(q)}</li>`).join("")}</ul>
        <p><strong>Essay prompts</strong></p>
        <ul>${m.essay.map(q=>`<li>${U.escapeHtml(q)}</li>`).join("")}</ul>
      </section>`).join("");
    return `
      <p class="kicker">The Faculty Room</p>
      <h2>Instructor Mode</h2>
      <p>Discussion questions and essay prompts for all seven modules, gathered for classroom use. The
      <strong>Print</strong> button produces a clean handout. (You can also switch on per-module prompts everywhere with
      the <em>Instructor</em> toggle in the masthead.)</p>
      <div class="btn-row">
        <button class="btn" id="instructor-print">Print these prompts</button>
        <button class="btn secondary" id="instructor-mode-toggle"></button>
      </div>
      <div class="instructor-sheet">${blocks}</div>`;
  },
  wire(main){
    const print = main.querySelector("#instructor-print");
    if(print) print.addEventListener("click", ()=>window.print());
    const tog = main.querySelector("#instructor-mode-toggle");
    if(!tog) return;
    const sync = ()=>{ tog.textContent = RNS.state.instructor ? "Per-module prompts: ON" : "Per-module prompts: OFF"; tog.setAttribute("aria-pressed", RNS.state.instructor?"true":"false"); };
    tog.addEventListener("click", ()=>{ RNS.state.instructor = !RNS.state.instructor; RNS.save(); sync(); RNS.syncMasthead && RNS.syncMasthead(); });
    sync();
  }
};
