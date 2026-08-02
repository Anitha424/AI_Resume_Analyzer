import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/resume/upload", formData, {
        
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Backend Response:", res.data);

      setResult(res.data);
      localStorage.setItem(
  "resumeResult",
  JSON.stringify(res.data)
);

      toast.success("Resume Uploaded Successfully");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail || "Upload Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto">

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-center mb-8">
            Upload Resume
          </h1>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleUpload}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Upload Resume
          </button>

        </div>

        {/* Analysis Result */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-3xl font-bold mb-6 text-center">
              Resume Analysis
            </h2>

            {/* ATS Score */}
            <div className="text-center mb-8">

              <h3 className="text-xl font-semibold">
                ATS Score
              </h3>

              <p className="text-6xl font-bold text-green-600 mt-2">
                {result.ats_score}%
              </p>

            </div>

            {/* Skills */}
            <div className="mb-8">

              <h3 className="text-2xl font-semibold mb-4">
                Skills Found
              </h3>

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

            {/* Suggestions */}
            <div>

              <h3 className="text-2xl font-semibold mb-4">
                Suggestions
              </h3>

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

          </div>
        )}

      </div>

    </div>
  );
}

export default UploadResume;