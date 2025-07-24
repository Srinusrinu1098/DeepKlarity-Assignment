const express = require("express");
const multer = require("multer");
const { analyzeResume } = require("../controllers/resumeController");
const client = require("../db/index");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/resume/upload", upload.single("resume"), analyzeResume);

router.get("/resumes", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM resumes ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/resumes", async (req, res) => {
  try {
    await client.query("DELETE FROM resumes");
    res.json({ message: "All resumes deleted successfully." });
  } catch (err) {
    console.error("Error deleting resumes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/resumes/:id", async (req, res) => {
  const { id } = req.params;
  const result = await client.query("SELECT * FROM resumes WHERE id = $1", [
    id,
  ]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Resume not found" });
  }
  res.json(result.rows[0]);
});

module.exports = router;
