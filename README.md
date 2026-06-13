# Giles-Goat-Boy

**The Revised New Syllabus Companion** — a study app that teaches John Barth's
*Giles Goat-Boy; or, The Revised New Syllabus* (1966) in the most *Giles Goat-Boy*
way possible: by making you live it.

You matriculate at New Tammany College. WESCAC is your tutor. The lessons are the
Goat-Boy's own seven-item Assignment (*"To Be Done At Once, In No Time"*). Your
ID-card collects signatures. When all seven items are signed, you descend into
WESCAC's Belly for the Finals — whose last question, like the novel's, cannot be
answered with either button. What happens after that is, as in the novel, disputed
by its own postscripts.

## Running it

There is nothing to install and nothing to build. It is one dependency-free
`index.html`:

- open the file in any browser, or
- serve it from GitHub Pages (Settings → Pages → deploy from branch), or
- `python3 -m http.server` and visit `http://localhost:8000`.

Progress is stored in your browser's `localStorage` ("Rematriculate" on the
Matriculation page wipes it).

## How the app maps to the novel

| In the app | In the novel |
| --- | --- |
| Publisher's Disclaimer gate (four quarreling editors; you may flunk out at the door) | The novel's opening **Publisher's Disclaimer**, with its contradictory editorial reports |
| "Cover-letter" confessing the file was found blank | J.B.'s **Cover-Letter to the Editors and Publisher**, disclaiming authorship |
| The seven lesson modules | George's seven-item **Assignment**, each item read first literally, then better |
| One module worked three ways (differentiate / embrace / transcend) | George's three circuits of the Assignment under his three doctrines |
| Harold Bray interrupting to Certify you for nothing | Bray Certifying all of studentdom, indiscriminately |
| The Catalogue (campus term → worldly meaning) | The novel's total allegory: the University **is** the universe |
| The Finals, taken in the dark, in monospace, in the **Belly** | The Belly of WESCAC, where Candidates face the yes-or-no machine |
| The final question, passable only by selecting **both** buttons | The third answer, which was never either button |
| Posttape → Postscript doubting it → footnote doubting the Postscript | The novel's exact closing apparatus, every frame impeaching the next |
| The certificate: *PASS ALL FAIL ALL* | WESCAC's oracle concerning the GILES |

## Advisories

- **Spoilers:** total, endings included. Editor D insisted you be told at the gate.
- **Content:** the novel contains sexual violence and racial caricature alongside
  its genius; Module 7 addresses both critically rather than omitting them.
- **Copyright:** the novel is in copyright. The app reproduces no passages — only a
  few phrase-length titles and mottoes, discussed under fair use; all lesson prose
  is original. The app's own code and text are CC0 (see LICENSE).
- **Accuracy:** written from standard scholarship and close memory of the novel;
  page-level claims should be checked against your edition. Errata are welcome via
  issues, addressed to the Sub-Archivist.

## Roadmap (proposed, not yet built)

- Reel-by-reel plot summaries behind spoiler shutters, for readers mid-book
- A hero-pattern scorecard (Raglan/Campbell) comparing George, Oedipus, and company
- An interactive *Taliped Decanus* scene with the Sophocles parallels marked
- Spaced-repetition flashcards generated from the Catalogue
- "Tapes" mode: the lessons read aloud (the R.N.S. is, after all, an audiobook)
- An instructor mode: discussion prompts and essay questions per module
