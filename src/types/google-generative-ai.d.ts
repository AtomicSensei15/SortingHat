declare module '@google/generative-ai' {
  export interface GenerateContentRequestPart { text: string }
  export interface GenerateContentResponsePart { text(): string }
  export interface GenerateContentResponse { response: GenerateContentResponsePart }
  export interface GenerativeModel { generateContent(parts: GenerateContentRequestPart[]): Promise<GenerateContentResponse> }
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(opts: { model: string }): GenerativeModel;
  }
}
