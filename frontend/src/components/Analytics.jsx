import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import useTheme from "../context/useTheme.js";

const Analytics = ({ interviews }) => {

  const { darkMode } = useTheme();

  // Extract Scores
  const scoreData = interviews.map(
    (interview, index) => {

      const scores =
        interview.questions
          ?.filter((q) => q.score)
          ?.map((q) => q.score);

      const average =
        scores.length > 0
          ? (
              scores.reduce(
                (a, b) => a + b,
                0
              ) / scores.length
            ).toFixed(1)
          : 0;

      return {
        name: `Interview ${
          index + 1
        }`,
        score: Number(average),
      };
    }
  );

  // Overall Stats
  const totalInterviews =
    interviews.length;

  const allScores = interviews.flatMap(
    (interview) =>
      interview.questions
        ?.filter((q) => q.score)
        ?.map((q) => q.score) || []
  );

  const averageScore =
    allScores.length > 0
      ? (
          allScores.reduce(
            (a, b) => a + b,
            0
          ) / allScores.length
        ).toFixed(1)
      : 0;

  // Pie Chart Data
  const pieData = [
    {
      name: "Strong",
      value: allScores.filter(
        (s) => s >= 7
      ).length,
    },
    {
      name: "Needs Improvement",
      value: allScores.filter(
        (s) => s < 7
      ).length,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="mt-14">

      {/* Heading */}

      <h2 className="text-3xl font-bold mb-8">
        Interview Analytics
      </h2>


      {/* Stats Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className={`p-6 rounded-3xl border ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <h3 className="text-lg mb-2">
            Total Interviews
          </h3>

          <p className="text-4xl font-bold">
            {totalInterviews}
          </p>

        </div>


        <div className={`p-6 rounded-3xl border ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <h3 className="text-lg mb-2">
            Average Score
          </h3>

          <p className="text-4xl font-bold">
            {averageScore}/10
          </p>

        </div>


        <div className={`p-6 rounded-3xl border ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <h3 className="text-lg mb-2">
            Questions Evaluated
          </h3>

          <p className="text-4xl font-bold">
            {allScores.length}
          </p>

        </div>

      </div>


      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Line Chart */}

        <div className={`p-6 rounded-3xl border h-100 ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <h3 className="text-2xl font-semibold mb-6">
            Progress Over Time
          </h3>

          <ResponsiveContainer
            width="100%"
            height="85%"
          >

            <LineChart data={scoreData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis domain={[0, 10]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        {/* Pie Chart */}

        <div className={`p-6 rounded-3xl border h-100 ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <h3 className="text-2xl font-semibold mb-6">
            Performance Breakdown
          </h3>

          <ResponsiveContainer
            width="100%"
            height="85%"
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >

                {pieData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default Analytics;