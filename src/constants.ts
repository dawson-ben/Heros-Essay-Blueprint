/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PromptField, AntiPatternCard, GuideChapter } from './types';

export const HEROS_JOURNEY_PROMPTS: PromptField[] = [
  // PART A: THE HEART
  {
    id: 'story_selection',
    label: 'Q1: What story are you telling?',
    description: 'Select or write the core experience that feels right. It doesn’t need to be a tragedy or a grand triumph; it just needs to capture a meaningful personal transformation.',
    placeholder: 'e.g., The "Coding" Story: Hunting a syntax error for three days, or The "Camp Counselor" Story: A science lesson goes wrong...',
    tip: 'Avoid trying to write everything yet. Focus on a single slice of time where something interesting happened.',
    suggestedWeight: 0.10, // 10%
    examples: [
      {
        title: 'The Camp Counselor Story',
        text: 'The Science Director resigned mid-summer, and the camp director put me in charge of twenty highly distracted ten-year-olds in the Science Shed.'
      },
      {
        title: 'The Burnt Cake Story',
        text: 'Ruining a five-layered custom birthday cake an hour before the party guests arrived and holding nothing but a smoky kitchen towel.'
      },
      {
        title: 'The Coding Story',
        text: 'Staring down an indecipherable syntax error for three days in my community website project, only to find a single misplaced semicolon.'
      }
    ]
  },
  {
    id: 'transformation_formula',
    label: 'Q2: How did you change? (Vivid Formula Builder)',
    description: 'Fill in the core equation of your growth. Complete this formula: "I used to be [__], but after [this story], I became [__]."',
    placeholder: 'I used to be a shy perfectionist who feared making mistakes before my peers, but after taking over the camp program unexpectedly, I became an engaged, resilient leader who embraces organic chaos in order to foster genuine discovery.',
    tip: 'Focus on transformations of character, self-identity, or mindset rather than external awards or consequences. Don\'t write: "I used to be poor at math, but then I got an A."',
    pitfallWarning: 'Avoid the "Kuzco trap" (going from selfish to marginally less selfish) or claiming you went from a cheater to an honest person. Keep it humble and principle-driven.',
    suggestedWeight: 0.15, // 15%
    examples: [
      {
        title: 'Camp Counselor Formula',
        text: 'I used to be a silent micro-manager of lists and supplies who dreaded public uncertainty, but after teaching density under a blazing sun, I became a dynamic leader who values messy, active curiosity over textbook lectures.'
      },
      {
        title: 'Coding Formula',
        text: 'I used to be a frustrated builder who treated errors as personal indictments of my capability, but after debugging all weekend, I became a resilient researcher who views bugs as valuable clues in a mystery.'
      }
    ]
  },
  {
    id: 'essential_belief',
    label: 'Q2.5: What is your Essential Belief?',
    description: 'Explain the deeper lesson or new worldview that you now carry with you. How do you see yourself, your work, or others differently?',
    placeholder: 'e.g. "Messy discovery is stickier than a tidy lecture," or "Patience is like an isometric wall-sit; it requires quiet, immense effort."...',
    tip: 'This is the guiding philosophy of your essay. It represents the inner values that dictate your choices.',
    suggestedWeight: 0.10,
    examples: [
      {
        title: 'Pedagogical Shift',
        text: 'Messy, organic discovery sticks to the mind much longer than a polished, passive lecture.'
      },
      {
        title: 'Resilience Shift',
        text: 'Failure is just curiosity without a map. An error code is not a verdict; it is an invitation.'
      }
    ]
  },
  {
    id: 'magic_elixir',
    label: 'Q3: What is the Magic Elixir?',
    description: 'How do you or will you apply this earned wisdom to benefit your future college campus, academic labs, or the wider community?',
    placeholder: 'e.g., "I bring this experimental, Saturday-engineering mindset to your materials research labs, eager to treat failures as data points rather than stop signs."',
    tip: 'Connect your internal change to your actions at college. Do not just say "I want to major in Biology." Frame it as an active promise of character.',
    suggestedWeight: 0.15,
    examples: [
      {
        title: 'Classroom Integration',
        text: 'I am no longer the student who fears the compiler error; I’m the coder who hunts for it. I bring this interactive resilience to your computer science labs, ready to collaborate on problems where the solution isn\'t in the syllabus.'
      },
      {
        title: 'Creative Collaboration',
        text: 'I bring this team-first philosophy to the campus stage and collaborative design labs—knowing that keeping projects going is a communal effort where we make sure it is ideas that break rather than people.'
      }
    ]
  },
  // PART B: THE SPINE
  {
    id: 'stakes_risk',
    label: 'Q4: What was at risk?',
    description: 'What quiet, internal, or emotional stakes were on the line? Avoid life-or-death drama—what pocket of self-respect, communication, comfort zone, or perspective would have been damaged if you refused to change?',
    placeholder: 'e.g. My credibility as an organizer, my ego as an all-powerful leader, my friendship, or my own confidence...',
    tip: 'Pixar Rule: We admire a character more for trying than for succeeding. Keep risks completely grounded—like your quiet pride, your fear of looking foolish, or a lost opportunity to connect. Never inflate low-stakes realities into melodrama.',
    pitfallWarning: 'Do NOT claim a mundane event was a "life-or-death" tragedy. Highly driven students often fall into melodrama here of over-inflating minor setbacks.',
    suggestedWeight: 0.10,
    examples: [
      {
        title: 'Risking Connection / Friendship',
        text: 'If I didn’t swallow my pride and apologize, I would have \"won\" the architectural debate but permanently lost my teammate\'s trust.'
      },
      {
        title: 'Risking Ego / The Icon',
        text: 'If I admitted I didn’t know the answer to the student\'s physics question, I risked shattering my fragile image as the flawless, all-wise tutoring coordinator.'
      }
    ]
  },
  {
    id: 'the_ordeal_flat',
    label: 'Q5: The Key Complication & Vulnerability (Grounded Climax)',
    description: 'Describe the pivot or unexpected complication of your story—the moment where things got particularly difficult or confusing. Keep it honest and scaled down; a quiet mistake or awkward pause tells us more than an artificially inflated disaster.',
    placeholder: 'e.g. Mid-lesson, everything descended into chaos. The chemical experiment bubbled over the tabletop, and the campers began throwing things while the supervisor watched from the doorway.',
    tip: 'Do NOT inflate this into a life-or-death battlefield! Grounded honesty is far more compelling. Refrain from manufactured melodrama—a simple hurdle like realizing you didn\'t prep enough materials or made a social misstep is the perfect size for a real-life essay.',
    pitfallWarning: 'Avoid the typical cinematic "action film" showdown. Admissions readers love hearing a vulnerable confession of being confused or out-of-your-depth.',
    suggestedWeight: 0.15,
    examples: [
      {
        title: 'The Teaching Disaster',
        text: 'Twenty campers were yelling, index cards were littering the wet deck, and my theoretical lecture on buoyancy had entirely crumbled. I was standing there mute, holding a soggy box of baking soda.'
      }
    ]
  },
  {
    id: 'winning_action',
    label: 'Q6: What helped you resolve it?',
    description: 'What internal realization, memory, advice, or core value helped you navigate the complication? Ensure YOU solved the problem with realistic personal agency, not magical luck.',
    placeholder: 'e.g. I remembered my dad\'s Saturday challenges. I realized I didn\'t need to be professional; I just needed to look at it as a game. I threw the lesson plan into the recycling bin and asked who wanted to launch water-bottle rockets.',
    tip: 'If your mother, a teacher, or a random stroke of luck solves the problem for you, it drains the narrative tension. It must be your own agency and decision.',
    suggestedWeight: 0.10,
    examples: [
      {
        title: 'Recalling Father\'s Wisdom',
        text: 'I remembered Saturday mornings in the garage. Dad never lectured me on physics; he just gave me cardboard and tape. I tossed my printouts aside and challenged the campers to sink my plastic boat.'
      }
    ]
  },
  {
    id: 'ordinary_vs_special',
    label: 'Q7: Ordinary World vs. Special World',
    description: 'Contrast where you started (your safe, familiar comfort zone) with where you were forced to go (the chaotic, unpredictable Special World).',
    placeholder: 'Ordinary World: Quiet supply room with structured list inventories...\nSpecial World: The muddy shore of Lake George with twenty screaming kids...',
    tip: 'Showing this visual and environmental contrast helps the reader measure the psychological distance you had to cross.',
    suggestedWeight: 0.15,
    examples: [
      {
        title: 'The Contrast Pairs',
        text: 'Ordinary World: My quiet bedroom, writing lines of code where errors can be frictionlessly deleted in private.\nSpecial World: Standing on a stage with a flickering projector, explaining debugging to fifty impatient local business owners.'
      }
    ]
  },
  // PHASE 2: THE ARC
  {
    id: 'inciting_incident',
    label: 'Q8: What was the Inciting Incident?',
    description: 'What broke your status quo and called you out of your comfort zone?',
    placeholder: 'e.g., The head developer contracted flu, leaving the codebase in my hands; or my sister volunteered me to speak...',
    tip: 'In literature, this is Katniss volunteering or Hagrid breaking the door down. In an essay, it is the unexpected change that forces a choice.',
    suggestedWeight: 0.05,
    examples: [
      {
        title: 'The Spark',
        text: 'The Science Instructor packed their bags overnight. The director handed me a key ring and said, "You teach science at 9:00 AM."'
      }
    ]
  },
  {
    id: 'hesitation_doubt',
    label: 'Q9: How did you hesitate or doubt yourself?',
    description: 'Explain your internal hesitation. Why did you want to cling to your Ordinary World? Vulnerability makes you highly relatable.',
    placeholder: 'e.g. I felt like an imposter. I secretly hoped they would cancel the class so I could go back to sorting folders...',
    tip: 'Action stars who go into battles without fear are boring. Admissions readers love hearing about your genuine doubts—it makes your ultimate commitment of courage believable.',
    suggestedWeight: 0.10,
    examples: [
      {
        title: 'The Imposter Fear',
        text: 'I stared at the "Science Leader" lanyard. I was convinced someone would tap me on the shoulder, expose me as a fraud who barely survived high school chemistry, and send me back.'
      }
    ]
  },
  {
    id: 'crossing_threshold',
    label: 'Q10: The Commitment (Crossing the Threshold)',
    description: 'Describe the precise moment you made the commitment. You stepped through the door, with no turning back.',
    placeholder: 'e.g. I unlocked the Science Shed, turned on the hum of the fluorescent bulb, and signed my name on the board.',
    tip: 'This is the active crossing point. Make it physical!',
    suggestedWeight: 0.10,
    examples: [
      {
        title: 'Crossing the Threshold',
        text: 'I walked down the pine path, pushed open the squeaking wooden door of the Science Shed, and set up twenty plastic cups. I wrote "LET’S BREAK THINGS" across the slate chalkboard.'
      }
    ]
  }
];

export const DIFFERENT_BUT_TRUTHFUL_PROMPTS: PromptField[] = [
  {
    id: 'authenticity_declaration',
    label: '1. The Silent Admission (Introduction)',
    description: 'Break down the polished, flawless applicant facade. Introduce yourself with an honest, striking moment of absolute vulnerability—focusing on a quiet, underrepresented trait or role (e.g., logistical planner, patient listener, supportive sibling, or the quiet builder in the shadow).',
    placeholder: 'e.g., "I am not the roaring captain of the debate team. When the zoom lights focus on me, my voice initially slips into a quiet octave. I am the logistical architect behind the team transcripts..."',
    tip: 'Word allotment: ~100 words. Start with a humble, distinctive admission that breaks free from typical bragging and displays comfortable self-acceptance.',
    pitfallWarning: 'Never use fake self-criticism like "My only flaw is caring too much" or paint yourself as an unmotivated slacker. Design a dignified space for a real, quiet trait.',
    suggestedWeight: 0.15,
    examples: [
      {
        title: 'The Logistician',
        text: 'My name is not on the front of any school awards. I have never delivered a fiery state-level speech or scored a winning goal. Instead, my high school career was written in the margins: sorting supply folders, building the structural spreadsheets that held active student initiatives together, and listening to the chaos from the shadows.'
      }
    ]
  },
  {
    id: 'dt_tipping_point',
    label: '2. The Tipping Point (Low-Key Confrontation)',
    description: 'Pinpoint a specific scene where this under-the-radar trait was tested by friction or reality. Note: A quiet, unexpected complication—like an awkward silence, a sudden change of plans, or an administrative mishap—is far more honest than a melodramatic life-or-death crisis.',
    placeholder: 'e.g., "During the annual food drive, the primary logistics software crashed. I stood surrounded by 400 unsorted boxes. My silent nature meant I hesitated to shout for order. I had to learn to command attention silently..."',
    tip: 'Word allotment: ~130 words. Set the physical scene. Focus on sensory details instead of grand, cinematic battles.',
    pitfallWarning: 'Do NOT inflate low-stakes realities into fake melodrama. If you were teaching a camp class and kids threw paper, do not write as if you were surviving a combat zone.',
    suggestedWeight: 0.20,
    examples: [
      {
        title: 'The Tipping Point',
        text: 'During the school clothing drive, the tracking server crashed, leaving us with three hundred garbage bags of unsorted donor garments piled high in the library hallway. I stood silently amidst a sea of thirty volunteers shouting over each other, holding a useless printout, realizing that my preference for silent planning had hit a hard, high-friction wall.'
      }
    ]
  },
  {
    id: 'real_stories_triumph',
    label: '3. The Unseen Labor (Micro-Action in the Shadows)',
    description: 'Detail the precise, messy, hands-on steps you took to handle this friction. Avoid grand savior speeches; show us the work—folding boxes, translating a sentence, re-measuring a cup, or drafting a humble spreadsheet.',
    placeholder: 'e.g., "I realized leadership did not require a megaphone. I sat down on the floor and began grouping the boxes by zip codes. One by one, other volunteers noticed the quiet pattern and aligned their boxes with mine..."',
    tip: 'Word allotment: ~130 words. Focus heavily on verbs: I swept, I loaded, I checked, I whispered, I waited. Let us see the quiet machinery of your handiwork.',
    pitfallWarning: 'Avoid "The Savior Compulsion" where you effortlessly rescue the entire enterprise. Keep your actions collaborative and focused on quiet labor.',
    suggestedWeight: 0.20,
    examples: [
      {
        title: 'The Watermelon Incident / Quiet Action',
        text: 'I threw the rigid lecture script into the bin. I grabbed a dry marker, wrote "DENSITY" in big letters across the side of a large green watermelon, and marched everyone down to the lake shore with a simple question: Will it float? I didn\'t preach; I set up the arena for them to throw things in.'
      }
    ]
  },
  {
    id: 'reflection_lessons',
    label: '4. The Messy Spectrum Reflection (First-Principles Thinking)',
    description: 'Analyze how this event redefined your sense of contribution. Why does modern human growth happen on a continuous, messy spectrum of effort rather than clean storybook beats? What core worldview did this construct?',
    placeholder: 'e.g., "Watching that watermelon bob on the lake as twenty kids screamed in wonder taught me that leadership does not belong to the loudest voice in the room..."',
    tip: 'Word allotment: ~140 words. Formulate your core belief. Don\'t claim a total fairy-tale transformation; rather, describe a subtle, deep calibration of perspective.',
    pitfallWarning: 'Watch out for over-fitting your growth! Growth is continuous and messy. Do not write: "From that moment on, I was never afraid of anything again."',
    suggestedWeight: 0.20,
    examples: [
      {
        title: 'Redefining Leadership',
        text: 'Watching that watermelon bob on the lake as twenty kids screamed in wonder taught me that leadership does not belong to the loudest voice in the room. It belongs to the person who can curate an arena of shared curiosity. I learned to let go of complete control and trust the sticky chaos of hands-on discovery.'
      }
    ]
  },
  {
    id: 'authenticity_promise',
    label: '5. The Quiet Integration (College Promise)',
    description: 'Connect your humble, tested trait directly to how you will support or enrich your future college campus, academic lab, or dorm circle. What specific, quiet value do you promise to bring?',
    placeholder: 'e.g., "I promise to bring this quiet, detail-focused engineering philosophy to your robotic labs. I am the collaborator who keeps the lab quiet but highly operational..."',
    tip: 'Word allotment: ~150 words. Frame this as a modest promise. Avoid sounding like a savior; rather, show how you will be a steady collaborative asset.',
    pitfallWarning: 'Do not promise to "revolutionize the university". Promise to contribute with your specific, tested character.',
    suggestedWeight: 0.25,
    examples: [
      {
        title: 'The Promise to College',
        text: 'I bring this Saturday garage spirit to your undergraduate research programs. I am not the student who will lecture my peers; I am the collaborator who will help assemble the experimental rigs, clean up the spills, and ask "why not try a bigger watermelon" when the textbook code fails to float.'
      }
    ]
  }
];

export const INTELLECTUAL_JOURNEY_PROMPTS: PromptField[] = [
  {
    id: 'ij_obsession',
    label: '1. The Intellectual Spark (Thesis/Obsession)',
    description: 'What specific puzzle, idea, paradox, historical question, or scientific loop keeps you up at night? Do not write a generic summary of "loving biology" or "interested in history"—show us the specific "itchy" question or contradiction you had to explore.',
    placeholder: 'e.g. Why do some systems thrive on entropy? Trying to reconcile dual-aspect monism, or becoming preoccupied by the environmental history of natural preserves...',
    tip: 'Word allotment: ~130 words. Focus on the organic curiosity. Why did your mind latch onto this specific topic?',
    pitfallWarning: 'Do not sound like a walking textbook or repeat pre-written research abstracts. Let us hear your human voice wrestling with the idea.',
    suggestedWeight: 0.20,
    examples: [
      {
        title: 'The Untranslatable Forest',
        text: 'For weeks, I was preoccupied by the German word \'Waldeinsamkeit\'—the specific feeling of being alone in the forest. It wasn\'t just a linguistic curiosity; it felt like a missing piece of cognitive scaffolding for how my introverted self processes natural isolation.'
      },
      {
        title: 'The Entropy Obsession',
        text: 'I became obsessed with the concept of thermal decay in closed systems. Thermodynamics said that disorder always wins, yet biological life does nothing but assemble itself into meticulous, hyper-organized shapes. Reconciling this apparent contradiction became my late-night whiteboard hobby.'
      }
    ]
  },
  {
    id: 'ij_dissonance',
    label: '2. Complicating the Theory (The Cognitive Dissonance)',
    description: 'As you pursued this obsession, what unexpected counter-evidence, philosophical tension, or societal paradox emerged that disrupted your initial simplistic view?',
    placeholder: 'e.g. The data completely contradicted my assumption. I read a critique that jarred my entire perspective on physical systems...',
    tip: 'Word allotment: ~130 words. Intellectual maturity is shown when you accept that your favorite theories are messy, compromised, or incomplete.',
    pitfallWarning: 'Do not ignore the complications or write as if you resolved a historic paradox in one weekend. Value the complexity of the research.',
    suggestedWeight: 0.20,
    examples: [
      {
        title: 'The Gated Sanctuary',
        text: 'When I dug into the environmental history of German romantic forestry, I was jarred: the "pristine wilderness" of nineteenth-century literature was actually a gated aristocratic hunting preserve. My ideal wilderness sanctuary was built on historical aristocratic enclosure.'
      },
      {
        title: 'Entropy and Social Systems',
        text: 'I tried to map thermodynamic entropy onto high school volunteer associations, assuming chaotic groups would collapse. Instead, I discovered that rigid micro-management drove students away, while a controlled amount of organizational "noise" actually invited organic leadership to assemble.'
      }
    ]
  },
  {
    id: 'ij_pivot',
    label: '3. The Synthesizing Pivot (Logical Analysis)',
    description: 'How did you reconcile this tension? Describe your logical thought process or analysis. What new mental model, draft concept, or hybrid framework did you construct to make sense of the compromise?',
    placeholder: 'e.g. I reconciled these opposing forces by synthesizing structural linguistics with sociology... I realized order and chaos are not enemies, but...',
    tip: 'Word allotment: ~160 words. This is where you display logical exposition. Show us the step-by-step gears of your mind solving the complication.',
    pitfallWarning: 'Avoid cinematic cliches like "suddenly I had a eureka moment!" Show the gradual, analytical work of looking closer.',
    suggestedWeight: 0.25,
    examples: [
      {
        title: 'A Hybrid Lexicon',
        text: 'I realized that to enjoy the forest was to study a document of historical longing. I created a hybrid lexicon of our town\'s urban parks, cataloging green spaces where concrete meets growth—mapping how modern urbanites carve out pockets of quiet within structural systems.'
      },
      {
        title: 'Controlled Disequilibrium',
        text: 'I formulated a system model I call "Controlled Disequilibrium." I stopped trying to eliminate the chaos in our debate archives; instead, I created a wiki where anyone could drop disorganized scraps, and scheduled weekly twenty-minute "sorting sprints" where order emerged from the mess.'
      }
    ]
  },
  {
    id: 'ij_paradigm',
    label: '4. The Intellectual Paradigm Shift',
    description: 'What deeper truth do you now believe about how knowledge is formed, or how human beings interact with complex ideas? What is your final intellectual paradigm?',
    placeholder: 'e.g. Nuance is not hesitation; it is observation. Intellectual progress is not about finding clean answers, but about having the stomach to...',
    tip: 'Word allotment: ~105 words. Steer clear of generalizations like "I love learning focus." Formulate a genuine philosophical position.',
    pitfallWarning: 'Avoid high-sounding academic fluff that has no grounding. Make sure the paradigm shift relates back to how you behave.',
    suggestedWeight: 0.15,
    examples: [
      {
        title: 'The Strength of Ambiguity',
        text: 'True intellectual courage lies not in finding an unshakeable thesis, but in welcoming the complication that threatens to dismantle it. Nuance is not hesitation; it is observation.'
      },
      {
        title: 'Learning to Value Decay',
        text: 'I no longer fear systemic decay in my code or groups. A program crashes to tell us where the framework is stifling the data. Collapse is just the starting bell for a cleaner assembly.'
      }
    ]
  },
  {
    id: 'ij_promise',
    label: '5. The Laboratory Promise (Scholarly Integration)',
    description: 'How will you apply this specific mode of enquiry and love of analytical complexity on our campus, in seminars, or in collaborative research labs?',
    placeholder: 'e.g. I bring this appetite for paradox to your critical theory seminars. I am the student who will question our consensus...',
    tip: 'Word allotment: ~130 words. Speak directly about seminars, laboratory dynamics, or debate societies. Frame your brain as a collaborative asset.',
    pitfallWarning: 'Do not sound arrogant or pretend to teach the professors. Frame yourself as an eager, rigorous student and academic teammate.',
    suggestedWeight: 0.20,
    examples: [
      {
        title: 'The Seminar Environment',
        text: 'I bring this appetite for historical paradox to your critical theory seminars. I am the student who will look past simple classroom agreements, eager to collaborate on research where we examine the limits of our own analytical frameworks'
      },
      {
        title: 'The CS Lab',
        text: 'I bring this experimental, chaos-embracing outlook to your systems engineering labs. I am excited to join projects where the compilers are breaking and the manuals are outdated, treating debugging as a communal exercise in puzzle-solving.'
      }
    ]
  }
];

export const ANTI_PATTERNS: AntiPatternCard[] = [
  {
    id: 'resume_repeat',
    trap: 'The Resume Repeat',
    explanation: 'Listing accomplishments or extracurriculars in prose. This gives details but lacks a human soul or cohesive narrative thread. It repeats what is already in your activities list.',
    fix: 'Choose a single slice of time. Select one specific moment or relationship that illustrates your values. We have your transcript; we need to hear your inner voice.',
    exampleBad: 'I have participated in Robotics for three years, serving as Secretary. In addition, I played Varsity tennis and spent weekends volunteering at the local animal shelter where I learned teamwork.',
    exampleGood: 'For three days, our robot, Barnaby, did nothing but spin in dizzying clockwise circles. As Secretary, I didn\'t build the wheels; instead, I stood over our lead programmer with a plate of lukewarm pizza, convincing him that a misplaced loop was an adventure rather than a catastrophe.'
  },
  {
    id: 'voluntourism',
    trap: 'The "Voluntourism" Savior',
    explanation: 'Writing a story about traveling to a developing nation, helping residents, and realizing "I was the lucky one" or "they taught me to be happy with little."',
    fix: 'Focus on a specific, micro-interaction where you personally failed, felt awkward, or were challenged by someone you met. Make it about a relationship or an intellectual complication, not your own hollow virtue.',
    exampleBad: 'When I traveled to Guatemala to paint houses, I looked at the poor children running around without shoes. I realized how privileged I was, and how they were actually much happier than us despite having nothing.',
    exampleGood: 'Juana, aged nine, watched me paint her kitchen wall for ten minutes before snatching the roller. My expensive paint strokes were dripping badly; with three quick, practiced sweeps of her wrist, she smoothed my mess. I wasn\'t there to save her community; I was a clumsy apprentice learning how to hold a brush.'
  },
  {
    id: 'sports_highlight',
    trap: 'The Sports Highlight Reel',
    explanation: 'Describing the breathtaking final winning goal, the clutch free throw, or winning the big championships.',
    fix: 'The physical scoreboard is boring. Read about the recovery, the injury, the hours spent on the bench, or the hard locker room leadership struggle. Describe the internal challenge.',
    exampleBad: 'The clock clicked down to five seconds. I took the ball, crossed over the defender, leapt past the center, and floated the game-winning layup into the hoop as the buzzer sounded and my team carried me away.',
    exampleGood: 'A torn ACL relegated me to a clipboard coordinator. From the bench, I didn\'t watch the ball; I watched our sophomore guard\'s shoulders. I learned to spot the exact moment her posture slumped, signaling that her confidence was fracturing before her coach even noticed.'
  },
  {
    id: 'trauma_dump',
    trap: 'The Trauma Dump',
    explanation: 'Sharing a highly painful event or raw tragedy and stopping there, hoping the severity of the trauma acts as a qualifier.',
    fix: 'Adhere to the rule: "Focus on the scar, not the wound." The painful event should only be the brief starting context. devot 70% of your narrative to recovery, agency, and growth, and only 30% to the pain.',
    exampleBad: 'My leg was shattered in three places, and I spent six months in agonizing traction, crying every night and feeling completely hopeless about ever walking again. Life was completely dark.',
    exampleGood: 'The hospital traction rig became my library. Confined to a metal frame for six months, I couldn\'t walk, so I read. I taught myself intermediate Spanish using audiobook tapes, transforming the sterile white room into a noisy Madrid café.'
  },
  {
    id: 'passive_protagonist',
    trap: 'The Passive Protagonist',
    explanation: 'The student acts as a narrator of events that happened to them, rather than an active protagonist making choices. Things are solved by parents, teachers, or luck.',
    fix: 'Make "I" the active grammatical subject of your sentences. Show yourself making hard decisions, failing, and actively picking up the pieces.',
    exampleBad: 'Eventually, the science instructor returned and showed us how to do the volcano experiment safely. The director was really happy that the camp turned out well.',
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
    content: `Writing college application essays is often the most stressful part of the admissions process. For many students, it is harder than it needs to be and less effective than it could be, simply because they start typing before they have a plan. As a result, they often end up with rambling lists of achievements or activities that are neither persuasive nor memorable.

Admissions officers read thousands of files where students list achievements, clubs, and awards. These lists blur together because they provide data, not emotion. To stand out, do what humans have done for millennia to connect with one another: **tell a story**. A resume tells them what you did. A story tells them who you are.

### Structural Plan First
Before you write, make a plan. It will make your writing easier and more effective. If your essay needs a story, this guide will help you tell your story in a way that will connect with the admissions decision-makers.`
  },
  {
    id: 'directors_chair',
    title: 'The Director’s Chair',
    subtitle: 'Structuring your essay like a screenplay',
    icon: 'Clapperboard',
    tags: ['Scriptwriting', 'Aesthetics', 'Storytelling'],
    content: `Writing college essays is stressful because most students just grab the camera and start filming random scenes—a trophy here, a club meeting there—hoping it makes sense. They end up with a shaky, chaotic "highlight reel" that bores the audience.

A great director starts with a screenplay. She knows the ending before she films the beginning. She knows why a scene matters before she includes it. 

### The Escalation Trap
The most common trap for driven students is **Forced Escalation**—the belief that you must make a mundane experience look like a life-or-death crisis. This leads to cartoonish melodrama. You do not need to fight a supervillain; you just need to reveal a sincere, grounded slice of human vulnerability. Keep the stakes soft, emotional, and intensely honest.

We weave these principles from Pixar directly into the structure to help you craft stakes, root for characters, and find your burning truth.`
  },
  {
    id: 'needs_a_story',
    title: 'Does the Prompt Need a Story?',
    subtitle: 'Triage your prompts to choose the right strategy',
    icon: 'Triage',
    tags: ['Prompts', 'Strategy', 'Story vs. Logic'],
    content: `Not every college essay prompt requires a full narrative arc, but the most important ones usually do. Let's look at the category breakdown:

### 1. Story-Driven Prompts (Narrative Essential)
These prompts ask about identity, failure, growth, or a realization. Look for key words like: *"recount a time," "what did you learn,"* and *"what was the outcome."*
*   **The Identity Story:** Prompts about your background, talent, or a community.
*   **The Resilience Story:** Prompts about failure, setbacks, or challenging beliefs.

### 2. Analytical & Intellectual Prompts (Exposition Essential)
Highly reflective, theoretical, or philosophical essays don't fit into standard "Once upon a time" story beats. For these, analytical thought and cognitive exploration must supersede cinematic dramatic movement. Refer to the **Intellectual Journey** track to craft a powerful exposition.

### 3. Non-Story Prompts (Logic & Research Essential)
These are often direct explanations of financial details or specific academic theories. They want facts, reasoning, and research more than a narrative arc.
*   *Example:* "Describe your financial need and how this scholarship will help you achieve your educational goals."`
  },
  {
    id: 'heros_journey_chapter',
    title: 'The Hero’s Journey',
    subtitle: 'Understanding the universal pattern of human psychology',
    icon: 'Compass',
    tags: ['Hero\'s Journey', 'Campbell', 'Narrative Beats'],
    content: `Joseph Campbell identified a pattern in great stories that spans cultures and centuries. In these stories, we see consistent "narrative beats" that resonate with human psychology:

1.  **The Ordinary World:** We meet the heroine in her normal, safe life.
2.  **The Call to Adventure:** A problem or event disrupts the status quo, inviting or driving the heroine outside her comfort zone.
3.  **Hesitation:** The heroine fears the unknown or is reluctant to leave her comfort zone, asking "Why me?"
4.  **Crossing the Threshold:** The heroine commits to the journey and enters the "Special World."
5.  **Small Hurdles & Allies:** The heroine faces challenges, handles everyday friction, and works with others.
6.  **The Grounded Climax (Complication):** The moment of greatest vulnerability (which in an essay is a quiet moment of self-doubt or a simple mistake, NOT a life-or-death crisis).
7.  **The Reward & Return (Elixir):** The heroine returns home, transformed, with new power or wisdom to benefit their community.

### Important: Beware the Melodrama Trap
Students often feel pressure to turn Q5 (The Climax) into an action-movie explosion. Resistance is born from **realistic restraint**. If your climax is realizing that you didn't know the answer to a physics question and had to swallow your pride to ask a teammate, that is an incredible essay. If you write about it as if you were diffusing a nuclear device, the reader will immediately detach from your story. Keep it humble. Keep it real.`
  },
  {
    id: 'intellectual_journey_chapter',
    title: 'The Intellectual Journey',
    subtitle: 'For the analytical, philosophical, and scientific mind',
    icon: 'GraduationCap',
    tags: ['Scholarship', 'Philosophy', 'Paradox', 'Logic'],
    content: `Many brilliant, high-achieving applicants do not have a blockbuster "Hero's Journey" event—and forcing their intellectual passions into dramatic character arcs strips away crucial nuance. Real human growth is a continuous, messy spectrum. 

If you are writing about a book, a scientific curiosity, an artistic theory, or a philosophical concept, your progress is marked by **analytical depth** rather than physical events.

### How to Structure an Analytical Essay:
1.  **The Obsession (Spark):** Begin with the specific, "itchy" theoretical question or paradox that captured your focus. Avoid generic topics; lock in on a narrow curiosity.
2.  **The Complication (Cognitive Dissonance):** What unexpected research contradiction, new book, or historical counter-evidence threatened to demolish your initial interpretation? Show that you are comfortable with intellectual chaos.
3.  **The Synthesizing Pivot:** How did you logically reconcile these opposing theories? Walk the reader through the gears of your mind constructing a hybrid framework.
4.  **The Paradigm Shift:** Formulate your refined worldview about knowledge, nuance, and learning.
5.  **The Laboratory Promise:** Connect this scholarly character directly to your future roles in college seminar rooms, design squads, or scientific research labs.`
  },
  {
    id: 'pixar_rules',
    title: 'The Pixar Principles',
    subtitle: 'The physics of emotional resonance',
    icon: 'Sparkles',
    tags: ['Pixar', 'Stakes', 'Belief'],
    content: `Before you build your plot, you need to understand the physics of an emotionally resonant story. We're going to borrow three key principles adapted from Pixar Animation Studios:

### 1. Set Up the Stakes
*(Paraphrased from Pixar Rules #1 & #16)*
If nothing is at risk, your readers won't care whether you succeed or fail. The stakes don't need to be life-and-death or save-the-world, but we must know **why it matters to you**. What would be lost if you didn't conquer this challenge? Your ego? Your relationships? Your principal self-identity? Keep the stakes soft, internal, and believable.

### 2. Admire the Struggle
*(Paraphrased from Pixar Rule #1)*
We admire a character vastly more for **trying and struggling** than for their effortless successes. If you gloss over the hard parts of your story to rush to the "victory," you cheat the reader of the emotional pay-off. Show us the sweat, the mistakes, and the dirty details.

### 3. The Burning Belief
*(Paraphrased from Pixar Rule #14)*
What is the core belief burning inside you that this story is feeding? A story about a summer camp is just an anecdote. A story about the belief that *"messy discovery is stickier than a tidy classroom"* is an architectural statement of your values. Know your belief before you write.`
  },
  {
    id: 'cinematic_writing',
    title: 'Cinematic Techniques',
    subtitle: 'Directing your essay with mechanical focus',
    icon: 'Tv',
    tags: ['Cinematography', 'Sensory Details', 'Montage'],
    content: `To lift your prose off the static page, you should write like a mechanical director. Two specific filmmaking templates are highly effective for personal essays:

### 1. The Zoom Lens (Slowing Down)
When you reach the climax of your story (**The Key Complication**), stop forward time. Do not summarize this moment ("I got nervous"). Instead, zoom in onto sensory details—smells, skin temperature, ambient sounds, the tightening of muscles. 

*   *Telling:* "I was very nervous during the science presentation."
*   *Zoom Lens:* "My hands shook so hard the dry erase marker tapped a rapid Morse-code against the whiteboard. The fluorescent bulb overhead hummed, louder than my own thoughts. I looked up at twenty blank stares. A bead of sweat traced a path down my temple, cold under the classroom fans."

**Warning on the Zoom Lens:** Do not use the Zoom Lens to artificially pump up simple moments into high melodrama. If you zoom in on a dripping paint brush, let it represent your quiet loss of control, not a traumatic disaster.

### 2. The Montage (Speeding Up)
A montage strings together different time periods, events, or hobbies under **one common theme**. This helps you cover three years of wide accomplishments without boring the reader with dry chronological descriptions.

*   *Theme:* "I am an assembler/builder."
*   *Montage:* "At six, my empire was made of interlocking Lego. At twelve, I spent a week building a wood frame treehouse that mostly stayed level. At sixteen, I spent nights connecting heat sinks to a customized system motherboard. Ready for college, I am eager to apply this hands-on engineering mindset to sustainable energy grids."`
  }
];
