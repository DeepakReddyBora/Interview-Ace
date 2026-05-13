import {
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar.jsx";

import useTheme from "../context/useTheme.js";

const InterviewPage = () => {

  const { id } = useParams();

  const { darkMode } = useTheme();

  const [loading, setLoading] =
    useState(true);

  const [interview, setInterview] =
    useState(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [evaluating, setEvaluating] =
    useState(false);

  const [feedback, setFeedback] =
    useState("");

  const [score, setScore] =
    useState(null);

  const [listening, setListening] =
    useState(false);

  const recognitionRef =
    useRef(null);


  // Current Answer
  const currentAnswer = useMemo(() => {

    return (
      answer ||
      interview?.questions[
        currentQuestion
      ]?.userAnswer ||
      ""
    );

  }, [
    answer,
    interview,
    currentQuestion,
  ]);


  // Current Question Text
  const currentQuestionText =
    interview?.questions[
      currentQuestion
    ]?.question;


  // Speak Question
  const speakQuestion = (text) => {

    if (!text) return;

    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.lang = "en-US";

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.volume = 1;

    speechSynthesis.speak(
      utterance
    );
  };


  // Fetch Interview
  useEffect(() => {

    const fetchInterview = async () => {

      try {

        const userInfo = JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

        const config = {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5000/api/interview/${id}`,
          config
        );

        setInterview(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchInterview();

  }, [id]);


  // Auto Speak Question
  useEffect(() => {

    if (currentQuestionText) {

      speakQuestion(
        currentQuestionText
      );
    }

  }, [currentQuestionText]);


  // Speech Recognition
  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      console.log(
        "Speech Recognition not supported"
      );

      return;
    }

    const recognitionInstance =
      new SpeechRecognition();

    recognitionInstance.continuous = true;

    recognitionInstance.interimResults = true;

    recognitionInstance.lang = "en-US";

    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {

      setListening(true);
    };

    recognitionInstance.onresult = (
      event
    ) => {

      let transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0]
            .transcript + " ";
      }

      setAnswer(
        transcript.trim()
      );
    };

    recognitionInstance.onerror = (
      event
    ) => {

      console.log(
        "Speech Recognition Error:",
        event.error
      );

      setListening(false);
    };

    recognitionInstance.onend = () => {

      if (listening) {

        try {

          recognitionInstance.start();

        } catch (error) {

          console.log(error);
        }
      }
    };

    recognitionRef.current =
      recognitionInstance;

    return () => {

      recognitionInstance.stop();
    };

  }, [listening]);


  // Start Listening
  const startListening = () => {

    if (recognitionRef.current) {

      setAnswer("");

      setListening(true);

      recognitionRef.current.start();
    }
  };


  // Stop Listening
  const stopListening = () => {

    if (recognitionRef.current) {

      setListening(false);

      recognitionRef.current.stop();
    }
  };


  // Save Answer
  const saveAnswerHandler =
    async () => {

      try {

        setSuccess("");

        setError("");

        const userInfo = JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

        const config = {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        };

        const response =
          await axios.put(
            `http://localhost:5000/api/interview/${id}/answer`,
            {
              questionIndex:
                currentQuestion,

              answer:
                currentAnswer,
            },
            config
          );

        setInterview(
          response.data.interview
        );

        setSuccess(
          "Answer saved successfully!"
        );

        setTimeout(() => {

          setSuccess("");

        }, 2000);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to save answer"
        );
      }
    };


  // Evaluate Answer
  const evaluateAnswerHandler =
    async () => {

      try {

        setEvaluating(true);

        setError("");

        const userInfo = JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

        const config = {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        };

        const response =
          await axios.put(
            `http://localhost:5000/api/interview/${id}/evaluate`,
            {
              questionIndex:
                currentQuestion,
            },
            config
          );

        setFeedback(
          response.data.feedback
        );

        setScore(
          response.data.score
        );

      } catch (error) {

        console.log(error);

        setError(
          "Failed to evaluate answer"
        );

      } finally {

        setEvaluating(false);
      }
    };


  if (loading) {

    return (
      <div className={`min-h-screen flex items-center justify-center text-2xl ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}>

        Loading Interview...

      </div>
    );
  }


  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-100 text-slate-900"
    }`}>

      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        {/* Header */}

        <div className={`p-8 rounded-3xl border mb-8 ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <h1 className="text-4xl font-bold mb-3">
            {interview.role} Interview
          </h1>

          <div className="flex gap-4 flex-wrap">

            <span className="bg-blue-600 px-4 py-2 rounded-xl text-white">
              {interview.level}
            </span>

            <span className="bg-purple-600 px-4 py-2 rounded-xl text-white">
              {interview.type}
            </span>

          </div>

        </div>


        {/* Question Card */}

        <div className={`p-10 rounded-3xl border ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <p className="text-sm text-slate-400 mb-4">

            Question {currentQuestion + 1}
            {" "}of{" "}
            {interview.questions.length}

          </p>

          <h2 className="text-3xl font-semibold leading-relaxed mb-10">

            {currentQuestionText}

          </h2>


          {/* Success */}

          {success && (

            <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl mb-6">

              {success}

            </div>
          )}


          {/* Error */}

          {error && (

            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6">

              {error}

            </div>
          )}


          {/* Textarea */}

          <textarea
            rows="8"
            placeholder="Write or speak your answer..."
            value={currentAnswer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            className={`w-full p-5 rounded-2xl border outline-none mb-6 resize-none transition-all ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
                : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500"
            }`}
          />


          {/* Voice Controls */}

          <div className="flex gap-4 mb-8 flex-wrap">

            {!listening ? (

              <button
                onClick={
                  startListening
                }
                className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold text-white transition-all"
              >
                🎤 Start Speaking
              </button>

            ) : (

              <button
                onClick={
                  stopListening
                }
                className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold text-white transition-all"
              >
                ⏹ Stop Listening
              </button>

            )}

            <button
              onClick={() =>
                speakQuestion(
                  currentQuestionText
                )
              }
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold text-white transition-all"
            >
              🔊 Speak Question
            </button>

          </div>


          {/* Action Buttons */}

          <div className="flex flex-wrap gap-4 mb-8">

            <button
              onClick={
                saveAnswerHandler
              }
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white font-medium transition-all"
            >
              Save Answer
            </button>

            <button
              onClick={
                evaluateAnswerHandler
              }
              disabled={evaluating}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-white font-medium transition-all disabled:opacity-50"
            >

              {evaluating
                ? "Evaluating..."
                : "Evaluate Answer"}

            </button>

          </div>


          {/* Feedback */}

          {feedback && (

            <div className={`mt-8 p-6 rounded-2xl border mb-10 ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-100 border-slate-300"
            }`}>

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-2xl font-bold">
                  AI Feedback
                </h3>

                <span className="bg-green-600 px-4 py-2 rounded-xl text-white">

                  {score}/10

                </span>

              </div>

              <pre className="whitespace-pre-wrap font-sans leading-relaxed">

                {feedback}

              </pre>

            </div>
          )}


          {/* Navigation */}

          <div className="flex justify-between">

            <button
              disabled={
                currentQuestion === 0
              }
              onClick={() => {

                speechSynthesis.cancel();

                setAnswer("");

                setFeedback("");

                setScore(null);

                setCurrentQuestion(
                  currentQuestion - 1
                );
              }}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl disabled:opacity-50 text-white transition-all"
            >
              Previous
            </button>


            <button
              disabled={
                currentQuestion ===
                interview.questions.length - 1
              }
              onClick={() => {

                speechSynthesis.cancel();

                setAnswer("");

                setFeedback("");

                setScore(null);

                setCurrentQuestion(
                  currentQuestion + 1
                );
              }}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl disabled:opacity-50 text-white transition-all"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InterviewPage;