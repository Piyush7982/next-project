import { auth } from "@/auth";
import { InputBox } from "./InputBox";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminTable from "./AdminTable";
import RequestTable from "./RequestTable";

export default async function TableDemo() {
  const session = await auth();
  const currentUser = session?.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="container md:w-7/12  flex flex-col items-center  gap-10">
        <Card className="container">
          <InputBox className="border" />
        </Card>
        <Tabs defaultValue="adminPanel" className="w-full ">
          <TabsList>
            <TabsTrigger value="adminPanel">Admin List</TabsTrigger>
            <TabsTrigger value="pendingRequest">Pending Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="adminPanel">
            <AdminTable />
          </TabsContent>
          <TabsContent value="pendingRequest">
            <RequestTable />{" "}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
