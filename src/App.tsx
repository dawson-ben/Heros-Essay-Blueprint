/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EssayDraft, TrackType } from './types';
import Workbook from './components/Workbook';
import StoryPreview from './components/StoryPreview';
import Handbook from './components/Handbook';
import ZoomLensTool from './components/ZoomLensTool';
import MontageTool from './components/MontageTool';
import { BookOpen, FileEdit, FileText, Compass, Sparkles, Plus, Trash2, Heart, Award, GraduationCap, Sun, Moon } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'college_essay_architect_drafts_v1';
const ACTIVE_DRAFT_KEY = 'college_essay_architect_active_v1';

export default function App() {
  const [drafts, setDrafts] = useState<EssayDraft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'worksheet' | 'clinics' | 'preview' | 'handbook'>('worksheet');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('college_essay_architect_theme');
    return saved !== 'light';
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('college_essay_architect_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Trigger onboarding on first lift
  useEffect(() => {
    const completed = localStorage.getItem('college_essay_architect_onboarding_completed_v2');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  // Load drafts on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const activeId = localStorage.getItem(ACTIVE_DRAFT_KEY);
      
      if (stored) {
        const parsed = JSON.parse(stored) as EssayDraft[];
        if (parsed.length > 0) {
          setDrafts(parsed);
          setActiveDraftId(activeId && parsed.some(d => d.id === activeId) ? activeId : parsed[0].id);
          return;
        }
      }
      
      // Fallback: Seed initial empty draft
      const defaultDraft: EssayDraft = {
        id: 'default_1',
        title: 'My Personal Statement',
        targetWordCount: 650,
        track: 'heros_journey',
        herosJourneyAnswers: {},
        differentTruthfulAnswers: {},
        intellectualJourneyAnswers: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setDrafts([defaultDraft]);
      setActiveDraftId(defaultDraft.id);
    } catch (e) {
      console.error('Failed reading localStorage', e);
    }
  }, []);

  // Save drafts when state changes
  const saveDraftsToStorage = (updatedDrafts: EssayDraft[], activeId: string) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedDrafts));
      localStorage.setItem(ACTIVE_DRAFT_KEY, activeId);
    } catch (e) {
      console.error('Failed writing localStorage', e);
    }
  };

  const handleUpdateDraft = (updated: EssayDraft) => {
    const updatedDrafts = drafts.map(d => d.id === updated.id ? updated : d);
    setDrafts(updatedDrafts);
    saveDraftsToStorage(updatedDrafts, activeDraftId);
  };

  const handleCreateNewDraft = () => {
    const titlePrompt = prompt('Enter a title or context for this new reflection:', 'My Community Experience');
    if (titlePrompt === null) return;
    
    const newDraft: EssayDraft = {
      id: `draft_${Date.now()}`,
      title: titlePrompt.trim() || 'Untitled Narrative',
      targetWordCount: 650,
      track: 'heros_journey',
      herosJourneyAnswers: {},
      differentTruthfulAnswers: {},
      intellectualJourneyAnswers: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    setActiveDraftId(newDraft.id);
    saveDraftsToStorage(updated, newDraft.id);
    setActiveTab('worksheet');
  };

  const handleDeleteDraft = (id: string) => {
    if (drafts.length <= 1) {
      alert('You must keep at least one active draft script.');
      return;
    }
    if (!confirm('Are you sure you want to delete this essay planner? All reflective answers will be permanently cleared.')) return;

    const updated = drafts.filter(d => d.id !== id);
    const nextActiveId = updated[0].id;
    setDrafts(updated);
    setActiveDraftId(nextActiveId);
    saveDraftsToStorage(updated, nextActiveId);
  };

  // Seed sample templates for tutorial clinics
  const handleSeedCloneSample = (type: 'camp' | 'coding' | 'baking' | 'philosophy') => {
    const confirmSeed = confirm('Loading this study template will replace your current workspace answers. Would you like to proceed?');
    if (!confirmSeed) return;

    let sampleDraft: Partial<EssayDraft> = {};

    if (type === 'camp') {
      sampleDraft = {
        title: 'Science Shed Density Lesson (Camp Study)',
        track: 'heros_journey',
        targetWordCount: 650,
        herosJourneyAnswers: {
          story_selection: 'The Science Director resigned mid-summer, leaving me—a junior camp counselor who loved organizing storage bins—in charge of teaching science to twenty highly distracted ten-year-old active campers.',
          transformation_formula: 'I used to be a silent, anxious list-organizer who micro-managed construction paper to avoid public eyes, but after teaching buoyancy under a blazing afternoon sun, I became a dynamic leader who values organic curiosity and messy investigation over rigid classroom schedules.',
          essential_belief: 'Messy, organic discovery is stickier to the mind than a tidy, passive lecture. To truly learn, a student must be a participant in the trial, not just a viewer of facts.',
          magic_elixir: 'I bring this interactive, Saturday-engineering mindset to your materials research laboratories, ready to collaborate on experiments where the solution isn\'t printed in the syllabus, and failure is treated as a roadmap.',
          stakes_risk: 'I risked confirming my deepest internal fear—that I was an illegitimate leader, destined to stay behind supply room doors, incapable of holding the attention or respect of a crowd.',
          the_ordeal_flat: 'My theoretical lesson plan on density had completely collapsed. The children were tossing wet index cards across the tables, yelling, and ignoring my definitions. My throat turned to dry sand as I held a soggy box of baking soda.',
          winning_action: 'I remembered Saturday mornings in our dusty wooden garage. My dad never read me lectures on mechanical leverage; he simply handed me toothpicks and weights, testing them until they cracked. I threw my notes in the trash and asked who wanted to see if a watermelon could float.',
          ordinary_vs_special: 'Ordinary World: My comfortable, quiet stockroom, carefully sorting crayons and pencils.\nSpecial World: The muddy shoreline of Lake George under twenty yelling children demanding cardboard rocket shields.',
          inciting_incident: 'The Science Director quit unexpectedly on a Tuesday. The Camp Director looked past the charismatic team leads and handed me the keys to the Science Shed.',
          hesitation_doubt: 'I spent the night writing rigid, five-page drafts of textbook physics formulas, terrified that if I departed from academic safety, the kids would expose me as a fraud who didn\'t belong in science.',
          crossing_threshold: 'I walked down the pine path, pushed open the creaking cedar doors of the Science Shed, and placed twenty plastic bowls on the bench, committing to teach density.'
        }
      };
    } else if (type === 'coding') {
      sampleDraft = {
        title: 'Tracking Down the Syntax Code Break (Coding Study)',
        track: 'heros_journey',
        targetWordCount: 650,
        herosJourneyAnswers: {
          story_selection: 'Developing a community schedule tracker website for our local library, and running into a massive, indecipherable compiler syntax error that broke the core calendar three days before launching.',
          transformation_formula: 'I used to be an impatient builder who treated bugs and coding warnings as personal indicators of incompetence, but after debugging this code for 72 straight hours, I became a resilient researcher who views errors as maps toward deeper system understanding.',
          essential_belief: 'An error code is not a verdict on capability; it is a logical invitation to ask \'why\'. Failure is simply curiosity searching for a map.',
          magic_elixir: 'I bring this trial-and-error debugging resilience to your compiler labs. I am the collaborator who does not panic when the program crashes; instead, I am excited to look through the log outputs with my peers.',
          stakes_risk: 'I risked destroying my fragile ego as the neighborhood \'computer prodigy\' who always knew the answers effortlessly, as well as breaking my promise of a launch to the library staff.',
          the_ordeal_flat: 'At 3:00 AM, my screen glowed yellow with 1,402 undefined syntax warnings. My mechanical keyboard sat cold in the dark. My eyes felt sand-papered, and I felt a strong urge to delete the directory and walk away.',
          winning_action: 'I remembered a tutoring advice: \'Errors are clues, not judgments.\' I closed my editor, got a notepad, and mapped out the imports line by line until I found a single mismatched module casing.',
          ordinary_vs_special: 'Ordinary World: Writing trivial, pre-designed textbook scripts in private.\nSpecial World: A production codebase where dependencies collide in real life with users waiting.',
          inciting_incident: 'The library director announced our portal launch to fifty seniors, giving me a hard three-day deadline.',
          hesitation_doubt: 'I hesitated, stare-glued to my computer, convinced that I was an amateur who had volunteered for an enterprise-level project I had no right to manage.',
          crossing_threshold: 'I plugged in my test server, opened a fresh document, and typed my first test script, committing to track down the compiler error.'
        }
      };
    } else if (type === 'baking') {
      sampleDraft = {
        title: 'The Burnt Birthday Sponge Cake (Kitchen Study)',
        track: 'different_but_truthful',
        targetWordCount: 650,
        differentTruthfulAnswers: {
          authenticity_declaration: 'I am not the star pastry chef who commands the bakery effortlessly. My kitchen space has always been slower, framed by flour-dusted recipe journals and a quiet measuring cup. I am the detail-driven baker who coordinates the timers rather than the icing designs.',
          dt_tipping_point: 'Our kitchen smoke alarm shrieked at 4:30 PM, just an hour before my grandmother\'s 80th birthday guests arrived. Open on the slate island was a charred, five-layered sponge cake that looked like volcanic ash indicating a serious chemical burn on the batter.',
          real_stories_triumph: 'I didn\'t panic or deliver a dramatic speech. I grabbed a damp cloth to lift the smoky tins, dumped the charred sponge in the green compost bin, and swept the floury countertops. I looked at the egg supply, cracked four whites, and re-whipped the batter using steady, patient wrist motions.',
          reflection_lessons: 'Staring at that flat chocolate lump taught me that baking—and resilience—isn\'t about displaying a flawless, prepared presentation on the first attempt. It is about having the stomach to sweep up the ash, crack a fresh egg, and reset the oven timers. I learned that growth begins when the recipe completely fails.',
          authenticity_promise: 'I promise to bring this persistent, adaptive mindset to your molecular gastronomy projects. I am the research partner who will cheerily sweep up the laboratory spills, re-calibrate the scales, and bake a second batch when the initial experiment falls flat.'
        }
      };
    } else { // 'philosophy'
      sampleDraft = {
        title: 'Thermodynamics of Public Forums (Intellectual Study)',
        track: 'intellectual_journey',
        targetWordCount: 650,
        intellectualJourneyAnswers: {
          ij_obsession: 'I became obsessed with the concept of thermal decay in closed systems. Thermodynamics says that disorder always wins, yet biological life and cooperative human systems do nothing but assemble themselves into meticulous, hyper-organized shapes. Reconciling this apparent contradiction became my late-night whiteboard hobby.',
          ij_dissonance: 'I tried to map thermodynamic entropy onto our high school volunteer debate archives, assuming chaotic groups would collapse. Instead, I discovered that rigid micro-management actually drove student contributors away, while a controlled amount of organizational "noise" and trust actually invited organic leadership to assemble.',
          ij_pivot: 'I formulated a system model I call "Controlled Disequilibrium." I stopped trying to eliminate the chaos in our debate archives; instead, I created a web wiki where anyone could drop disorganized scraps, and scheduled weekly twenty-minute "sorting sprints" where order emerged from the mess.',
          ij_paradigm: 'True intellectual courage lies not in finding an unshakeable, static thesis, but in welcoming the complication that threatens to dismantle it. Nuance is not hesitation; it is observation. Collapse is just the starting bell for a cleaner assembly.',
          ij_promise: 'I bring this experimental, chaos-embracing outlook to your systems engineering labs. I am excited to join projects where the compilers are breaking and the manuals are outdated, treating debugging as a collaborative, hands-on exercise in puzzle-solving.'
        }
      };
    }

    const updated = drafts.map(d => d.id === activeDraftId ? {
      ...d,
      ...sampleDraft,
      updatedAt: new Date().toISOString()
    } : d);

    setDrafts(updated);
    saveDraftsToStorage(updated, activeDraftId);
    alert(`Loaded "${sampleDraft.title}" into your playground!`);
  };

  const activeDraft = drafts.find(d => d.id === activeDraftId) || drafts[0];

  if (!activeDraft) {
    return (
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center font-sans">
        <div className="text-teal-400 animate-pulse font-mono tracking-wider text-xs">INITIATING ESSAY ARCHITECT WORKSPACE...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#070B14] ${isDark ? '' : 'light'} text-slate-150 font-sans selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col`}>
      {/* Elegantly Crafted Top Ribbon */}
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-50 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-slate-950/20" id="app_header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 via-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-cyan-500/10">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-sans font-bold text-white tracking-tight leading-none flex items-center gap-2">
              College Essay Architect
              <span className="text-[9px] bg-gradient-to-r from-teal-550 to-cyan-550 bg-teal-950/60 text-teal-300 font-sans px-2 py-0.5 rounded-full border border-teal-800/60 font-bold uppercase tracking-wider">
                Writing Studio
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-sans mt-1">
              Structure, budget, and polish compelling story-based personal statements
            </p>
          </div>
        </div>

        {/* Header Actions Container */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">
          {/* Saved Drafts Switcher Dropdown */}
          <div className="flex items-center gap-2" id="drafts_controller">
            <select
              id="draft_selector_dropdown"
              value={activeDraftId}
              onChange={(e) => {
                setActiveDraftId(e.target.value);
                localStorage.setItem(ACTIVE_DRAFT_KEY, e.target.value);
              }}
              className="bg-slate-950 border border-slate-800 p-2 text-xs font-sans text-slate-200 rounded-lg focus:ring-1 focus:ring-teal-505 focus:border-teal-500 focus:outline-none w-[160px] sm:w-[220px] hover:border-slate-700 transition-colors"
            >
              {drafts.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-950 text-slate-200">
                  {d.title} ({d.track === 'heros_journey' ? "Hero's Journey" : d.track === 'different_but_truthful' ? "Different" : "Intellectual"})
                </option>
              ))}
            </select>

            <button
              id="new_draft_btn"
              onClick={handleCreateNewDraft}
              className="p-2.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-600 hover:opacity-90 text-white rounded-lg transition-all cursor-pointer text-xs flex items-center gap-1 shrink-0 font-bold shadow-md shadow-cyan-505/10"
              title="Create New Draft Block"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
            </button>

            <button
              id="delete_draft_btn"
              onClick={() => handleDeleteDraft(activeDraftId)}
              className="p-2.5 bg-slate-900 hover:bg-red-950/40 text-red-400 border border-slate-800 hover:border-red-900/60 rounded-lg transition-colors cursor-pointer"
              title="Delete Current Workbook"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-slate-800 hidden md:block" />

          {/* Solid prominent global theme switch button in the upper right quadrant */}
          <button
            id="toggle_theme_btn"
            onClick={toggleTheme}
            className="p-2.5 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-sm"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-sans font-medium text-amber-400 hidden lg:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-sans font-medium text-slate-600 hidden lg:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Core Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-6">
        
        {/* Conceptual Educational Introduction */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg border-l-4 border-l-teal-500" id="welcome_pinnacle">
          <div className="space-y-2 md:max-w-2xl">
            <span className="text-[11px] uppercase tracking-wider font-sans font-bold text-teal-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-400" /> Holistic Admissions Strategy
            </span>
            <h2 className="text-xl font-serif font-medium text-white leading-tight">
              A resume tells them what you did. A story tells them who you are.
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              This interactive planner turns Ben Dawson's admissions screenplay principles into actionable worksheets. Use <strong>The Hero's Journey</strong> cyclical narrative, the simplified <strong>Different but Truthful</strong> template, or the analytical <strong>Intellectual Journey</strong> blueprint to architect a memorable, authentic college statement.
            </p>
          </div>
          
          <div className="flex gap-2 flex-wrap" id="welcome_actions">
            <button
              id="switch_tab_guide_top"
              onClick={() => setActiveTab('handbook')}
              className="py-2.5 px-4 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              Read The Guidebook
            </button>
            <button
              id="replay_guided_tour_welcome_btn"
              onClick={() => setShowOnboarding(true)}
              className="py-2.5 px-4 bg-slate-950 hover:bg-slate-900 text-cyan-400 border border-slate-800 hover:border-slate-705 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Launch screenwriting tutorial tour"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Screenplay Tour
            </button>
            <button
              id="switch_tab_worksheet_top"
              onClick={() => setActiveTab('worksheet')}
              className="py-2.5 px-4 bg-gradient-to-r from-teal-500 to-cyan-555 bg-cyan-600 hover:opacity-95 text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/10"
            >
              <FileEdit className="w-4 h-4" />
              Build My Story Arc
            </button>
          </div>
        </div>

        {/* Interactive Master Tab Selector */}
        <nav className="flex items-center gap-1 bg-slate-900 border border-slate-800/80 p-1 text-slate-400 rounded-xl shadow-inner" id="master_navbar">
          <button
            id="nav_worksheet"
            onClick={() => setActiveTab('worksheet')}
            className={`flex-1 flex gap-2 items-center justify-center py-2.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'worksheet'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-850'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileEdit className="w-4 h-4 text-teal-400" />
            Worksheet Planner
          </button>

          <button
            id="nav_clinics"
            onClick={() => setActiveTab('clinics')}
            className={`flex-1 flex gap-2 items-center justify-center py-2.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'clinics'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-850'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            Elements Clinic
          </button>

          <button
            id="nav_preview"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 flex gap-2 items-center justify-center py-2.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-850'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            Manuscript Preview
          </button>

          <button
            id="nav_handbook"
            onClick={() => setActiveTab('handbook')}
            className={`flex-1 flex gap-2 items-center justify-center py-2.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'handbook'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-850'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            Guidebook Manual
          </button>
        </nav>

        {/* Tab Viewport Routing */}
        <div id="dynamic_viewport" className="min-h-[480px]">
          {activeTab === 'worksheet' && (
            <Workbook
              activeDraft={activeDraft}
              onUpdateDraft={handleUpdateDraft}
              onDeleteDraft={handleDeleteDraft}
              onCloneSample={handleSeedCloneSample}
            />
          )}

          {activeTab === 'clinics' && (
            <div className="space-y-12" id="clinics_scroller">
              <ZoomLensTool />
              <MontageTool />
            </div>
          )}

          {activeTab === 'preview' && (
            <StoryPreview
              draft={activeDraft}
            />
          )}

          {activeTab === 'handbook' && (
            <Handbook 
              onExit={() => setActiveTab('worksheet')}
              onSelectTrack={(track) => {
                const updatedDraft = { ...activeDraft, track, updatedAt: new Date().toISOString() };
                handleUpdateDraft(updatedDraft);
              }}
            />
          )}
        </div>
      </main>

      {/* Aesthetic Footer Signoffs */}
      <footer className="mt-auto py-8 bg-slate-900/60 border-t border-slate-800/80 text-center text-xs text-slate-500 font-sans" id="app_footer">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            College Essay Architect — Crafted to guide reflective application drafting.
          </p>
          <p className="text-[10px] text-slate-500">
            Based on the combined screenwriting frameworks of Joseph Campbell's Hero's Journey and Pixar Animation Studios.
          </p>
        </div>
      </footer>

      {showOnboarding && (
        <Handbook 
          forceOnboarding={true}
          onExit={() => {
            setShowOnboarding(false);
            localStorage.setItem('college_essay_architect_onboarding_completed_v2', 'true');
            setActiveTab('worksheet');
          }}
          onSelectTrack={(track) => {
            const updatedDraft = { ...activeDraft, track, updatedAt: new Date().toISOString() };
            handleUpdateDraft(updatedDraft);
          }}
        />
      )}
    </div>
  );
}
