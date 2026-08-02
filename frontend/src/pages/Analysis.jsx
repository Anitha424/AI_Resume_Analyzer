import Sidebar from "../components/Sidebar";
import ATSScoreCard from "../components/ATSScoreCard";
import JobCard from "../components/JobCard";
import AIAnalysisCard from "../components/AIAnalysisCard";

function Analysis() {
  const result = JSON.parse(localStorage.getItem("resumeResult"));

  // If no resume has been uploaded
  if (!result) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg text-center">
            <h1 className="text-3xl font-bold mb-4">
              No Resume Analysis Found
            </h1>

            <p className="text-gray-600">
              Please upload your resume first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Resume Analysis
        </h1>

        {/* ATS Score */}
        <div className="mb-10">
          <ATSScoreCard score={result.ats_score}
           />
        </div>
        <AIAnalysisCard analysis={result.ai_analysis} />
        

        {/* Resume Quality */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Resume Quality
          </h2>

          <p className="text-3xl text-green-600 font-bold">
            {result.resume_quality || "Not Available"}
          </p>

        </div>

        {/* Strengths */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Strengths
          </h2>

          {result.strengths?.length ? (
            <ul className="list-disc ml-6 space-y-2">
              {result.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No strengths available.</p>
          )}

        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Weaknesses
          </h2>

          {result.weaknesses?.length ? (
            <ul className="list-disc ml-6 space-y-2">
              {result.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No weaknesses found.</p>
          )}

        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Suggestions
          </h2>

          {result.analysis_suggestions?.length ? (
            <ul className="list-disc ml-6 space-y-2">
              {result.analysis_suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 font-semibold">
              🎉 Excellent Resume! No suggestions.
            </p>
          )}

        </div>

        {/* Job Matches */}
        <div>

          <h2 className="text-3xl font-bold mb-6">
            Job Matches
          </h2>

          {result.job_matches?.map((job, index) => (
            <JobCard
              key={index}
              job={job}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Analysis;