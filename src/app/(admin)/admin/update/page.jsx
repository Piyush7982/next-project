import { auth } from "@/auth";
import { InputBox } from "./InputBox";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminTable from "./AdminTable";
import RequestTable from "./RequestTable";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import SSRloader from "@/components/SSRLoader";

export default async function TableDemo() {
  const session = await auth();
  const currentUser = session?.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-20 ">
      <div className="container md:w-7/12  flex flex-col items-center px-2 sm:relative sm:bottom-10  ">
        <Tabs defaultValue="adminPanel" className="w-full   ">
          <TabsList>
            <TabsTrigger value="adminPanel">Admin List</TabsTrigger>
            <TabsTrigger value="pendingRequest">Pending Requests</TabsTrigger>
            <TabsTrigger value="promote">Promote User</TabsTrigger>
          </TabsList>
          <Suspense fallback={<SSRloader />}>
            <TabsContent value="adminPanel">
              <AdminTable />
            </TabsContent>
            <TabsContent value="pendingRequest">
              <RequestTable />{" "}
            </TabsContent>
            <TabsContent value="promote">
              <Card className="container">
                <InputBox className="border" />
              </Card>
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
    </div>
  );
}
