/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, Volume2, Sparkles, Feather, HelpCircle, FileEdit, CheckCircle } from 'lucide-react';

interface ZoomExample {
  id: string;
  flat: string;
  closeUpFocus: string; // Sight
  soundFocus: string; // Sound
  sensationFocus: string; // Body
  smellOxygen: string; // Smell
  zoomedResult: string;
}

const ZOOM_EXAMPLES: ZoomExample[] = [
  {
    id: 'ex_1',
    flat: 'I was really nervous during my presentation.',
    closeUpFocus: 'The dry-erase marker felt like a block of ice in my hand, tapping a rapid, jagged rhythm against the steel tray.',
    soundFocus: 'The industrial overhead fan hummed a high, relentless B-flat, louder than my actual thoughts.',
    sensationFocus: 'My throat was dry cement, and a narrow bead of sweat traced a cold line straight down my left rib.',
    smellOxygen: 'The smell of dry-ink chemical solvent filled my nostrils, making me dizzy.',
    zoomedResult: 'The dry-erase marker felt like a block of ice in my hand, tapping a rapid Morse-code against the metal whiteboard tray. Overhead, the classroom air conditioner hummed a high, relentless B-flat, louder than any of my prepared talking points. My throat turned to dry cement as a bead of sweat traced a cold path down my collarbone, smelling faintly of dry-erase chemical solvent. I looked at twenty blank faces, forgot my opening words, and stood there entirely mute.'
  },
  {
    id: 'ex_2',
    flat: 'The room was chaotic and full of active kids.',
    closeUpFocus: 'A red watermelon with "DENSITY" written on it sat dripping pool water on my cargo shorts.',
    soundFocus: 'Twenty campers screeched and hollered, slapping damp index cards against the wooden table boards.',
    sensationFocus: 'My ears vibrated from the din, but all my muscles relaxed as I saw their eyes focus.',
    smellOxygen: 'The scent of damp pine needles and wet moss blew off the lake, bringing cold relief.',
    zoomedResult: 'A red watermelon with "DENSITY" scrawled in black Sharpie sat between my knees, dripping lake water onto my muddy cargo shorts. Around the table, twenty children screamed over one another, triumphantly slapping damp, wrinkled index cards against the rough wood. The scent of crushed pine needles and wet moss blew in from the lake, and the panic that had clenched my chest for hours dissolved into the cold afternoon breeze.'
  },
  {
    id: 'ex_3',
    flat: 'I was angry and frustrated when my code did not work.',
    closeUpFocus: 'The terminal screen glowed yellow, highlighting 1,402 lines of warning syntax logs.',
    soundFocus: 'My mechanical keyboard clicked sharply, like snapping matchsticks, in the dark bedroom.',
    sensationFocus: 'A pulse beat visibly in my temple, and my eyes felt scratchy and sand-papered from staring.',
    smellOxygen: 'The stale, dry air of lukewarm pepperoni pizza and overheated fan exhaust hovered around me.',
    zoomedResult: 'The mechanical keyboard keys snapped like dry matchsticks under my fingers, a lonely, hostile click-clack in my midnight bedroom. On screen, a glowing yellow prompt mocked me, citing an undefined variable somewhere among 1,400 lines of code. Stale exhaust fan heat and the oil of cold pepperoni pizza hung thick in the air, and a pulse beat rhythmically in my temple as I resisted the urge to slam the screen shut and throw my laptop in the trash.'
  }
];

export default function ZoomLensTool() {
  const [selectedEx, setSelectedEx] = useState<string>('ex_1');
  const [flatText, setFlatText] = useState<string>('');
  
  // Custom Zoom Builder State
  const [sightInput, setSightInput] = useState<string>('');
  const [soundInput, setSoundInput] = useState<string>('');
  const [bodyInput, setBodyInput] = useState<string>('');
  const [smellInput, setSmellInput] = useState<string>('');
  const [combinedParagraph, setCombinedParagraph] = useState<string>('');
  const [hasCompiled, setHasCompiled] = useState<boolean>(false);

  const currentExample = ZOOM_EXAMPLES.find(ex => ex.id === selectedEx) || ZOOM_EXAMPLES[0];

  const handleLoadExample = (ex: ZoomExample) => {
    setSelectedEx(ex.id);
    // Autofill user sandbox with example starting point for editability
    setFlatText(ex.flat);
    setSightInput(ex.closeUpFocus);
    setSoundInput(ex.soundFocus);
    setBodyInput(ex.sensationFocus);
    setSmellInput(ex.smellOxygen);
    setCombinedParagraph(ex.zoomedResult);
    setHasCompiled(true);
  };

  const handleCompileCustom = () => {
    // Generate draft combined paragraph
    const paragraphs = [sightInput, soundInput, bodyInput, smellInput]
      .filter(p => p.trim().length > 0)
      .join(' ');
    setCombinedParagraph(paragraphs);
    setHasCompiled(true);
  };

  const handleReset = () => {
    setFlatText('');
    setSightInput('');
    setSoundInput('');
    setBodyInput('');
    setSmellInput('');
    setCombinedParagraph('');
    setHasCompiled(false);
  };

  return (
    <div id="zoom_lens_root" className="space-y-8 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/20">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs uppercase font-sans tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-teal-400" /> Directing Your Narrative
        </span>
        <h2 className="text-2xl font-serif font-medium text-white mt-1">The Cinematic Zoom Lens</h2>
        <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
          The climax of your story (<strong className="font-semibold text-slate-200">The Ordeal</strong>) should not be narrated at high speed. You must <strong>"stop time"</strong> and force the admissions officer to live inside the scene using visceral, sensory details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Examples Showcase */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 space-y-4 shadow" id="zoom_examples_panel">
            <h3 className="font-sans font-bold text-sm text-slate-150 text-slate-100 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> Read & Learn from Masters
            </h3>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Click an example to load its sensory breakdown into the interactive playground on the right:
            </p>

            <div className="space-y-2" id="examples_button_group">
              {ZOOM_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  id={`zoom_ex_btn_${ex.id}`}
                  onClick={() => handleLoadExample(ex)}
                  className={`w-full text-left p-3 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                    selectedEx === ex.id
                      ? 'bg-slate-850 border-slate-700 text-teal-400 font-bold shadow'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:border-slate-750'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1">
                    Template Flat Hook
                  </span>
                  "{ex.flat}"
                </button>
              ))}
            </div>

            {/* Before vs After Visualization */}
            <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 space-y-3" id="zoom_comparative_view">
              <div className="text-[10px] font-sans uppercase font-bold tracking-wider text-slate-505 text-slate-550 border-b border-slate-800 pb-1.5">
                Visual Transformation
              </div>
              <div className="space-y-2">
                <div className="text-[11px]" id="flat_visual_indicator">
                  <div className="font-sans font-bold text-red-400 text-xs text-red-400">Before (Telling/Flat):</div>
                  <p className="italic text-slate-400 font-serif mt-0.5">"{currentExample.flat}"</p>
                </div>
                <div className="text-[11px]" id="zoomed_visual_indicator">
                  <div className="font-sans font-bold text-teal-400 text-xs">After (Zoomed Sensory Climax):</div>
                  <p className="italic text-slate-200 font-serif mt-1 leading-relaxed bg-slate-950 p-2.5 border border-slate-800 rounded shadow-inner">
                    "{currentExample.zoomedResult}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Interactive Sandbox */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-6 space-y-6 shadow" id="custom_sandbox_panel">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-sans font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <FileEdit className="w-4 h-4 text-pink-400" /> Sensory Builder Sandbox
              </h3>
              <button
                id="reset_sandbox_btn"
                onClick={handleReset}
                className="text-[10px] font-sans font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Clear Sandbox
              </button>
            </div>

            <div className="space-y-4" id="sandbox_inputs">
              {/* Flat input */}
              <div>
                <label className="block text-xs font-sans font-bold text-slate-300 mb-1">
                  1. The Flat Sentence (e.g., "I felt very nervous")
                </label>
                <input
                  id="sandbox_flat_input"
                  type="text"
                  placeholder="Insert your starting telling sentence..."
                  value={flatText}
                  onChange={(e) => setFlatText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-sans text-slate-250 text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none placeholder:text-slate-655"
                />
              </div>

              {/* Grid of 4 Senses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual Close-Up */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-semibold text-slate-300 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    Sight / Micro Close-Up Detail
                  </label>
                  <textarea
                    id="sandbox_sight_input"
                    rows={2}
                    placeholder="Focus on a tiny visual: marker shakes, rust on a pipe, key card scratch, dust..."
                    value={sightInput}
                    onChange={(e) => setSightInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none leading-relaxed placeholder:text-slate-600"
                  />
                </div>

                {/* Sound Detail */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-semibold text-slate-300 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    Sound / Acoustic Detail
                  </label>
                  <textarea
                    id="sandbox_sound_input"
                    rows={2}
                    placeholder="Describe ambient noise: keyboard clicks, high air conditioner hum, cricket chirps..."
                    value={soundInput}
                    onChange={(e) => setSoundInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none leading-relaxed placeholder:text-slate-600"
                  />
                </div>

                {/* Sensation / Physical feeling */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-semibold text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                    Sensation & Breathing
                  </label>
                  <textarea
                    id="sandbox_body_input"
                    rows={2}
                    placeholder="Describe stomach butterfly tight, cold hands, dry sandpaper tongue..."
                    value={bodyInput}
                    onChange={(e) => setBodyInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none leading-relaxed placeholder:text-slate-600"
                  />
                </div>

                {/* Smell / Taste Details */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-semibold text-slate-300 flex items-center gap-1">
                    <Feather className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    Smell or Ambient Air Taste
                  </label>
                  <textarea
                    id="sandbox_smell_input"
                    rows={2}
                    placeholder="Scent of rain-damaged cardboard, dry marker odor, chemical grease, or damp pine..."
                    value={smellInput}
                    onChange={(e) => setSmellInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-sans text-slate-200 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-slate-950 focus:outline-none leading-relaxed placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  id="compile_zoom_lens_btn"
                  onClick={handleCompileCustom}
                  className="w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-650 bg-cyan-600 hover:opacity-95 text-white py-2.5 rounded-lg text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/10"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Compile & Review My Climax Prose
                </button>
              </div>
            </div>

            {/* Generated Output */}
            {hasCompiled && (
              <div className="bg-teal-950/20 border border-teal-900/40 p-4 rounded-xl space-y-3 animate-fade-in" id="sandbox_result_container">
                <div className="flex items-center justify-between border-b border-teal-900/40 pb-1.5 border-teal-100/50">
                  <span className="text-[10px] font-sans uppercase font-bold tracking-wider text-teal-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-400" /> Compiled Zoomed Scene
                  </span>
                  <button
                    id="copy_compiled_zoom_btn"
                    onClick={() => {
                      navigator.clipboard.writeText(combinedParagraph);
                    }}
                    className="text-[9px] font-sans text-teal-400 hover:underline font-bold cursor-pointer"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <p className="text-xs font-serif italic leading-relaxed text-slate-200 bg-slate-950 p-3 border border-slate-850 rounded-lg">
                  "{combinedParagraph}"
                </p>
                <div className="text-[10px] font-sans text-slate-400 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-850">
                  <strong>How to use this projection:</strong> Paste this sensory, zoomed-in paragraph into your story's <strong className="font-semibold text-slate-200">Ordeal (Q5)</strong>. It immediately transforms your draft from passive reportage into a vivid, immersive screenplay where the admissions officer sits in the front row!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
