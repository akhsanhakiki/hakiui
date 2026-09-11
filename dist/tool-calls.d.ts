import * as react_jsx_runtime from 'react/jsx-runtime';

type ToolCallStatus = "running" | "done" | "error";
interface ToolCall {
    name: string;
    status: ToolCallStatus;
    /** Args summary, result summary, or the error text. */
    detail?: string;
    /** e.g. "1.2s" */
    duration?: string;
}
interface ToolCallsProps {
    calls: ToolCall[];
    defaultOpen?: boolean;
    label?: string;
    className?: string;
}
/**
 * What the assistant did to answer: a row of tool badges with live status,
 * and a fold-out trail with each call's detail. Running calls spin, errors
 * read in the danger colour.
 */
declare const ToolCalls: ({ calls, defaultOpen, label, className }: ToolCallsProps) => react_jsx_runtime.JSX.Element | null;

export { type ToolCall, type ToolCallStatus, ToolCalls, type ToolCallsProps };
