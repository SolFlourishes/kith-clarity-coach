// api/translate.js

// IMPORTANT: Use VITE_GEMINI_API_KEY to match Vercel environment variables
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `
You are the Clarity Coach, an expert in social-pragmatic communication, neurodiversity, and cross-cultural communication. Your goal is to translate messages between different communication styles (Direct, Indirect).

**Primary Task:** Based on the user's input, context, and the sender/receiver styles, provide:
1.  **Explanation:** Analyze the likely intent and potential misunderstandings.
2.  **Response/Draft:** Provide a suggested message tailored to the receiver's style.

**Formatting and Efficiency Rules:**
* Your entire response MUST be a single JSON object. DO NOT include any prose, commentary, or markdown outside of the JSON block.
* The JSON must contain two fields: "explanation" and "response".
* The content of both fields must be formatted with rich HTML tags (use <p>, <strong>, and <ul> or <ol> tags where appropriate). DO NOT use Markdown formatting.
* Keep the content of both fields concise and professional, aiming for a total of **under 300 words** across both fields combined.

**JSON Output Format:**
{
  "explanation": "Your detailed HTML-formatted explanation here...",
  "response": "Your detailed HTML-formatted suggested draft/response here..."
}
`;

/**
 * Handles the POST request for translation by streaming the response from the Gemini API.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // CRITICAL CHECK: Ensure the key is present
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ message: 'GEMINI_API_KEY is not configured in the environment.' });
  }

  const {
    mode, text, context, interpretation, analyzeContext,
    sender, receiver, senderNeurotype, receiverNeurotype,
    senderGeneration, receiverGeneration
  } = req.body;

  // 1. Build context-specific instructions
  let neurotypeInstructions = '';
  if (senderNeurotype === 'Autism' || receiverNeurotype === 'Autism') {
    neurotypeInstructions += ' When Autism is specified, consider traits like a preference for direct, literal language and potential difficulty interpreting subtext.';
  }
  if (senderNeurotype === 'ADHD' || receiverNeurotype === 'ADHD') {
    neurotypeInstructions += ' When ADHD is specified, consider traits like non-linear communication, valuing passion, and potential challenges with executive function impacting response time or structure.';
  }

  // 2. Construct the detailed prompt for the AI
  const prompt = `
    Mode: ${mode === 'draft' ? 'Draft a New Message' : 'Analyze a Received Message'}
    ---
    SENDER: Style=${sender}, Neurotype=${senderNeurotype}, Gen=${senderGeneration}
    RECEIVER: Style=${receiver}, Neurotype=${receiverNeurotype}, Gen=${receiverGeneration}
    Contextual Neurotype Instructions: ${neurotypeInstructions}
    ---
    ${mode === 'draft' ? `
      Sender's Intent (Context): ${context}
      Sender's Raw Draft: ${text}
    ` : `
      Received Message: ${text}
      Situation/Context: ${analyzeContext}
      My Interpretation/Feeling: ${interpretation}
    `}
    ---
    Now, generate the JSON response strictly following the SYSTEM_INSTRUCTION above. Start immediately with the opening curly brace '{'.
  `;

  // 3. Prepare the request payload for the streaming REST API
  const payload = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    
    // FINAL STRUCTURAL FIX: systemInstruction is top-level Content object
    systemInstruction: { 
        parts: [{ text: SYSTEM_INSTRUCTION }] 
    },

    // Correct field name is generationConfig
    generationConfig: { 
      temperature: 0.4, 
      maxOutputTokens: 1024 
    }
  };

  try {
    const geminiResponse = await fetch(
      // Correct Path: using :generateContent with alt=sse
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?alt=sse&key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!geminiResponse.ok) {
        const errorBody = await geminiResponse.text();
        console.error('Gemini API Error:', geminiResponse.status, errorBody);
        return res.status(geminiResponse.status).json({
            message: `AI translation failed: ${geminiResponse.statusText}`,
            details: errorBody.substring(0, 200) + '...'
        });
    }

    // 4. Initiate Streaming Response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.writeHead(200);

    const reader = geminiResponse.body.getReader();
    
    // Loop to read chunks and write them directly to the client
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // CRITICAL FIX: Write the raw buffer 'value' directly to the response stream.
      // Do NOT decode or JSON parse here, as this is causing the server-side error.
      res.write(value); 
    }

    // Log the end
    console.log(`[DEBUG] Streaming complete.`);
    res.end();

  } catch (error) {
    console.error('Critical Streaming Translation Error:', error);
    res.end(JSON.stringify({ message: 'A critical streaming error occurred.', details: error.message }));
  }
}