/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Sparkles,
  AlertTriangle,
  UserPlus,
  Clapperboard,
  Milestone
} from 'lucide-react';
import { GuidebookManual } from './GuidebookManual';
import { useAuth } from '../AuthContext';
import ColdOpen from './ColdOpen';

interface HandbookProps {
  forceOnboarding?: boolean;
  onExit?: (options?: { openGuidebook?: boolean }) => void;
  onSelectTrack?: (track: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey') => void;
  onOpenGuidebook?: () => void;
}

export default function Handbook({ forceOnboarding = false, onExit, onSelectTrack, onOpenGuidebook }: HandbookProps) {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [showColdOpen, setShowColdOpen] = useState(forceOnboarding);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingTrack, setPendingTrack] = useState<'heros_journey' | 'different_but_truthful' | 'intellectual_journey'>('heros_journey');
  const [routeToGuidebook, setRouteToGuidebook] = useState(false);
  const { user, login } = useAuth();

  const handleNextStep = () => {
    setOnboardingStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setOnboardingStep(prev => Math.max(0, prev - 1));
  };

  const handleFinishOnboarding = (trackKey: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey' = 'heros_journey') => {
    if (!user && forceOnboarding) {
      setPendingTrack(trackKey);
      setShowAuthModal(true);
      return;
    }
    
    finalizeOnboarding(trackKey, routeToGuidebook);
  };

  const finalizeOnboarding = (trackKey: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey', shouldRouteGuidebook: boolean = false) => {
    if (onSelectTrack) {
      onSelectTrack(trackKey);
    }
    if (onExit) {
      onExit({ openGuidebook: shouldRouteGuidebook });
    }
    setOnboardingStep(0);
    setShowAuthModal(false);
  };

  const handleLoginClick = async () => {
    try {
      localStorage.setItem('college_essay_architect_pending_track', pendingTrack);
      if (routeToGuidebook) {
        localStorage.setItem('college_essay_architect_route_to_guidebook', 'true');
      }
      await login();
      finalizeOnboarding(pendingTrack, routeToGuidebook);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenScholarPath = () => {
    setRouteToGuidebook(true);
    if (!user && forceOnboarding) {
      setPendingTrack('heros_journey');
      setShowAuthModal(true);
      return;
    }
    finalizeOnboarding('heros_journey', true);
  };

  if (showColdOpen) {
    return <ColdOpen onComplete={() => setShowColdOpen(false)} />;
  }

  if (!forceOnboarding) {
    return (
      <div className="w-full" id="handbook_super_container">
        <div 
          id="handbook_card" 
          className="bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl relative w-full grid grid-cols-1 gap-6 p-1 bg-slate-950 border-0 shadow-none"
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900" id="manual_chapters_header">
            <div>
              <h2 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" /> Guidebook
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Understand screenwriting mechanics, narrative blueprints, and avoid critical clichés
              </p>
            </div>
          </div>
          <GuidebookManual />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-6 overflow-y-auto" id="handbook_super_container">
      <div 
        id="handbook_card" 
        className="bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl relative w-full max-w-6xl mx-auto my-8 border-cyan-500/20 shadow-cyan-500/5"
      >
        {/* Onboarding Mode Header */}
        <div className="bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-end sticky top-0 z-10" id="onboarding_header">
          <button
            id="skip_to_workspace_top_btn"
            onClick={() => handleFinishOnboarding()}
            className="text-xs font-sans font-bold text-slate-400 hover:text-slate-100 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800 cursor-pointer"
          >
            Skip to Workspace <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 md:p-8 flex flex-col h-[750px] md:h-[650px] overflow-hidden" id="onboarding_content">
          
          {/* Step Onboarding Pipeline Indicator */}
          <div className="flex items-center justify-between col-span-12 max-w-xl mx-auto border-b border-slate-800/80 pb-6 mb-6 text-center w-full shrink-0" id="onboarding_stepper">
                <div className="flex items-center justify-center gap-1 md:gap-2 w-full">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((sIndex) => (
                    <React.Fragment key={sIndex}>
                      <button
                        id={`stepper_jump_${sIndex}`}
                        onClick={() => setOnboardingStep(sIndex)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all relative shrink-0 ${
                          onboardingStep === sIndex
                            ? 'bg-gradient-to-tr from-teal-400 to-cyan-500 text-white ring-2 ring-cyan-400/30'
                            : onboardingStep > sIndex
                              ? 'bg-teal-950 text-teal-400 border border-teal-800'
                              : 'bg-slate-950 text-slate-500 border border-slate-800/80 cursor-pointer hover:bg-slate-900 border-slate-700'
                        }`}
                        title={`Go to Step ${sIndex}`}
                      >
                        {onboardingStep > sIndex ? <Check className="w-3.5 h-3.5" /> : null}
                      </button>
                      {sIndex < 7 && (
                        <div className={`h-0.5 flex-1 min-w-[8px] sm:min-w-[12px] md:min-w-[20px] rounded ${
                          onboardingStep > sIndex ? 'bg-teal-850 bg-teal-500/40' : 'bg-slate-800'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            {/* STEP 0: Welcome Splash Screen */}
            {onboardingStep === 0 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_0">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-white tracking-tight leading-tight pt-2 text-left">
                    You already know you need a story.
                  </h1>
                  <div className="text-sm md:text-base font-sans text-slate-350 leading-relaxed space-y-4 text-slate-300 text-left">
                    <p>
                      You’ve been told a thousand times to not just rehash your resume. You <strong>know</strong> you need a compelling story. But knowing what to do and actually doing it are not the same thing.
                    </p>
                    <p>
                      With high stakes and looming deadlines, staring at an empty canvas is terrifying.
                    </p>
                    <p>
                      So, you dive in. You start typing away, hoping the perfect words will magically flow. (Spoiler alert: They almost certainly don't).
                    </p>
                    <p className="font-semibold text-slate-200 text-lg md:text-xl mt-6">
                      That's the "Curse of the Blank Page". And together, we’re going to break it. <span className="text-cyan-400">Without using any AI.</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-center shrink-0 border-t border-slate-800/50 mt-4" id="action_step_0">
                  <button
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: The "Created Twice" Principle */}
            {onboardingStep === 1 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_1">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight text-left">
                    Every masterpiece is created twice.
                  </h2>
                  <div className="text-sm md:text-base font-sans text-slate-300 leading-relaxed space-y-4">
                    <p>
                      First as a plan, then as a product. Under time pressure, building an outline may feel like an "extra step." It isn't. You'll create your essay twice no matter what: either you build a plan first and execute it smoothly, or you start typing, realize your draft is a rambling mess, and have to rewrite it from scratch...maybe a few times.
                    </p>
                    <p>
                      A great builder doesn't just start nailing boards together; she first draws a blueprint. A great movie director doesn't just grab a camera and start filming random scenes; he relies on a meticulously outlined screenplay. He has a plan for each of his scenes before he picks up the camera.
                    </p>
                    <p className="font-semibold text-slate-200">
                      If you try to write your essay line-by-line without a roadmap, you will get lost. Before you polish your prose, you need a plan.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={handleNextStep} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-95 cursor-pointer">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: System Boundaries */}
            {onboardingStep === 2 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_2">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight text-left">
                    Your Co-Architect. Not your Ghostwriter.
                  </h2>
                  <div className="text-sm md:text-base font-sans text-slate-300 leading-relaxed space-y-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800/80">
                    <p>
                      This app contains zero generative AI. None. It is not a digital ventriloquist. It will not write your essay for you, nor will it critique your grammar.
                    </p>
                    <p>
                      Colleges (and their AI detectors) are looking for <strong>your authentic human voice</strong>. This app will help you find it and project it with power.
                    </p>
                    <p>
                      Its job is simply to ask you the right questions, help you extract your raw materials, and organize them into a pattern proven to connect with readers. <strong className="text-teal-400">The authorship remains 100% yours.</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={handleNextStep} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-95 cursor-pointer">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Stealing from the Masters */}
            {onboardingStep === 3 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_3">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight text-left">
                    The storyteller’s blueprint.
                  </h2>
                  <div className="text-sm md:text-base font-sans text-slate-300 leading-relaxed space-y-4">
                    <p>
                      To build your roadmap, we borrow from the best.
                    </p>
                    <ul className="space-y-3 pl-6 list-disc text-slate-300">
                      <li>
                        First, we use the <strong className="text-white">Hero's Journey</strong>—the universal structure behind almost every great movie and myth. It is a proven pattern for holding human attention and connecting with your audience.
                      </li>
                      <li>
                        Second, we apply the narrative rules developed by the master storytellers at <strong className="text-white">Pixar</strong> to ensure your essay is both emotionally riveting and efficient with your word count.
                      </li>
                    </ul>
                    <p className="font-semibold text-slate-200 mt-4">
                      You don't need to invent a structure from scratch; instead we plug your truth into a pattern that works.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={handleNextStep} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-95 cursor-pointer">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Lowering the Stakes */}
            {onboardingStep === 4 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_4">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight text-left">
                    You don't need to save the world.
                  </h2>
                  <div className="text-sm md:text-base font-sans text-slate-300 leading-relaxed space-y-4">
                    <p>
                      Let's start by applying Pixar’s first rule: <strong className="text-white">You admire a character for trying more than for their successes.</strong>
                    </p>
                    <p>
                      The biggest common mistake students make is forcing fake, dramatic crises into their essays to sound impressive. You don’t have to win the championship, save the world, or even save the day to have a powerful story. Consider Rudy, one of the most beloved sports films of all time. The hero's ultimate, triumphant victory? A single quarterback sack in the final seconds of a game that was already decided.
                    </p>
                    <p>
                      Admissions officers do not care about the epic scale of your achievements. They want to see your inner struggle, your growth, and your transformation as you break through self-limiting beliefs. You don’t need life-or-death drama to stand out. <strong className="text-teal-400 border-b border-teal-500/30 pb-0.5">Grounded, honest vulnerability is what makes them root for you.</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={handleNextStep} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-95 cursor-pointer">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: The Assembly Process */}
            {onboardingStep === 5 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_5">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight text-left">
                    Let's build your blueprint.
                  </h2>
                  <div className="text-sm md:text-base font-sans text-slate-300 leading-relaxed space-y-4">
                    <p>
                      We’re eliminating the blank page.
                    </p>
                    <p>
                      In the next few steps, we'll ask about the core elements of your story in a way that feels natural. By the end, you'll have an "Ingredients List"—a structurally sound Draft Zero.
                    </p>
                    <p className="text-slate-200 mt-4">
                      Then, you simply export your blueprint to your favorite word processor, stitch the scenes together, and polish the prose.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={handleNextStep} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-95 cursor-pointer shadow-lg shadow-cyan-500/20">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: The Launch Fork */}
            {onboardingStep === 6 && (
              <div className="max-w-4xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_6">
                <div className="flex-grow overflow-y-auto pr-2 pb-4">
                  <div className="space-y-3 mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
                    You're ready to build. How do you want to begin?
                  </h2>
                  <p className="text-sm text-slate-400 font-sans max-w-2xl text-left">
                    Don't worry—you can easily switch between reading and writing at any time. The Guidebook is a slide-out drawer inside your workspace, always just one click away.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg cursor-pointer group" onClick={handleOpenScholarPath}>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-900/50 flex items-center justify-center">
                        <Clapperboard className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">See How the Masters Do It</h3>
                      <p className="text-sm text-slate-400 font-sans leading-relaxed">
                        Want to see the formula in action first? Open the Guidebook to see how Harry Potter, Star Wars, and Spider-Man, and others map perfectly onto our frameworks. Learn how to apply Pixar’s 22 rules of storytelling here and see the database of essay clichés to avoid.
                      </p>
                    </div>
                    <button className="mt-8 w-full py-3 bg-slate-850 text-cyan-400 font-sans font-bold text-sm rounded-xl border border-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 transition-colors cursor-pointer">
                      Open the Guidebook
                    </button>
                  </div>

                  <div className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg cursor-pointer group" onClick={handleNextStep}>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-950/50 border border-teal-900/50 flex items-center justify-center">
                        <Milestone className="w-5 h-5 text-teal-400" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-teal-400 transition-colors">Jump into the Builder</h3>
                      <p className="text-sm text-slate-400 font-sans leading-relaxed">
                        Prefer to learn by doing? Jump straight into the interactive workspace. Select your essay track (Hero's Journey, Intellectual, etc.) and we will guide you step-by-step with bite-sized tips and specific questions to help you extract your raw ingredients.
                      </p>
                    </div>
                    <button className="mt-8 w-full py-3 bg-slate-850 text-teal-400 font-sans font-bold text-sm rounded-xl border border-slate-800 group-hover:bg-teal-500 group-hover:text-slate-950 group-hover:border-teal-400 transition-colors cursor-pointer">
                      Select a Track & Start
                    </button>
                  </div>
                </div>

                </div>
                <div className="pt-4 flex justify-start items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: Drafting Track Selection */}
            {onboardingStep === 7 && (
              <div className="max-w-4xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_7">
                <div className="flex-grow overflow-y-auto pr-2 pb-4">
                  <div className="space-y-3 mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
                    Choose your framework.
                  </h2>
                  <p className="text-sm text-slate-400 font-sans max-w-2xl text-left">
                    Different essay prompts require different architectures. Select the track that best fits the prompt you are answering to enter your workspace:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg cursor-pointer group" onClick={() => handleFinishOnboarding('heros_journey')}>
                    <div className="space-y-3">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">The Hero's Journey <span className="opacity-60 text-sm font-normal block pt-1">(8 Beats)</span></h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        For narrative-heavy prompts about personal growth, failure, or leadership.
                      </p>
                    </div>
                    <button className="mt-6 w-full py-2.5 bg-slate-850 text-cyan-400 font-sans font-bold text-xs rounded-xl border border-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 transition-colors">
                      Select
                    </button>
                  </div>

                  <div className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg cursor-pointer group" onClick={() => handleFinishOnboarding('different_but_truthful')}>
                    <div className="space-y-3">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Quiet Leadership <span className="opacity-60 text-sm font-normal block pt-1">(5 Beats)</span></h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        For essays highlighting subtle vulnerability, behind-the-scenes labor, and quiet power.
                      </p>
                    </div>
                    <button className="mt-6 w-full py-2.5 bg-slate-850 text-emerald-400 font-sans font-bold text-xs rounded-xl border border-slate-800 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-colors">
                      Select
                    </button>
                  </div>

                  <div className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg cursor-pointer group" onClick={() => handleFinishOnboarding('intellectual_journey')}>
                    <div className="space-y-3">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-sky-400 transition-colors">Intellectual Journey <span className="opacity-60 text-sm font-normal block pt-1">(5 Beats)</span></h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        For analytical prompts about theoretical interests, scientific curiosity, or philosophical questions.
                      </p>
                    </div>
                    <button className="mt-6 w-full py-2.5 bg-slate-850 text-sky-400 font-sans font-bold text-xs rounded-xl border border-slate-800 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-400 transition-colors">
                      Select
                    </button>
                  </div>
                </div>

                </div>
                <div className="pt-4 flex justify-start items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              </div>
            )}

          </div>

      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl relative">
            <h3 className="text-xl font-serif font-bold text-white mb-2 pb-2 border-b border-slate-800">Save Your Work</h3>
            <p className="text-sm text-slate-300 font-sans mb-6 leading-relaxed">
              Create an account to securely save your writing progress.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleLoginClick}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-sm cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Create Account / Sign In
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs font-mono">OR</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl space-y-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/80 font-sans leading-relaxed">
                    You can continue writing as a guest, but <strong>all your work will be permanently lost</strong> if you close this browser tab or clear your cache.
                  </p>
                </div>
                <button
                  onClick={() => finalizeOnboarding(pendingTrack, routeToGuidebook)}
                  className="w-full py-2 bg-slate-950 text-slate-400 hover:text-white rounded-lg font-bold flex items-center justify-center transition-all border border-slate-850 hover:border-slate-700 text-xs cursor-pointer"
                >
                  Continue without saving
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
