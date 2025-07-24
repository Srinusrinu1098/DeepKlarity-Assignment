const pdfParse = require("pdf-parse");
const analyzeWithGemini = require("../services/analysisService");
const pool = require("../db");
exports.analyzeResume = async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const parsed = await pdfParse(pdfBuffer);
    const rawText = parsed.text;

    const extractedData = await analyzeWithGemini(rawText); // JSON from Gemini

    // Save to PostgreSQL
    await pool.query(
      `INSERT INTO resumes (
        name, email, phone, linkedin_url, portfolio_url,
        summary, technical_skills, soft_skills,
        resume_rating, improvement_areas, upskill_suggestions, orginal_file_name 
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)`,
      [
        extractedData.name,
        extractedData.email,
        extractedData.phone,
        extractedData.linkedin_url,
        extractedData.portfolio_url,
        extractedData.summary,
        extractedData.technical_skills.join(", "),
        extractedData.soft_skills.join(", "),
        parseInt(extractedData.resume_rating),
        extractedData.improvement_areas,
        extractedData.upskill_suggestions.join(", "),
        req.file.originalname,
      ]
    );

    res.json({
      data: extractedData,
      fileName: req.file.originalname,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process resume" });
  }
};
