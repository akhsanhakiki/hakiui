import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

interface ChatMessageProps {
    role: "user" | "assistant";
    children: ReactNode;
    /** Sender mark: an Avatar, a brand icon, or nothing. */
    avatar?: ReactNode;
    name?: string;
    time?: string;
    /** Row of small buttons under the message (copy, retry, feedback…). */
    actions?: ReactNode;
    /** Shows a blinking caret at the end while the answer streams. */
    streaming?: boolean;
    radius?: Radius;
    className?: string;
}
/**
 * One turn in a conversation. User turns sit right-aligned in a tinted
 * bubble; assistant turns run full width under a sender line, the way
 * answers read best. Rich content (Markdown, tables, charts) goes in
 * `children`; the component only owns the frame.
 */
declare const ChatMessage: ({ role, children, avatar, name, time, actions, streaming, radius, className, }: ChatMessageProps) => react_jsx_runtime.JSX.Element;

export { ChatMessage, type ChatMessageProps };
