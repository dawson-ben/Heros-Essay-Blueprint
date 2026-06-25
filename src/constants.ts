/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PromptField, AntiPatternCard, GuideChapter } from './types';

export const HEROS_JOURNEY_PROMPTS: PromptField[] = [
  // Phase 1: The Heart
  {
    id: 'story_selection',
    label: '1. Working Title or Tagline',
    description: 'Give your story a quick, memorable title or a short tagline just to remind yourself what you\'re writing about.',
    placeholder: 'e.g., The "Camp Counselor" Story, or "The three-day syntax error panic"...',
    tip: 'Avoid trying to write everything yet. Focus on a single slice of time where something interesting happened.',
    examples: [
      { title: 'The Camp Counselor Story', text: 'The Science Director resigned mid-summer, and the camp director put me in charge of twenty highly distracted ten-year-olds in the Science Shed.' },
      { title: 'The Burnt Cake Story', text: 'Ruining a five-layered custom birthday cake an hour before the party guests arrived and holding nothing but a smoky kitchen towel.' }
    ]
  },
  {
    id: 'transformation_formula',
    label: '2. How did you change?',
    description: 'Fill in the core equation of your growth: "I used to be [blank], but after [this story], I became [blank]."',
    placeholder: 'I used to be a shy perfectionist who feared making mistakes before my peers, but after taking over the camp program unexpectedly, I became an engaged, resilient leader who embraces organic chaos in order to foster genuine discovery.',
    tip: 'Focus on transformations of character, self-identity, or mindset rather than external awards.',
    pitfallWarning: 'Avoid the "Kuzco trap" (going from selfish to marginally less selfish) or claiming you went from a cheater to an honest person.',
    examples: [
      { title: 'Camp Counselor Formula', text: 'I used to be a silent micro-manager of lists and supplies who dreaded public uncertainty, but after teaching density under a blazing sun, I became a dynamic leader who values messy, active curiosity over textbook lectures.' }
    ]
  },
  {
    id: 'essential_belief',
    label: '3. What is the Elixir? (Your Essential Belief)',
    description: 'The Elixir is the deeper lesson, mindset, or new worldview that you now carry with you.\nNot sure yet? Ask yourself: What do mentors or friends say is unique about how you approach life? Is there a story about how you developed it? How are you different than you were a few years ago?',
    placeholder: 'e.g. "Messy discovery is stickier than a tidy lecture," or "Patience is like an isometric wall-sit; it requires quiet, immense effort."...',
    tip: 'This is the guiding philosophy of your essay. It represents the inner values that dictate your choices.',
    suggestedWeight: 0.10,
    examples: [
      { title: 'Pedagogical Shift', text: 'Messy, organic discovery sticks to the mind much longer than a polished, passive lecture.' }
    ]
  },
  {
    id: 'magic_elixir',
    label: '4. Applying the Elixir (Optional)',
    description: 'How do you or will you apply this earned wisdom to benefit your classmates, family, community, or the world?',
    placeholder: 'e.g., "I bring this experimental, Saturday-engineering mindset to your materials research labs, eager to treat failures as data points rather than stop signs."',
    tip: 'Connect your internal change to your actions at college. Do not just say "I want to major in Biology." Frame it as an active promise of character.',
    tools: ['montage'],
    examples: [
      { title: 'Classroom Integration', text: 'I bring this experimental, Saturday-engineering mindset to your materials research labs, eager to treat failures as data points rather than stop signs.' }
    ]
  },
  // Phase 2: The Setup
  {
    id: 'ordinary_world',
    label: '5. The Ordinary World',
    description: 'Describe where you started (your safe, familiar comfort zone, routine, or mindset).',
    placeholder: 'e.g. Quiet supply room with structured list inventories...',
    tip: 'Define the "before" state so the reader can measure your psychological transformation.',
    suggestedWeight: 0.05,
    tools: ['montage'],
    examples: [
      { title: 'The Comfort Zone', text: 'My quiet bedroom, writing lines of code where errors can be frictionlessly deleted in private.' }
    ]
  },
  {
    id: 'unfamiliar_world',
    label: '6. The Unfamiliar World',
    description: 'Describe the chaotic, unpredictable, or challenging new world you were forced to navigate.',
    placeholder: 'e.g. The muddy shore of Lake George with twenty screaming kids...',
    tip: 'Show the visual and environmental contrast to emphasize the psychological distance you had to cross.',
    suggestedWeight: 0.05,
    tools: ['montage'],
    examples: [
      { title: 'The Shock of the New', text: 'Standing on a stage with a flickering projector, explaining debugging to fifty impatient local business owners.' }
    ]
  },
  {
    id: 'inciting_incident',
    label: '7. What was the Inciting Incident?',
    description: 'What broke your status quo and called you out of your comfort zone?',
    placeholder: 'e.g., The head developer contracted flu, leaving the codebase in my hands; or my sister volunteered me to speak...',
    tip: 'In literature, this is Katniss volunteering or Hagrid breaking the door down. In an essay, it is the unexpected change that forces a choice.',
    suggestedWeight: 0.05,
    tools: ['bullet_time'],
    examples: [
      { title: 'The Spark', text: 'The Science Instructor packed their bags overnight. The director handed me a key ring and said, "You teach science at 9:00 AM."' }
    ]
  },
  {
    id: 'hesitation_doubt',
    label: '8. How did you hesitate or doubt yourself?',
    description: 'Explain your internal hesitation. Why did you want to cling to your Ordinary World? Vulnerability makes you highly relatable.',
    placeholder: 'e.g. I felt like an imposter. I secretly hoped they would cancel the class so I could go back to sorting folders...',
    tip: 'Action stars who go into battles without fear are boring. Admissions readers love hearing about your genuine doubts.',
    suggestedWeight: 0.05,
    tools: ['bullet_time'],
    examples: [
      { title: 'The Imposter Fear', text: 'I stared at the "Science Leader" lanyard. I was convinced someone would tap me on the shoulder, expose me as a fraud who barely survived high school chemistry, and send me back.' }
    ]
  },
  {
    id: 'crossing_threshold',
    label: '9. The Commitment',
    description: 'Describe the precise moment you made the commitment. You stepped through the door, with no turning back.',
    placeholder: 'e.g. I unlocked the Science Shed, turned on the hum of the fluorescent bulb, and signed my name on the board.',
    tip: 'This is the active crossing point. Make it physical!',
    suggestedWeight: 0.05,
    tools: ['bullet_time'],
    examples: [
      { title: 'Crossing the Threshold', text: 'I walked down the pine path, pushed open the squeaking wooden door of the Science Shed, and set up twenty plastic cups. I wrote "LET’S BREAK THINGS" across the slate chalkboard.' }
    ]
  },
  // Phase 3: The Climax
  {
    id: 'stakes_risk',
    label: '10. What was at risk?',
    description: 'What quiet, internal, or emotional stakes were on the line? Avoid life-or-death drama.',
    placeholder: 'e.g. My credibility as an organizer, my ego as an all-powerful leader, my friendship, or my own confidence...',
    tip: 'Pixar Rule: We admire a character more for trying than for succeeding. Keep risks completely grounded.',
    pitfallWarning: 'Do NOT claim a mundane event was a "life-or-death" tragedy.',
    suggestedWeight: 0.05,
    examples: [
      { title: 'Risking Ego / The Icon', text: 'If I admitted I didn’t know the answer to the student\'s physics question, I risked shattering my fragile image as the flawless, all-wise tutoring coordinator.' }
    ]
  },
  {
    id: 'the_ordeal_flat',
    label: '11. The Key Complication',
    description: 'Describe the pivot or unexpected complication of your story—the moment where things got particularly difficult or confusing. Keep it honest and scaled down.',
    placeholder: 'e.g. Mid-lesson, everything descended into chaos. The chemical experiment bubbled over the tabletop, and the campers began throwing things while the supervisor watched from the doorway.',
    tip: 'Do NOT inflate this into a life-or-death battlefield! Grounded honesty is far more compelling.',
    suggestedWeight: 0.15,
    tools: ['bullet_time'],
    examples: [
      { title: 'The Teaching Disaster', text: 'Twenty campers were yelling, index cards were littering the wet deck, and my theoretical lecture on buoyancy had entirely crumbled. I was standing there mute, holding a soggy box of baking soda.' }
    ]
  },
  {
    id: 'the_catalyst',
    label: '12. The Catalyst',
    description: 'What internal realization, memory, piece of advice, or core value did you suddenly grasp when you were stuck? This is your catalytic "magic talisman"—the mental tool that gave you the clarity to act.',
    placeholder: 'e.g. I remembered my dad\'s Saturday challenges. I realized I didn\'t need to be professional; I just needed to look at it as a game...',
    tip: 'Ensure this is an internal shift. If your mother, a teacher, or a random stroke of luck swoops in to solve the problem for you, it drains your narrative tension. The Catalyst is an idea you choose to embrace.',
    suggestedWeight: 0.05,
    examples: [
      { title: 'Recalling Father\'s Wisdom', text: 'I remembered Saturday mornings in the garage. Dad never lectured me on physics; he just gave me cardboard and tape. I realized I needed to stop lecturing and start building.' }
    ]
  },
  {
    id: 'winning_action',
    label: '13. The Winning Action',
    description: 'Describe the specific, agency-driven choice you made to overcome the complication. What did you actually do, physically or verbally, to solve the problem?',
    placeholder: 'e.g. I threw the lesson plan into the recycling bin and asked who wanted to launch water-bottle rockets.',
    tip: 'Use active verbs. Show us the messy work of fixing the issue rather than skipping straight to the victory.',
    suggestedWeight: 0.10,
    tools: ['bullet_time'],
    examples: [
      { title: 'Active Intervention', text: 'I threw the wet lectures into the bin, grabbed a knife, cut a watermelon in half, and shouted, \'We are going to see what floats!\'' }
    ]
  },
  {
    id: 'the_payoff',
    label: '14. The Payoff',
    description: 'What was the immediate, short-term result of your action?',
    placeholder: 'e.g. The campers stopped yelling, sat in a circle in the mud, and successfully guessed the density of five different fruits.',
    tip: 'Keep this brief. The scoreboard victory or the repaired object is just the bridge to your real transformation (The Elixir).',
    suggestedWeight: 0.05,
    examples: [
      { title: 'Immediate Result', text: 'The campers stopped yelling, sat in a circle in the mud, and successfully guessed the density of five different fruits.' }
    ]
  }
];

export const DIFFERENT_BUT_TRUTHFUL_PROMPTS: PromptField[] = [
  {
    id: 'authenticity_declaration',
    label: '1. The Silent Admission',
    description: 'Break down the polished, flawless applicant facade. Introduce yourself with an honest, striking moment of absolute vulnerability—focusing on a quiet, underrepresented trait.',
    placeholder: 'e.g., "I am not the roaring captain of the debate team. When the zoom lights focus on me, my voice initially slips into a quiet octave. I am the logistical architect behind the team transcripts..."',
    tip: 'Start with a humble, distinctive admission that breaks free from typical bragging and displays comfortable self-acceptance.',
    pitfallWarning: 'Never use fake self-criticism like "My only flaw is caring too much".',
    suggestedWeight: 0.15,
    tools: ['montage'],
    examples: [
      { title: 'The Logistician', text: 'My name is not on the front of any school awards... Instead, my high school career was written in the margins: sorting supply folders, building the structural spreadsheets that held active student initiatives together, and listening to the chaos from the shadows.' }
    ]
  },
  {
    id: 'dt_tipping_point',
    label: '2. The Tipping Point',
    description: 'Pinpoint a specific scene where this under-the-radar trait was tested by friction or reality. Note: A quiet, unexpected complication is far more honest than a melodramatic life-or-death crisis.',
    placeholder: 'e.g., "During the annual food drive, the primary logistics software crashed. I stood surrounded by 400 unsorted boxes. My silent nature meant I hesitated to shout for order. I had to learn to command attention silently..."',
    tip: 'Set the physical scene.',
    suggestedWeight: 0.20,
    tools: ['bullet_time'],
    examples: [
      { title: 'The Tipping Point', text: 'During the school clothing drive, the tracking server crashed, leaving us with three hundred garbage bags of unsorted donor garments piled high in the library hallway...' }
    ]
  },
  {
    id: 'real_stories_triumph',
    label: '3. The Unseen Labor',
    description: 'Detail the precise, messy, hands-on steps you took to handle this friction. Avoid grand savior speeches; show us the work.',
    placeholder: 'e.g., "I realized leadership did not require a megaphone. I sat down on the floor and began grouping the boxes by zip codes..."',
    tip: 'Focus heavily on verbs.',
    suggestedWeight: 0.20,
    tools: ['bullet_time'],
    examples: [
      { title: 'The Watermelon Incident / Quiet Action', text: 'I threw the rigid lecture script into the bin. I grabbed a dry marker, wrote "DENSITY" in big letters across the side of a large green watermelon, and marched everyone down to the lake shore with a simple question: Will it float?' }
    ]
  },
  {
    id: 'reflection_lessons',
    label: '4. The Messy Spectrum Reflection',
    description: 'Analyze how this event redefined your sense of contribution. Why does modern human growth happen on a continuous, messy spectrum of effort rather than clean storybook beats?',
    placeholder: 'e.g., "Watching that watermelon bob on the lake as twenty kids screamed in wonder taught me that leadership does not belong to the loudest voice in the room..."',
    pitfallWarning: 'Watch out for over-fitting your growth.',
    suggestedWeight: 0.20,
    tools: ['montage'],
    examples: [
      { title: 'Redefining Leadership', text: 'Watching that watermelon bob on the lake as twenty kids screamed in wonder taught me that leadership does not belong to the loudest voice in the room. It belongs to the person who can curate an arena of shared curiosity.' }
    ]
  },
  {
    id: 'authenticity_promise',
    label: '5. The Quiet Integration',
    description: 'Connect your humble, tested trait directly to how you will support or enrich your future college campus, academic lab, or dorm circle.',
    placeholder: 'e.g., "I promise to bring this quiet, detail-focused engineering philosophy to your robotic labs. I am the collaborator who keeps the lab quiet but highly operational..."',
    tip: 'Frame this as a modest promise. Avoid sounding like a savior.',
    suggestedWeight: 0.25,
    tools: ['montage'],
    examples: [
      { title: 'The Promise to College', text: 'I bring this Saturday garage spirit to your undergraduate research programs. I am not the student who will lecture my peers; I am the collaborator who will help assemble the experimental rigs...' }
    ]
  }
];

export const INTELLECTUAL_JOURNEY_PROMPTS: PromptField[] = [
  {
    id: 'ij_obsession',
    label: '1. The Intellectual Spark',
    description: 'What specific puzzle, idea, paradox, historical question, or scientific loop keeps you up at night? Do not write a generic summary of "loving biology"—show us the specific "itchy" question or contradiction you had to explore.',
    placeholder: 'e.g. Why do some systems thrive on entropy? Trying to reconcile dual-aspect monism, or becoming preoccupied by the environmental history of natural preserves...',
    tip: 'Focus on the organic curiosity. Let us hear your human voice.',
    suggestedWeight: 0.20,
    tools: ['montage'],
    examples: [
      { title: 'The Entropy Obsession', text: 'I became obsessed with the concept of thermal decay in closed systems. Thermodynamics said that disorder always wins, yet biological life does nothing but assemble itself into meticulous, hyper-organized shapes.' }
    ]
  },
  {
    id: 'ij_dissonance',
    label: '2. Complicating the Theory',
    description: 'As you pursued this obsession, what unexpected counter-evidence, philosophical tension, or societal paradox emerged that disrupted your initial simplistic view?',
    placeholder: 'e.g. The data completely contradicted my assumption. I read a critique that jarred my entire perspective on physical systems...',
    tip: 'Intellectual maturity is shown when you accept that your favorite theories are messy or incomplete.',
    suggestedWeight: 0.20,
    tools: ['bullet_time'],
    examples: [
      { title: 'Entropy and Social Systems', text: 'I tried to map thermodynamic entropy onto high school volunteer associations, assuming chaotic groups would collapse. Instead, I discovered that rigid micro-management drove students away...' }
    ]
  },
  {
    id: 'ij_pivot',
    label: '3. The Synthesizing Pivot',
    description: 'How did you reconcile this tension? Describe your logical thought process or analysis. What new mental model did you construct?',
    placeholder: 'e.g. I reconciled these opposing forces by synthesizing structural linguistics with sociology... I realized order and chaos are not enemies, but...',
    tip: 'Show us the step-by-step gears of your mind solving the complication. Avoid cinematic cliches like "suddenly I had a eureka moment!"',
    suggestedWeight: 0.25,
    tools: ['bullet_time'],
    examples: [
      { title: 'Controlled Disequilibrium', text: 'I formulated a system model I call "Controlled Disequilibrium." I stopped trying to eliminate the chaos in our debate archives; instead, I created a wiki where anyone could drop disorganized scraps...' }
    ]
  },
  {
    id: 'ij_paradigm',
    label: '4. The Intellectual Paradigm Shift',
    description: 'What deeper truth do you now believe about how knowledge is formed, or how human beings interact with complex ideas?',
    placeholder: 'e.g. Nuance is not hesitation; it is observation. Intellectual progress is not about finding clean answers, but about having the stomach to...',
    tip: 'Formulate a genuine philosophical position. Avoid high-sounding academic fluff.',
    suggestedWeight: 0.15,
    tools: ['montage'],
    examples: [
      { title: 'The Strength of Ambiguity', text: 'True intellectual courage lies not in finding an unshakeable thesis, but in welcoming the complication that threatens to dismantle it. Nuance is not hesitation; it is observation.' }
    ]
  },
  {
    id: 'ij_promise',
    label: '5. The Laboratory Promise',
    description: 'How will you apply this specific mode of enquiry and love of analytical complexity on our campus, in seminars, or in collaborative research labs?',
    placeholder: 'e.g. I bring this appetite for paradox to your critical theory seminars. I am the student who will question our consensus...',
    tip: 'Speak directly about academic dynamics. Frame your brain as a collaborative asset.',
    suggestedWeight: 0.20,
    tools: ['montage'],
    examples: [
      { title: 'The CS Lab', text: 'I bring this experimental, chaos-embracing outlook to your systems engineering labs. I am excited to join projects where the compilers are breaking and the manuals are outdated...' }
    ]
  }
];

export const ANTI_PATTERNS: AntiPatternCard[] = [
  {
    id: 'resume_repeat',
    trap: 'The Resume Repeat',
    explanation: 'Listing accomplishments or extracurriculars in prose. This gives details but lacks a human soul.',
    fix: 'Choose a single slice of time. Select one specific moment that illustrates your values.',
    exampleBad: 'I have participated in Robotics for three years, serving as Secretary...',
    exampleGood: 'For three days, our robot, Barnaby, did nothing but spin in dizzying clockwise circles. As Secretary, I didn\'t build the wheels; instead, I stood over our lead programmer with a plate of lukewarm pizza...'
  },
  {
    id: 'voluntourism',
    trap: 'The "Voluntourism" Savior',
    explanation: 'Writing about traveling to a developing nation, helping residents, and realizing "I was the lucky one."',
    fix: 'Focus on a specific, micro-interaction where you personally failed, felt awkward, or were challenged. Make it about a relationship, not your own hollow virtue.',
    exampleBad: 'When I traveled to Guatemala to paint houses, I looked at the poor children... I realized how privileged I was...',
    exampleGood: 'Juana, aged nine, watched me paint her kitchen wall for ten minutes before snatching the roller. My expensive paint strokes were dripping badly; with three quick, practiced sweeps of her wrist, she smoothed my mess.'
  },
  {
    id: 'sports_highlight',
    trap: 'The Sports Highlight Reel',
    explanation: 'Describing the breathtaking final winning goal or winning the big championships.',
    fix: 'The physical scoreboard is boring. Read about the recovery, the hours spent on the bench, or the hard locker room leadership struggle.',
    exampleBad: 'The clock clicked down to five seconds. I took the ball, crossed over the defender... and floated the game-winning layup...',
    exampleGood: 'A torn ACL relegated me to a clipboard coordinator. From the bench, I didn\'t watch the ball; I watched our sophomore guard\'s shoulders. I learned to spot the exact moment her posture slumped...'
  },
  {
    id: 'trauma_dump',
    trap: 'The Trauma Dump',
    explanation: 'Sharing a highly painful event or raw tragedy and stopping there.',
    fix: 'Focus on the scar, not the wound. Devote 70% of your narrative to recovery, agency, and growth, and only 30% to the pain.',
    exampleBad: 'My leg was shattered in three places, and I spent six months in agonizing traction, crying every night...',
    exampleGood: 'The hospital traction rig became my library. Confined to a metal frame for six months, I couldn\'t walk, so I read. I taught myself intermediate Spanish using audiobook tapes...'
  },
  {
    id: 'passive_protagonist',
    trap: 'The Passive Protagonist',
    explanation: 'The student acts as a narrator of events that happened to them, rather than an active protagonist making choices. Things are solved by parents or luck.',
    fix: 'Make "I" the active grammatical subject of your sentences. Show yourself making hard decisions and actively picking up the pieces.',
    exampleBad: 'Eventually, the science instructor returned and showed us how to do the volcano experiment safely.',
    exampleGood: 'I threw the wet lectures into the bin. I grabbed a knife, cut a watermelon in half, and shouted, "We are going to see what floats!" I had to make the classroom up as I walked.'
  }
];

export const HANDBOOK_CHAPTERS: GuideChapter[] = [
  {
    id: 'blank_page',
    title: 'The Curse of the Blank Page',
    subtitle: 'Why starting with a plan is the secret to compelling writing',
    icon: 'Feather',
    tags: ['Introduction', 'The Blank Page', 'Planning'],
    content: `Writing college application essays is usually the most stressful part of the admissions process. It doesn't have to be. Students often make it harder–and their essays worse–by starting to type before they have a plan. The result? A rambling list of achievements or activities that isn't persuasive or memorable.

Admissions officers read thousands of files filled with impressive clubs, awards, and grades. These lists blur together because they provide data, not emotion. If you want to stand out, do what humans have done for millennia to connect with one another: tell a story. A resume tells them what you did. A story tells them who you are.`
  },
  {
    id: 'directors_chair',
    title: 'The Director’s Chair',
    subtitle: 'Structuring your essay like a screenplay',
    icon: 'Clapperboard',
    tags: ['Scriptwriting', 'Aesthetics', 'Storytelling'],
    content: `Think of writing your college application essays like making a movie. Most applicants try to be the director without a script, which is stressful and usually flops. They grab the camera and start filming random scenes—a trophy here, a club meeting there—hoping it magically makes sense in the editing room. They end up with a shaky, chaotic "highlight reel" that bores the audience.

A great director starts with a screenplay. She knows the ending before she films the beginning. She knows why a scene matters before she includes it.

### The Escalation Trap:
The most common trap for driven students is Forced Escalation—the belief that you need to make a mundane experience look like a life-or-death crisis. This leads to cartoonish melodrama. The external stakes aren’t nearly as interesting as the internal ones. You don’t need to fight a supervillain, save the world, or even save the day. Invulnerable superheroes are boring. If Superman doesn't have Kryptonite and the real possibility of losing, there's nothing to root for. What readers really want is to see your inner struggle and transformation. Keep your focus on your real, everyday feelings rather than exaggerated drama.`
  },
  {
    id: 'needs_a_story',
    title: 'Does the Prompt Need a Story?',
    subtitle: 'Triage your prompts to choose the right strategy',
    icon: 'Triage', // Using standard icon mapping maybe
    tags: ['Prompts', 'Strategy', 'Story vs. Logic'],
    content: `Not every college essay prompt requires a full narrative arc. You can categorize prompts into three different types to guide your approach:

* **Story-Driven Prompts (Narrative Essential):** These ask about identity, failure, growth, or a realization (e.g., "recount a time," "what did you learn"). This is where you use the Hero's Journey framework that we’ll cover next.
* **Analytical & Intellectual Prompts (Exposition Essential):** These are highly reflective, theoretical, or philosophical essays. They don't fit into standard "Once upon a time" story beats. Analytical thought and cognitive exploration should take priority over cinematic action. Use the Intellectual Journey track here.
* **Non-Story Prompts (Logic & Research Essential):** These require direct explanations of financial details, logistical updates, or specific academic theories. They demand facts, reasoning, and research rather than a narrative arc.`
  },
  {
    id: 'heros_journey_chapter',
    title: 'The Hero’s Journey',
    subtitle: 'Understanding the universal pattern of human psychology',
    icon: 'Compass',
    tags: ['Hero\'s Journey', 'Campbell', 'Narrative Beats'],
    content: `Joseph Campbell identified a pattern in great stories that spans cultures and centuries. In these stories, we see consistent "narrative beats" that resonate with human psychology:

1. **The Ordinary World:** We meet the hero in their normal, safe life. We get hints of how this comfort zone is quietly restrictive or flawed.
2. **The Inciting Incident:** The call to adventure. A problem or event disrupts the status quo, inviting or forcing the hero outside their comfort zone.
3. **Doubts & Hesitation:** The hero fears the unknown or is reluctant to change, often asking, "Why me?" Admitting your hesitation builds trust with the reader.
4. **The Commitment:** The hero commits to the journey and actively crosses the threshold into the unfamiliar world.
5. **The Unfamiliar World:** The hero faces challenges, handles everyday friction, fails a few times, and learns to work with allies.
6. **The Ordeal (Grounded Climax):** The moment of greatest vulnerability. This is a quiet moment of self-doubt or a simple mistake, not a life-or-death crisis.
7. **The Catalyst:** The specific insight, memory, piece of advice, or core value the hero remembers or embraces at their lowest point. This is the internal tool that unlocks their ability to move forward.
8. **The Winning Action:** The specific, agency-driven choice the hero makes to overcome the Ordeal. What did you actually do to solve the problem?
9. **The Payoff:** The immediate, short-term prize of your winning action (e.g., winning the game, getting the grade, fixing the car).
10. **The Elixir (The Return):** The long-term transformation and the real prize. The hero returns home with new power, perspective, or wisdom to benefit their community.

### Important: Beware the Melodrama Trap
Writers often feel pressure to turn the Ordeal into an action-movie explosion. But you don’t need a massive, fiery disaster to make a compelling story. Remember that internal stakes are always more important than external ones. Confronting or defying other people's perceptions of you isn’t nearly as transformative, or as courageous, as confronting your own limiting beliefs about yourself.`
  },
  {
    id: 'intellectual_journey_chapter',
    title: 'The Intellectual Journey',
    subtitle: 'For the analytical, philosophical, and scientific mind',
    icon: 'GraduationCap',
    tags: ['Scholarship', 'Philosophy', 'Paradox', 'Logic'],
    content: `Many brilliant, high-achieving applicants don't have a blockbuster "Hero's Journey" event—and forcing your love for coding or history into a dramatic, action-packed story, it ends up feeling fake and misses the real point of your growth. Real human growth frequently exists on a continuous, messy spectrum rather than in strictly discrete categories of "before" and "after". If you are writing about a book, a scientific curiosity, an artistic theory, or a philosophical concept, your progress is marked by growing analytical depth rather than physical, cinematic events.`
  },
  {
    id: 'pixar_rules',
    title: 'The Pixar Principles',
    subtitle: 'The physics of emotional resonance',
    icon: 'Sparkles',
    tags: ['Pixar', 'Stakes', 'Belief'],
    content: `* **Set Up the Stakes:** If nothing is at risk, your readers won't care whether you succeed or fail. The stakes don't need to be life-and-death, but we must understand why the outcome matters to you personally.
* **Admire the Struggle:** We admire a character vastly more for trying and struggling than for their effortless successes. Show us the sweat, the mistakes, and the dirty details. Perfection is alienating; struggle is relatable.
* **The Burning Belief:** What is the core belief burning inside you that this story illustrates? A story about a summer camp is just an anecdote. A story about your belief that "messy discovery is stickier than a tidy classroom" is a powerful statement of your values.`
  },
  {
    id: 'cinematic_writing',
    title: 'Cinematic Techniques',
    subtitle: 'Directing your essay with mechanical focus',
    icon: 'Tv',
    tags: ['Cinematography', 'Sensory Details', 'Montage'],
    content: `### Bullet Time (Slowing Down time)
When you reach key points in your story, like the climax or crossing the threshold, you can help the reader really sense the emotion by slowing things way, way down. Don't summarize by saying, "I got nervous." Instead, show rather than tell, zooming in on the sensory details—smells, skin temperature, ambient sounds, and the tightening of muscles. 

Think about "Bullet Time" in The Matrix or Spider-Man's "Spidey-Sense." When danger approaches, time freezes. The movie doesn't just show a wide shot of a cafeteria; it zooms in to show a single hair standing up on Peter's arm, the magnified sound of a fly buzzing, and a drop of sweat falling in slow motion. You can do the same thing with your words.

### The Montage (Speeding Up)
A montage efficiently strings together different time periods, events, images, or hobbies under one common theme. Montages usually rely on three or four quick examples to establish the pattern. This helps you cover years of accomplishments without boring the reader with dry chronological descriptions. You can also use it to capture the atmosphere of a single complex event.

**Important Note on Word Count:** Montages *feel* like they contain a lot of information, but they do not require high word counts! A good montage relies on brevity—striking, specific images separated by commas or short phrases, rather than full paragraphs of explanation.

*Example 1: The stillness of a practice field before dawn*
> "The 5:00 AM football field was entirely still: the frost-covered grass crunching under cold cleats, the electric hum of the solitary stadium light, and the quiet mist of breath hanging in the dark air before the first whistle."

*Example 2: The chaos of a debate team crunch time*
> "Our debate prep room was a hurricane of flying yellow highlighters, half-eaten pizza slices resting precariously on legislative binders, and three separate cross-examinations happening simultaneously at top volume."`
  },
  {
    id: 'breaking_rules',
    title: 'Knowing When to Break the Rules',
    subtitle: 'The art of narrative subversion',
    icon: 'Hammer',
    tags: ['Subversion', 'Advanced'],
    content: `The Hero's Journey is a structural framework, not a rigid, unchangeable algorithm. Once you understand how the baseline system operates, you can intentionally introduce edge cases and subvert expectations to make your essay more memorable. Admissions officers read thousands of highly predictable arcs. A well-placed subversion—where you lead the reader down a familiar path and then pull the rug out from under them—creates genuine surprise and demonstrates high-level self-awareness.

Here are a few ways to effectively bend the rules without breaking your story:
* **The "Failed" Ordeal:** You do not actually have to win the battle to get the prize. Sometimes the most powerful essays happen when you completely fail the Ordeal, but the deep reflection on that failure becomes your Elixir. Losing the tournament, breaking the prototype, or having your campers stage a mutiny can teach you vastly more about leadership and resilience than a flawless, easy victory.
* **The Unexpected Catalyst:** The realization that saves you doesn't have to be a profound quote from a mentor or a sudden stroke of genius. It can be a joke, a mundane observation, or even the realization that the advice you were given is actually completely wrong. Using a "broken" compass to find your way out of the woods shows deep, independent critical thinking.
* **The Wrong Dragon:** You spend the whole essay preparing for one specific challenge, but when you arrive at the Ordeal, the test is entirely different. You spent weeks memorizing the technical manual to pass a robotics inspection, but the real test ended up being navigating the interpersonal conflict of your stressed-out team.
* **The Commitment was the Ordeal:** Sometimes the hardest part of the journey isn't the final test, but simply taking the first step. You might find that crossing the threshold (e.g., finally standing up to speak, submitting the flawed design, or admitting you need help) was the true climax of your story, and everything that followed was just the falling action.

**The Golden Rule of Breaking Rules:** You can bend the plot, but you cannot bypass the transformation. You can fail the test, use the wrong tool, or fight the wrong battle, but you must still return with the Elixir. The internal growth is non-negotiable.`
  }
];
