import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ChatGatewayResponse, ChatMessage, ChatRequestBody } from '../models/chat.types';

@Injectable()
export class ChatService {
  private readonly systemMessage: ChatMessage = {
    role: 'system',
    content:
      'You are an AI assistant focused on Angular development. Help with Angular, TypeScript, RxJS, Angular Material, routing, services, components, forms, build/deployment and frontend architecture. Answer clearly and practically. If the user asks a general programming question, you may answer, but prefer Angular-related context when relevant.',
  };

  constructor(private readonly http: HttpClient) {}

  sendMessage(messages: ChatMessage[]): Observable<ChatGatewayResponse> {
    const url = `${environment.aiGatewayBaseUrl}${environment.aiChatPath}`;
    const headers = new HttpHeaders({
      'X-Client-ID': environment.aiClientId,
      'X-Client-Token': environment.aiClientToken,
      'Content-Type': 'application/json',
    });

    const body: ChatRequestBody = {
      messages: [this.systemMessage, ...messages].map(({ role, content }) => ({ role, content })),
    };

    return this.http.post<ChatGatewayResponse>(url, body, { headers });
  }
}
