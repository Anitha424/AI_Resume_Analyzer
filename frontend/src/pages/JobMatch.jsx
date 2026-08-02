import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleMatch = async () => {
    console.log("Analyze Match button clicked");
    if (!jobDescription.trim()) {
      toast.error("Please enter a Job Description");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/resume/job-match",
        {
          job_description: jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Backend Response:", res.data);

      setResult(res.data);

      toast.success("Job Match Completed");
    } catch (err) {
      console.error(err);
      toast.error("Job Match Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Resume vs Job Description
        </h1>

        <textarea
          rows={10}
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full rounded-xl border p-5"
        />

        <button
          onClick={handleMatch}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Analyze Match
        </button>

        {result && (
          <div className="mt-10">

            {/* Match Score */}

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

              <h2 className="text-3xl font-bold">
                🎯 Match Score
              </h2>

              <p className="text-6xl text-green-600 font-bold mt-5">
                {result.match_score}%
              </p>

            </div>

            {/* Matched Skills */}

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

              <h2 className="text-2xl font-bold mb-5">
                ✅ Matched Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {result.matched_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

            {/* Missing Skills */}

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

              <h2 className="text-2xl font-bold mb-5">
                ❌ Missing Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {result.missing_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

            {/* AI Feedback */}

            {result.ai_feedback && (
              <div className="bg-white rounded-xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🤖</span>

                  <h2 className="text-3xl font-bold">
                    AI Job Match Analysis
                  </h2>
                </div>

                <div className="bg-gray-50 border rounded-xl p-6">

                  <pre className="whitespace-pre-wrap font-sans leading-8 text-gray-700">
                    {result.ai_feedback}
                  </pre>

                </div>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default JobMatch;