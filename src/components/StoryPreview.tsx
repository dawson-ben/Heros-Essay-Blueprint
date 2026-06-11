/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EssayDraft, PromptField } from '../types';
import { HEROS_JOURNEY_PROMPTS, DIFFERENT_BUT_TRUTHFUL_PROMPTS, INTELLECTUAL_JOURNEY_PROMPTS } from '../constants';
import { Copy, Download, CheckSquare, Square, CheckCircle, FileText, BarChart3, AlertCircle } from 'lucide-react';

interface StoryPreviewProps {
  draft: EssayDraft;
}

export default function StoryPreview({ draft }: StoryPreviewProps) {
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

  // Word count calculators
  const countWords = (text: string): number => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  // Compile full story
  const compiledSegments = prompts.map(p => {
    const rawVal = answers[p.id] || '';
    return {
      label: p.label,
      val: rawVal,
      words: countWords(rawVal),
      suggestedWords: Math.round(draft.targetWordCount * p.suggestedWeight)
    };
  });

  const totalCurrentWords = compiledSegments.reduce((sum, item) => sum + item.words, 0);
  const remainingWords = draft.targetWordCount - totalCurrentWords;

  // Assemble full text
  const getFullText = () => {
    return compiledSegments
      .filter(item => item.val.trim() !== '')
      .map(item => `[${item.label}]\n${item.val}`)
      .join('\n\n');
  };

  const getCleanText = () => {
    // Just the paragraphs concatenated
    return compiledSegments
      .filter(item => item.val.trim() !== '')
      .map(item => item.val)
      .join('\n\n');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(getCleanText());
    alert('Copied your compiled personal statement draft to clipboard!');
  };

  const handleDownloadFile = (type: 'txt' | 'md' | 'json') => {
    let content = '';
    let filename = `${draft.title.toLowerCase().replace(/\s+/g, '_')}_draft`;
    
    if (type === 'txt') {
      content = `--- ${draft.title} (${draft.track.toUpperCase()}) ---\n\n` + getFullText();
      filename += '.txt';
    } else if (type === 'md') {
      const trackLabel = draft.track === 'heros_journey' 
        ? "The Hero's Journey" 
        : draft.track === 'different_but_truthful'
          ? "Different But Truthful"
          : "Intellectual Journey";
      content = `# ${draft.title}\n\n*Essay Track: ${trackLabel}*\n` +
                `*Target Word Count: ${draft.targetWordCount} words*\n` +
                `*Current Word Count: ${totalCurrentWords} words*\n\n` +
                compiledSegments.map(item => `## ${item.label}\n\n${item.val}`).join('\n\n');
      filename += '.md';
    } else {
      content = JSON.stringify(draft, null, 2);
      filename += '.json';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Automated checks dynamically curated per track
  const getChecks = () => {
    if (draft.track === 'heros_journey') {
      return [
        {
          id: 'essential_belief',
          text: "Defines an 'Essential Belief' lesson (Mindset change)",
          passed: (answers['essential_belief'] || '').trim().length > 10
        },
        {
          id: 'transformation_formula',
          text: "Defines a before-and-after transformation formula ('used to be')",
          passed: (answers['transformation_formula'] || '').trim().length > 15
        },
        {
          id: 'hesitation',
          text: "Includes doubt or hesitation (relatable struggle trait)",
          passed: (answers['hesitation_doubt'] || '').trim().length > 10
        },
        {
          id: 'grounded_climax',
          text: "Has a complication & vulnerability (Grounded clot/climax)",
          passed: (answers['the_ordeal_flat'] || '').trim().length > 15
        },
        {
          id: 'agency',
          text: "Demonstrates high personal agency (resolved with real choice)",
          passed: (answers['winning_action'] || '').trim().length > 15
        }
      ];
    } else if (draft.track === 'different_but_truthful') {
      return [
        {
          id: 'silent_admission',
          text: "The Silent Admission intro (Vulnerability vs performance)",
          passed: (answers['authenticity_declaration'] || '').trim().length > 15
        },
        {
          id: 'tipping_point',
          text: "Tipping point scene (friction but no action-film drama)",
          passed: (answers['dt_tipping_point'] || '').trim().length > 15
        },
        {
          id: 'unseen_labor',
          text: "The Unseen Labor section (hands-on details & service micro-actions)",
          passed: (answers['real_stories_triumph'] || '').trim().length > 15
        },
        {
          id: 'messy_spectrum',
          text: "Reflects on continuous development (rejects storybook clean endings)",
          passed: (answers['reflection_lessons'] || '').trim().length > 15
        },
        {
          id: 'quiet_promise',
          text: "The Quiet Integration (Modest university laboratory contribution)",
          passed: (answers['authenticity_promise'] || '').trim().length > 15
        }
      ];
    } else { // 'intellectual_journey'
      return [
        {
          id: 'spark_obsession',
          text: "The Intellectual Spark (Defines a narrow, itchy obsession/idea)",
          passed: (answers['ij_obsession'] || '').trim().length > 15
        },
        {
          id: 'dissonance',
          text: "Displays cognitive dissonance (confronts critique or limits of theory)",
          passed: (answers['ij_dissonance'] || '').trim().length > 15
        },
        {
          id: 'synthesis',
          text: "The Synthesizing Pivot (Logical process constructing a mental model)",
          passed: (answers['ij_pivot'] || '').trim().length > 15
        },
        {
          id: 'paradigm_shift',
          text: "Articulates a clear academic/philosophical paradigm shift",
          passed: (answers['ij_paradigm'] || '').trim().length > 15
        },
        {
          id: 'scholarly_promise',
          text: "Includes a Scholarly Promise (collaborative assets in seminar/labs)",
          passed: (answers['ij_promise'] || '').trim().length > 15
        }
      ];
    }
  };

  const checks = getChecks();
  const passedCount = checks.filter(c => c.passed).length;

  return (
    <div id="story_preview_root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-950/25">
      {/* Left Column: Word Budget & Analytics */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 space-y-5 shadow" id="budget_meter_panel">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <h3 className="font-sans font-bold text-sm text-slate-100">Word Count Strategy</h3>
          </div>

          {/* Master Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans font-bold text-slate-400">Total Progress:</span>
              <span className={`font-mono font-bold ${totalCurrentWords > draft.targetWordCount ? 'text-[#FF4A6B]' : 'text-teal-400'}`}>
                {totalCurrentWords} / {draft.targetWordCount} words
              </span>
            </div>
            
            {/* Horizontal Bar */}
            <div className="w-full h-3 bg-slate-900 border border-slate-800 rounded-full overflow-hidden" id="bar_track">
              <div 
                className={`h-full transition-all duration-300 ${
                  totalCurrentWords > draft.targetWordCount 
                    ? 'bg-gradient-to-r from-red-650 to-rose-500 animate-pulse' 
                    : totalCurrentWords > draft.targetWordCount * 0.8 
                    ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                }`}
                style={{ width: `${Math.min(100, (totalCurrentWords / draft.targetWordCount) * 100)}%` }}
              ></div>
            </div>

            {totalCurrentWords > draft.targetWordCount ? (
              <div className="text-[10px] text-red-300 font-sans flex items-center gap-1.5 mt-1 bg-red-955/20 bg-red-950/20 p-2 rounded-md border border-red-900/40">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                Your draft exceeds the target by {totalCurrentWords - draft.targetWordCount} words. Cut descriptive fillers.
              </div>
            ) : totalCurrentWords < draft.targetWordCount * 0.5 ? (
              <p className="text-[10px] text-slate-500 font-sans leading-normal mt-1 block">
                You have structured {Math.round((totalCurrentWords / draft.targetWordCount) * 100)}% of your target draft. Keep reflecting!
              </p>
            ) : (
              <div className="text-[10px] text-teal-300 font-sans flex items-center gap-1.5 mt-1 bg-teal-950/20 p-2 rounded-md border border-teal-905/20 border-teal-900/30">
                <CheckCircle className="w-3.5 h-3.5 shrink-0 text-teal-400 animate-bounce" />
                Draft is within optimal submission range! Beautifully budgeted.
              </div>
            )}
          </div>

          {/* Sectional Breakdown budgets */}
          <div className="space-y-3.5 pt-2" id="sectional_budgets">
            <div className="text-[10px] font-sans uppercase font-bold tracking-wider text-slate-500">
              Suggested Word Count Budgets
            </div>
            {compiledSegments.map((item, idx) => {
              const variance = item.words - item.suggestedWords;
              const isOverBudget = item.words > item.suggestedWords * 1.3;
              const isUnderBudget = item.val.trim().length > 0 && item.words < item.suggestedWords * 0.5;

              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-sans font-medium text-slate-305 text-slate-350 truncate max-w-[170px]">{item.label}</span>
                    <span className="font-mono text-slate-400">
                      <span className="text-teal-400 font-bold">{item.words}w</span> <span className="text-slate-600">/ {item.suggestedWords}w</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${isOverBudget ? 'from-red-500 to-pink-500' : 'from-cyan-550 to-purple-500 to-purple-600'}`}
                      style={{ width: `${Math.min(100, (item.words / item.suggestedWords) * 100)}%` }}
                    ></div>
                  </div>
                  {isOverBudget && (
                    <span className="text-[9px] text-red-400 font-sans block leading-none pt-0.5">
                      ⚠️ Over optimal bounds. Prune this specific answer’s details.
                    </span>
                  )}
                  {isUnderBudget && (
                    <span className="text-[9px] text-purple-400 font-sans block leading-none pt-0.5">
                      💡 Expand this segment to fully establish your narrative value.
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality Controls */}
        <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 space-y-4 shadow" id="quality_audit_panel">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <CheckSquare className="w-4 h-4 text-purple-400" />
            <h3 className="font-sans font-bold text-sm text-slate-100">Admissions Quality Audit</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-sans font-bold text-slate-400">
              <span>COMPLETED PRINCIPLE CHECKS:</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-slate-200 font-mono">{passedCount} / {checks.length}</span>
            </div>
            <div className="space-y-2 pt-1" id="checks_list">
              {checks.map(c => (
                <div key={c.id} className="flex items-start gap-2 text-xs">
                  {c.passed ? (
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-4 h-4 border border-slate-800 rounded-full shrink-0 mt-0.5 bg-slate-950"></div>
                  )}
                  <span className={`font-sans leading-tight ${c.passed ? 'text-slate-200 font-semibold' : 'text-slate-500'}`}>
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
            {passedCount === checks.length ? (
              <div className="p-3 bg-teal-950/20 border border-teal-900/30 text-teal-300 rounded-lg text-xs font-sans mt-3">
                🏆 Excellent narrative architecture! Your essay elements meet all structural benchmarks from Ben Dawson's guide.
              </div>
            ) : (
              <div className="p-3 bg-slate-950/50 border border-slate-850 text-slate-400 rounded-lg text-[10px] font-sans leading-relaxed mt-3">
                Your draft will be highly competitive once you resolve the incomplete elements listed above. Consider revising empty sections.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Compiled Manuscript & Saves */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-4 relative">
        <div className="bg-slate-950 border border-slate-855 border-slate-850 rounded-xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3.5 gap-2">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-100 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-pink-400" /> Live Manuscript View
              </h3>
              <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                A seamless structural assembly of your reflective answers:
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5" id="manuscript_export_group">
              <button
                id="copy_manuscript_btn"
                onClick={handleCopyToClipboard}
                disabled={totalCurrentWords === 0}
                className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-white border border-slate-800 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 font-bold"
                title="Copy Compiled Text"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                Copy
              </button>
              
              <button
                id="download_md_btn"
                onClick={() => handleDownloadFile('md')}
                disabled={totalCurrentWords === 0}
                className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 font-bold"
                title="Download Markdown"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                Export MD
              </button>

              <button
                id="download_txt_btn"
                onClick={() => handleDownloadFile('txt')}
                disabled={totalCurrentWords === 0}
                className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90 text-slate-950 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 font-extrabold"
                title="Download Plain Text"
              >
                <Download className="w-3.5 h-3.5" />
                Text
              </button>
            </div>
          </div>

          {/* Manuscript Render scrollbox */}
          <div 
            id="manuscript_box" 
            className="border border-slate-850 bg-slate-950 rounded-xl p-5 md:p-6 text-sm font-serif leading-relaxed text-slate-300 max-h-[480px] overflow-y-auto space-y-5 shadow-inner"
          >
            {totalCurrentWords === 0 ? (
              <div className="text-center py-20 text-slate-500 font-sans space-y-2">
                <p className="italic text-slate-400">"The canvas sits waiting..."</p>
                <p className="text-xs">Go to the <strong className="font-semibold text-slate-200">Worksheet Planner</strong> tab and start structuring your answers to watch your essay take form here!</p>
              </div>
            ) : (
              compiledSegments.map((item, idx) => {
                if (item.val.trim() === '') return null;
                return (
                  <div key={idx} className="space-y-1.5 p-3.5 rounded-lg bg-slate-900 shadow border border-slate-800 hover:border-slate-750 transition-colors" id={`preview_segment_${item.label.toLowerCase().replace(/\s+/g,'_')}`}>
                    <div className="text-[10px] uppercase font-sans tracking-widest text-teal-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      {item.label} 
                      <span className="text-slate-500 text-[9px] font-mono font-normal">({item.words} words)</span>
                    </div>
                    <p className="whitespace-pre-line leading-relaxed text-slate-200" id={`manuscript_paragraph_${idx}`}>
                      {item.val}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-3.5 rounded-lg border border-slate-800">
            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
            <p className="text-[10px] text-slate-400 font-sans leading-normal">
              <strong>Word Budgets are estimations:</strong> Admissions readers look for dynamic narrative tempo. Don't worry if your draft slightly misses the budget allocations as long as your overall size matches the target requirement!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
