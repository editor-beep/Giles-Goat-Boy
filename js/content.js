/* ==========================================================================
   The Revised New Syllabus Companion — content / data layer
   --------------------------------------------------------------------------
   All teaching material lives here as plain data on the global RNS object, so
   the engine (app.js) and the study tools (features.js) can stay generic.

   Two registers are provided for the lessons:
     - voice : the in-character New Tammany College idiom
     - plain : direct, plain-English explanation for first-time readers
   The reader chooses; nothing is locked behind the costume.

   Fair use: the only words quoted from Barth's novel are short phrases and the
   seven assignment titles, used here for teaching and clearly attributed. All
   surrounding prose is original to this Companion.
   ========================================================================== */
"use strict";
window.RNS = window.RNS || {};

/* --- short fair-use quotations, attributed ------------------------------- */
RNS.CITE = "John Barth, <cite>Giles Goat-Boy</cite> (1966)";

/* --------------------------------------------------------------------------
   The seven Assignment modules.
   Each task title below is quoted verbatim from the novel's Assignment,
   headed "To Be Done At Once, In No Time."
   -------------------------------------------------------------------------- */
RNS.MODULES = [
{
  title: "Fix the Clock",
  subtitle: "How the book is built — frames, tapes, and tick that is tock",
  ordinal: "first",
  meaning: "The Goat-Boy's first task reads like a chore for a repairman in Tower Hall. It turns out to be a question about time, and about what holds a structure together.",
  quote: { text: "To Be Done At Once, In No Time", note: "the heading of the whole Assignment" },
  lesson: {
    voice: `
      <p><cite>Giles Goat-Boy</cite> never lets you reach the story directly. You enter through a
      <strong>Publisher's Disclaimer</strong>, in which anonymous editors file contradictory reports on whether
      the book should be published at all. Then comes a <strong>Cover-Letter to the Editors and Publisher</strong>,
      signed "J.B.," a blocked novelist who explains the manuscript isn't his: a strange young man calling himself
      <strong>Stoker Giles</strong> (or Giles Stoker) left him tapes said to have been composed by <strong>WESCAC</strong>,
      the West Campus Automatic Computer. The body of the novel is presented as those tapes — the
      <strong>Revised New Syllabus</strong>, testament of George the Goat-Boy — divided into two volumes whose chapters
      are "reels," as befits tape. When the story ends, the frames resume: a <strong>Posttape</strong>, a
      <strong>Postscript</strong> doubting the Posttape, and a <strong>footnote</strong> doubting the Postscript.
      Authorship recedes forever; no layer of the book vouches for any other.</p>
      <p>This is <strong>metafiction</strong> — fiction that shows its own scaffolding — and in 1966 a novel claiming
      to have been written by a computer was a genuinely strange machine to find on a bestseller list. It was Barth's
      fourth novel, and the conviction it acts out, that the old narrative forms are used up and can now only be retold
      knowingly, became his famous essay "The Literature of Exhaustion" (1967).</p>
      <p>As for the clock: George's first, literal campaign includes adjusting the great clock in Tower Hall, whose
      escapement chops time into tick and tock. His education runs the other way — toward hearing that the chopping is
      something <em>we</em> do, not something time does. The Assignment's own heading makes the point at once:
      everything on the list is "to be done at once, in no time." Hold that paradox; it is the whole course.</p>`,
    plain: `
      <p>The novel is wrapped in layers of fake documents, and you have to read through all of them before the story
      starts. First a <strong>Publisher's Disclaimer</strong>: invented editors argue about whether to publish the book.
      Then a <strong>Cover-Letter</strong> signed "J.B." (a stand-in for Barth), who says the book isn't his — a young
      man gave him tapes supposedly written by a giant computer called <strong>WESCAC</strong>. The main story is those
      tapes, called the <em>Revised New Syllabus</em>, and its chapters are named "reels" because they're supposedly
      recordings. At the end, more layers: a <strong>Posttape</strong>, then a <strong>Postscript</strong> that says the
      Posttape might be fake, then a <strong>footnote</strong> that doubts the Postscript. The effect is that you can
      never find a single trustworthy author. That uncertainty is on purpose.</p>
      <p>This kind of writing — fiction that keeps pointing at its own construction — is called <strong>metafiction</strong>.
      In 1966 it was startling, especially a bestseller that claimed a computer wrote it. Barth later argued in an essay,
      "The Literature of Exhaustion," that the traditional ways of telling stories felt used up, so the honest move was to
      retell them while openly admitting you're retelling them.</p>
      <p>The actual task, "Fix the Clock," starts as a literal repair job on Tower Hall's clock. But the lesson George
      slowly learns is that dividing time into tick and tock is something humans impose. Notice the joke in the
      Assignment's heading: do everything "at once, in no time." That contradiction is the book in miniature.</p>`
  },
  refs: ["Publisher's Disclaimer","Cover-Letter","Stoker Giles","WESCAC","Posttape","R.N.S."],
  discussion: [
    "Why might Barth want every narrator in the book to be doubted by some other part of the book? What does that do to your trust as a reader?",
    "The chapters are called 'reels.' How does pretending the novel is a tape recording change the way you read it?",
    "Is a story that constantly admits it's a story more honest, or just more evasive?"
  ],
  essay: [
    "Trace the chain of framing devices from the Publisher's Disclaimer to the closing footnote. Argue whether the frame is a gimmick or the novel's true subject.",
    "Using 'The Literature of Exhaustion' as context, explain what Barth means by retelling exhausted forms 'knowingly,' and test the claim against the opening frames of Giles Goat-Boy."
  ],
  quiz: {
    q: "Which layer of the book casts doubt on the Posttape?",
    options: ["The Postscript to the Posttape","The Publisher's Disclaimer","The Second Reel","Nothing — the Posttape is the one undisputed text"],
    answer: 0,
    explain: "The Postscript disputes the Posttape, and is itself disputed by a footnote. Every frame is sabotaged by the next. The book's last lesson about authority is structural, not stated."
  }
},
{
  title: "End the Boundary Dispute",
  subtitle: "The allegory map — the Cold War as a campus quarrel",
  ordinal: "second",
  meaning: "The second task looks like diplomacy: settle the line between East and West Campus. George tries drawing the line harder, then erasing it, before learning what lines are for.",
  quote: { text: "the University is the universe", note: "the novel's governing pun" },
  lesson: {
    voice: `
      <p>The master conceit: <strong>the University is the universe.</strong> Read every campus noun as a cosmic or
      geopolitical one and the twentieth century assembles itself. <strong>New Tammany College</strong> is the United
      States (rich, generous, self-righteous, machine-proud); <strong>Nikolayan College</strong>, on East Campus, is the
      Soviet bloc. <strong>Campus Riot II</strong> is the Second World War, in which the <strong>Bonifacists</strong> of
      <strong>Siegfrieder College</strong> (the Nazis) perpetrated horrors against the <strong>Moishians</strong> (the Jews).
      The war ended when WESCAC turned its <strong>EAT-waves</strong> — mind-destroying broadcasts, the campus idiom for
      atomic weaponry — on two campuses of <strong>Amaterasu College</strong> (Japan). Now NTC and Nikolay glare across
      the <strong>Quiet Riot</strong> (the Cold War), each tending a rival computer, WESCAC and EASCAC, either of which
      could EAT all studentdom in an afternoon.</p>
      <p>The political cast is a roman-à-clef in crayon: Chancellor <strong>Lucius "Lucky" Rexford</strong>, young and
      photogenic, has a Kennedy gleam; ex-Chancellor <strong>Reginald Hector</strong>, the general emeritus, an Eisenhower
      flavor; <strong>Ira Hector</strong>, who owns nearly all information on West Campus, is monopoly capital in a green
      eyeshade. The <strong>Boundary Dispute</strong> — where exactly West Campus ends and East begins — is the era's
      border theology, Berlin included.</p>
      <p>The teaching point is not the cipher but its <em>excess</em>. Allegory promises a tidy key; Barth supplies one so
      complete it tips into farce — when a footnoted history of the world can be rebuilt from a course catalogue, the act
      of mapping is the joke. The Boundary Dispute can't be "ended" by moving the line, because the line is in the
      mappers. George must learn — twice, the hard way — that boundaries are both arbitrary <em>and</em> necessary.</p>`,
    plain: `
      <p>The single biggest thing to understand: <strong>the University stands for the whole universe</strong>, and the
      campus is a coded version of the real world. Translate the terms and the mid-twentieth century appears.
      <strong>New Tammany College</strong> is the United States. <strong>Nikolayan College</strong> on East Campus is the
      Soviet Union. <strong>Campus Riot II</strong> is World War II; the <strong>Bonifacists</strong> of
      <strong>Siegfrieder College</strong> are the Nazis; the <strong>Moishians</strong> are the Jews;
      <strong>Amaterasu College</strong> is Japan. WESCAC's <strong>EAT-waves</strong> stand for nuclear weapons, and the
      war ends when WESCAC "EATs" two Amaterasu campuses — the atomic bombings. Afterward, NTC and Nikolay face off in the
      <strong>Quiet Riot</strong>, which is the Cold War, each side guarding a doomsday computer.</p>
      <p>Several characters are thinly disguised real figures: Chancellor <strong>Lucky Rexford</strong> resembles John F.
      Kennedy; ex-Chancellor <strong>Reginald Hector</strong> resembles Eisenhower; <strong>Ira Hector</strong> is big
      business. The <strong>Boundary Dispute</strong> is the Cold War argument over borders, including divided Berlin.</p>
      <p>Here's the catch Barth is making. Normally an allegory gives you a neat code to decipher. He makes the code so
      total that it becomes a joke — you can reconstruct all of human history from a college brochure. And the task,
      "End the Boundary Dispute," can't be solved by redrawing the border, because the real border is in people's minds.
      George learns the hard way that boundaries are made up <em>and</em> still necessary.</p>`
  },
  refs: ["New Tammany College","Nikolayan College","Bonifacists","Moishians","Amaterasu College","EAT","Quiet Riot","Lucky Rexford"],
  discussion: [
    "If the allegory is so complete you can decode everything, is it still allegory, or has it become a kind of parody of allegory?",
    "What does it mean that the deadliest power on campus is a computer rather than an army?",
    "Pick one campus term and argue that its real-world equivalent is not as obvious as it first looks."
  ],
  essay: [
    "Barth maps the entire Cold War onto a campus. Argue whether this scale-shift trivializes history or clarifies it.",
    "Analyze WESCAC and EASCAC as a single shared idea. What anxiety about technology and government does the doomsday computer dramatize?"
  ],
  quiz: {
    q: "In the allegory, the EATing of two Amaterasu campuses corresponds to —",
    options: ["The bombing of Hiroshima and Nagasaki","The Berlin airlift","The 1929 stock-market crash","The first moon landing"],
    answer: 0,
    explain: "EAT-waves are the campus idiom for nuclear (and mind-) weapons. WESCAC's strike on Amaterasu College ends Campus Riot II as the atomic bombings ended WWII — and its guilt haunts West Campus, and Max, all novel long."
  }
},
{
  title: "Overcome Your Infirmity",
  subtitle: "From Billy Bocksfuss to George Giles — a hero assembled from the manual",
  ordinal: "third",
  meaning: "George reads the third task as a doctor's order: cure the limp, purge the goat. The novel suggests the infirmity and the gift may be the same organ.",
  quote: { text: "GILES: Grand-Tutorial Ideal, Laboratory Eugenical Specimen", note: "WESCAC's name for its engineered messiah — and, it seems, for George" },
  lesson: {
    voice: `
      <p>The hero is raised in the goat-barns of New Tammany's experimental farm as <strong>Billy Bocksfuss</strong>, a kid
      among kids, by <strong>Max Spielman</strong> — the great Moishian scientist who helped teach WESCAC to EAT, was
      scapegoated for his conscience, and now keeps goats. (Max's life-work is a comic cosmology in five words —
      <strong>Spielman's Law: ontogeny recapitulates cosmogeny</strong> — each of us re-runs the whole show in miniature.)
      The boy's pastoral happiness cracks in stages: visits from a gentle veiled stranger he calls
      <strong>Lady Creamhair</strong>; the death of his beloved buck <strong>Redfearn's Tommy</strong>, for which he cannot
      forgive himself; and the dawning, intolerable knowledge that he is human. He claims his manhood, his name — George —
      and a destiny. WESCAC's eugenics program, the <strong>GILES</strong> (Grand-Tutorial Ideal, Laboratory Eugenical
      Specimen), means the computer itself may be his father; Lady Creamhair, he will learn, is his mother, Virginia
      Hector, whose own father, ex-Chancellor Reginald Hector, exposed the infant to die. So the goat-boy sets out for the
      Great Mall to matriculate, passes the <strong>Trial-by-Turnstile</strong> and the <strong>Scapegoat Grate</strong>
      (the iron grid that dispenses his seven-task Assignment), and declares himself candidate for
      <strong>Grand Tutor</strong> — campus-speak for messiah — just as a rival, Harold Bray, declares the same.</p>
      <p>None of this pattern is accidental. Barth built George against the comparative-myth recipe — Lord Raglan's
      <cite>The Hero</cite> and Joseph Campbell's <cite>The Hero with a Thousand Faces</cite> — and ticked the boxes
      deliberately: obscure and possibly divine parentage, the attempt on the infant's life, fosterage among animals, the
      journey to the capital, trials, revelation, apotheosis. <cite>Giles</cite> is a hero <em>synthesized from the
      spec</em> — which is the satire: if the messiah pattern is a formula, a machine could run it. (See the Hero-Pattern
      scorecard in the Study Hall, where George is graded against Raglan's twenty-two points beside Oedipus himself.)</p>
      <p>And the infirmity? George walks with a goatish gait and carries a goatish appetite, and his tutors variously
      advise amputating the animal or sainting it. The novel's long answer is that his goathood — body, smell, gusto,
      shame — is not the obstacle to his humanity but its evidence; what must be overcome is the belief that he is
      divisible.</p>`,
    plain: `
      <p>The hero grows up on an experimental farm, raised as a goat among goats and called <strong>Billy Bocksfuss</strong>.
      His guardian is <strong>Max Spielman</strong>, a brilliant Jewish ("Moishian") scientist who once helped build
      WESCAC's weapon, was blamed and cast out for his conscience, and now herds goats. Max's pet theory,
      "<strong>ontogeny recapitulates cosmogeny</strong>," means roughly: each individual life re-runs the history of the
      whole cosmos. Billy's happy childhood breaks apart when a kind veiled woman, <strong>Lady Creamhair</strong>, starts
      visiting; when his favorite goat, <strong>Redfearn's Tommy</strong>, dies in a way he blames himself for; and when he
      realizes he is human, not a goat.</p>
      <p>He renames himself <strong>George</strong> and learns his strange origin. WESCAC ran a breeding program called
      <strong>GILES</strong> (Grand-Tutorial Ideal, Laboratory Eugenical Specimen) to engineer a perfect messiah, and
      George may be its product — possibly fathered by the computer itself. Lady Creamhair turns out to be his mother,
      Virginia Hector; her father, the ex-Chancellor Reginald Hector, had left baby George out to die. George travels to
      the main campus, passes entrance ordeals (the Trial-by-Turnstile and the <strong>Scapegoat Grate</strong>, which
      hands him his seven-task Assignment), and announces he is a candidate to be <strong>Grand Tutor</strong> — the
      campus word for messiah. A rival named Harold Bray claims the same title.</p>
      <p>This life story is deliberately built from scholarly checklists of how myths construct heroes — Lord Raglan's and
      Joseph Campbell's. Barth hits the standard beats on purpose (mysterious divine parentage, attempt to kill the baby,
      raised by a foster figure among animals, journey, trials, transformation). The point of the satire: if becoming a
      messiah is just a formula, then a machine could manufacture one. (The Study Hall has an interactive scorecard
      grading George against Raglan's 22 points next to Oedipus.) As for "overcome your infirmity": George walks and eats
      like a goat, and people keep telling him to either cut out the goat or worship it. The book's answer is that his
      animal side isn't the enemy of his humanity — it's part of it. What he has to overcome is the belief that he can be
      split in two.</p>`
  },
  refs: ["Billy Bocksfuss","Max Spielman","Spielman's Law","Lady Creamhair","Redfearn's Tommy","GILES","Trial-by-Turnstile","Scapegoat Grate","Grand Tutor"],
  discussion: [
    "George is built to match a checklist of mythic heroes. Does knowing the formula make him feel less real, or is that exactly Barth's point?",
    "Max raises George with love but also helped build a weapon of mass destruction. How does the novel handle that contradiction?",
    "Why is it significant that the hero begins life literally as livestock?"
  ],
  essay: [
    "Compare George's origin story to the standard hero-myth pattern, and argue what Barth gains by making the pattern visible and mechanical.",
    "Examine George's 'infirmity.' Is his goat-nature a disability, a gift, or a category the novel wants to dissolve? Use specific episodes."
  ],
  quiz: {
    q: "GILES, the program that may explain George's paternity, stands for —",
    options: ["Grand-Tutorial Ideal, Laboratory Eugenical Specimen","General Instruction & Learning Examination System","Goat-Initiated Liberal Education Scheme","Graduate Institute for Eastern Studies"],
    answer: 0,
    explain: "WESCAC's GILES project tried to engineer the perfect Grand Tutor from optimal donor material. A messiah bred from a spec sheet — the novel's whole argument about heroism, in one acronym."
  }
},
{
  title: "See Through Your Ladyship",
  subtitle: "The cast as a set of halves — every character is someone's missing piece",
  ordinal: "fourth",
  meaning: "George first hears the fourth task as optics, then as cynicism — to see through someone is to expose them. Seeing through, it turns out, can also mean seeing by means of.",
  quote: { text: "Pass All Fail All", note: "WESCAC's oracle, which hangs over every relationship in the book" },
  lesson: {
    voice: `
      <p>Barth populates the campus with people who are each <em>half</em> of something, so the plot can keep asking its
      one question: what would wholeness cost?</p>
      <ul>
        <li><strong>Dr. Eblis Eierkopf and Croaker.</strong> The Bonifacist scientist is nearly all skull — bodiless
        intellect, peering at the co-eds through his night-glass; the giant Frumentian exchange student is nearly all
        body. Eierkopf rides Croaker's shoulders, and together they make approximately one person. (Croaker is also the
        novel's sorest spot for modern readers — see the advisory in the final module.)</li>
        <li><strong>Peter Greene and Leonid Alexandrov.</strong> The West's self-made booster, blind in one eye and
        relentlessly "okay," mirrors the East's defector, selfless to the point of self-erasure. Each is his college's
        virtue swollen into its defect; they spend the novel trading flaws like roommates trading shirts.</li>
        <li><strong>Maurice Stoker and Lucky Rexford.</strong> The Chancellor's radiant order runs on power from the
        Furnace Room of <strong>Maurice Stoker</strong> — grinning keeper of the Powerhouse and Main Detention, and the
        Chancellor's own half-brother. Heaven's lights are wired to hell's boiler, and Stoker never lets anyone forget
        it.</li>
        <li><strong>Anastasia Stoker.</strong> Stoker's wife, attached to the Psychiatric Annex, is the novel's scandal
        and its possible saint: she refuses no one anything. Is bottomless giving holiness or pathology? George's
        successive doctrines will swing her like a pendulum, and his Ladyship-task finally points here: not to expose her,
        but to see <em>by</em> her. (Her exact kinship to George is left deliberately murky — which only sharpens the
        question.)</li>
        <li><strong>Harold Bray.</strong> The rival Grand Tutor: oily, omnicompetent, faintly inhuman, impossible to pin.
        Bray will Certify anyone as a Candidate — his diplomas bloom across campus like dandelions — and George's vocation
        crystallizes as the duty to <em>unmask the false Tutor</em>. The catch: everything George does, Bray does too,
        smoother. A messiah and his counterfeit are a binary system; neither shines without the other's dark.</li>
      </ul>
      <p>Watching the pairs teaches you the book's deep grammar: <cite>Giles</cite> is a machine for generating opposites —
      East/West, mind/body, give/refuse, pass/fail — and then asking which oppositions are real. Keep the roster handy;
      the Finals assume it.</p>`,
    plain: `
      <p>Most major characters are built as one <em>half</em> of a pair, so the book can keep asking whether the two
      halves should be kept apart or joined.</p>
      <ul>
        <li><strong>Eierkopf and Croaker:</strong> a brilliant, physically helpless scientist and a huge, wordless,
        instinct-driven man. Eierkopf literally rides on Croaker's shoulders. Together they're basically one complete
        person: pure mind plus pure body. (Note: Croaker is written as an offensive racial caricature — the final module
        addresses this directly.)</li>
        <li><strong>Peter Greene and Leonid Alexandrov:</strong> an American self-made optimist (blind in one eye) and a
        Russian defector so selfless he nearly erases himself. Each takes his country's signature virtue to a damaging
        extreme, and they mirror each other.</li>
        <li><strong>Maurice Stoker and Lucky Rexford:</strong> the Chancellor (order, light, government) and his
        half-brother Stoker, who runs the power plant and the prison (chaos, heat, the underworld). The point: the
        Chancellor's shining order literally runs on Stoker's hellish furnace. They need each other.</li>
        <li><strong>Anastasia Stoker:</strong> Stoker's wife, who never refuses anyone anything. The novel keeps asking
        whether her endless giving is saintly or self-destructive. The task "see through your Ladyship" eventually means
        not exposing her as a fraud but learning to see <em>by means of</em> her. Her family relationship to George is
        left intentionally unclear.</li>
        <li><strong>Harold Bray:</strong> George's rival, who also claims to be the Grand Tutor. He's slick, weirdly
        inhuman, and hands out official "Certifications" to absolutely everyone. George decides his job is to expose Bray
        as a fake — but unsettlingly, Bray copies everything George does. The true messiah and the impostor define each
        other.</li>
      </ul>
      <p>The pattern to take away: the book constantly sets up opposites (East/West, mind/body, giving/refusing,
      pass/fail) and then asks which of those opposites are actually real and which are illusions we invented.</p>`
  },
  refs: ["Eblis Eierkopf","Croaker","Peter Greene","Leonid Alexandrov","Maurice Stoker","Anastasia","Harold Bray","Dean o' Flunks"],
  discussion: [
    "Choose one character pair and argue what the novel says by making them two halves rather than two whole people.",
    "Is Anastasia a saint, a victim, a symbol, or a failure of the author's imagination? Defend your reading.",
    "Why does a messiah seem to require a counterfeit like Bray? What would George lose without him?"
  ],
  essay: [
    "Argue that the novel's structure is fundamentally binary, and examine how the character pairs prepare the reader for the 'Pass All Fail All' problem.",
    "Anastasia is the hinge of George's three doctrines. Trace how each doctrine reframes her, and what that reveals about each doctrine's limits."
  ],
  quiz: {
    q: "Eierkopf and Croaker function in the novel as —",
    options: ["Mind and body, helpless apart, comically whole together","Twin spies for EASCAC","George's biological fathers","The two authors of the Publisher's Disclaimer"],
    answer: 0,
    explain: "The egghead rides the giant: intellect without appetite carried by appetite without intellect. It's the mind–body problem staged as a piggyback ride — and a hint of what George must refuse to split in himself."
  }
},
{
  title: "Re-Place the Founder's Scroll",
  subtitle: "Sources and parodies — scripture, Oedipus, and the syllabus of syllabi",
  ordinal: "fifth",
  meaning: "George takes the fifth task as shelving: return a document to its slot in the Library. But 're-place' also means 'find the right place for' — and perhaps 'replace.' Wherever the original goes, a revision is coming.",
  quote: { text: "the Old and New Syllabi", note: "the campus Testaments, which the Revised New Syllabus means to join" },
  lesson: {
    voice: `
      <p>The Revised New Syllabus announces by its very title that it means to stand beside — or atop — the
      <strong>Old and New Syllabi</strong>, the campus Testaments. The novel's sacred history is a full conversion of
      ours: the <strong>Founder</strong> presides where God did; the <strong>Dean o' Flunks</strong> tempts where Satan
      did; <strong>Moishe</strong> led the Moishians; <strong>Enos Enoch</strong>, the campus Christ, taught that the meek
      shall graduate; the <strong>Living Sakhyan</strong> sits smiling on West Campus, serenely declining to answer
      questions, as the Buddha-figure must. Graduation is salvation; <strong>Commencement Gate</strong> is the pearly one;
      to flunk is to be damned, and "Flunk you!" is how studentdom swears. George's career re-runs the messiah's —
      annunciations, temptations, a ragged ministry, betrayals, a scapegoat's exit — with the difference that his gospel
      is being typed by the very machine he is sent to harrow.</p>
      <p>Mid-novel, Barth halts the plot to stage an entire play: <strong><cite>The Tragedy of Taliped Decanus</cite></strong>
      — "Taliped" as in clubfooted, "Decanus" as in dean — a campus-idiom travesty of <cite>Oedipus Rex</cite>, performed
      in the Amphitheatre while George watches. It is parody with teeth: George too is a foundling of riddling parentage
      with a damaged gait, a weakness for oracles (WESCAC's readouts), and a mother he has met without knowing her. The
      play is his story in a warped mirror, and the audience laughs at what will shortly stop being funny. (You can walk
      the parallels beat by beat in the Study Hall's Taliped viewer.)</p>
      <p>The module's question is the difference between <strong>parody and blasphemy</strong>. Barth's method is the
      medieval one of sacred parody: you can only travesty at full length what you have taken seriously at full length.
      The Founder's Scroll gets <em>re-placed</em>, not burned. The old stories aren't refuted — they're retold knowingly,
      which (per "The Literature of Exhaustion") is the only mode left. The R.N.S. is what scripture looks like after it
      has read its own reviews.</p>`,
    plain: `
      <p>The book's title, <em>The Revised New Syllabus</em>, signals that it wants to sit next to the Bible's Old and New
      Testaments (here called the "Old and New Syllabi") as a kind of third scripture. Barth rebuilds all of religious
      history in campus terms: the <strong>Founder</strong> is God; the <strong>Dean o' Flunks</strong> is the Devil;
      <strong>Moishe</strong> is Moses; <strong>Enos Enoch</strong> is Jesus; the <strong>Living Sakhyan</strong> is the
      Buddha (silent and smiling). "Graduating" means being saved; "flunking" means being damned; people even swear by
      saying "Flunk you!" George's life retraces the standard messiah story — miraculous birth, temptations, a messy
      ministry, betrayal, sacrifice — except that his "gospel" is supposedly being written by the very computer he's
      supposed to defeat.</p>
      <p>Halfway through, Barth stops the plot to insert a whole play, <em>The Tragedy of Taliped Decanus</em>. The name
      means "clubfoot Dean," and it's a campus parody of Sophocles' <em>Oedipus Rex</em>. George watches it, not realizing
      how closely it matches his own life: a foundling with an injured foot, mysterious parents, a reliance on oracles,
      and a mother he's met without recognizing. (You can step through the Oedipus parallels in the Study Hall.)</p>
      <p>The key idea: there's a difference between <strong>parody and blasphemy</strong>. Barth isn't mocking religion to
      destroy it — he's doing "sacred parody," the old tradition where you can only spoof at length something you take
      seriously at length. He <em>re-places</em> the sacred story rather than burning it: he retells it openly as a
      retelling, which he argued was the only honest option left for a modern writer.</p>`
  },
  refs: ["Founder","Dean o' Flunks","Enos Enoch","Living Sakhyan","Old & New Syllabi","Taliped Decanus","Founder's Scroll","Commencement"],
  discussion: [
    "What's the difference between parody and blasphemy, and which is Barth doing? Can a parody also be reverent?",
    "Why insert an entire Oedipus play inside the novel? What does George fail to see while watching it?",
    "If 're-place' can mean restore, reposition, or replace, which meaning best fits what the novel does to scripture?"
  ],
  essay: [
    "Analyze The Tragedy of Taliped Decanus as a 'play within the play.' How does it comment on George's story and on the reader's position?",
    "Argue whether the Revised New Syllabus is best read as religious satire, sincere religious quest, or a deliberate refusal to choose between them."
  ],
  quiz: {
    q: "The Tragedy of Taliped Decanus, performed inside the novel, is a campus-dress rewrite of —",
    options: ["Sophocles' Oedipus Rex","Hamlet","Paradise Lost","The Book of Job"],
    answer: 0,
    explain: "A clubfooted dean, a plague, a riddle, an unspeakable marriage: Oedipus in academic regalia. Its placement is the point — George watches his own myth performed as farce before he must live it as fact."
  }
},
{
  title: "Pass the Finals",
  subtitle: "The three answers — differentiate, embrace, transcend",
  ordinal: "sixth",
  meaning: "The sixth task sounds simplest and is the abyss: what could it mean to pass an examination set by the universe? George answers three times. The grader is a machine; the grade is a koan.",
  quote: { text: "Pass All Fail All", note: "WESCAC's readout concerning the GILES — the riddle the whole plot chews" },
  lesson: {
    voice: `
      <p>Over George broods the oracle attached to the GILES from the start, WESCAC's gnomic readout:
      <strong>"Pass All Fail All."</strong> The novel's second half is the systematic attempt to obey it, organized as a
      dialectic. George works through his seven-item Assignment not once but three times, each pass governed by a
      doctrine, each doctrine tested to destruction on the same set of advisees:</p>
      <ul>
        <li><strong>First answer — differentiation.</strong> Passage and Failure are opposites; salvation lies in telling
        things apart and keeping them apart. George counsels purity all round: harden the Boundary, refuse the ambiguous,
        separate goat from man, East from West, wife from supplicants. Campus affairs promptly curdle — borders bristle,
        lovers freeze, the righteous become monsters of righteousness.</li>
        <li><strong>Second answer — embrace.</strong> Reversal: Passage and Failure are one; all distinction is illusion,
        so merge everything. Walls soften, appetites are sainted, contradictions waved through. The result is not paradise
        but mush and license; the campus curdles the opposite way, and his meddling helps bring studentdom to the brink of
        <strong>Campus Riot III</strong>. (Note the comedy of method: George is a literalist of whatever idea currently
        possesses him. Both halves of the dialectic are tested by a tutor constitutionally incapable of moderation — a
        satirist's dream student.)</li>
        <li><strong>Third answer — the unsayable synthesis.</strong> What remains when both doctrines have failed is not a
        third doctrine. In the deepest chamber of the campus — the <strong>Belly of WESCAC</strong>, where Candidates face
        the Finals and the machine's yes-or-no interrogation — George stops choosing between the buttons. In darkness, in
        embrace with Anastasia, question and answer, pass and fail, briefly cease to be two things; the same paradoxical
        refusal is what jams WESCAC itself. The novel is careful to keep this moment beyond paraphrase: it can be enacted
        but not stated, and every later attempt to state it (George's included) garbles it. Boundaries are tools; love is
        not a position; the truth does not fit in the machine that asks for it.</li>
      </ul>
      <p>This three-beat shape — thesis, antithesis, and a synthesis that refuses to be a slogan — is the skeleton key to
      the whole middle of the book. Any scene that seems redundant is usually the same scene under a different doctrine;
      Barth is running controlled experiments on his cast. When your own Finals arrive (and they will, Candidate, the
      moment all seven items are signed), remember what the third answer was <em>not</em>: it was not either button. You
      can rehearse all three doctrines on live cases in the Study Hall before you descend.</p>`,
    plain: `
      <p>From early on, WESCAC has issued a cryptic verdict about the GILES: <strong>"Pass All Fail All."</strong> The
      second half of the novel is George trying to figure out what that means, and he goes through three phases. He works
      his seven-task Assignment three separate times, each time following a different philosophy, and each philosophy
      fails on the same group of people he's advising:</p>
      <ul>
        <li><strong>Phase 1 — keep everything separate.</strong> George decides passing and failing are opposites, so the
        answer is to draw sharp lines: separate good from bad, man from goat, East from West, faithful wife from everyone
        else. Result: relationships freeze, borders get dangerous, and being "pure" turns people into monsters.</li>
        <li><strong>Phase 2 — merge everything.</strong> He flips to the opposite: all distinctions are fake, so blend
        everything together and approve of everything. Result: not paradise but a mushy free-for-all, and his meddling
        helps push the campus toward <strong>Campus Riot III</strong> (a third world war). The joke is that George always
        takes whatever idea he currently holds to a ridiculous literal extreme.</li>
        <li><strong>Phase 3 — the answer you can't put into words.</strong> When both philosophies have failed, what's
        left isn't a third philosophy. Deep inside the computer, in the <strong>Belly of WESCAC</strong> (where students
        take their "Finals" as a yes/no interrogation), George stops choosing between the two buttons. In the dark, joined
        with Anastasia, the opposites briefly stop being two separate things — and that same refusal to pick is what
        actually jams the computer. Barth deliberately keeps this moment vague: it can be acted out but not explained, and
        every time anyone (including George) tries to explain it, they get it wrong. The lesson: boundaries are useful
        tools, love isn't a rule you can state, and the truth won't fit into a machine that demands a yes or a no.</li>
      </ul>
      <p>This three-step shape — idea, opposite idea, and a resolution that refuses to become a slogan — is the key to the
      whole middle of the book. If a scene feels repetitive, it's usually the same situation replayed under a different
      philosophy. When you reach the Finals in this app, remember: the right answer is <em>not</em> either single button.
      You can practice all three philosophies on real cases in the Study Hall first.</p>`
  },
  refs: ["Pass All Fail All","WESCAC's Belly","the Finals","Anastasia","Campus Riot III","Boundary Dispute"],
  discussion: [
    "Why does Barth dramatize the final insight instead of stating it? What would be lost if a character simply explained it?",
    "Both 'keep everything separate' and 'merge everything' fail. Is the novel skeptical of all philosophies, or only of extremes?",
    "What does it mean that the climactic understanding happens through sex and darkness rather than through reasoning?"
  ],
  essay: [
    "Lay out George's three doctrines as a Hegelian dialectic and assess whether the novel earns its synthesis or merely gestures at one.",
    "The third answer is presented as unsayable. Argue whether this is a profound move or an evasion of the author's responsibility to mean something."
  ],
  quiz: {
    q: "The correct order of George's three successive teachings:",
    options: ["Differentiate everything → embrace everything → transcend the opposition","Embrace everything → differentiate everything → flunk everything","Transcend first, then differentiate, then embrace","He teaches one doctrine, consistently, throughout"],
    answer: 0,
    explain: "Thesis: pass and fail are opposites, so separate them. Antithesis: pass and fail are one, so merge them. Both wreck the campus. The synthesis happens in the Belly and resists wording — which is why the novel dramatizes it instead of stating it."
  }
},
{
  title: "Present Your ID-Card, Appropriately Signed, to the Proper Authority",
  subtitle: "Endings, authority, and reading this book in the present tense",
  ordinal: "seventh",
  meaning: "The last task is a bureaucratic formality — except that by the end, every term in it has come loose. Which signature is appropriate? And who, in this University, is the proper authority?",
  quote: { text: "thirty-three and one-third", note: "George's age as he dictates the Posttape — the age of Christ, and the speed of a long-playing record" },
  lesson: {
    voice: `
      <p>The novel does not end so much as out-frame itself. Near the climax, George returns with a goat of Redfearn's
      line that drives the false Tutor off at the very moment <strong>Max Spielman is shafted</strong> on
      <strong>Founder's Hill</strong> — Max having confessed to a killing he did not exactly commit, and accepted the
      scapegoat's death the campus reserves for what it cannot forgive — and in that instant Harold Bray is unmasked as
      something not human at all. George himself survives. The <strong>Posttape</strong> finds him later, "thirty-three and
      one-third" years old (the age of Christ; the speed of an LP), dictating his story back into WESCAC in the Nether
      Campus, his teaching already hardened by disciples into a "<strong>Gilesianism</strong>" he barely recognizes, and
      expecting that he too will one day be shafted. Then the <strong>Postscript</strong> doubts the Posttape was George's
      at all; the <strong>footnote</strong> doubts the Postscript; and the reader is left holding an ID-card no authority
      remains to stamp. That is the answer to the seventh task, and the book's final transfer of power: <em>you</em> are
      the proper authority, and the signature that validates the card is the reading you just did. The R.N.S. ends by
      graduating its reader, with honors and without guarantees.</p>
      <h3>Reading it today — an honest advisory</h3>
      <p>A companion that only flattered the novel would be a Bray. Two cautions, offered seriously.
      <strong>Croaker</strong> is built from racist primitivist caricature — a wordless, hypersexual African giant — and
      while the mind/body allegory is doing deliberate work, the vehicle is the era's ugliest stock figure, and modern
      readers should say so plainly. And the novel's sexual politics, above all the perpetual availability and repeated
      violation of <strong>Anastasia</strong>, treat women chiefly as parable material; the book is knowing about many of
      its cruelties, but not reliably about these. Reading critically is not flunking the book; it is the only way left to
      pass it.</p>
      <h3>Reception, briefly</h3>
      <p>Published in 1966, <cite>Giles Goat-Boy</cite> became a genuine bestseller — a strange fate for seven hundred
      pages of cybernetic scripture — and split critics between "comic masterpiece" and "bloated stunt" (positions, you
      will notice, the Publisher's Disclaimer had already staged as preemptive parody). It stands now as a hinge of
      American postmodernism: the campus novel swallowed by the systems novel, the sacred book rebuilt as a machine
      readout, the hero generated from the hero-manual. Its enormous, encyclopedic descendants are still being written.</p>`,
    plain: `
      <p>The book doesn't really "end" — it keeps adding outer layers. Near the climax, George comes back with a goat
      descended from his childhood favorite, and it drives the fake Tutor Bray away at the exact moment that
      <strong>Max Spielman is executed</strong> ("shafted") on <strong>Founder's Hill</strong>. Max had confessed to a
      killing and accepted death as a scapegoat. At that moment Bray is exposed as something not human. George survives.
      Later, in the <strong>Posttape</strong>, George is "thirty-three and one-third" years old — the age Jesus died, and
      also the speed of a vinyl record — and he's dictating his whole story back into the computer. His followers have
      already turned his teaching into a rigid "ism" he doesn't recognize, and he expects he'll eventually be executed too.
      Then the <strong>Postscript</strong> says the Posttape might not really be George's words, and a <strong>footnote</strong>
      doubts the Postscript. So you're left holding an "ID-card" that no remaining authority can officially stamp. That's
      the answer to the last task: <em>you</em>, the reader, are the proper authority. The book ends by, in effect,
      graduating you — without any guarantee that you got it right.</p>
      <h3>Reading it today — an honest warning</h3>
      <p>This companion won't pretend the book is flawless. Two serious problems. First, <strong>Croaker</strong> is a
      racist caricature — a silent, hyper-sexual African giant — and even though he's part of a mind/body symbol, the
      stereotype itself is ugly and should be named as such. Second, the book's treatment of women, especially
      <strong>Anastasia</strong>, who is constantly sexually available and repeatedly assaulted, mostly uses her as a
      symbol rather than a person, and the novel is not consistently self-aware about that. Reading critically isn't
      disrespecting the book — it's the honest way to engage with it.</p>
      <h3>How it was received</h3>
      <p><cite>Giles Goat-Boy</cite> came out in 1966 and was a surprise bestseller despite being a 700-page religious
      allegory narrated by a computer. Critics split between calling it a comic masterpiece and a bloated stunt — a split
      the book's own fake editors had already parodied in advance. Today it's considered a landmark of American
      postmodern fiction, and you can see its influence in the giant, encyclopedic novels that came after it.</p>`
  },
  refs: ["Posttape","Founder's Hill","Max Spielman","Gilesianism","Croaker","Anastasia","ID-card"],
  discussion: [
    "The book hands final authority to the reader. Is that empowering, or a way for the author to dodge responsibility for what it means?",
    "How should a reader hold admiration for a novel's ambition together with honest objection to its racism and sexual politics?",
    "George's followers turn his teaching into 'Gilesianism.' What is the novel saying about how movements distort their founders?"
  ],
  essay: [
    "Analyze the novel's closing apparatus (Posttape, Postscript, footnote) as a deliberate refusal of closure. What is gained and what is lost?",
    "Write a critical defense or prosecution of Giles Goat-Boy that takes its formal genius and its treatment of Croaker and Anastasia equally seriously."
  ],
  quiz: {
    q: "By the final page, the question 'who really wrote this book?' has —",
    options: ["At least five candidate answers, every one disputed by some part of the book itself","Exactly one: John Barth, stated plainly in the Posttape","Two: George and Anastasia, co-signing","None: the text is legally anonymous"],
    answer: 0,
    explain: "George dictating, WESCAC composing, Stoker Giles delivering, J.B. forwarding, editors mangling — and each frame impeaches its neighbor. The reader inherits the authority no layer will keep. That inheritance is the ending."
  }
}
];

/* --------------------------------------------------------------------------
   The Catalogue (glossary): campus term -> on-campus meaning -> worldly echo
   -------------------------------------------------------------------------- */
RNS.CATALOGUE = [
  ["The University","All that is — the cosmos as campus","the universe (hear the pun)"],
  ["Studentdom","Everyone enrolled in existence","humankind"],
  ["The Founder","Source of the campus, author of the Old Syllabus","God"],
  ["The Dean o' Flunks","Tempter who haunts failure's edge","the Devil"],
  ["Grand Tutor","A teacher whose life is the lesson","messiah / prophet"],
  ["Commencement","The passage beyond the campus","salvation"],
  ["The Finals","The examination that settles everything","the Last Judgment"],
  ["Passage / Failure","The campus's terminal grades","salvation / damnation"],
  ["Matriculation","Enrollment in the whole business","birth; conversion; signing up"],
  ["New Tammany College (NTC)","Richest college on West Campus","the United States"],
  ["West & East Campus","The two rival halves of the University","the Cold War blocs"],
  ["Nikolayan College","NTC's great rival on East Campus","the Soviet Union"],
  ["Siegfrieder College","Perpetrators of Campus Riot II's horrors","Germany"],
  ["Bonifacists","Siegfrieder's murderous faction","the Nazis"],
  ["Moishians","The persecuted people of Moishe","the Jews"],
  ["Amaterasu College","EATen at the end of Campus Riot II","Japan"],
  ["Campus Riot II","The great mid-century catastrophe","World War II"],
  ["Campus Riot III","The war George nearly helps to start","a feared World War III"],
  ["The Quiet Riot","Armed peace between the Campuses","the Cold War"],
  ["The Boundary Dispute","Where does West Campus end?","border & ideology conflict"],
  ["WESCAC / EASCAC","The rival automatic computers, each able to EAT studentdom","superpower military-computer complexes"],
  ["EAT-waves","Mind-destroying emissions; 'EATen alive'","nuclear weapons (and worse)"],
  ["The Belly","WESCAC's innermost chamber, where Candidates are examined","holy of holies; the bomb's heart; the oracle's cave"],
  ["The GILES","Grand-Tutorial Ideal, Laboratory Eugenical Specimen","an engineered messiah"],
  ["Billy Bocksfuss","The goat-boy's barn name","George's first self"],
  ["Max Spielman","Moishian scientist turned goatherd; George's first tutor; shafted on Founder's Hill","the scapegoated sage"],
  ["Spielman's Law","'Ontogeny recapitulates cosmogeny'","each life re-runs the cosmos"],
  ["G. Herrold","The booksweep who fished the infant from the tapelift","the humble rescuer of foundlings"],
  ["Lady Creamhair","The veiled gentlewoman of the hemlock grove; Virginia R. Hector","George's mother"],
  ["Virginia R. Hector","Daughter of the ex-Chancellor, inseminated by WESCAC","the virgin mother, mechanized"],
  ["Reginald Hector","Ex-Chancellor and general; exposed the infant George","the grandfather who would kill the hero"],
  ["Redfearn's Tommy","George's beloved buck, dead by George's own fury","first guilt; lost Eden"],
  ["The Great Mall","Ceremonial heart of New Tammany","the capital; the public square"],
  ["Tower Hall","Seat of administration; the great clock","church-and-state's clocktower"],
  ["Trial-by-Turnstile","The gate ordeal of would-be matriculates","the threshold trial"],
  ["Scapegoat Grate","The iron grid that dispenses the seven-task Assignment","the threshold that loads the burden"],
  ["The Amphitheatre","Where Taliped Decanus is staged","the Theatre of Dionysus, relocated"],
  ["Taliped Decanus","The clubfoot Dean of Cadmus College","Oedipus, in academic regalia"],
  ["The Powerhouse","Stoker's furnace, lighting the whole campus","hell, on which heaven runs"],
  ["Main Detention","Stoker's other facility","jail; the underworld annex"],
  ["Maurice Stoker","Keeper of Powerhouse and Detention; Rexford's half-brother","disorder, wired to order"],
  ["Anastasia Stoker","Stoker's wife, who refuses no one; kin to George, ambiguously","giving itself, as scandal and as grace"],
  ["Founder's Hill","Where the campus shafts what it can't forgive","Golgotha; the scapegoat's place"],
  ["The Shaft","The execution performed on Founder's Hill","the cross; the gallows; 'getting shafted'"],
  ["The Library","All recorded studentdom; home of the Founder's Scroll","Alexandria, Vatican & Library of Congress at once"],
  ["The Founder's Scroll","The foundational document, mis-shelved","scripture, awaiting re-placement"],
  ["Enos Enoch","The campus's gentle Tutor of old","Christ"],
  ["Moishe","Leader and lawgiver of the Moishians","Moses"],
  ["The Living Sakhyan","Smiling, silent, unhelpful, holy","the Buddha"],
  ["Harold Bray","The other Grand Tutor; Certifier of absolutely everyone","Antichrist? Impostor? Necessary counterfeit?"],
  ["Certification","Bray's freely dispensed diplomas of Candidacy","cheap grace"],
  ["Pass All Fail All","WESCAC's oracle concerning the GILES","the koan the whole plot chews"],
  ["ID-card","Proof of person, wanting the appropriate signature","the self, awaiting validation"],
  ["Gilesianism","What disciples made of George's teaching","every founder's heartbreak"],
  ["The R.N.S.","The Revised New Syllabus: this testament itself","the third Testament, on tape"],
  ["'Flunk you!'","How studentdom swears","profanity, fully converted"],
  ["The Posttape","The weary coda, authenticity disputed","the gospel nobody will vouch for"],
  ["Eblis Eierkopf","The near-bodiless Bonifacist scientist","intellect without appetite"],
  ["Croaker","The wordless Frumentian giant (a racist caricature)","appetite without intellect"],
  ["Peter Greene","West Campus self-made man, blind in one eye","American optimism and its blind spot"],
  ["Leonid Alexandrov","East Campus defector, selfless to self-erasure","collectivism taken to vanishing"]
];

/* --------------------------------------------------------------------------
   The Finals (the Belly examination)
   -------------------------------------------------------------------------- */
RNS.FINALS = [
  { q:"WHO TUTORED THE GOAT-BOY IN THE BARNS, AND IN FORGIVENESS?",
    options:["MAX SPIELMAN","HAROLD BRAY","IRA HECTOR","THE LIVING SAKHYAN"], answer:0 },
  { q:"THE UNIVERSITY SIGNIFIES —",
    options:["THE UNIVERSE, ENTIRE","THE IVY LEAGUE","A TAX SHELTER","NOTHING: IT IS ONLY A SCHOOL"], answer:0 },
  { q:"CAMPUS RIOT II ENDED WHEN WESCAC —",
    options:["EATED TWO CAMPUSES OF AMATERASU COLLEGE","GRADUATED THE BONIFACISTS","FLOODED THE POWERHOUSE","ISSUED A STRONGLY WORDED MEMO"], answer:0 },
  { q:"HAROLD BRAY WILL CERTIFY —",
    options:["ANYONE WHATEVER, INDISCRIMINATELY","ONLY THE WORTHY","ONLY GOATS","NO ONE: HE IS A MODEST MAN"], answer:0 },
  { q:"TALIPED DECANUS, STAGED IN THE AMPHITHEATRE, TRAVESTIES —",
    options:["OEDIPUS REX","ANTIGONE","THE TEMPEST","BEOWULF"], answer:0 },
  { q:"GEORGE'S THREE TEACHINGS, IN ORDER —",
    options:["DIFFERENTIATE; EMBRACE; TRANSCEND","EMBRACE; DIFFERENTIATE; SURRENDER","TRANSCEND; TRANSCEND; TRANSCEND","BUY LOW; SELL HIGH; FLUNK ALL"], answer:0 },
  { q:"ON FOUNDER'S HILL, THE ONE SHAFTED AS SCAPEGOAT IS —",
    options:["MAX SPIELMAN","GEORGE GILES","LUCKY REXFORD","WESCAC ITSELF"], answer:0 },
  { q:"THE POSTTAPE IS DOUBTED BY THE POSTSCRIPT, WHICH IS DOUBTED BY —",
    options:["A FOOTNOTE","THE FOUNDER","NO ONE","EDITOR B, ALONE"], answer:0 }
];

/* --------------------------------------------------------------------------
   Reel-by-reel timeline (for the Reels study tool).
   Chapter titles, where given, follow the novel's own table of contents.
   Where a reel's exact chapter titles are not reproduced here, the movement
   is summarized rather than invented.
   -------------------------------------------------------------------------- */
RNS.FRAMES = [
  ["Publisher's Disclaimer","Four invented editors quarrel over whether to publish the book at all — staging the novel's eventual reviews in advance."],
  ["Cover-Letter to the Editors and Publisher","'J.B.' disclaims authorship: a young man, Stoker Giles, left him tapes said to be composed by WESCAC. The novel proper is those tapes."]
];
RNS.REELS = [
  { vol:"Volume One", reel:"First Reel — the goat-barns", known:false,
    chapters:[
      ["His kidship","George is raised as Billy Bocksfuss, a goat among goats, by Max Spielman on the experimental farm."],
      ["Lady Creamhair","A veiled visitor draws the boy toward the human world he doesn't yet know is his."],
      ["The death of Redfearn's Tommy","His beloved buck dies through his own fury — his first, unforgivable guilt."],
      ["He learns he is human","The intolerable revelation: Billy is no goat. He claims a name, George, and a destiny."]
    ],
    note:"Movement summarized: the novel's table of contents is not reproduced here for this reel, but its events are the pastoral childhood and its breaking."
  },
  { vol:"Volume One", reel:"Second Reel", known:true,
    chapters:[
      ["His propping and departure","George leaves the barns for the campus proper."],
      ["A fork in His road","Early choices on the way to matriculation."],
      ["George's Gorge","A passage and an appetite; the goat-boy meets the wider world."],
      ["Anastasia's history","The reader learns who Anastasia Stoker is, and what is done to her."],
      ["He bites Anastasia in the sidecar","A goatish, scandalous encounter en route — the body before the doctrine."],
      ["At the Power Plant","First descent into Stoker's domain of heat and disorder."],
      ["His Memorial Service in the Living Room","A premature elegy; the campus rehearses its treatment of would-be Tutors."]
    ]
  },
  { vol:"Volume One", reel:"Third Reel", known:true,
    chapters:[
      ["To the Pedal Inn","George gathers his strange company."],
      ["Peter Greene's life and loss of eye","The West's self-made optimist, and the wound behind the cheer."],
      ["His arrival at Main Gate","The threshold of New Tammany proper."],
      ["The Tragedy of Taliped Decanus","An entire Oedipus-parody is staged; George watches his own myth without recognizing it."],
      ["In the Observatory","Eierkopf and his night-glass; intellect peering at appetite."],
      ["Trial-by-Turnstile","The gate ordeal of matriculation."],
      ["Scapegoat Grate","The iron grid dispenses the seven-task Assignment: 'To Be Done At Once, In No Time.'"]
    ]
  },
  { vol:"Volume Two", reel:"First Reel — the rounds", known:true,
    chapters:[
      ["To Main Detention","Into Stoker's prison."],
      ["To the Clockworks","Toward the clock of the first task."],
      ["To the Light House and the University Council","Among the powers of West Campus."],
      ["To the NTC Infirmary","Where infirmities are diagnosed and mis-diagnosed."],
      ["To the Library","Toward the Founder's Scroll."],
      ["To WESCAC's Belly","The approach to the Finals."],
      ["To the Old Chancellor's Mansion","Among the Hectors, George's own disputed blood."]
    ]
  },
  { vol:"Volume Two", reel:"Second Reel — the first pass (differentiation)", known:true,
    chapters:[
      ["In Main Detention","Held, and thinking."],
      ["His departure from Main Detention","Released to begin the work in earnest."],
      ["He fixes the Clock","Task one, attempted under the doctrine of keeping things apart."],
      ["He ends the Boundary Dispute","Task two: harden the line. The campus curdles toward conflict."],
      ["He overcomes His infirmity","Task three: separate the goat from the man."],
      ["He sees through His Ladyship and re-places the Founder's Scroll","Tasks four and five, under the same hardening doctrine."]
    ],
    note:"This reel works the Assignment under the first answer — differentiation. The same tasks return, reinterpreted, as George's doctrine shifts."
  },
  { vol:"Volume Two", reel:"Third Reel — embrace, then the Belly", known:false,
    chapters:[
      ["The second pass: embrace","George reverses doctrine — merge everything — and the campus curdles the other way, toward Campus Riot III."],
      ["Max on Founder's Hill","Max Spielman, having confessed to a killing, is shafted as scapegoat; a goat of Redfearn's line drives Bray off, unmasking him as inhuman."],
      ["The Belly of WESCAC","The Finals: in darkness, with Anastasia, George stops choosing between the buttons. The paradox jams the machine."],
      ["Posttape, Postscript, footnote","Years later George dictates his story at thirty-three and one-third; the frames then dispute even that."]
    ],
    note:"Movement summarized: the exact chapter titles of the final reel are not reproduced here, but these are its events — the second doctrine's failure, the shafting, the Finals, and the receding frames."
  }
];

/* --------------------------------------------------------------------------
   Hero-pattern scorecard: Raglan's 22 incidents, George vs Oedipus.
   score: 2 = clearly fits, 1 = partial / inverted-with-comment, 0 = does not fit
   -------------------------------------------------------------------------- */
RNS.RAGLAN_INTRO = "Lord Raglan, in <cite>The Hero</cite> (1936), distilled the biography of the traditional hero into twenty-two recurring incidents and scored famous heroes against them (Oedipus scores near the top). Barth knew the checklist and built George to match it — sometimes exactly, sometimes by pointed inversion. Click any incident to see how each hero scores.";
RNS.RAGLAN = [
  ["The hero's mother is a royal virgin",
    {s:2, note:"Virginia R. Hector — her very name — daughter of the ex-Chancellor, made pregnant by no man but the computer WESCAC."},
    {s:2, note:"Jocasta, queen of Thebes."}],
  ["His father is a king",
    {s:1, note:"His 'father' is WESCAC, the sovereign machine that rules West Campus — kingship transposed to circuitry."},
    {s:2, note:"Laius, king of Thebes."}],
  ["Often a near relative of his mother",
    {s:1, note:"Paternity is deliberately tangled; WESCAC pervades everything, including the Hector line."},
    {s:0, note:"Laius and Jocasta are not blood kin."}],
  ["The circumstances of his conception are unusual",
    {s:2, note:"Eugenic insemination by a computer, under the GILES program. Few conceptions are stranger."},
    {s:1, note:"Ordinary conception, but shadowed from birth by prophecy."}],
  ["He is reputed to be the son of a god",
    {s:2, note:"Son of WESCAC — the campus's machine-deity — and rumored the engineered Grand Tutor."},
    {s:0, note:"Royal, but not reputed divine."}],
  ["An attempt is made, usually by the father or grandfather, to kill him",
    {s:2, note:"His grandfather, ex-Chancellor Reginald Hector, has the infant exposed to die."},
    {s:2, note:"Laius pierces the infant's feet and orders him exposed."}],
  ["He is spirited away",
    {s:2, note:"Rescued from the tapelift by G. Herrold, the booksweep."},
    {s:2, note:"Handed to a shepherd rather than killed."}],
  ["Reared by foster parents in a far country",
    {s:2, note:"Raised by Max Spielman among goats on the experimental farm, far from the Hectors."},
    {s:2, note:"Raised by Polybus and Merope in Corinth."}],
  ["We are told nothing of his childhood",
    {s:0, note:"Inverted on purpose: Barth gives us the long goat-barn childhood the pattern usually omits. The exception is the comment."},
    {s:2, note:"Standard blank: we learn nothing of the young Oedipus."}],
  ["On reaching manhood he returns to his future kingdom",
    {s:2, note:"He journeys to New Tammany and the Great Mall to matriculate and claim Grand Tutorhood."},
    {s:2, note:"He travels to Thebes."}],
  ["He is victor over the king, giant, dragon, or wild beast",
    {s:2, note:"He confounds WESCAC — the dragon-machine — by paradox, and passes the gate-ordeals."},
    {s:2, note:"He answers the Sphinx."}],
  ["He marries a princess, often daughter of his predecessor",
    {s:1, note:"His union with Anastasia in the Belly is the structural 'marriage' — incest-shadowed, like the model, her kinship to him left murky."},
    {s:2, note:"He marries Jocasta, the dead king's widow — and his mother."}],
  ["He becomes king",
    {s:1, note:"He is acclaimed Grand Tutor — then doubted, displaced, and disputed."},
    {s:2, note:"He becomes king of Thebes."}],
  ["For a time he reigns uneventfully",
    {s:0, note:"Inverted: his 'reign' is pure event — his doctrines sow chaos and help bring on Campus Riot III."},
    {s:1, note:"He rules Thebes for years before the plague."}],
  ["He prescribes laws",
    {s:2, note:"He issues his successive teachings — differentiate, embrace, transcend — as campus doctrine."},
    {s:1, note:"He governs and decrees, notably the hunt for Laius's killer."}],
  ["Later he loses favor with the gods or his subjects",
    {s:2, note:"His teaching curdles; studentdom turns; disciples distort him into 'Gilesianism.'"},
    {s:2, note:"The plague and the truth turn Thebes against him."}],
  ["He is driven from throne and city",
    {s:2, note:"Arrested, held forty weeks in the Nether Campus; later withdrawn and weary."},
    {s:2, note:"He is exiled from Thebes."}],
  ["He meets with a mysterious death",
    {s:1, note:"Deferred and disputed: in the Posttape he expects to be shafted; the frames then unsettle even his existence."},
    {s:2, note:"His uncanny passing at Colonus."}],
  ["Often at the top of a hill",
    {s:2, note:"Founder's Hill is the campus's shafting-place — where Max dies, and where George expects to."},
    {s:2, note:"Colonus, a sacred height."}],
  ["His children, if any, do not succeed him",
    {s:2, note:"His 'children' are his disciples, who succeed him only by distorting him into an -ism."},
    {s:2, note:"His sons destroy each other."}],
  ["His body is not buried",
    {s:2, note:"There is no body and no grave — only contested tape, which the Postscript and footnote refuse to authenticate."},
    {s:2, note:"He has no known tomb."}],
  ["Nevertheless he has one or more holy sepulchres",
    {s:2, note:"Gilesianism's shrines — and the Revised New Syllabus itself, venerated as relic."},
    {s:2, note:"He is honored with hero-cult at Colonus."}]
];

/* Campbell monomyth, compact — highlight the literal 'Belly of the Whale' */
RNS.CAMPBELL_INTRO = "Joseph Campbell's <cite>The Hero with a Thousand Faces</cite> (1949) describes a single 'monomyth' the hero passes through. Barth follows it closely — and at one stage stops following and starts <em>literalizing</em>: Campbell's metaphor 'the Belly of the Whale' becomes, in this book, an actual chamber inside the computer.";
RNS.CAMPBELL = [
  ["Call to Adventure","George learns he is human, and possibly the engineered GILES."],
  ["Supernatural Aid","Max Spielman, and WESCAC's gnomic readouts."],
  ["Crossing the Threshold","The Trial-by-Turnstile and the Scapegoat Grate."],
  ["Belly of the Whale","Taken literally: the Belly of WESCAC, where the Finals are faced.", true],
  ["Road of Trials","The seven-task Assignment, worked three times over."],
  ["Meeting the Goddess / Temptation","Anastasia, in all her contested meanings."],
  ["Atonement with the Father","The reckoning with WESCAC, the machine-father."],
  ["Apotheosis","Acclaim as Grand Tutor — the messiah generated from the manual."],
  ["The Ultimate Boon","The unsayable third answer, won in the dark."],
  ["The Magic Flight / Return","Driven out, held, and finally withdrawn to dictate the tape."],
  ["Master of Two Worlds","Tutor of pass-and-fail — and of neither."],
  ["Freedom to Live","The weary Posttape, expecting the shaft, telling it anyway."]
];

/* --------------------------------------------------------------------------
   The Tragedy of Taliped Decanus — beat-by-beat against Oedipus Rex
   -------------------------------------------------------------------------- */
RNS.TALIPED_INTRO = "Barth stops the novel to stage a complete play in campus idiom: <cite>The Tragedy of Taliped Decanus</cite>. 'Taliped' is from <em>talipes</em>, clubfoot; 'Decanus' is Latin for dean. It is <cite>Oedipus Rex</cite> in academic regalia, and George watches it without seeing himself. Step through the parallels.";
RNS.TALIPED = [
  ["A blight lies on Cadmus College; nothing graduates.","Thebes is struck by plague; crops, herds, and women are barren.","Both open in sterility — a polluted institution that cannot bring anything to term."],
  ["An oracle declares the blight will lift only when the old Dean's killer is expelled.","Apollo's oracle: the plague will lift when King Laius's murderer is driven out.","The cure is the discovery of a hidden crime — the investigation IS the plot."],
  ["Taliped, the clubfoot Dean, vows publicly to hunt the polluter down.","Oedipus vows to find Laius's killer, cursing him unknowingly.","The investigator swears an oath that will fall on his own head."],
  ["A blind seer is dragged in and accuses Taliped himself.","Tiresias, blind, tells Oedipus he is the man he seeks.","Blindness that sees the truth; sight that cannot. The seer is right and disbelieved."],
  ["Taliped smells a conspiracy and rages at a kinsman-rival.","Oedipus accuses Creon of plotting with Tiresias.","Fury at the messenger; the hero's pride deflecting the closing trap."],
  ["Word comes of a death elsewhere, and of a foundling whose feet were once pinned.","The Corinthian messenger brings news of Polybus's death — and the secret of the pierced ankles.","The clue is in the wounded feet — the name itself (Oedipus / Taliped) is the evidence."],
  ["The herdsman who exposed the infant is found and made to speak.","The Theban shepherd, who pitied the baby, is forced to confess.","The lowest witness holds the highest secret; the truth comes from below."],
  ["Recognition: Taliped is the killer, the son, the husband — all at once.","Oedipus realizes he killed his father and married his mother.","Anagnorisis: every separate fact collapses into one unbearable identity."],
  ["Self-ruin and expulsion; the Dean puts out the eyes that would not see.","Oedipus blinds himself and is led into exile.","Knowledge arrives as catastrophe; the seeing organ is destroyed."],
  ["George laughs in the Amphitheatre, not yet knowing the play is his.","The audience pities a fate the gods arranged before the curtain.","The deepest parallel is the watcher: dramatic irony turned outward, onto George — and onto you."]
];

/* --------------------------------------------------------------------------
   Three-Doctrines replay: scenarios, each tried three ways
   -------------------------------------------------------------------------- */
RNS.DOCTRINE_INTRO = "George works his Assignment three times, under three philosophies. Pick a live case and apply each in turn. Notice that the first two are mirror-image failures — and that the third is not a third rule but a refusal to treat the choice as the whole of the matter.";
RNS.DOCTRINES = [
  { id:"boundary", title:"The Boundary Dispute", prompt:"Where exactly does West Campus end and East Campus begin? Studentdom waits on your ruling.",
    differentiate:["Draw the line harder. Fortify it. A boundary is a truth; defend it absolutely.",
      "Outcome: the border bristles, each side mirrors the other's fear, and the campus inches toward Campus Riot III. Purity of distinction breeds war."],
    embrace:["Erase the line. East and West are one; let the campuses merge and the dispute dissolve.",
      "Outcome: identity dissolves with the border; no one is safe because no one is anyone. Pure union is its own kind of annihilation."],
    transcend:["The line is a tool, not a truth. Keep it — lightly. Neither worship the boundary nor abolish it; use it where it serves and forget it where it doesn't.",
      "Outcome: no slogan, no settlement to frame on a wall — only the working wisdom that boundaries are instruments. This is the answer the machine can't print."]
  },
  { id:"ladyship", title:"Your Ladyship (Anastasia)", prompt:"Anastasia refuses no one anything. Is her bottomless giving holiness or pathology? Rule on her.",
    differentiate:["Sort the saint from the sinner. Condemn the giving as mere license; separate her cleanly into categories.",
      "Outcome: she becomes a scapegoat for everyone's appetite, and your 'clarity' is just cruelty wearing a robe."],
    embrace:["Sanctify all of it. If giving is holy, then refuse nothing and bless everything she does and is.",
      "Outcome: 'sainthood' becomes a license others exploit; embracing everything abandons her to it. Indiscriminate yes is its own betrayal."],
    transcend:["Stop trying to see THROUGH her. See BY her. Love is not a verdict you reach about a person; it is not a position at all.",
      "Outcome: the task's pun comes open — 'see through your Ladyship' meant see by means of her. There is nothing here to rule on, only someone to know."]
  },
  { id:"infirmity", title:"Your Infirmity (goat and man)", prompt:"You walk and hunger like a goat. Your tutors say: cut out the animal, or else worship it. Decide.",
    differentiate:["Amputate the goat. Be pure man — separate the human cleanly from the beast and discard the beast.",
      "Outcome: self-mutilation dressed as self-improvement. You can't subtract half of yourself and call the remainder whole."],
    embrace:["Be all goat, then — pure appetite, pure body, no shame and no mind.",
      "Outcome: that road ends at Croaker: body without intellect, a person dissolved into hunger. Pure embrace erases the self too."],
    transcend:["Refuse the division itself. The goathood is not the obstacle to your humanity — it is the evidence of it. You are not two things to be sorted.",
      "Outcome: the infirmity and the gift turn out to be the same organ. 'Overcome your infirmity' meant: overcome the belief that you are divisible."]
  }
];

/* --------------------------------------------------------------------------
   Mottoes, shown rotating in the masthead
   -------------------------------------------------------------------------- */
RNS.MOTTOES = [
  "The Syllabus is not the Tutor.",
  "To be done at once, in no time.",
  "The tock is silent.",
  "Boundaries are tools, not truths.",
  "Beware the Tutor who certifies cheaply.",
  "Ontogeny recapitulates cosmogeny.",
  "Read it twice: once for the joke, once for the grief."
];
