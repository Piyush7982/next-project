import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BooksForm from "./booksForm";
import FlatForm from "./flatForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RegisterProduct() {
  const session = await auth();
  const user = session?.user;
  // if (user?.registrationCompleted === "false") {
  //   redirect("/profile");
  // }
  if (user?.role !== "Seller") {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-5 ">
      <div className="container  md:w-7/12 flex flex-col items-center  gap-5 ">
        <div className="flex items-center justify-start font-bold text-4xl mb-3">
          Register Item
        </div>
        <Tabs defaultValue="stationary" className="sm:w-9/12 w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stationary">Stationary</TabsTrigger>
            <TabsTrigger value="flats">Flats</TabsTrigger>
          </TabsList>
          <TabsContent value="stationary">
            <BooksForm />
          </TabsContent>
          <TabsContent value="flats">
            <FlatForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
