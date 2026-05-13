import groq from "../config/groq.js";

import Interview from "../models/interview.js";

export const generateInterviewQuestions =
  async (req, res) => {

    try {

      const { role, level, type } =
        req.body;

      const prompt = `
Generate 10 ${type} interview questions 
for a ${level} ${role}.

Return only questions.
`;

      const completion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          model: "llama-3.1-8b-instant",
        });

      const aiResponse =
        completion.choices[0]?.message
          ?.content || "";

      const questions = aiResponse
        .split("\n")
        .filter((q) => q.trim() !== "")
        .map((q) => ({
          question: q,
        }));

      const interview =
        await Interview.create({
          user: req.user._id,
          role,
          level,
          type,
          questions,
        });

      res.status(201).json({
        success: true,
        interview,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to generate interview",
      });
    }
  };
  
export const getInterviewById = async (
  req,
  res
) => {

  try {

    const interview = await Interview.findById(
      req.params.id
    );

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.status(200).json(interview);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

export const saveAnswer = async (
  req,
  res
) => {

  try {

    const { questionIndex, answer } = req.body;

    const interview = await Interview.findById(
      req.params.id
    );

    if (!interview) {

      return res.status(404).json({
        message: "Interview not found",
      });
    }

    interview.questions[
      questionIndex
    ].userAnswer = answer;

    await interview.save();

    res.status(200).json({
      success: true,
      interview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to save answer",
    });
  }
};

export const evaluateAnswer = async (
  req,
  res
) => {

  try {

    const { questionIndex } = req.body;

    const interview = await Interview.findById(
      req.params.id
    );

    if (!interview) {

      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const currentQuestion =
      interview.questions[questionIndex];

    if (!currentQuestion.userAnswer) {

      return res.status(400).json({
        message: "Please save answer first",
      });
    }

    const prompt = `
Question:
${currentQuestion.question}

Candidate Answer:
${currentQuestion.userAnswer}

Evaluate this answer professionally.

Return:
1. Score out of 10
2. Strengths
3. Weaknesses
4. Improvement suggestions
`;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

    const feedback =
      completion.choices[0]?.message?.content || "";

    const scoreMatch =
      feedback.match(/\b([0-9]|10)\/10\b/);

    const score = scoreMatch
      ? parseInt(scoreMatch[1])
      : 7;

    currentQuestion.feedback = feedback;

    currentQuestion.score = score;

    await interview.save();

    res.status(200).json({
      success: true,
      feedback,
      score,
      interview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to evaluate answer",
    });
  }
};

export const getUserInterviews = async (
  req,
  res
) => {

  try {

    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(interviews);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};