
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeneratedQuizQuestion {
  id: string;
  question: string;
  options: string[];
  reasoning?: string;
  houseHints?: Record<string, number>; // relative weights for houses
}

export interface QuizGenerationResult {
  questions: GeneratedQuizQuestion[];
  rawModelText: string;
}

const SYSTEM_INSTRUCTIONS = `You are an assistant that generates Hogwarts house sorting quiz questions.
Return 4-5 multiple-choice questions that help differentiate between the core traits of the four houses:
- Gryffindor: courage, bold action, chivalry
- Ravenclaw: intellect, curiosity, creativity
- Hufflepuff: loyalty, patience, kindness, fairness
- Slytherin: ambition, resourcefulness, strategic thinking
Each question must have exactly 4 options, each subtly aligned with one house without naming the house directly.
Respond ONLY with JSON in this shape:
{
  "questions": [
    {"id": "string", "question": "string", "options": ["A","B","C","D"], "houseHints": {"gryffindor": #, "ravenclaw": #, "hufflepuff": #, "slytherin": #}}
  ]
}
Ensure ids are snake_case concise keywords. Do not include explanations outside JSON.`;

function getClient() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing VITE_GEMINI_API_KEY. Add it to your .env file.');
  return new GoogleGenerativeAI(apiKey);
}

export async function generateQuizQuestions(personalityFocus?: string): Promise<QuizGenerationResult> {
  const client = getClient();
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const userPrompt = `Generate sorting quiz questions. Personality focus (optional): ${personalityFocus || 'general'}.`;

  const result = await model.generateContent([
    { text: SYSTEM_INSTRUCTIONS },
    { text: userPrompt }
  ]);

  const response = result.response;
  const text = response.text();

  // Attempt to extract JSON
  // Define raw shapes returned by model prior to validation
  interface RawQuizQuestion {
    id?: unknown;
    question?: unknown;
    options?: unknown;
    reasoning?: unknown;
    houseHints?: unknown;
  }
  interface RawQuizJSON { questions?: unknown; }

  function parseModelJSON(raw: string): RawQuizJSON {
    // Find the first '{' and the last '}' to extract the JSON object.
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
      throw new Error("No valid JSON object found in the model's response.");
    }
    const candidate = raw.substring(firstBrace, lastBrace + 1);
    return JSON.parse(candidate) as RawQuizJSON;
  }

  function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(v => typeof v === 'string');
  }

  function isHouseHints(value: unknown): value is Record<string, number> {
    return !!value && typeof value === 'object' && Object.values(value as Record<string, unknown>).every(v => typeof v === 'number');
  }

  let parsed: RawQuizJSON;
  try {
    parsed = parseModelJSON(text);
  } catch {
    throw new Error('Model returned invalid JSON for quiz questions.');
  }

  if (!Array.isArray(parsed.questions)) {
    throw new Error('JSON missing questions array.');
  }

  const questions: GeneratedQuizQuestion[] = (parsed.questions as RawQuizQuestion[]).map((q, idx) => {
    const id = typeof q.id === 'string' ? q.id : `q_${idx + 1}`;
    const question = typeof q.question === 'string' ? q.question.trim() : 'Untitled question';
    const options = isStringArray(q.options) ? q.options.slice(0, 4) : [];
    const houseHints = isHouseHints(q.houseHints) ? q.houseHints as Record<string, number> : undefined;
    const reasoning = typeof q.reasoning === 'string' ? q.reasoning : undefined;
    return { id, question, options, reasoning, houseHints };
  }).filter(q => q.options.length === 4);

  if (questions.length === 0) {
    throw new Error('No valid questions generated.');
  }

  return { questions, rawModelText: text };
}

// Simple house score calculator based on selected options mapping
export function scoreHouses(answers: Record<string,string>, generated: GeneratedQuizQuestion[]) {
  const scores = { gryffindor: 0, ravenclaw: 0, hufflepuff: 0, slytherin: 0 };
  for (const q of generated) {
    const answer = answers[q.id];
    if (!answer || !q.houseHints) continue;
    // If option index maps, add weight for highest weight house corresponding to chosen option
    const optionIndex = q.options.indexOf(answer);
    if (optionIndex === -1) continue;
    // Heuristic: Add proportional weights (if provided) or fallback simple distribution
    for (const house of Object.keys(scores) as (keyof typeof scores)[]) {
      const weight = q.houseHints[house];
      if (typeof weight === 'number') {
        scores[house] += weight;
      }
    }
  }
  return scores;
}
