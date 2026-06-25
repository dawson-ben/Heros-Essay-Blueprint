/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TrackType = 'heros_journey' | 'different_but_truthful' | 'intellectual_journey';

export interface PromptField {
  id: string;
  label: string;
  description: string;
  placeholder: string;
  tip?: string;
  pitfallWarning?: string;
  suggestedWeight?: number; // percentage of essay wordcount (e.g. 0.15 = 15%)
  tools?: ('montage' | 'bullet_time')[];
  examples?: {
    title: string;
    text: string;
  }[];
}

export interface EssayDraft {
  id: string;
  title: string;
  targetWordCount: number;
  track: TrackType;
  herosJourneyAnswers: Record<string, string>;
  differentTruthfulAnswers: Record<string, string>;
  intellectualJourneyAnswers: Record<string, string>;
  blocks?: { type: string; orderIndex: number; content: string }[];
  montageElements?: { era: string; theme: string; collegePromise: string }[];
  scratchpad?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuideChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: string;
  tags: string[];
}

export interface AntiPatternCard {
  id: string;
  trap: string;
  fix: string;
  explanation: string;
  exampleBad: string;
  exampleGood: string;
}
