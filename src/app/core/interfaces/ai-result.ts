export interface AiResult {
  id?: number;
  apiName: string;
  inputData: string;
  result: string;
  createdAt?: string;
  active?: string;
}

export interface ChatRequest {
  prompt: string;
}

export interface ImageRequest {
  imageUrl: string;
}