import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { keywords,location } = await req.json(); 
    console.log("keyword: ",keywords, " loc : ",location)
    const JOOBLE_API_KEY = process.env.JOOBLE_API_KEY; 
    const JOOBLE_API_URL = `https://jooble.org/api/${JOOBLE_API_KEY}`;

    const requestBody = JSON.stringify({ keywords, location });

    const response = await fetch(JOOBLE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs from Jooble");
    }

    const data = await response.json();

    return NextResponse.json({ status: "success", jobs: data.jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}
