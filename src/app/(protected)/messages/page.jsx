import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserMessages } from "@/actions/message.actions";
import MessagesClient from "./MessagesClient";

export default async function MessagesPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login?error=SessionExpired");
  }

  const messages = await getUserMessages();

  return <MessagesClient initialMessages={messages} session={session} />;
}
