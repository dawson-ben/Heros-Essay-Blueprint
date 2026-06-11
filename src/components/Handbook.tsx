/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Beat, 
  Story, 
  HERO_BEATS, 
  FAMILIAR_STORIES 
} from './HerosJourneyCompare';
import { ANTI_PATTERNS } from '../constants';
import { 
  BookOpen, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Tv, 
  Layers, 
  GraduationCap, 
  PlayCircle,
  HelpCircle,
  FileEdit,
  Check,
  BookOpenText,
  BookmarkCheck,
  Shuffle
} from 'lucide-react';

const STORY_CHARACTERS: Record<string, string> = {
  student_pole_vault: "DIY Pole Vaulter",
  student_tire_mechanic: "Garage Mechanic",
  harry_potter: "Harry Potter",
  neville_longbottom: "Neville Longbottom",
  lord_of_the_rings_frodo: "Frodo Baggins",
  lord_of_the_rings_sam: "Samwise Gamgee",
  lord_of_the_rings_aragorn: "Aragorn",
  the_hobbit: "Bilbo Baggins",
  onward: "Ian Lightfoot",
  spiderman: "Peter Parker",
  legally_blonde: "Elle Woods",
  to_kill_a_mockingbird: "Scout Finch",
  big_hero_6: "Hiro Hamada",
  luke_skywalker: "Luke Skywalker",
  rey_skywalker: "Rey Skywalker"
};

interface HandbookProps {
  forceOnboarding?: boolean;
  onExit?: () => void;
  onSelectTrack?: (track: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey') => void;
}

export default function Handbook({ forceOnboarding = false, onExit, onSelectTrack }: HandbookProps) {
  // If we are in onboarding mode, we use numbers for milestones.
  // Otherwise, if in normal manual mode, we let them navigate between sections or clichés as well.
  const [activeSegment, setActiveSegment] = useState<'onboarding' | 'pitfalls'>(
    forceOnboarding ? 'onboarding' : 'onboarding'
  );

  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  
  // Selection of familiar stories for interactive comparison
  const [selectedStoryIds, setSelectedStoryIds] = useState<string[]>([
    'student_essay',
    'harry_potter',
    'big_hero_6',
    'spiderman'
  ]);

  // Current beat walked during Step 2 of onboarding
  const [activeBeatIdx, setActiveBeatIdx] = useState<number>(0);

  // Search query for pitfalls
  const [pitfallQuery, setPitfallQuery] = useState('');

  // Stories to render in lists / selection
  const selectableStories = FAMILIAR_STORIES.filter(s => s.id !== 'student_essay');

  const toggleStorySelection = (id: string) => {
    if (selectedStoryIds.includes(id)) {
      if (selectedStoryIds.length <= 1) return; // Keep at least one
      setSelectedStoryIds(selectedStoryIds.filter(sid => sid !== id));
    } else {
      setSelectedStoryIds([...selectedStoryIds, id]);
    }
  };

  const handleNextStep = () => {
    setOnboardingStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setOnboardingStep(prev => Math.max(0, prev - 1));
  };

  const handleFinishOnboarding = (trackKey: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey' = 'heros_journey') => {
    if (onSelectTrack) {
      onSelectTrack(trackKey);
    }
    if (onExit) {
      onExit();
    }
    setOnboardingStep(0);
  };

  // Specific beat strategic descriptions embedding Pixar principles:
  const BEAT_STRATEGIES: Record<string, { purpose: string; pixar: string }> = {
    ordinary_world: {
      purpose: "Your comfortable starting bubble. We meet you in your normal, safe sphere of life (e.g., hiding behind a stockroom table sorting inventory, or nesting quietly in a code environment). A stellar college essay establishes this safe habit first, but immediately drops a hint about a silent limitation or stagnant self-perception that holds you back.",
      pixar: "Pixar Rule: We establish a status quo not to celebrate it, but to show what is at stake if our protagonist never changes. Your ordinary world should suggest what part of your character is quietly asleep."
    },
    inciting_incident: {
      purpose: "The disruption or sudden call. An external, unscheduled catalyst shakes you out of your routine—the Science Director resigns mid-summer, a core library system breaks 3 days before launching, or a five-layered birthday cake turns to volcanic carbon. This event demands an immediate active choice.",
      pixar: "Action is reaction. A great story doesn't begin with a character meditating by themselves; it begins because the external world throws a wrench into their gears."
    },
    dont_hesitation: {
      purpose: "The doubt, stumbling, or imposter fear. Admissions readers are exhausted by 'perfect teenagers' who conquer challenges with robotic grace. Honest hesitation is what makes you relatable. Share your genuine anxiety, your feel-like-a-fraud syndrome, or your dread of fail-testing before supervisors. Grounded vulnerability is your greatest tool.",
      pixar: "Pixar Principle: We admire a character vastly more for trying and struggling than for their effortless victories. If you don't share your initial hesitations, the reader cannot measure the psychological distance you had to travel."
    },
    commitment_crossing: {
      purpose: "Crossing the threshold. You physicalize your choice in the scene—stepping out of a staff bathroom stall, written 'LET'S BREAK THINGS' on a slate chalkboard, or typing your first debugging program on a live server. You commit to the Special World, recognizing that you cannot slide back to your safe storage room.",
      pixar: "The threshold is a gate. This is the moment your character stops wishing things were different and starts wading into the physical mud of the trial."
    },
    special_world: {
      purpose: "The messy testing ground of trial-and-error. Avoid jumping from commitment directly to victory. Show the granular work: coordinating wet decks, failing to stabilize a classroom's attention, cleaning up charred flour crumbs, or spending 48 quiet hours mapping casework imports.Verbs matter: I swept, I coded, I re-measured, I listened.",
      pixar: "Focus on the training. The audience loves to watch characters acquire their tools piece-by-piece, making clumsy, honest mistakes before earning their expertise."
    },
    ordeal_climax: {
      purpose: "The Grounded Climax. This is the critical moment of vulnerability where your pre-planned formulas drop dead. The campers are yelling, wet index cards are floating down Lake George, and you are standing holding a soggy box of baking soda. Keep this complication beautifully real and scaled-down. Melodrama is the enemy of sincerity.",
      pixar: "Keep stakes realistic and grounded. A spilled bowl of icing, a quiet verbal breakdown, or a corrupted file is deeply human. Refrain from over-inflating standard academic setbacks into life-or-death battlefield tragedies."
    },
    winning_action: {
      purpose: "Your realistic, personal agency. YOU must resolve the ordeal through your own grit, logic, or psychological pivot—not through lucky rescues, external teachers, or sudden parental interventions. You throw your rigid outline sheets in the biological trash, think of your father's garage, and ask who wants to test if a watermelon floats.",
      pixar: "The protagonist must drive the resolution. If a lucky coincidence or a wiser adult saves the day, your character becomes a bystander in their own narrative."
    },
    transformation_elixir: {
      purpose: "The earned wisdom. You return to your ordinary universe carrying a fundamental, newly minted belief (e.g., 'Messy, interactive discovery stays in the mind longer than a passive textbook sermon'). You actively project how you will bring this collaborative, research-ready character straight to university labs, study squads, or seminar rooms.",
      pixar: "The journey is a circle, but the traveler is fundamentally rewritten. Show the admissions table that the wisdom you earned in that chaotic summer shed will actively enrich their campus culture."
    }
  };

  const filteredPitfalls = ANTI_PATTERNS.filter(pitfall =>
    pitfall.trap.toLowerCase().includes(pitfallQuery.toLowerCase()) ||
    pitfall.explanation.toLowerCase().includes(pitfallQuery.toLowerCase())
  );

  return (
    <div className={`w-full ${forceOnboarding ? 'bg-slate-950/95 min-h-screen flex items-center justify-center p-4 md:p-6 z-[100] fixed inset-0 overflow-y-auto' : ''}`} id="handbook_super_container">
      <div 
        id="handbook_card" 
        className={`bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl relative w-full ${
          forceOnboarding 
            ? 'max-w-6xl mx-auto my-8 border-cyan-500/20 shadow-cyan-500/5' 
            : 'grid grid-cols-1 gap-6 p-1 bg-slate-950 border-0 shadow-none'
        }`}
      >
        {/* Onboarding Mode Header */}
        {forceOnboarding && (
          <div className="bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10" id="onboarding_header">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-xs font-mono tracking-wider text-cyan-400 font-bold uppercase">Screenplay Onboarding</span>
            </div>
            <button
              id="skip_to_workspace_top_btn"
              onClick={() => handleFinishOnboarding()}
              className="text-xs font-sans font-bold text-slate-400 hover:text-slate-100 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800 cursor-pointer"
            >
              Skip to Workspace <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Regular Mode Tabs (Only if not forced onboarding) */}
        {!forceOnboarding && (
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900" id="manual_chapters_header">
            <div>
              <h2 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" /> Guidebook & Onboarding
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Understand screenwriting mechanics and review literary clichés
              </p>
            </div>
            
            <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-lg gap-0.5" id="handbook_mode_toggles">
              <button
                id="toggle_interactive_guide"
                onClick={() => setActiveSegment('onboarding')}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-md transition-all cursor-pointer ${
                  activeSegment === 'onboarding'
                    ? 'bg-slate-800 text-teal-400 border border-slate-700/60 shadow'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <BookOpenText className="w-3.5 h-3.5 inline mr-1.5" />
                Interactive Guide
              </button>
              <button
                id="toggle_cliches_sheet"
                onClick={() => setActiveSegment('pitfalls')}
                className={`px-3 py-1.5 text-xs font-sans font-bold rounded-md transition-all cursor-pointer ${
                  activeSegment === 'pitfalls'
                    ? 'bg-slate-800 text-rose-400 border border-slate-700/60 shadow'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 inline mr-1.5 text-rose-450" />
                Clichés & Pitfalls
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Segment Rendering */}
        {activeSegment === 'onboarding' ? (
          <div className="p-6 md:p-8 space-y-8" id="onboarding_content">
            
            {/* Step Onboarding Pipeline Indicator */}
            <div className="flex items-center justify-between col-span-12 max-w-xl mx-auto border-b border-slate-800/80 pb-6 mb-2 text-center" id="onboarding_stepper">
              <div className="flex items-center justify-center gap-1 md:gap-3 w-full">
                {[0, 1, 2, 3, 4, 5].map((sIndex) => (
                  <React.Fragment key={sIndex}>
                    <button
                      id={`stepper_jump_${sIndex}`}
                      onClick={() => setOnboardingStep(sIndex)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all relative ${
                        onboardingStep === sIndex
                          ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 text-white ring-2 ring-cyan-400/30'
                          : onboardingStep > sIndex
                            ? 'bg-teal-950 text-teal-400 border border-teal-800'
                            : 'bg-slate-950 text-slate-500 border border-slate-800/80'
                      }`}
                      title={`Go to Step ${sIndex + 1}`}
                    >
                      {onboardingStep > sIndex ? <Check className="w-3.5 h-3.5" /> : sIndex}
                    </button>
                    {sIndex < 5 && (
                      <div className={`h-0.5 flex-1 min-w-[12px] md:min-w-[40px] rounded ${
                        onboardingStep > sIndex ? 'bg-teal-850 bg-teal-500/40' : 'bg-slate-800'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* STEP 0: The Grand Splash Screen */}
            {onboardingStep === 0 && (
              <div className="space-y-8 py-4 text-center max-w-3xl mx-auto animate-fade-in" id="step_splash">
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight pt-2">
                  A resume tells them what you did.<br />A story tells them who you are.
                </h1>
                
                <div className="text-sm md:text-base font-serif text-slate-350 leading-relaxed max-w-2xl mx-auto space-y-4 pt-4 text-slate-300">
                  <p>
                    Admissions officers read thousands of application files every year. Lots of essays and personal statements repeat lists of achievements, titles, and awards in passive prose. These blur together because they outline data—not human feeling or character.
                  </p>
                  <p>
                    To stand out, we must do what humans have done for millennia to connect with one another: <strong className="font-semibold text-slate-200">tell a structural story</strong>.
                  </p>
                  <p className="text-xs font-sans text-slate-400 italic">
                    The Curse of the Blank Page is born from trying to write line-by-line onto an empty canvas without a roadmap. By constructing our personal statement like a tight, emotionally focused screenplay first, we remove the stress of creation.
                  </p>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4" id="splash_actions">
                  <button
                    id="begin_blueprint_btn"
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-600 hover:opacity-95 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Begin Screenplay Guide <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    id="skip_blueprint_btn"
                    onClick={() => handleFinishOnboarding()}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 font-sans font-bold text-xs rounded-xl transition-all border border-slate-800 hover:border-slate-700 cursor-pointer text-center"
                  >
                    Skip directly to workspace
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: The Screenplay Solution */}
            {onboardingStep === 1 && (
              <div className="space-y-6 max-w-3xl mx-auto animate-fade-in" id="step_screenplay">
                <div className="text-center space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">Chapter 1</span>
                  <h2 className="text-2xl font-serif font-bold text-white">The Screenplay Solution</h2>
                  <p className="text-xs text-slate-400 font-sans italic">Structuring your essay like a cinematic narrative</p>
                </div>

                <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-xl space-y-4 font-serif text-slate-350 text-slate-300 leading-relaxed text-sm">
                  <p>
                    Writing college essays is incredibly intimidating because most students grab the camera and start filming random scenes—a trophy here, a club leadership there—unaware of how they tie together. 
                  </p>
                  <p>
                    Great screenwriters work differently. They know the ending before they draft the beginning. They understand why a scene exists before filming it.
                  </p>
                  <p>
                    In this studio, we treat your essay or personal statement as an extremely tight <strong className="font-semibold text-slate-200">character-arc screenplay</strong>.
                  </p>
                  
                  <div className="border-t border-slate-800 pt-4 mt-6">
                    <h4 className="font-sans font-bold text-xs text-teal-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-pink-400" /> The Pixar Rule of Struggle
                    </h4>
                    <p className="text-xs font-sans text-slate-400 leading-relaxed">
                      We borrow critical principles from <strong className="font-semibold text-slate-200">Pixar Animation Studios</strong>, who teach us that <strong className="font-semibold text-slate-200">we admire a protagonist vastly more for their trying and struggling</strong> than for their effortless triumphs. 
                    </p>
                    <p className="text-xs font-sans text-slate-400 leading-relaxed mt-2">
                      Instead of presenting ourselves as flawless, all-wise geniuses, we must display <strong className="font-semibold text-slate-200">grounded, humble vulnerability</strong>. That is how we earn genuine trust.
                    </p>
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="pt-6 flex justify-between items-center" id="screenplay_nav_box">
                  <button
                    id="screenplay_back_btn"
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    id="screenplay_next_btn"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-sans font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Choose Your Story Models <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Your Models */}
            {onboardingStep === 2 && (
              <div className="space-y-6 max-w-4xl mx-auto animate-fade-in" id="step_choose_stories">
                <div className="text-center space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">Chapter 2</span>
                  <h2 className="text-2xl font-serif font-bold text-white">Choose Your Story Guides</h2>
                  <p className="text-xs text-slate-450 text-slate-400 font-sans leading-relaxed">
                    Select 2 to 4 characters from classic films or books you already understand. We will use them as comparison lanes to walk through the universal narrative beats beside a real student essay.
                  </p>
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="guides_selector_grid">
                  {selectableStories.map((story) => {
                    const isSelected = selectedStoryIds.includes(story.id);
                    return (
                      <div 
                        key={story.id}
                        id={`story_select_card_${story.id}`}
                        onClick={() => toggleStorySelection(story.id)}
                        className={`transition-all duration-200 border p-4 rounded-xl cursor-pointer flex flex-col justify-between text-left relative overflow-hidden select-none ${
                          isSelected
                            ? 'bg-slate-850 border-cyan-500 ring-1 ring-cyan-500/15 shadow shadow-cyan-500/5'
                            : 'bg-slate-950 hover:bg-slate-900 border-slate-800'
                        }`}
                      >
                        {/* Selector check indicator */}
                        <div className="flex justify-between items-start gap-4">
                          <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded font-sans font-bold ${
                            story.type === 'film' 
                              ? 'bg-pink-950/50 border border-pink-900/60 text-pink-400' 
                              : 'bg-blue-950/50 border border-blue-900/60 text-blue-400'
                          }`}>
                            {story.type === 'film' ? '🎥 Film' : '📖 Book'}
                          </span>
                          
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950' 
                              : 'border-slate-700'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="mt-4 space-y-1 flex-1">
                          <h4 className="font-serif font-bold text-base text-white tracking-tight">
                            {STORY_CHARACTERS[story.id] || "Protagonist"}
                          </h4>
                          <p className="text-[11px] text-cyan-400 font-sans font-semibold tracking-wide">
                            {story.title}
                          </p>
                          <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                            by {story.creator}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-teal-950/30 border border-teal-900/40 p-4 rounded-xl flex items-start gap-2.5 max-w-2xl mx-auto text-xs text-teal-300 font-sans shadow-md">
                  <GraduationCap className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Highly Instructed: "Camp Counselor Personal Statement" is always selected!</strong> This allows you to inspect how a real, high-scoring essay on taking over a camp science shed leverages the exact same screenwriter machinery as classic movies or books.
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="pt-6 flex justify-between items-center" id="choose_guides_nav_box">
                  <button
                    id="choose_guides_back"
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-101 hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    id="choose_guides_next"
                    disabled={selectedStoryIds.length < 2}
                    onClick={handleNextStep}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-555 bg-cyan-600 disabled:opacity-40 text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Begin Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Walkthrough of Hero's Journey Beats */}
            {onboardingStep === 3 && (
              <div className="space-y-8 animate-fade-in" id="step_beats_tour">
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">Step 3 of 5 — Beat-by-Beat Narrative Blueprint</span>
                  <h2 className="text-xl font-serif font-bold text-white">How Screenwriters and Essayists Build Emotional Resonance</h2>
                  <p className="text-xs text-slate-400 font-sans">Click on the timeline circles below to examine each step of the Hero's Journey story pattern.</p>
                </div>

                {/* Beats Stepper Track */}
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 max-w-3xl mx-auto shadow-inner" id="beats_index_selector">
                  {HERO_BEATS.map((beat, bIdx) => {
                    const BeatIcon = beat.icon;
                    const isActive = activeBeatIdx === bIdx;
                    return (
                      <button
                        key={beat.id}
                        id={`beat_btn_${beat.id}`}
                        onClick={() => setActiveBeatIdx(bIdx)}
                        className={`flex-1 py-1.5 px-1 rounded-lg flex flex-col items-center justify-center gap-1 transition-all group overflow-hidden cursor-pointer ${
                          isActive 
                            ? 'bg-slate-850 text-cyan-400 border border-slate-700 shadow font-semibold' 
                            : 'text-slate-500 hover:text-slate-350'
                        }`}
                      >
                        <BeatIcon className={`w-4 h-4 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-650 text-slate-500 group-hover:text-slate-400'}`} />
                        <span className="text-[8px] font-mono font-bold tracking-tight uppercase block text-center truncate w-full max-w-[50px] md:max-w-none">
                          {beat.name.split('. ')[1]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Beat Detail Box */}
                {(() => {
                  const currentBeat = HERO_BEATS[activeBeatIdx];
                  const strategy = BEAT_STRATEGIES[currentBeat.id] || { purpose: '', pixar: '' };
                  const SelectedIcon = currentBeat.icon;

                  // Filter stories that are selected
                  const activeSelectedStories = FAMILIAR_STORIES.filter(s => selectedStoryIds.includes(s.id));

                  return (
                    <div className="space-y-6" id={`beat_details_layout_${currentBeat.id}`}>
                      
                      {/* Beat Explanation Panel - Full-width Paragraph */}
                      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-4 shadow border-l-4 border-l-cyan-555 border-l-cyan-500 relative">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 bg-cyan-950/60 border border-cyan-800/40 rounded-lg flex items-center justify-center text-cyan-400">
                            <SelectedIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-lg text-white">{currentBeat.name}</h3>
                            <p className="text-[11px] font-sans text-slate-400 italic">Strategic storytelling mechanics</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 font-sans">
                          {/* Strategic Purpose */}
                          <div className="md:col-span-7 space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 block">Essay Strategic Purpose</span>
                            <p className="text-xs text-slate-300 leading-relaxed font-normal">{strategy.purpose}</p>
                          </div>
                          {/* Pixar Integration */}
                          <div className="md:col-span-5 bg-slate-900 border border-slate-800/80 p-4 rounded-xl space-y-1.5 text-xs text-slate-400 relative overflow-hidden">
                            <span className="text-[9px] uppercase tracking-widest font-extrabold text-pink-400 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Pixar Story Playbook
                            </span>
                            <p className="italic leading-relaxed">{strategy.pixar}</p>
                            <div className="absolute right-2 bottom-1 opacity-5 select-none">
                              <Sparkles className="w-16 h-16 text-pink-500" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comparator full-width table below the paragraph */}
                      <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950 shadow-lg" id="beat_comparator_container">
                        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800">
                          <h4 className="text-xs font-sans font-bold text-slate-350 text-slate-300 tracking-tight uppercase flex items-center gap-1">
                            <Shuffle className="w-3.5 h-3.5 text-slate-450 text-slate-400" /> Active Comparison across Selected Tracks
                          </h4>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse" id="onboarding_comparison_table">
                            <thead>
                              <tr className="bg-slate-950 border-b border-slate-850/80 text-[10px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                                <th className="px-5 py-3 w-[180px] md:w-[220px]">Story / Creator</th>
                                <th className="px-5 py-3">How The Beat is Metaphorically Written</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-855 divide-slate-850">
                              {activeSelectedStories.map((story) => {
                                const detail = story.beats[currentBeat.id];
                                const isStudent = story.id === 'student_essay';
                                return (
                                  <tr 
                                    key={story.id} 
                                    className={`transition-colors duration-150 ${
                                      isStudent 
                                        ? 'bg-teal-950/10 hover:bg-teal-950/15' 
                                        : 'hover:bg-slate-900/40'
                                    }`}
                                  >
                                    <td className="px-5 py-4 align-top space-y-1 shrink-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="font-serif font-bold text-xs text-white leading-tight block">
                                          {story.title}
                                        </span>
                                        {isStudent && (
                                          <span className="text-[8px] bg-teal-500/10 border border-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded font-mono font-semibold uppercase">
                                            Student Essay
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-[10px] text-slate-500 block font-normal font-sans">
                                        {story.creator}
                                      </span>
                                    </td>
                                    <td className="px-5 py-4 align-middle text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                                      {detail ? (
                                        <div className="space-y-1">
                                          <p className="font-light">{detail.text}</p>
                                          {detail.isSubverted && detail.subversionNote && (
                                            <div className="mt-1.5 bg-rose-955 bg-rose-950/30 border border-rose-950/40 p-2 rounded text-[10px] text-rose-300">
                                              <strong>Subversion Rule:</strong> {detail.subversionNote}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-slate-600 font-serif italic">This beat was omitted or condensed in this cinematic cut.</span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  );
                })()}

                {/* Beats navigation toolbar */}
                <div className="flex justify-between items-center max-w-xl mx-auto pt-4" id="beats_navigation_actions">
                  <button
                    id="beat_prev_btn"
                    onClick={() => setActiveBeatIdx(prev => Math.max(0, prev - 1))}
                    disabled={activeBeatIdx === 0}
                    className="p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs font-sans text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  
                  <span className="text-xs font-mono text-slate-550 text-slate-400">
                    Beat {activeBeatIdx + 1} of 8
                  </span>

                  {activeBeatIdx < 7 ? (
                    <button
                      id="beat_next_btn"
                      onClick={() => setActiveBeatIdx(prev => Math.min(7, prev + 1))}
                      className="px-4 py-2 bg-slate-955 bg-slate-950 border border-slate-800 text-cyan-400 hover:bg-slate-900 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      Next Beat <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      id="beat_finish_step_btn"
                      onClick={handleNextStep}
                      className="px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-cyan-500/10"
                    >
                      Finish Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Step navigation actions */}
                <div className="pt-6 border-t border-slate-800 flex justify-between items-center" id="beats_step_nav_box">
                  <button
                    id="step_back_from_beats_btn"
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    id="step_skip_beats_all_btn"
                    onClick={handleNextStep}
                    className="text-xs font-sans font-bold text-slate-400 hover:text-slate-100 flex items-center gap-1 transition-colors px-3 py-1.5 rounded hover:bg-slate-950 cursor-pointer"
                  >
                    Skip to Cinematic Prose Tools <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Cinematic Formatting Tools (Zoom Lens & Montage) */}
            {onboardingStep === 4 && (
              <div className="space-y-6 max-w-4xl mx-auto animate-fade-in" id="step_cinematic_tools">
                <div className="text-center space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">Chapter 3</span>
                  <h2 className="text-2xl font-serif font-bold text-white">Cinematic Prose Techniques</h2>
                  <p className="text-xs text-slate-400 font-sans">
                    Once some story beats are outlined, skilled screenwriters use concrete prose gears to make individual paragraphs pop off the paper.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="cinematic_tools_comparison_layout">
                  {/* Tool 1: Zoom Lens */}
                  <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-6 space-y-4 shadow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-950/50 border border-purple-900/50 text-purple-400 rounded-lg flex items-center justify-center">
                          <Tv className="w-4 h-4 text-purple-400" />
                        </div>
                        <h3 className="font-serif font-bold text-base text-white">1. The Zoom Lens (Slowing down time)</h3>
                      </div>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        When you reach the climax of your essay (<strong className="font-semibold text-slate-200">The Grounded Ordeal Climax</strong>), stop summarizing. Do not tell the reader 'I got very nervous during my lecture.' 
                      </p>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Instead, zoom in with macro physical details—the temperature of the room, the sudden sound of a marker humming, or the rapid tapping on a whiteboard. Let us see the scene unfold.
                      </p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-855 rounded-lg p-3.5 space-y-2.5 font-sans text-[11px]">
                      <div className="space-y-1">
                        <strong className="text-rose-400 uppercase tracking-widest block text-[9px]">❌ Lazy Abstract Telling:</strong>
                        <p className="font-serif italic text-slate-400">"I was extremely anxious when I launched my test server because I knew if it failed, my supervisor would think I was an amateur."</p>
                      </div>
                      <div className="space-y-1 border-t border-slate-800 pt-2.5">
                        <strong className="text-teal-400 uppercase tracking-widest block text-[9px]">✅ Grounded Showing Zoom Lens:</strong>
                        <p className="font-serif italic text-slate-300">"My eyes felt sandpapered under the yellow desk lamp. The terminal remained empty, flashing a cold gray prompt block that refused to load. I pressed my thumbs into my palms, waiting for the syntax warning to break our launch."</p>
                      </div>
                    </div>
                  </div>

                  {/* Tool 2: The Montage */}
                  <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-6 space-y-4 shadow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pink-950/50 border border-pink-900/50 text-pink-400 rounded-lg flex items-center justify-center">
                          <Layers className="w-4 h-4 text-pink-400" />
                        </div>
                        <h3 className="font-serif font-bold text-base text-white">2. The Cinematic Montage (Speeding up)</h3>
                      </div>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Many high-achieving applicants make the error of listing chronological awards or activities. List-driven text reads like a dry catalog.
                      </p>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Instead, string together small memories or micro-skills across several years under <strong className="font-semibold text-slate-200">one central thematic thread</strong> (e.g., 'I am an assembler'). This lets you cover massive fields without losing prose friction.
                      </p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-855 rounded-lg p-3.5 space-y-2.5 font-sans text-[11px]">
                      <div className="space-y-1">
                        <strong className="text-rose-400 uppercase tracking-widest block text-[9px]">❌ Chronological List:</strong>
                        <p className="font-serif italic text-slate-400">"I have played cello since ninth grade. In tenth grade, I was promoted to section leader. In eleventh grade, I performed solos at our community charity hall."</p>
                      </div>
                      <div className="space-y-1 border-t border-slate-800 pt-2.5">
                        <strong className="text-teal-400 uppercase tracking-widest block text-[9px]">✅ Thematic Montage Form:</strong>
                        <p className="font-serif italic text-slate-300">"At twelve, my music was dry bowing in our dusty basement room. At fourteen, it was the copper scent of resin as I prepped our high school orchestra strings for concert night. At sixteen, it was the quiet breathing coordination of fifteen distinct cellists waiting for my single hand signal."</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-950/20 border border-purple-900/40 p-4 rounded-xl flex items-center justify-between max-w-2xl mx-auto text-xs text-purple-300 font-sans shadow-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>Both of these styling modules are ready for you in the <strong>Elements Clinic</strong> tab whenever you want to test and polish your paragraphs!</span>
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="pt-6 border-t border-slate-800 flex justify-between items-center" id="cinematic_nav_box">
                  <button
                    id="cinematic_back_btn"
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-slate-955 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    id="cinematic_next_btn"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-sans font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    Choose Writing Track <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Select Your Track & Start Writing */}
            {onboardingStep === 5 && (
              <div className="space-y-6 max-w-4xl mx-auto animate-fade-in" id="step_start_writing">
                <div className="text-center space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">The Handoff</span>
                  <h2 className="text-2xl font-serif font-bold text-white">Choose Your Drafting Track</h2>
                  <p className="text-xs text-slate-450 text-slate-450 text-slate-400 font-sans leading-relaxed">
                    Choose the planning architecture that aligns with your story's objective. You can switch tracks or reset details at any time inside the playground.
                  </p>
                </div>

                {/* Tracks layout selection cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4" id="onboarding_tracks_selector font-sans text-xs">
                  {/* Track 1: Hero's Journey */}
                  <div className="bg-slate-950 border border-slate-800/80 hover:border-teal-500/40 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow transition-all duration-300">
                    <div className="space-y-2">
                      <span className="text-xl">🦸</span>
                      <h3 className="font-serif font-bold text-sm text-white">Hero’s Journey (Narrative-Heavy)</h3>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        The ultimate 8-beat script structure—ideal for prompts focusing on failure, setbacks, personal identity, or leadership.
                      </p>
                    </div>
                    <button
                      id="finish_choose_heros_journey"
                      onClick={() => handleFinishOnboarding('heros_journey')}
                      className="w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-sans font-bold text-[11px] rounded-lg transition-all cursor-pointer shadow-sm text-center"
                    >
                      Use Hero's Journey
                    </button>
                  </div>

                  {/* Track 2: Different but Truthful */}
                  <div className="bg-slate-950 border border-slate-800/80 hover:border-pink-500/40 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow transition-all duration-300">
                    <div className="space-y-2">
                      <span className="text-xl">💡</span>
                      <h3 className="font-serif font-bold text-sm text-white">Different but Truthful (Quiet Power)</h3>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        A modern, streamlined 5-step blueprint designed to highlight subtle vulnerability, unseen labor in the shadows, and quiet collaboration.
                      </p>
                    </div>
                    <button
                      id="finish_choose_different_truthful"
                      onClick={() => handleFinishOnboarding('different_but_truthful')}
                      className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-sans font-bold text-[11px] rounded-lg transition-all cursor-pointer shadow-sm text-center"
                    >
                      Use Different but Truthful
                    </button>
                  </div>

                  {/* Track 3: Intellectual Journey */}
                  <div className="bg-slate-950 border border-slate-800/80 hover:border-purple-500/40 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow transition-all duration-300">
                    <div className="space-y-2">
                      <span className="text-xl">🎓</span>
                      <h3 className="font-serif font-bold text-sm text-white">Intellectual Journey (Analytical)</h3>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        A non-linear blueprint customized for scholarly minded, scientific, or philosophical essays about theoretical interests.
                      </p>
                    </div>
                    <button
                      id="finish_choose_intellectual_journey"
                      onClick={() => handleFinishOnboarding('intellectual_journey')}
                      className="w-full py-2 bg-gradient-to-r from-purple-500 to-teal-500 hover:opacity-95 text-white font-sans font-bold text-[11px] rounded-lg transition-all cursor-pointer shadow-sm text-center"
                    >
                      Use Intellectual Journey
                    </button>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex justify-between items-center" id="onboarding_termination_toolbar">
                  <button
                    id="last_step_back_btn"
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-slate-955 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  
                  <button
                    id="last_step_skip_all_btn"
                    onClick={() => handleFinishOnboarding('heros_journey')}
                    className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-slate-350 text-slate-400 hover:text-white font-sans font-bold text-xs rounded-xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    Enter Workspace (Default Track)
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* CLICHES & PITFALLS REF-SHEET SEGMENT */
          <div className="p-6 md:p-8 space-y-6" id="pitfalls_segment_view">
            <div className="border-b border-slate-850 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-rose-400 font-sans font-bold flex items-center gap-1 pb-1">
                  <AlertTriangle className="w-3 h-3 text-rose-400 inline" /> Common Essay Pitfalls & Clichés
                </span>
                <h3 className="text-xl font-serif font-bold text-white">Avoid These Cliches At All Costs</h3>
              </div>
              
              <div className="relative w-full sm:w-[260px] shrink-0" id="pitfall_chapter_search">
                <input
                  id="pitall_search_input"
                  type="text"
                  placeholder="Filter clichés (e.g., sports, dump)..."
                  value={pitfallQuery}
                  onChange={(e) => setPitfallQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-sans text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2" id="pitfall_scroller_box">
              {filteredPitfalls.map((p) => (
                <div key={p.id} id={`cliche_${p.id}`} className="bg-slate-950 border border-slate-850 rounded-xl p-5 space-y-4 shadow-sm hover:border-rose-950/40 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-serif font-bold text-sm text-rose-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 block"></span>
                      {p.trap}
                    </h4>
                    <span className="text-[8px] bg-rose-950 border border-rose-900/40 text-rose-300 font-semibold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                      Admissions Trap
                    </span>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed font-sans text-slate-300">
                    <strong>The Cliche:</strong> {p.explanation}
                  </p>

                  <div className="bg-amber-950/25 border border-amber-900/30 p-3 rounded text-xs text-amber-250 text-slate-300 font-sans leading-relaxed">
                    <span className="text-[9px] font-bold text-amber-400 flex items-center gap-1 mb-1 font-mono uppercase tracking-widest">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Strategic Resolution Fix
                    </span>
                    {p.fix}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans text-xs">
                    <div className="bg-slate-900 border border-slate-850 rounded-lg p-3 text-slate-400 relative">
                      <div className="text-[9px] font-bold text-rose-500 mb-1 uppercase tracking-wider font-mono">❌ Telling / Bragging Example:</div>
                      <p className="italic leading-relaxed font-serif text-[11px]">"{p.exampleBad}"</p>
                    </div>
                    <div className="bg-teal-950/15 border border-teal-900/30 rounded-lg p-3 text-teal-350 text-slate-300 relative">
                      <div className="text-[9px] font-bold text-teal-400 mb-1 uppercase tracking-wider font-mono">✅ Vulnerable Showing Example:</div>
                      <p className="italic leading-relaxed font-serif text-[11px]">"{p.exampleGood}"</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPitfalls.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs font-sans">No clichés aligned with your filter query. Raise another search term!</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
