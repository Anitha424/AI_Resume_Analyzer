function Analysis() {
  const result = JSON.parse(localStorage.getItem("resumeResult"));

  console.log("Result:", result);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Analysis Debug</h1>

      <p>ATS Score: {result?.ats_score}</p>

      <p>Resume Quality: {result?.resume_quality}</p>

      <p>Strengths Count: {result?.strengths?.length}</p>

      <p>Weaknesses Count: {result?.weaknesses?.length}</p>

      <p>Suggestions Count: {result?.analysis_suggestions?.length}</p>

      <p>Jobs Count: {result?.job_matches?.length}</p>
    </div>
  );
}

export default Analysis;