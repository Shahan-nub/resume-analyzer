import { supabase } from "./supabase";

export const saveResumeAnalysis = async (userId, analysisData) => {
  const { data, error } = await supabase
    .from("resume_analyzer")
    .upsert(
      { user_id: userId, analysis: analysisData },
      { onConflict: "user_id" } // This part ensures updates instead of inserts
    )
    .select();
  // console.log("data from supabase:", data);

  if (error) {
    console.error("Error saving analysis:", error);
    return { error };
  }

  return { data };
};
