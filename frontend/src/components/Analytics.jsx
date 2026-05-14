import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import useTheme from "../context/useTheme.js";

const Analytics = ({
  interviews,
}) => {

  const { darkMode } =
    useTheme();

  // Total Interviews
  const totalInterviews =
    interviews.length;

  // Average Score
  const averageScore =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (acc, interview) =>
              acc +
              (interview.score ||
                0),
            0
          ) / totalInterviews
        )
      : 0;

  // Pie Data
  const pieData = [
    {
      name: "Completed",
      value: totalInterviews,
    },
    {
      name: "Remaining",
      value:
        Math.max(
          10 -
            totalInterviews,
          0
        ),
    },
  ];

  // Bar Data
  const barData =
    interviews.map(
      (
        interview,
        index
      ) => ({
        name: `Interview ${
          index + 1
        }`,
        score:
          interview.score || 0,
      })
    );

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
  ];


  return (
    <div className="mt-14">

      <h2 className="text-4xl font-bold mb-8">

        Analytics Dashboard

      </h2>


      {/* Stats Cards */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* Total Interviews */}

        <div
          className={`rounded-3xl p-8 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <h3 className="text-xl font-semibold mb-3">

            Total Interviews

          </h3>

          <p className="text-5xl font-bold text-blue-500">

            {totalInterviews}

          </p>

        </div>


        {/* Average Score */}

        <div
          className={`rounded-3xl p-8 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <h3 className="text-xl font-semibold mb-3">

            Average Score

          </h3>

          <p className="text-5xl font-bold text-purple-500">

            {averageScore}%

          </p>

        </div>

      </div>


      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div
          className={`rounded-3xl p-8 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <h3 className="text-2xl font-semibold mb-6">

            Interview Progress

          </h3>


          {/* FIXED CONTAINER */}

          <div className="w-full h-75h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                        stroke="none"
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Bar Chart */}

        <div
          className={`rounded-3xl p-8 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <h3 className="text-2xl font-semibold mb-6">

            Interview Scores

          </h3>


          {/* FIXED CONTAINER */}

          <div className="w-full h-75 min-h-75">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={barData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="score"
                  fill="#3B82F6"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;