import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-10">
      {JSON.stringify(session)}
    </div>
  );
}
