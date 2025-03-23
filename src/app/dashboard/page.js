"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import DashboardLoading from "@/components/DashboardLoading";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const page = () => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(userId);
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("resume_analyzer")
        .select("analysis")
        .eq("user_id", userId) // Fetch only the logged-in user's data
        .order("created_at", { ascending: false })
        .limit(1); 

      if (error) {
        console.error("Error fetching analysis:", error);
      } else {
        setAnalysis(data[0]?.analysis);
        console.log(data);
      }
      setLoading(false);
    };

    fetchAnalysis();
  }, [userId]);

// JOBS

  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    console.log(analysis);

    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords: `software developer`, location: "Remote" }),
        });
    
        const data = await res.json();
        console.log(data.jobs); // Use this data to update UI

        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    analysis && fetchJobs();
  }, [analysis]);





  return (
    <div className="w-full relative">
      {loading && <DashboardLoading/>}
      <Dashboard resumeData={analysis} jobMatches={jobs}></Dashboard>
    </div>
  );
};

export default page;
