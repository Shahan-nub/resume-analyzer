import { SignedOut } from "@clerk/nextjs";
import ResumeUploader from "../components/ResumeUploader";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
// import { SignedOut } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  console.log(userId)
  if (!userId) {
    redirect("/sign-up");
    console.log("no user")
  }
  return (
    <main className="w-full h-full">
      <ResumeUploader userId={userId}></ResumeUploader>
    </main>
  );
}
