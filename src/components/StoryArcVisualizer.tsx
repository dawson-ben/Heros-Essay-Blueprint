import React, { useState } from 'react';
import { EssayDraft, PromptField } from '../types';
import { 
  HEROS_JOURNEY_PROMPTS, 
  DIFFERENT_BUT_TRUTHFUL_PROMPTS, 
  INTELLECTUAL_JOURNEY_PROMPTS 
} from '../constants';
import { 
  Zap, 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Flame, 
  CornerDownRight,
  User,
  Heart,
  Lightbulb,
  Compass,
  FileEdit,
  ArrowRight
} from 'lucide-react';

interface StoryArcVisualizerProps {
  draft: EssayDraft;
  onUpdateDraft: (updated: EssayDraft) => void;
}

export default function StoryArcVisualizer({ draft, onUpdateDraft }: StoryArcVisualizerProps) {
  const prompts = draft.track === 'heros_journey'
    ? HEROS_JOURNEY_PROMPTS
    : draft.track === 'different_but_truthful'
      ? DIFFERENT_BUT_TRUTHFUL_PROMPTS
      : INTELLECTUAL_JOURNEY_PROMPTS;

  const answers = draft.track === 'heros_journey'
    ? draft.herosJourneyAnswers
    : draft.track === 'different_but_truthful'
      ? draft.differentTruthfulAnswers
      : draft.intellectualJourneyAnswers || {};

  const [expandedBeat, setExpandedBeat] = useState<string | null>(null);
  const [editingBeat, setEditingBeat] = useState<string | null>(null);
  const [tempText, setTempText] = useState('');

  const countWords = (text: string): number => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  const getBeatStatus = (promptId: string) => {
    const text = answers[promptId] || '';
    return text.trim().length > 0;
  };

  const activeBeatsCount = prompts.filter(p => getBeatStatus(p.id)).length;
  const integrityPercentage = Math.round((activeBeatsCount / prompts.length) * 100);

  const handleStartEditing = (promptId: string, currentVal: string) => {
    setEditingBeat(promptId);
    setTempText(currentVal);
  };

  const handleSaveEditing = (promptId: string) => {
    const updatedAnswers = { ...answers, [promptId]: tempText };
    
    let updatedDraft = { ...draft };
    if (draft.track === 'heros_journey') {
      updatedDraft.herosJourneyAnswers = updatedAnswers;
    } else if (draft.track === 'different_but_truthful') {
      updatedDraft.differentTruthfulAnswers = updatedAnswers;
    } else {
      updatedDraft.intellectualJourneyAnswers = updatedAnswers;
    }

    updatedDraft.updatedAt = new Date().toISOString();
    onUpdateDraft(updatedDraft);
    setEditingBeat(null);
  };

  // Maps custom narrative stage icons to provide movie production feel
  const getBeatIcon = (index: number, total: number, promptId: string) => {
    if (index === 0) return <Heart className="w-4 h-4" />;
    if (index === total - 1) return <Sparkles className="w-4 h-4" />;
    if (promptId.includes('climax') || promptId.includes('ordeal') || promptId.includes('dissonance')) {
      return <Flame className="w-4 h-4 animate-pulse text-amber-500" />;
    }
    if (promptId.includes('catalyst') || promptId.includes('spark') || promptId.includes('tipping_point')) {
      return <Lightbulb className="w-4 h-4 text-cyan-400" />;
    }
    return <BookOpen className="w-4 h-4" />;
  };

  return (
    <div id="story_arc_visualizer" className="space-y-8 animate-fade-in">
      {/* Visual Integrity Dashboard Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-950/25">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-sans font-bold text-white tracking-tight">Narrative Continuity Map</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Your personal statement structured onto the classic three-act screenplay grid. Every story needs a strong, unbroken path of struggle to lock admissions readers' attention. Missing stages are flagged below.
          </p>
        </div>

        <div className="flex items-center gap-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl shrink-0 w-full md:w-auto justify-between md:justify-start">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-slate-800"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-teal-500 transition-all duration-500 progress-ring-bar"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - integrityPercentage / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="font-mono text-sm font-bold text-slate-100">{integrityPercentage}%</span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-none">Narrative Integrity</div>
            <div className="text-sm font-serif font-bold text-white">
              {activeBeatsCount} / {prompts.length} Beats Completed
            </div>
            <div className="text-[11px] font-sans text-slate-400">
              {integrityPercentage === 100 
                ? '🏆 Screenplay trajectory finalized! Clean momentum.'
                : '⚠️ Progression gaps identified. Complete the red stages below.'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Main Structural Timeline Container */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Side: Interactive vertical timeline */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-sans font-bold text-base text-white">Interactive Screenplay Grid</h3>
            <p className="text-[11px] text-slate-500 font-sans mt-0.5">Click any stage to write or inspect narrative guidelines.</p>
          </div>

          <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-[11px] before:md:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800" id="visual_timeline">
            {prompts.map((p, idx) => {
              const textVal = answers[p.id] || '';
              const isFilled = textVal.trim().length > 0;
              const isExpanded = expandedBeat === p.id;
              const isEditing = editingBeat === p.id;
              const wordsCount = countWords(textVal);

              return (
                <div key={p.id} className="relative group" id={`timeline_node_${p.id}`}>
                  {/* Vertical Node Indicator */}
                  <div 
                    className={`absolute -left-[31px] md:-left-[43px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full border flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
                      isFilled 
                        ? 'bg-slate-950 border-teal-500/60 hover:border-teal-400 text-teal-400 shadow-lg shadow-teal-900/10' 
                        : 'bg-slate-950 border-rose-950 hover:border-rose-800 text-rose-500 shadow-lg shadow-rose-950/10 animate-pulse'
                    }`}
                    onClick={() => {
                      setExpandedBeat(isExpanded ? null : p.id);
                      if (!isFilled && !isEditing) handleStartEditing(p.id, textVal);
                    }}
                  >
                    {isFilled ? <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-400" /> : getBeatIcon(idx, prompts.length, p.id)}
                  </div>

                  {/* Narrative Frame Card */}
                  <div 
                    className={`bg-slate-950 border rounded-xl p-5 md:p-6 transition-all duration-300 ${
                      isExpanded 
                        ? 'border-slate-750 bg-[#090e19] shadow-lg shadow-slate-950/40' 
                        : isFilled 
                        ? 'border-slate-850/60 hover:border-slate-800' 
                        : 'border-rose-950/40 hover:border-rose-900/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Label and status */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">Beats Stage {idx + 1}</span>
                          {isFilled ? (
                            <span className="bg-teal-950/40 text-teal-300 border border-teal-900/40 text-[11px] font-mono px-2 py-0.5 rounded-full font-bold uppercase leading-none">
                              {wordsCount} words
                            </span>
                          ) : (
                            <span className="bg-rose-950/40 text-rose-400 border border-rose-900/30 text-[11px] font-mono px-2 py-0.5 rounded-full font-bold uppercase leading-none">
                              Incomplete
                            </span>
                          )}
                        </div>
                        <h4 className="font-sans font-bold text-sm md:text-base text-slate-100 hover:text-teal-300 transition-colors cursor-pointer" onClick={() => setExpandedBeat(isExpanded ? null : p.id)}>
                          {p.label.replace(/^Q\d+\.?\d*:\s*/, '')}
                        </h4>
                      </div>

                      {/* Right: Expand Toggle */}
                      <button 
                        onClick={() => setExpandedBeat(isExpanded ? null : p.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-900 transition-colors shrink-0"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Collapsed short view */}
                    {!isExpanded && isFilled && (
                      <p className="font-serif italic text-xs text-slate-400 truncate mt-3 pl-2 border-l border-slate-800 leading-normal">
                        "{textVal}"
                      </p>
                    )}

                    {/* Expanded detail pane */}
                    {isExpanded && (
                      <div className="mt-5 pt-4 border-t border-slate-850/60 space-y-4 animate-fade-in">
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {p.description}
                        </p>

                        {/* Pitfall Alert box */}
                        {p.pitfallWarning && (
                          <div className="flex gap-2 bg-rose-955 bg-rose-950/20 border border-rose-900/30 text-rose-300 p-3 rounded-lg text-[11px] font-sans">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400 mt-0.5" />
                            <div>
                              <strong className="font-bold text-rose-200">Pitfall Warning:</strong> {p.pitfallWarning}
                            </div>
                          </div>
                        )}

                        {/* Edit or Display Area */}
                        {isEditing ? (
                          <div className="space-y-3 font-sans">
                            <textarea
                              value={tempText}
                              onChange={(e) => setTempText(e.target.value)}
                              placeholder={p.placeholder}
                              className="w-full h-32 bg-slate-950 border border-slate-800 text-sm font-serif text-slate-100 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors leading-relaxed"
                            />
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={() => setEditingBeat(null)}
                                className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:text-white rounded-lg text-xs font-sans text-slate-400 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEditing(p.id)}
                                className="px-4 py-1.5 bg-teal-500 hover:bg-teal-450 text-slate-950 rounded-lg text-xs font-sans font-bold transition-colors"
                              >
                                Save Beat
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {isFilled ? (
                              <div className="bg-slate-950 border border-slate-850/80 rounded-xl p-4 relative group/body">
                                <p className="font-serif text-sm leading-relaxed text-slate-200 pre-wrap">
                                  {textVal}
                                </p>
                                <button
                                  onClick={() => handleStartEditing(p.id, textVal)}
                                  className="absolute top-2 right-2 p-1.5 bg-slate-900 border border-slate-800 text-teal-400 hover:text-teal-300 rounded opacity-0 group-hover/body:opacity-100 transition-opacity text-xs font-sans flex items-center gap-1 cursor-pointer"
                                  title="Edit answer text"
                                >
                                  <FileEdit className="w-3 h-3" /> Edit
                                </button>
                              </div>
                            ) : (
                              <div className="bg-rose-950/15 border border-rose-900/30 rounded-xl p-5 text-center space-y-3">
                                <div className="text-xs text-rose-300 font-sans flex items-center gap-1.5 justify-center">
                                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                                  <span>Plot Hole: Empty narrative sequence.</span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-sans max-w-sm mx-auto">
                                  Leaving this segment empty disrupts the narrative tempo of your statement. Build your struggle sequence now.
                                </p>
                                <button
                                  onClick={() => handleStartEditing(p.id, textVal)}
                                  className="mx-auto px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer shadow"
                                >
                                  <CornerDownRight className="w-3.5 h-3.5" />
                                  Draft This Stage
                                </button>
                              </div>
                            )}

                            {/* Pedagogy Example Drawer inside expanded beat */}
                            {p.examples && p.examples.length > 0 && (
                              <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-850">
                                <div className="text-[11px] font-mono tracking-wider font-bold text-slate-500 uppercase">Interactive Guide Reference Example:</div>
                                {p.examples.map((ex, exIdx) => (
                                  <div key={exIdx} className="space-y-1">
                                    <div className="text-[11px] font-sans font-bold text-slate-300 flex items-center gap-1">
                                      <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                                      {ex.title}
                                    </div>
                                    <p className="text-xs text-slate-400 font-serif leading-relaxed italic pl-2.5">
                                      "{ex.text}"
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Proportional Tempo Dashboard Panel */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                Tempo Analysis
              </h4>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <p className="text-slate-400 leading-relaxed">
                Admissions officers scan personal statements in under 90 seconds. A perfect story arc requires a balanced distribution of word assets. 
              </p>

              <div className="space-y-3.5 bg-slate-950 border border-slate-850 p-4 rounded-xl">
                <h5 className="font-bold text-[11px] text-slate-500 uppercase tracking-wider">Linter Tempo Diagnostics</h5>
                
                <div className="space-y-3 shrink-0">
                  {prompts.map((p, idx) => {
                    const textVal = answers[p.id] || '';
                    const isFilled = textVal.trim().length > 0;
                    
                    return (
                      <div key={p.id} className="flex items-center justify-between gap-2 border-b border-slate-900 pb-1.5 last:border-none">
                        <span className="text-slate-400 text-[11px] truncate max-w-[130px]" title={p.label}>Stage {idx + 1}: {p.label.replace(/^Q\d+\.?\d*:\s*/, '')}</span>
                        {isFilled ? (
                          <span className="text-teal-400 font-mono text-[11px] font-bold">FLOWING</span>
                        ) : (
                          <span className="text-rose-500 font-mono text-[11px] font-bold animate-pulse">GAP</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {integrityPercentage === 100 ? (
                <div className="p-4 bg-teal-950/20 border border-teal-900/30 text-teal-300 rounded-xl leading-relaxed text-[11px]">
                  <strong>✨ Continuous Plot Progression!</strong> Your story contains no developmental holes. Go ahead to the <strong className="text-teal-200">Manuscript Preview</strong> tab to verify word count balanced allocations!
                </div>
              ) : (
                <div className="p-4 bg-rose-950/10 border border-rose-900/20 text-rose-300 rounded-xl leading-relaxed text-[11px]">
                  <strong>⚠️ Plot Trajectory Interrupted!</strong> We found <strong className="text-rose-200">{prompts.length - activeBeatsCount} empty stages</strong>. Readers will stumble over missing details. Click any marked red node to draft its guidelines immediately.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
