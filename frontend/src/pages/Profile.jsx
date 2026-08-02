import Sidebar from "../components/Sidebar";

function Profile() {
  const result = JSON.parse(localStorage.getItem("resumeResult"));

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-gray-800">
          👤 My Profile
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

          <div className="space-y-6">

            <div>
              <h2 className="text-gray-500">Name</h2>
              <p className="text-2xl font-semibold">
                Anitha
              </p>
            </div>

            <div>
              <h2 className="text-gray-500">Resume</h2>
              <p className="text-xl">
                {result?.filename || "Not Uploaded"}
              </p>
            </div>

            <div>
              <h2 className="text-gray-500">ATS Score</h2>
              <p className="text-2xl font-bold text-green-600">
                {result?.ats_score || 0}%
              </p>
            </div>

            <div>
              <h2 className="text-gray-500">Skills Found</h2>
              <p className="text-2xl">
                {result?.skills?.length || 0}
              </p>
            </div>

            <div>
              <h2 className="text-gray-500">Best Job Match</h2>

              <p className="text-xl text-blue-600 font-semibold">
                {result?.job_matches?.[0]?.job_title || "No Match Yet"}
              </p>

              <p className="text-gray-500">
                {result?.job_matches?.[0]?.match_score || 0}% Match
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;