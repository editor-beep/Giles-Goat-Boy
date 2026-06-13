# Giles-Goat-Boy

**The Revised New Syllabus Companion** — a study app that teaches John Barth's
*Giles Goat-Boy; or, The Revised New Syllabus* (1966) in the most *Giles Goat-Boy*
way possible: by making you live it.

You matriculate at New Tammany College. WESCAC is your tutor. The lessons are the
Goat-Boy's own seven-item Assignment (*"To Be Done At Once, In No Time"*). Your
ID-card collects signatures. When all seven are signed, you descend into WESCAC's
Belly for the Finals — whose last question, like the novel's, cannot be answered
with either button. What happens after that is, as in the novel, disputed by its
own postscripts.

Built for **first-time readers and long-time fans alike**: two switches in the
masthead tune it to you (see *Reading modes* below).

## Running it

No build step, no framework, no dependencies — plain HTML, CSS, and JavaScript.

- **Deploy on Vercel:** import the repo; Vercel serves it as a static site with no
  configuration needed (`vercel.json` only adds caching and security headers). Or
  run `vercel` from the project root.
- **Run locally:** because the page loads its scripts as separate files, use a
  static server rather than opening `index.html` straight off disk in the strictest
  browsers:
  ```
  python3 -m http.server      # then visit http://localhost:8000
  # or:  npx serve
  ```

Progress is stored in your browser's `localStorage`. "Rematriculate" on the
Matriculation page wipes it.

## Reading modes

Three controls live in the masthead and persist across visits:

- **Voice / Plain** — swap the in-character New Tammany College idiom for direct,
  plain-English explanations. Every lesson is written in both registers; nothing is
  locked behind the costume.
- **Spoilers: Shown / Folded** — the matriculation gate asks whether you're meeting
  the book for the first time or returning to it. First-timers get major spoilers
  folded behind reveal shutters; fans get everything inline. Flip it anytime.
- **Instructor: On / Off** — surfaces discussion questions and essay prompts beneath
  each lesson (also gathered on one printable page in Study Hall → Instructor Mode).

## What's inside

**The Assignment** — seven lesson modules, one per task of the Goat-Boy's
Assignment, each ending in a question that signs your ID-card:

1. *Fix the Clock* — the framing apparatus and metafiction
2. *End the Boundary Dispute* — the Cold War / University-is-the-universe allegory
3. *Overcome Your Infirmity* — George's origin and the hero-from-a-manual satire
4. *See Through Your Ladyship* — the cast of paired halves
5. *Re-Place the Founder's Scroll* — scripture parody and the Oedipus play-within
6. *Pass the Finals* — the three doctrines (differentiate / embrace / transcend)
7. *Present Your ID-Card…* — the disputed endings, plus an honest critical advisory

**The Catalogue** — a searchable glossary mapping 60+ campus terms to their
real-world meanings.

**Study Hall** — six deeper tools:

- **The Reels** — a spoiler-gated, reel-by-reel walk through the novel's structure,
  using the book's own chapter titles where available.
- **Flashcards** — a Leitner spaced-repetition drill built from the Catalogue.
- **Hero-Pattern Scorecard** — George graded against Lord Raglan's 22 hero-incidents
  beside Oedipus, plus Campbell's monomyth (one stage of which the novel literalizes).
- **Taliped Decanus** — a beat-by-beat viewer pairing the play-within-the-novel with
  Sophocles' *Oedipus Rex*.
- **The Three Doctrines** — apply each of George's philosophies to live cases and
  watch the first two fail in mirror image.
- **Instructor Mode** — all discussion and essay prompts on one printable page.

**The Finals & Posttape** — the Belly examination (the last question needs *both*
buttons), a printable *PASS ALL FAIL ALL* certificate, and the novel's receding
Posttape / Postscript / footnote frames.

## Project structure

```
index.html        slim shell: masthead, nav, ID-card, script/style includes
css/styles.css    all styling (the campus-newspaper aesthetic + the green Belly)
js/content.js     all teaching data: lessons (both registers), catalogue, finals,
                  reels, hero-pattern, Taliped beats, doctrine scenarios, quotes
js/app.js         engine: state, register/spoiler/instructor systems, router,
                  core views, the Belly examination, boot
js/features.js    the six Study-Hall tools
vercel.json       static caching + security headers
```

The three scripts are classic (non-module) scripts that share a single global
`RNS` namespace and load in order (`content` → `app` → `features`), so the page
also works opened directly from disk in most browsers.

## Advisories

- **Spoilers:** the app can discuss the whole plot, endings included. First-timers
  should leave spoilers folded (the default the gate sets for them).
- **Content:** the novel contains sexual violence and racial caricature alongside
  its genius; Module 7 addresses both critically rather than omitting them.
- **Copyright & fair use:** the novel is in copyright. This is an educational tool,
  not for sale. It quotes only short, attributed phrases — the seven assignment
  titles and a handful of mottoes — under fair use; all lesson prose is original.
  The app's own code and text are CC0 (see LICENSE).
- **Accuracy:** written from standard scholarship and close reading; the structure,
  the seven task titles, and the major plot points were checked against reference
  sources, but page-level claims should be verified against your edition. Errata
  are welcome via issues, addressed to the Sub-Archivist.

## Testing

Functional behavior is covered by a headless [jsdom](https://github.com/jsdom/jsdom)
walkthrough that matriculates, exercises both registers and the spoiler toggle,
signs all seven modules, runs every Study-Hall tool, completes the Belly, and
checks persistence and deep-link gating. (The harness injects the three classic
scripts in order and is not committed; see the project notes.)
