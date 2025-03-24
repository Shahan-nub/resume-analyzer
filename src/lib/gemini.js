import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

export const analyzeResume = async (text) => {
  const prompt = `
  Extract the following details from the resume text: 
  - Name
  - Contact Information (Email, Phone, LinkedIn)
  - Summary (if available)
  - Skills
  - Work Experience (Company, Job Title, Duration)
  - Education (Degree, Institution, Year)
  
  Resume Text:
  """${text}"""
  
  Provide output as a structured JSON object of this format:
  {
  "Name": "John Doe",
  "Skills": [
    "JavaScript",
    "React.js",
  ],
  "Summary": "Experienced Full Stack Developer skilled in JavaScript, React, Node.js, and databases.",
  "Education": [
    {
      "Year": "2015 - 2019",
      "Degree": "B.Sc. in Computer Science",
      "Institution": "MIT"
    }
  ],
  "Work Experience": [
    {
      "Company": "XYZ Corp",
      "Duration": "Jan 2020 - Present",
      "Job Title": "Software Engineer"
    },
    {
      "Company": "ABC Inc.",
      "Duration": "June 2018 - Dec 2019",
      "Job Title": "Web Developer"
    }
  ],
  "Contact Information": {
    "Email": "johndoe@example.com",
    "Phone": "+1234567890",
    "LinkedIn": "linkedin.com/in/johndoe"
  }
}
  `;

  try {
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // console.log("full response: ",JSON.stringify(response,null,2))
    const result = response.response.candidates[0].content.parts[0].text;

    // console.log("Parsed Resume Data:", result);

    const cleanJsonString = result.replace(/```json|```/g, "").trim();
    const parsedResult = JSON.parse(cleanJsonString);

    return parsedResult;

  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
};

const sampleResume = `
John Doe
Email: johndoe@example.com | Phone: +1234567890 | LinkedIn: linkedin.com/in/johndoe

Summary: Experienced Full Stack Developer skilled in JavaScript, React, Node.js, and databases.

Skills: JavaScript, React.js, Node.js, MongoDB, Express.js, TypeScript, AWS

Work Experience:
- Software Engineer, XYZ Corp (Jan 2020 - Present)
- Web Developer, ABC Inc. (June 2018 - Dec 2019)

Education:
- B.Sc. in Computer Science, MIT (2015 - 2019)
`;
