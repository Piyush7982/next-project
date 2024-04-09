import { fetchUserDataByUsername } from "@/actions/user.actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import USerDataTable from "./UserDataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, User } from "lucide-react";
import UpdateProfileForm from "./UpdateProfileForm";

export default async function Profile() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const userdetails = await fetchUserDataByUsername(session?.user?.username);
  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-10">
      {/* {JSON.stringify(userdetails)} */}
      <div className="container  md:w-7/12 flex flex-col  gap-5">
        <div className="flex items-center justify-start font-bold text-4xl mb-3">
          User Profile
        </div>
        <Tabs defaultValue="profile" className="w-full ">
          <TabsList>
            <TabsTrigger value="profile">
              <User size={20} />
            </TabsTrigger>
            <TabsTrigger value="editProfile">
              <Pencil size={20} />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <USerDataTable username={session?.user?.username} />
          </TabsContent>
          <TabsContent value="editProfile">
            <UpdateProfileForm userdetails={userdetails?._doc} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
