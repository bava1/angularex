import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { ChatGatewayResponse, ChatMessage } from '../models/chat.types';
import { ChatService } from '../services/chat.service';

type AssistantPart =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; language?: string };

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss',
})
export class ChatWidgetComponent implements OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer?: ElementRef<HTMLDivElement>;
  isOpen = false;
  isLoading = false;
  inputText = '';
  messages: ChatMessage[] = [];
  copiedCodeKey: string | null = null;
  private previousBodyOverflow: string | null = null;
  private readonly parsedPartsCache = new Map<string, AssistantPart[]>();

  constructor(private readonly chatService: ChatService) {}

  openChat(): void {
    this.isOpen = true;
    this.lockBackgroundScroll();
    this.scrollToBottom();
  }

  closeChat(): void {
    this.isOpen = false;
    this.resetChatState();
    this.unlockBackgroundScroll();
  }

  ngOnDestroy(): void {
    this.unlockBackgroundScroll();
  }

  clearChat(): void {
    const confirmed = window.confirm('Clear the chat history?');
    if (!confirmed) {
      return;
    }

    this.resetChatState();
  }

  onEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.shiftKey) {
      return;
    }

    keyboardEvent.preventDefault();
    this.sendMessage();
  }

  sendMessage(): void {
    const prompt = this.inputText.trim();
    if (!prompt || this.isLoading) {
      return;
    }

    const userMessage: ChatMessage = { role: 'user', content: prompt };
    this.messages = [...this.messages, userMessage];
    this.inputText = '';
    this.isLoading = true;
    this.scrollToBottom();

    this.chatService
      .sendMessage(this.messages)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          const assistantText = this.extractAssistantText(response);
          this.messages = [...this.messages, { role: 'assistant', content: assistantText }];
          this.scrollToBottom();
        },
        error: (error: HttpErrorResponse) => {
          this.messages = [
            ...this.messages,
            { role: 'assistant', content: this.mapErrorToMessage(error) },
          ];
          this.scrollToBottom();
        },
      });
  }

  trackByIndex(index: number): number {
    return index;
  }

  getParsedMessageContent(content: string): AssistantPart[] {
    const cached = this.parsedPartsCache.get(content);
    if (cached) {
      return cached;
    }

    const parsed = this.parseMessageContent(content);
    this.parsedPartsCache.set(content, parsed);
    return parsed;
  }

  trackByPartIndex(index: number): number {
    return index;
  }

  private parseMessageContent(content: string): AssistantPart[] {
    if (!content) {
      return [{ type: 'text', content: '' }];
    }

    const parts: AssistantPart[] = [];
    const fenceRegex = /```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = fenceRegex.exec(content)) !== null) {
      const matchIndex = match.index;
      const before = content.slice(lastIndex, matchIndex);
      if (before) {
        parts.push({ type: 'text', content: before });
      }

      const language = (match[1] || '').trim().toLowerCase();
      const code = (match[2] || '').replace(/\n$/, '');
      parts.push({
        type: 'code',
        language: language || undefined,
        content: code,
      });

      lastIndex = fenceRegex.lastIndex;
    }

    const after = content.slice(lastIndex);
    if (after) {
      parts.push({ type: 'text', content: after });
    }

    return parts.length ? parts : [{ type: 'text', content }];
  }

  async copyCode(code: string, key: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      this.copiedCodeKey = key;
      setTimeout(() => {
        if (this.copiedCodeKey === key) {
          this.copiedCodeKey = null;
        }
      }, 1200);
    } catch {
      this.copiedCodeKey = null;
    }
  }

  private extractAssistantText(response: ChatGatewayResponse): string {
    const direct = this.pickTextCandidate(response);
    if (direct) {
      return direct;
    }

    const nested = this.pickTextCandidate((response as unknown as { data?: unknown })?.data);
    if (nested) {
      return nested;
    }

    const deep = this.findFirstTextDeep(response);
    if (deep) {
      return deep;
    }

    return 'No response content received from AI assistant.';
  }

  private pickTextCandidate(value: unknown): string | null {
    if (typeof value === 'string') {
      const text = value.trim();
      return text.length ? text : null;
    }

    if (!value || typeof value !== 'object') {
      return null;
    }

    const record = value as Record<string, unknown>;
    const candidates = [
      record['answer'],
      record['message'],
      record['content'],
      record['text'],
    ];
    for (const candidate of candidates) {
      if (typeof candidate === 'string' && candidate.trim().length) {
        return candidate;
      }
    }

    try {
      const serialized = JSON.stringify(record, null, 2);
      return serialized && serialized !== '{}' ? `\`\`\`json\n${serialized}\n\`\`\`` : null;
    } catch {
      return null;
    }
  }

  private findFirstTextDeep(value: unknown, depth = 0): string | null {
    if (depth > 6 || value == null) {
      return null;
    }

    if (typeof value === 'string') {
      const text = value.trim();
      return text.length ? value : null;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const found = this.findFirstTextDeep(item, depth + 1);
        if (found) {
          return found;
        }
      }
      return null;
    }

    if (typeof value !== 'object') {
      return null;
    }

    const obj = value as Record<string, unknown>;

    const priorityKeys = [
      'answer',
      'message',
      'content',
      'text',
      'output_text',
      'response',
      'result',
      'reply',
    ];

    for (const key of priorityKeys) {
      const found = this.findFirstTextDeep(obj[key], depth + 1);
      if (found) {
        return found;
      }
    }

    for (const key of Object.keys(obj)) {
      const found = this.findFirstTextDeep(obj[key], depth + 1);
      if (found) {
        return found;
      }
    }

    return null;
  }

  private mapErrorToMessage(error: HttpErrorResponse): string {
    const errorCode = error?.error?.errorCode;

    switch (errorCode) {
      case 'PROJECT_DAILY_LIMIT':
      case 'VISITOR_DAILY_LIMIT':
      case 'SHORT_TERM_LIMIT':
        return 'Daily AI limit reached. Please try again later.';
      default:
        return 'AI assistant is unavailable right now. Please try again later.';
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.messagesContainer?.nativeElement;
      if (!container) {
        return;
      }
      container.scrollTop = container.scrollHeight;
    });
  }

  private lockBackgroundScroll(): void {
    if (typeof document === 'undefined') {
      return;
    }
    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private unlockBackgroundScroll(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.style.overflow = this.previousBodyOverflow ?? '';
    this.previousBodyOverflow = null;
  }

  private resetChatState(): void {
    this.messages = [];
    this.inputText = '';
    this.copiedCodeKey = null;
    this.parsedPartsCache.clear();
  }
}
