function AIAnalysisCard({ analysis }) {
  if (!analysis) return null;

  const sections = analysis.split("\n\n");

  return (
    <div className="mt-8">

      <div className="flex items-center gap-3 mb-8">
        <span className="text-5xl">🤖</span>

        <div>
          <h2 className="text-4xl font-bold text-gray-800">
            AI Resume Analysis
          </h2>

          <p className="text-gray-500">
            Generated using Llama 3.2
          </p>
        </div>
      </div>

      <div className="grid gap-6">

        {sections.map((section, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
          >
            <pre className="whitespace-pre-wrap leading-8 text-gray-700 font-sans">
              {section}
            </pre>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIAnalysisCard;