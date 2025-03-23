import { saveResumeAnalysis } from "@/lib/db";
import { analyzeResume } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const reqBody = await req.json();
    const { userId, text } = reqBody;
    console.log(text);
    const result = await analyzeResume(text);

    const dbResponse = await saveResumeAnalysis(userId, result);
    // const { data, error } = await supabase.from("resume_analysis").insert([
    //     { user_id: userId, analysis: result }
    // ]);

    if (dbResponse.error) {
      throw new Error(dbResponse.error.message);
    }

    return NextResponse.json({
      status: 200,
      analysis: result,
      message: "Resume uploaded successfully.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
