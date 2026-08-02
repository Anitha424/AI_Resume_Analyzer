function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-5">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-bold">
          💼 {job.job_title}
        </h2>

        <span className="text-blue-600 font-bold text-lg">
          {job.match_score}%
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">

        <div
          className="bg-green-500 h-3 rounded-full"
          style={{
            width: `${job.match_score}%`,
          }}
        ></div>

      </div>

      <p className="mt-5 font-semibold">
        Matched Skills
      </p>

      <div className="flex flex-wrap gap-2 mt-3">

        {job.matched_skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
}

export default JobCard;