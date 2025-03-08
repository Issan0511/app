// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const API_KEY = Deno.env.get("GEMINI_API_KEY")
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is required. check your .env file")
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

/*
 * req: {
 *   data: string,   // base64 形式の音声データ
 *   prompt: string, // プロンプト文字列
 * }
 */

Deno.serve(async (req) => {
  const arrayBuffer = await req.arrayBuffer();
  const mimeType = req.headers.get("Content-Type");
  if (!mimeType) {
    throw new Error("Content-Type is required")
  }

  const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  const filePart = {
    inlineData: {
      data: base64Audio,
      mimeType: 'audio/mp3'
    }
  }
  const textPart = {
    text: "transcript this file and response raw text",
  };

  const result = await model.generateContent([filePart, textPart]);
  const data = {text: result.response.text()};

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/gemini-transcript' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
