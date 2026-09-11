import * as react_jsx_runtime from 'react/jsx-runtime';

interface ThinkingStepsProps {
    steps: string[];
    /** Still reasoning: shows a shimmering label and keeps the list live. */
    streaming?: boolean;
    defaultOpen?: boolean;
    label?: string;
    className?: string;
}
/**
 * The model's reasoning transcript, folded under a "Thinking" toggle so the
 * answer stays the focus. While streaming the label shimmers and new steps
 * append; once done it reads as a quiet, numbered trail.
 */
declare const ThinkingSteps: ({ steps, streaming, defaultOpen, label, className }: ThinkingStepsProps) => react_jsx_runtime.JSX.Element;

export { ThinkingSteps, type ThinkingStepsProps };
