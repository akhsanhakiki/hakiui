import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.cjs';

interface PromptSuggestion {
    title: string;
    prompt: string;
    category?: string;
    icon?: ReactNode;
}
interface PromptSuggestionsProps {
    items: PromptSuggestion[];
    onPick: (prompt: string) => void;
    /** Grid columns from the sm breakpoint. */
    columns?: 1 | 2 | 3;
    radius?: Radius;
    className?: string;
}
/**
 * The empty-state starters of an AI chat: a grid of prompt cards, each
 * with a title, the full prompt and an optional category. Picking one hands
 * the prompt to the composer.
 */
declare const PromptSuggestions: ({ items, onPick, columns, radius, className }: PromptSuggestionsProps) => react_jsx_runtime.JSX.Element;

export { type PromptSuggestion, PromptSuggestions, type PromptSuggestionsProps };
