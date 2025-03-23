"use client";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ResumeUploader({userId}) {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    // console.log(resumeText);
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userId:userId, text: resumeText }),
    });

    const data = await response.json();
    console.log(data)
    setAnalysis(data.analysis);
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Resume Analyzer</h2>
      <div className="grid w-full gap-3">
      <Textarea
        rows="15"
        // className="lg:h-40 h-32"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      <Button
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </Button>
      </div>

      {analysis && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-semibold">Analysis Result:</h3>
          {/* <p>{analysis}</p> */}
        </div>
      )}
    </div>
  );
}
