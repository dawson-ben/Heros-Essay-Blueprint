/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EssayDraft, PromptField, TrackType } from '../types';
import { HEROS_JOURNEY_PROMPTS, DIFFERENT_BUT_TRUTHFUL_PROMPTS, INTELLECTUAL_JOURNEY_PROMPTS } from '../constants';
import { FAMILIAR_STORIES } from './HerosJourneyCompare';
import { Film, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import MontageTool from './MontageTool';
import ZoomLensTool from './ZoomLensTool';

interface WorkbookProps {
  activeDraft: EssayDraft;
  onUpdateDraft: (updatedDraft: EssayDraft) => void;
  onDeleteDraft: (id: string) => void;
}

export default function Workbook({ 
  activeDraft, 
  onUpdateDraft, 
  onDeleteDraft
}: WorkbookProps) {
  const [activeTabGroup, setActiveTabGroup] = useState<string>('heart'); // heros journey sections
  const [focusedFieldId, setFocusedFieldId] = useState<string | null>(null);
  const [selectedReferenceIds, setSelectedReferenceIds] = useState<string[]>([]);
  const [activeToolFieldId, setActiveToolFieldId] = useState<string | null>(null);

  const PROMPT_TO_BEATS_MAP: Record<string, string[]> = {
    'ordinary_world': ['ordinary_world'],
    'unfamiliar_world': ['special_world'],
    'inciting_incident': ['inciting_incident'],
    'hesitation_doubt': ['dont_hesitation'],
    'crossing_threshold': ['commitment_crossing'],
    'the_ordeal_flat': ['ordeal_climax'],
    'winning_action': ['winning_action'],
    'magic_elixir': ['transformation_elixir'],
    'essential_belief': ['transformation_elixir'],
  };

  const prompts = activeDraft.track === 'heros_journey'
    ? HEROS_JOURNEY_PROMPTS
    : activeDraft.track === 'different_but_truthful'
      ? DIFFERENT_BUT_TRUTHFUL_PROMPTS
      : INTELLECTUAL_JOURNEY_PROMPTS;

  const currentAnswers = activeDraft.track === 'heros_journey'
    ? activeDraft.herosJourneyAnswers
    : activeDraft.track === 'different_but_truthful'
      ? activeDraft.differentTruthfulAnswers
      : activeDraft.intellectualJourneyAnswers || {};

  const countWords = (text: string): number => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  const handleTextChange = (fieldId: string, value: string) => {
    const updatedAnswers = { ...currentAnswers, [fieldId]: value };
    if (activeDraft.track === 'heros_journey') {
      onUpdateDraft({
        ...activeDraft,
        herosJourneyAnswers: updatedAnswers,
        updatedAt: new Date().toISOString()
      });
    } else if (activeDraft.track === 'different_but_truthful') {
      onUpdateDraft({
        ...activeDraft,
        differentTruthfulAnswers: updatedAnswers,
        updatedAt: new Date().toISOString()
      });
    } else {
      onUpdateDraft({
        ...activeDraft,
        intellectualJourneyAnswers: updatedAnswers,
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleTrackChange = (track: TrackType) => {
    onUpdateDraft({
      ...activeDraft,
      track,
      updatedAt: new Date().toISOString()
    });
  };

  const handleTargetWordsChange = (count: number) => {
    onUpdateDraft({
      ...activeDraft,
      targetWordCount: count,
      updatedAt: new Date().toISOString()
    });
  };

  const handleTitleChange = (title: string) => {
    onUpdateDraft({
      ...activeDraft,
      title: title || 'Untitled Reflection',
      updatedAt: new Date().toISOString()
    });
  };

  const handleInsertExample = (fieldId: string, text: string) => {
    handleTextChange(fieldId, text);
  };

  // Group Hero's Journey questions for easier navigation
  const herosJourneyGroups = [
    { id: 'heart', label: 'Phase 1: The Heart', ids: ['story_selection', 'transformation_formula', 'essential_belief', 'magic_elixir'] },
    { id: 'setup', label: 'Phase 2: The Setup', ids: ['ordinary_vs_special', 'inciting_incident', 'hesitation_doubt', 'crossing_threshold'] },
    { id: 'climax', label: 'Phase 3: The Climax', ids: ['stakes_risk', 'the_ordeal_flat', 'the_catalyst', 'winning_action', 'the_payoff'] }
  ];

  const currentGroupFields = activeDraft.track === 'heros_journey'
    ? prompts.filter(p => {
        const group = herosJourneyGroups.find(g => g.id === activeTabGroup);
        return group ? group.ids.includes(p.id) : true;
      })
    : prompts; // 'different_but_truthful' displays all on one smooth panel

  return (
    <div className="space-y-12">
      <div id="workbook_root" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls: Track Selector & Saved Drafts */}
        <div className="lg:col-span-3 space-y-6">
        {/* Track Config */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg shadow-slate-950/20" id="track_customizer">
          <h3 className="font-sans font-bold text-sm text-slate-100 border-b border-slate-800 pb-2">
            1. Layout Track
          </h3>
          
          {/* Title Input */}
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold text-slate-400">Reflection Title</label>
            <input
              id="draft_title_input"
              type="text"
              value={activeDraft.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-sans font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Track toggles */}
          <div className="space-y-2">
            <label className="text-xs font-sans font-bold text-slate-400 block font-semibold">Framework Methodology</label>
            <div className="flex flex-col gap-1.5" id="framework_method_toggle">
              <button
                id="select_track_heros"
                onClick={() => handleTrackChange('heros_journey')}
                className={`py-2 px-3 rounded-lg border text-left text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeDraft.track === 'heros_journey'
                    ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-600 text-slate-950 border-teal-400 shadow-md shadow-teal-500/10'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                Hero's Journey
              </button>
              <button
                id="select_track_different"
                onClick={() => handleTrackChange('different_but_truthful')}
                className={`py-2 px-3 rounded-lg border text-left text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeDraft.track === 'different_but_truthful'
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white border-emerald-500 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                Quiet Leadership
              </button>
              <button
                id="select_track_intellectual"
                onClick={() => handleTrackChange('intellectual_journey')}
                className={`py-2 px-3 rounded-lg border text-left text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeDraft.track === 'intellectual_journey'
                    ? 'bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white border-sky-500 shadow-md shadow-sky-500/10'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                Intellectual Journey
              </button>
            </div>
            <p className="text-xs text-slate-550 font-sans leading-relaxed text-slate-400">
              {activeDraft.track === 'heros_journey' && "The multi-beat Monomyth—ideal for narrative-heavy central prompts about growth, identity, or setbacks."}
              {activeDraft.track === 'different_but_truthful' && "A robust, 5-beat framework for highlighting subtle vulnerability and quiet, service-driven soft-power."}
              {activeDraft.track === 'intellectual_journey' && "The non-linear, analytical blueprint—ideal for reflective, scientific, or philosophical essays about books or paradoxical ideas."}
            </p>
          </div>

          {/* Word Budget config */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-sans font-bold text-slate-400 block font-semibold">Target Word Count Limit</label>
            <div className="grid grid-cols-4 gap-1.5" id="target_word_limit_selector">
              {[150, 250, 500, 650].map((wCount) => (
                <button
                  key={wCount}
                  id={`wcount_btn_${wCount}`}
                  onClick={() => handleTargetWordsChange(wCount)}
                  className={`py-1.5 rounded-md border text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeDraft.targetWordCount === wCount
                      ? 'bg-slate-100 text-slate-950 border-white shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  {wCount}w
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-500 block text-right font-sans">Common App Standard: 650 words</span>
          </div>
        </div>

        {/* Inspiration Reference */}
        {activeDraft.track === 'heros_journey' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg shadow-slate-950/20">
            <div>
              <h3 className="font-sans font-bold text-sm text-slate-100 flex items-center gap-1.5">
                Story Arc Inspiration
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Select famous example arcs to view their detailed beats right alongside your worksheet prompts.
              </p>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {FAMILIAR_STORIES.map(story => (
                <label key={story.id} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-900 transition-colors">
                  <input 
                    type="checkbox" 
                    className="mt-0.5 accent-teal-500 bg-slate-900 border-slate-700 rounded"
                    checked={selectedReferenceIds.includes(story.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReferenceIds(prev => [...prev, story.id]);
                      } else {
                        setSelectedReferenceIds(prev => prev.filter(id => id !== story.id));
                      }
                    }}
                  />
                  <div>
                    <div className="text-xs font-sans font-bold text-slate-200">{story.title}</div>
                    <div className="text-[11px] text-slate-500 font-sans">{story.type}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Column: Prompts Notebook Sheets */}
      <div className="lg:col-span-9 space-y-6">
        {/* If Hero's Journey, display sub-tabs for easier grouping layout */}
        {activeDraft.track === 'heros_journey' && (
          <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl gap-1 shadow-inner" id="heros_subtabs">
            {herosJourneyGroups.map((g) => (
              <button
                key={g.id}
                id={`subtab_${g.id}`}
                onClick={() => setActiveTabGroup(g.id)}
                className={`flex-1 py-2 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                  activeTabGroup === g.id
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700/60'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Prompts Listing */}
        <div className="space-y-6" id="workbook_prompts_scrollbox">
          {currentGroupFields.map((field) => {
            const rawText = currentAnswers[field.id] || '';
            const wCount = countWords(rawText);
            const hasBudget = field.suggestedWeight !== undefined && field.suggestedWeight > 0;
            const targetSegmentBudget = hasBudget ? Math.round(activeDraft.targetWordCount * field.suggestedWeight!) : 0;
            const isClosingIn = hasBudget && wCount > targetSegmentBudget * 0.9 && wCount <= targetSegmentBudget * 1.1;
            const isExcessive = hasBudget && wCount > targetSegmentBudget * 1.1;
            const isGuidedFocus = focusedFieldId === field.id;

            const matchedBeats = PROMPT_TO_BEATS_MAP[field.id] || [];
            const referenceBeats = selectedReferenceIds.flatMap(refId => {
              const story = FAMILIAR_STORIES.find(s => s.id === refId);
              if (!story) return [];
              return matchedBeats.map(mb => {
                const beatDetail = (story.beats as any)[mb];
                if (!beatDetail) return null;
                return {
                  storyTitle: story.title,
                  beatText: beatDetail.text
                };
              }).filter(Boolean);
            });

            return (
              <div 
                key={field.id} 
                id={`field_container_${field.id}`}
                className={`transition-all duration-300 rounded-xl border p-5 space-y-4 bg-slate-900/60 ${
                  isGuidedFocus 
                    ? 'border-teal-500 ring-1 ring-teal-500/10 shadow-lg shadow-teal-500/5' 
                    : 'border-slate-800/80 shadow-md'
                }`}
              >
                {/* Field Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 font-sans">
                    <h4 className="font-serif font-medium text-sm text-white tracking-tight">{field.label}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{field.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-teal-400 block">
                      {wCount} {hasBudget ? `/ ${targetSegmentBudget} w` : 'words'}
                    </span>
                    {hasBudget && <span className="text-[11px] font-sans text-slate-450 text-slate-500 block">Section Budget</span>}
                  </div>
                </div>

                {/* Input Textarea */}
                <div className="relative">
                  <textarea
                    id={`textarea_${field.id}`}
                    rows={4}
                    value={rawText}
                    onFocus={() => setFocusedFieldId(field.id)}
                    onBlur={() => setFocusedFieldId(null)}
                    onChange={(e) => handleTextChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-sans text-slate-100 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:outline-none leading-relaxed placeholder:text-slate-500"
                  />
                </div>

                {/* Warning indications */}
                {isExcessive && (
                  <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-2.5 text-xs text-rose-300 font-sans flex items-start gap-1.5 leading-snug">
                    <div>
                      <strong>A little wordy:</strong> You are over budget for this micro-beat. Consider condensing details or removing passive phrases (e.g. rewrite "I got really anxious and thought about" to "I dreaded").
                    </div>
                  </div>
                )}

                {isClosingIn && (
                  <div className="bg-teal-950/20 border border-teal-900/30 rounded-lg p-2.5 text-xs text-teal-300 font-sans flex items-start gap-1.5 leading-snug">
                    <div>
                      <strong>Perfect volume!</strong> You have entered {wCount} words which aligns smoothly with the recommended block size.
                    </div>
                  </div>
                )}

                {/* In line guide checklist helpers */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-xs font-sans leading-relaxed text-slate-400 mt-2 shadow-sm">
                  <div className="md:col-span-8 space-y-1.5">
                    {field.tip && (
                      <div className="flex gap-1.5 text-slate-100">
                        <div><strong>Pro Tip:</strong> {field.tip}</div>
                      </div>
                    )}
                    {field.pitfallWarning && (
                      <div className="flex gap-1.5 border-t border-slate-800 pt-1.5 mt-1">
                        <div className="text-rose-300 font-medium"><strong>Cliché Pitfall Warning:</strong> {field.pitfallWarning}</div>
                      </div>
                    )}
                  </div>

                  {/* Quick Examples toggle insert */}
                  <div className="md:col-span-4 border-l md:border-l border-slate-800/80 md:pl-3 pl-0 pt-2 md:pt-0 flex flex-col justify-center">
                    <span className="font-bold text-[11px] text-slate-500 uppercase tracking-wider block mb-1 mt-0.5">
                      Read Blueprint Examples:
                    </span>
                    <div className="space-y-1">
                      {field.examples?.map((ex, exIdx) => (
                        <button
                          key={exIdx}
                          id={`example_btn_${field.id}_${exIdx}`}
                          type="button"
                          onClick={() => handleInsertExample(field.id, ex.text)}
                          className="w-full text-left p-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded text-[11px] text-slate-300 transition-colors cursor-pointer shadow hover:text-white font-medium"
                          title="Click to write this template directly into your text area."
                        >
                          Use template: "{ex.title}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reference Beats Display */}
                {referenceBeats.length > 0 && (
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 space-y-3 mt-3 shadow-inner">
                    <span className="font-bold text-[11px] text-teal-500 uppercase tracking-wider block mb-1">
                      Inspiration from Selected Arcs:
                    </span>
                    <div className="space-y-3">
                      {referenceBeats.map((ref, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="text-xs font-sans font-bold text-slate-300">
                            {ref.storyTitle}
                          </div>
                          <div className="text-xs text-slate-400 font-sans leading-relaxed pl-2 border-l border-slate-800">
                            {ref.beatText}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {field.tools && field.tools.length > 0 && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {field.tools.map(tool => (
                        <button
                          key={tool}
                          onClick={() => setActiveToolFieldId(activeToolFieldId === `${field.id}_${tool}` ? null : `${field.id}_${tool}`)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            activeToolFieldId === `${field.id}_${tool}`
                              ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {tool === 'montage' && <Film className="w-3.5 h-3.5 text-rose-400" />}
                          {tool === 'montage' && <span>Add a Montage</span>}
                          {tool === 'bullet_time' && <Sparkles className="w-3.5 h-3.5 text-teal-400" />}
                          {tool === 'bullet_time' && <span>Add a Bullet Time Moment</span>}
                          {activeToolFieldId === `${field.id}_${tool}` ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                        </button>
                      ))}
                    </div>
                    {field.tools.includes('montage') && activeToolFieldId === `${field.id}_montage` && (
                      <div className="animate-fade-in mt-4 border-t border-slate-800/80 pt-4">
                        <MontageTool onInsert={(text) => handleTextChange(field.id, rawText ? rawText + '\n\n' + text : text)} />
                      </div>
                    )}
                    {field.tools.includes('bullet_time') && activeToolFieldId === `${field.id}_bullet_time` && (
                      <div className="animate-fade-in mt-4 border-t border-slate-800/80 pt-4">
                        <ZoomLensTool onInsert={(text) => handleTextChange(field.id, rawText ? rawText + '\n\n' + text : text)} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
