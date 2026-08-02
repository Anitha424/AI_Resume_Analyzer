import jsPDF from "jspdf";

const downloadReport = (result) => {
  const doc = new jsPDF();

  let y = 20;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("AI Resume Analysis Report", 20, y);

  y += 15;

  // Resume Information
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Resume: ${result.filename}`, 20, y);
  y += 10;

  doc.text(`ATS Score: ${result.ats_score}%`, 20, y);
  y += 15;

  // Skills
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Skills Found", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  result.skills.forEach((skill) => {
    doc.text(`• ${skill}`, 25, y);
    y += 8;
  });

  y += 10;

  // Suggestions
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Suggestions", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  if (result.suggestions.length === 0) {
    doc.text("Excellent Resume! No Suggestions.", 25, y);
    y += 8;
  } else {
    result.suggestions.forEach((item) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });
  }

  y += 10;

  // Job Matches
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Recommended Jobs", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  result.job_matches.forEach((job) => {
    doc.text(
      `${job.job_title} - ${job.match_score}% Match`,
      25,
      y
    );
    y += 8;
  });

  doc.save("AI_Resume_Report.pdf");
};

export default downloadReport;