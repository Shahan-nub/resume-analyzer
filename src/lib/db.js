import { supabase } from "./supabase";

export const saveResumeAnalysis = async (userId, analysisData) => {
  const { data, error } = await supabase
    .from("resume_analyzer")
    .insert([{ user_id: userId, analysis: analysisData }]);

  if (error) {
    console.error("Error saving analysis:", error);
    return { error };
  }

  return { data };
};
