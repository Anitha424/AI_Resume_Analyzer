import Sidebar from "../components/Sidebar";
import ATSScoreCard from "../components/ATSScoreCard";
import JobCard from "../components/JobCard";

function Dashboard() {
  const result = JSON.parse(localStorage.getItem("resumeResult"));

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome 👋
        </h1>

        <p className="text-gray-500 mt-2">
          AI Resume Analyzer Dashboard
        </p>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {/* ATS Score */}
          <ATSScoreCard
            score={result ? result.ats_score : 0}
          />

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center">

            <h2 className="text-xl font-semibold text-gray-700">
              Skills Found
            </h2>

            <p className="text-6xl font-bold text-green-600 mt-6">
              {result ? result.skills.length : 0}
            </p>

          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center">

            <h2 className="text-xl font-semibold text-gray-700">
              Suggestions
            </h2>

            <p className="text-6xl font-bold text-purple-600 mt-6">
              {result ? result.suggestions.length : 0}
            </p>

          </div>

        </div>

        {/* Skills Section */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Skills Found
            </h2>

            <div className="flex flex-wrap gap-3">

              {result.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>
        )}

        {/* Suggestions Section */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Suggestions
            </h2>

            {result.suggestions.length === 0 ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                🎉 Excellent Resume! No suggestions.
              </div>
            ) : (
              <ul className="list-disc ml-6 space-y-2">
                {result.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}

          </div>
        )}

        {/* Recommended Jobs */}
        {result && result.job_matches && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              💼 Recommended Jobs
            </h2>

            <div className="space-y-5">
              {result.job_matches.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                />
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;