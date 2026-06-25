import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AiResult, ChatRequest } from '../interfaces/ai-result';

@Injectable({
  providedIn: 'root'
})
export class GlmService {
  private readonly baseUrl = 'https://organic-space-winner-r74g496q5gfxjxx-8082.app.github.dev/v1/api/glm';

  constructor(private http: HttpClient) { }

  // Create
  chat(prompt: string): Observable<AiResult> {
    const request: ChatRequest = { prompt };
    return this.http.post<AiResult>(`${this.baseUrl}/chat`, request);
  }

  // Read
  getHistory(): Observable<AiResult[]> {
    return this.http.get<AiResult[]>(`${this.baseUrl}/history`);
  }

  // Update
  updateChat(id: number, prompt: string): Observable<AiResult> {
    const request: ChatRequest = { prompt };
    return this.http.put<AiResult>(`${this.baseUrl}/${id}`, request);
  }

  // Delete
  deleteChat(id: number): Observable<AiResult> {
    return this.http.delete<AiResult>(`${this.baseUrl}/${id}`);
  }

  // Restore
  restoreChat(id: number): Observable<AiResult> {
    return this.http.patch<AiResult>(`${this.baseUrl}/${id}/restore`, {});
  }

  // Read deleted
  getDeletedHistory(): Observable<AiResult[]> {
    return this.http.get<AiResult[]>(`${this.baseUrl}/deleted`);
  }
}