"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard({ resumeData, jobMatches }) {
  const cleanText = (htmlString) => {
    return htmlString
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {resumeData?.Name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {resumeData?.["Contact Information"]?.Email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {resumeData?.["Contact Information"]?.Phone || "N/A"}
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            {resumeData?.["Contact Information"]?.LinkedIn || "N/A"}
          </p>
        </CardContent>
      </Card>

      {/* Skills Card */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {resumeData?.Skills?.map((skill, index) => (
              <li key={index} className="badge badge-primary mr-2">
                {skill}
              </li>
            )) || "N/A"}
          </ul>
        </CardContent>
      </Card>

      {/* Work Experience Card */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          {resumeData?.["Work Experience"]?.map((job, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{job.Company}</strong> - {job["Job Title"]}
              </p>
              <p>{job.Duration}</p>
            </div>
          )) || "N/A"}
        </CardContent>
      </Card>

      {/* Education Card */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {resumeData?.Education?.map((edu, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{edu.Degree}</strong>
              </p>
              <p>
                {edu.Institution} ({edu.Year})
              </p>
            </div>
          )) || "N/A"}
        </CardContent>
      </Card>

      {/* Job Matches Section */}
      <div className="col-span-full">
        <h2 className="text-xl font-semibold mb-4">Job Matches</h2>
        <div className="flex flex-col gap-4">
          {jobMatches?.length > 0 ? (
            jobMatches.map((job, index) => {
              const cleanSnippet = cleanText(job.snippet);
              return (
                <Card key={index} className={`scale-95 hover:scale-100 transition-all duration-500 hover:shadow-sm hover:shadow-[#278ab7]`}>
                  <CardHeader>
                    <div className="flex gap-2 lg:text-xl text-lg items-center text-[#52a8ff]">
                      <h1 className="font-bold">{index}</h1>
                      <p>-</p>
                      <CardTitle>{job.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent >
                    <p>
                      <strong>About: </strong> {cleanSnippet}
                    </p>
                    <p>
                      <strong>Company: </strong> {job.company}
                    </p>
                    <p>
                      <strong>Location: </strong> {job.location}
                    </p>
                    <p>
                      <strong>Salary:</strong> {job.salary || "Not Disclosed"}
                    </p>
                    <p>
                      <strong>Type:</strong> {job.type}
                    </p>
                    <p className="lg:my-4 my-2">
                      <strong>Link to Apply:</strong> 
                      <Link className="mx-2 text-[#52a8ff] " href={job.link}>Apply here.</Link>

                    </p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p>No job matches found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
