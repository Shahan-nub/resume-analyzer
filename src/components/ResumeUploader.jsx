"use client";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";


export default function ResumeUploader({ userId }) {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeUploadedSuccessfully, setResumeUploadedSuccessfully] =
    useState(false);

  const handleAnalyze = async () => {
    if (resumeText.length <= 10) {
      toast("Resume too short to be uploaded, please upload a valid resume.");
      return;
    }
    setLoading(true);
    // console.log(resumeText);
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, text: resumeText }),
    });

    const data = await response.json();
    // console.log(data)
    setAnalysis(data.analysis);
    setLoading(false);
    if (data.status === 200) {
      setResumeUploadedSuccessfully(true);
      toast("Resume analyzed successfully! Please check dashboard.");
    }
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
        <Button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>

      {/* {!resumeUploadedSuccessfully && (
        // <div className="mt-4 p-4 border rounded-md bg-gray-100">
        //   <h3 className="font-semibold text-red-400">Resume analyzed successfully! Please check dashboard.</h3>
        // </div>
      )} */}
    </div>
  );
}
