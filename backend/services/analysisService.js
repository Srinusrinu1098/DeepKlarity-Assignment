const { GoogleGenAI } = require("@google/genai");

require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const analyzeWithGemini = async (resumeText) => {
  const model = "gemini-2.5-pro";

  const prompt = `
You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object.

Resume Text:
"""
${resumeText}
"""

JSON Structure:
{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
  "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "resume_rating": "number (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}
Return only a JSON object with the extracted data, no commentary or markdown.
`;

  const contents = [{ role: "user", parts: [{ text: prompt }] }];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: "text/plain",
  };

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullText = "";

    for await (const chunk of response) {
      fullText += chunk.text;
    }

    // Extract JSON content from response
    const jsonStart = fullText.indexOf("{");
    const jsonEnd = fullText.lastIndexOf("}") + 1;
    const jsonText = fullText.slice(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (err) {
    console.error("Gemini API error:", err.message);
    throw new Error("Failed to analyze resume with Gemini");
  }
};

module.exports = analyzeWithGemini;
