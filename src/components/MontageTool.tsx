/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, Sparkles, Wand2, Copy, RefreshCw, Film } from 'lucide-react';

interface MontagePreset {
  id: string;
  themeName: string;
  oneLineDescription: string;
  era1: string; // At age six...
  era2: string; // At age twelve...
  era3: string; // At age sixteen...
  transitionGoal: string; // Ready for college...
}

const PRESETS: MontagePreset[] = [
  {
    id: 'p_1',
    themeName: 'The Curious Builder',
    oneLineDescription: 'Threading physical projects and hands-on assembly.',
    era1: 'I dismantled our toaster, holding a screwdriver twice the size of my fingers to discover where the heat was hidden.',
    era2: 'I spent a week building a wooden treehouse that mostly stayed level, in spite of shaky support beams.',
    era3: 'I spent late nights soldering components onto customized robotic microprocessors in the damp basement.',
    transitionGoal: 'eager to bring this hands-on research and prototyping resilience directly into your sustainable materials labs.'
  },
  {
    id: 'p_2',
    themeName: 'The Mediator / Bridge Maker',
    oneLineDescription: 'Threading conflict resolution and active listening.',
    era1: 'I was the silent playground judge who negotiated the shared ownership of blue kickballs.',
    era2: 'I organized family seating charts during highly active, opinionated holiday dinners.',
    era3: 'I drafted co-written guidelines for our divided student government to coordinate a blood drive.',
    transitionGoal: 'ready to foster collaboration and moderate challenging debates in your international relations dorms.'
  }
];

interface MontageToolProps {
  onInsert?: (text: string) => void;
}

export default function MontageTool({ onInsert }: MontageToolProps = {}) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p_1');
  const [themeName, setThemeName] = useState<string>('');
  const [era1Val, setEra1Val] = useState<string>('');
  const [era2Val, setEra2Val] = useState<string>('');
  const [era3Val, setEra3Val] = useState<string>('');
  const [colTransitionVal, setColTransitionVal] = useState<string>('');
  const [compiledMontage, setCompiledMontage] = useState<string>('');
  const [isCompiled, setIsCompiled] = useState<boolean>(false);

  const [montageMode, setMontageMode] = useState<'chronological' | 'thematic'>('chronological');

  // Load preset details
  const handleLoadPreset = (preset: MontagePreset) => {
    setSelectedPresetId(preset.id);
    setThemeName(preset.themeName);
    setEra1Val(preset.era1);
    setEra2Val(preset.era2);
    setEra3Val(preset.era3);
    setColTransitionVal(preset.transitionGoal);
    setMontageMode('chronological');
    
    const text = `Montage Ingredients:
- Theme: ${preset.themeName}
- Scene 1: ${preset.era1}
- Scene 2: ${preset.era2}
- Scene 3: ${preset.era3}
- Summary: ${preset.transitionGoal}`;
    setCompiledMontage(text);
    setIsCompiled(true);
  };

  const handleCompileCustom = () => {
    const text = `Montage Ingredients:
- Theme: ${themeName || 'curiosity'}
- Scene 1: ${era1Val || 'I investigated the backyard trees.'}
- Scene 2: ${era2Val || 'I set up small neighborhood clubs.'}
- Scene 3: ${era3Val || 'I cataloged local park species.'}
- Summary: ${colTransitionVal || 'excited to bring this active searching spirit to your biology department.'}`;
    setCompiledMontage(text);
    setIsCompiled(true);
  };

  const handleClear = () => {
    setThemeName('');
    setEra1Val('');
    setEra2Val('');
    setEra3Val('');
    setColTransitionVal('');
    setCompiledMontage('');
    setIsCompiled(false);
  };  return (
    <div id="montage_root" className="space-y-8 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/20">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs uppercase font-sans tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
          <Film className="w-3.5 h-3.5 text-rose-400" /> Condensing Space & Time
        </span>
        <h2 className="text-2xl font-serif font-medium text-white mt-1">The Cinematic Montage Builder</h2>
        <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
          How do you show wide expertise, multiple projects, or an enduring personality trait on one page without writing a boring grocery list? 
          You thread multiple stages of your life on <strong>one common wire frame</strong> of action verbs. <br />
          <strong className="text-rose-400">Pacing Tip:</strong> Only use a true Montage once in your essay (typically for your background or your future). Overusing it will make your narrative feel detached and rushed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Presets List */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-4">
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4 shadow" id="montage_presets_box">
            <div>
              <h3 className="font-sans font-bold text-xs text-slate-100">Select a Thread Theme</h3>
              <p className="text-[11px] text-slate-500 font-sans mt-1">
                Browse prebuilt examples to see how the timelines link up beautifully.
              </p>
            </div>

            <div className="space-y-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  id={`montage_preset_${p.id}`}
                  onClick={() => handleLoadPreset(p)}
                  className={`w-full text-left p-3 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                    selectedPresetId === p.id && isCompiled
                      ? 'bg-slate-840 bg-slate-850 border-slate-700 text-rose-400 font-bold shadow'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:border-slate-750'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-rose-400" />
                    {p.themeName}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 italic">{p.oneLineDescription}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Playground Inputs */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-4">
          <div className="bg-slate-950 border border-slate-850 p-6 rounded-xl space-y-4 shadow">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-sans font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-cyan-400" /> Custom Montage Generator
              </h3>
              <button
                id="montage_clear_btn"
                onClick={handleClear}
                className="text-[11px] font-sans font-bold text-rose-400 hover:text-rose-300 cursor-pointer"
              >
                Reset Fields
              </button>
            </div>

            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800 w-full mb-4 mt-2">
              <button
                onClick={() => setMontageMode('chronological')}
                className={`flex-1 py-1.5 text-[11px] font-sans font-bold rounded-md transition-all ${
                  montageMode === 'chronological' ? 'bg-teal-500/20 text-teal-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Chronological (Time-based)
              </button>
              <button
                onClick={() => setMontageMode('thematic')}
                className={`flex-1 py-1.5 text-[11px] font-sans font-bold rounded-md transition-all ${
                  montageMode === 'thematic' ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Thematic (Setting/Event-based)
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-sans font-bold text-slate-300 mb-1">
                  Unifying Trait/Theme
                </label>
                <input
                  id="montage_theme_input"
                  type="text"
                  placeholder="e.g. curiosity, building things, listening to silence"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold text-slate-300 mb-1">
                  {montageMode === 'chronological' ? '1. Childhood Seed (At 6 / 8 years)' : '1. Setting or Scene 1'}
                </label>
                <input
                  id="montage_era1_input"
                  type="text"
                  placeholder={montageMode === 'chronological' ? "e.g. dismantling toasters, cataloging insects..." : "e.g. in the busy kitchen preparing dinner..."}
                  value={era1Val}
                  onChange={(e) => setEra1Val(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold text-slate-300 mb-1">
                  {montageMode === 'chronological' ? '2. Growth Pivot (At 12 / 13 years)' : '2. Setting or Scene 2'}
                </label>
                <input
                  id="montage_era2_input"
                  type="text"
                  placeholder={montageMode === 'chronological' ? "e.g. coding HTML, designing backyard forts..." : "e.g. at the chaotic debate tournament..."}
                  value={era2Val}
                  onChange={(e) => setEra2Val(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold text-slate-300 mb-1">
                  {montageMode === 'chronological' ? '3. Adolescent Standard (At 16 / 17 years)' : '3. Setting or Scene 3'}
                </label>
                <input
                  id="montage_era3_input"
                  type="text"
                  placeholder={montageMode === 'chronological' ? "e.g. teaching code classes, running regional food banks..." : "e.g. inside the silent library sorting books..."}
                  value={era3Val}
                  onChange={(e) => setEra3Val(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-bold text-slate-300 mb-1">
                4. College Connection Promise (The Bridge)
              </label>
              <input
                id="montage_bridge_input"
                type="text"
                placeholder="e.g., eager to bring this trial-and-error builder resilience to your solar tech lab."
                value={colTransitionVal}
                onChange={(e) => setColTransitionVal(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none placeholder:text-slate-600"
              />
            </div>

            <button
              id="compile_montage_btn"
              onClick={handleCompileCustom}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white py-2.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer shadow-md shadow-cyan-500/10"
            >
              Review Montage Ingredients
            </button>

            {isCompiled && (
              <div className="bg-teal-950/20 border border-teal-900/40 p-4 rounded-xl space-y-2 animate-fade-in">
                <div className="flex justify-between items-center pb-1.5 border-b border-teal-900/40 border-emerald-105-to-be-removed">
                  <span className="text-[11px] font-sans text-teal-400 font-bold uppercase tracking-wider">Your Montage Ingredients</span>
                  <div className="flex gap-2 items-center">
                    {onInsert && (
                      <button
                        onClick={() => onInsert(compiledMontage)}
                        className="text-[11px] font-sans text-teal-400 hover:text-teal-300 font-bold border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 rounded cursor-pointer"
                      >
                        Insert to Workbook
                      </button>
                    )}
                    <button
                      id="copy_montage_btn"
                      onClick={() => navigator.clipboard.writeText(compiledMontage)}
                      className="text-[11px] font-sans text-teal-400 hover:underline font-bold cursor-pointer"
                    >
                      Copy Output
                    </button>
                  </div>
                </div>
                <pre className="text-xs font-serif whitespace-pre-wrap text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
{compiledMontage}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
