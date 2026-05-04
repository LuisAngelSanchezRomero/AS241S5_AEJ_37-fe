import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AiResult, ImageRequest } from '../interfaces/ai-result';

@Injectable({
  providedIn: 'root'
})
export class PictocaptionService {
  private readonly baseUrl = 'http://localhost:8082/v1/api/pictocaption';

  constructor(private http: HttpClient) { }

  // Create
  describeImage(imageUrl: string): Observable<AiResult> {
    const request: ImageRequest = { imageUrl };
    return this.http.post<AiResult>(`${this.baseUrl}/describe`, request);
  }

  // Read
  getHistory(): Observable<AiResult[]> {
    return this.http.get<AiResult[]>(`${this.baseUrl}/history`);
  }

  // Update
  updateImage(id: number, imageUrl: string): Observable<AiResult> {
    const request: ImageRequest = { imageUrl };
    return this.http.put<AiResult>(`${this.baseUrl}/${id}`, request);
  }

  // Delete
  deleteImage(id: number): Observable<AiResult> {
    return this.http.delete<AiResult>(`${this.baseUrl}/${id}`);
  }

  // Restore
  restoreImage(id: number): Observable<AiResult> {
    return this.http.patch<AiResult>(`${this.baseUrl}/${id}/restore`, {});
  }

  // Read deleted
  getDeletedHistory(): Observable<AiResult[]> {
    return this.http.get<AiResult[]>(`${this.baseUrl}/deleted`);
  }
}