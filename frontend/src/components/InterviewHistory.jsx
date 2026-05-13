import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import useTheme from "../context/useTheme.js";

const InterviewHistory = () => {

  const navigate = useNavigate();

  const { darkMode } = useTheme();

  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchInterviews = async () => {

      try {

        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/interview",
          config
        );

        setInterviews(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchInterviews();

  }, []);


  if (loading) {

    return (
      <div className="text-center py-10">
        Loading interviews...
      </div>
    );
  }


  return (
    <div className="mt-12">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold">
          Recent Interviews
        </h2>

      </div>


      {interviews.length === 0 ? (

        <div className={`p-8 rounded-3xl border text-center ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <p className="text-lg text-slate-400">
            No interviews yet.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {interviews.map((interview) => (

            <div
              key={interview._id}
              className={`p-6 rounded-3xl border transition-all hover:scale-[1.01] ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <h3 className="text-2xl font-semibold mb-2">

                    {interview.role}

                  </h3>

                  <div className="flex gap-3 flex-wrap">

                    <span className="bg-blue-600 px-3 py-1 rounded-xl text-white text-sm">

                      {interview.level}

                    </span>

                    <span className="bg-purple-600 px-3 py-1 rounded-xl text-white text-sm">

                      {interview.type}

                    </span>

                  </div>

                </div>


                <button
                  onClick={() =>
                    navigate(
                      `/interview/${interview._id}`
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white font-medium transition-all"
                >
                  Continue
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default InterviewHistory;