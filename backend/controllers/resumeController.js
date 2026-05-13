import fs from "fs";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import groq from "../config/groq.js";


// Extract PDF Text Helper
const extractPDFText = async (
  filePath
) => {

  const dataBuffer =
    new Uint8Array(
      fs.readFileSync(filePath)
    );

  const pdf =
    await pdfjsLib.getDocument({
      data: dataBuffer,
    }).promise;

  let extractedText = "";

  for (
    let pageNum = 1;
    pageNum <= pdf.numPages;
    pageNum++
  ) {

    const page =
      await pdf.getPage(pageNum);

    const textContent =
      await page.getTextContent();

    const textItems =
      textContent.items.map(
        (item) => item.str
      );

    extractedText +=
      textItems.join(" ") + "\n";
  }

  return extractedText;
};


// Resume Analyzer
export const analyzeResume =
  async (req, res) => {

    try {

      // Validate Upload
      if (!req.file) {

        return res.status(400).json({
          message:
            "No resume uploaded",
        });
      }

      // Extract Resume Text
      const resumeText =
        await extractPDFText(
          req.file.path
        );

      // Validate Text
      if (!resumeText.trim()) {

        return res.status(400).json({
          message:
            "Could not extract text from PDF",
        });
      }

      // Prompt
      const prompt = `
You are an expert ATS resume reviewer.

Analyze this resume professionally.

Resume:
${resumeText}

Return:
1. ATS Score out of 100
2. Strengths
3. Weaknesses
4. Missing Skills
5. Improvement Suggestions
6. Interview Readiness
`;

      // AI Response
      const completion =
        await groq.chat.completions.create({

          model:
            "llama-3.1-8b-instant",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const feedback =
        completion.choices[0]
          ?.message?.content || "";

      // Delete File
      fs.unlinkSync(
        req.file.path
      );

      // Response
      res.status(200).json({
        success: true,
        feedback,
      });

    } catch (error) {

      console.log(
        "RESUME ANALYZER ERROR:"
      );

      console.log(error);

      res.status(500).json({
        message:
          "Resume analysis failed",
      });
    }
  };


// Resume Matcher
export const matchResumeWithJob =
  async (req, res) => {

    try {

      // Validate Upload
      if (!req.file) {

        return res.status(400).json({
          message:
            "Resume is required",
        });
      }

      const { jobDescription } =
        req.body;

      // Validate JD
      if (!jobDescription) {

        return res.status(400).json({
          message:
            "Job description is required",
        });
      }

      // Extract Resume Text
      const resumeText =
        await extractPDFText(
          req.file.path
        );

      // Validate Text
      if (!resumeText.trim()) {

        return res.status(400).json({
          message:
            "Could not extract text from PDF",
        });
      }

      // AI Prompt
      const prompt = `
You are an ATS resume analyzer.

Analyze the resume against the job description.

Return ONLY valid JSON in this exact format:

{
  "matchScore": 85,
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "strongSkills": [
    "React",
    "Node.js"
  ],
  "suggestions": [
    "Add cloud deployment experience",
    "Mention scalability projects"
  ],
  "summary": "Good match for the role."
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

      // AI Response
      const completion =
        await groq.chat.completions.create({

          model:
            "llama-3.1-8b-instant",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const rawResponse =
        completion.choices[0]
          ?.message?.content || "";

      // Clean Markdown
      const cleanedResponse =
        rawResponse
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      let feedback;

      try {

        feedback =
          JSON.parse(
            cleanedResponse
          );

      } catch (error) {

        console.log(
          "JSON Parse Error:"
        );

        console.log(
          cleanedResponse
        );

        return res.status(500).json({
          message:
            "Invalid AI response format",
        });
      }

      // Delete File
      fs.unlinkSync(
        req.file.path
      );

      // Success
      res.status(200).json({
        success: true,
        feedback,
      });

    } catch (error) {

      console.log(
        "RESUME MATCH ERROR:"
      );

      console.log(error);

      res.status(500).json({
        message:
          "Resume matching failed",
      });
    }
  };