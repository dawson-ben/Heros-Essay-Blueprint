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
  suggestedWeight: number; // percentage of essay wordcount (e.g. 0.15 = 15%)
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
  // Hero's Journey prompts state
  herosJourneyAnswers: Record<string, string>;
  // Different but Truthful prompts state
  differentTruthfulAnswers: Record<string, string>;
  // Intellectual Journey prompts state
  intellectualJourneyAnswers: Record<string, string>;
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
