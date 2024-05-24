import { fetchBooks } from "@/actions/items.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IndianRupee, ListTodo } from "lucide-react";
import { revalidatePath } from "next/cache";
import PaginationDiv from "./pagination";
import { connecToDb } from "@/lib/connectToDb";
import { Stationary } from "@/lib/models/stationary.schema";

// async function addBooks() {
//   "use server";
//   try {
//     connecToDb();
//     for (let i = 1; i < 30; i++) {
// await Stationary.create({
//   name: "random",
//   description: "description sdfjkhsdf",
//   recommendedFor: "no one ",
//   tags: ["tag1", "tag2"],
//   lender: "65fee6fbd151da7641d0b017",
//   price: "30" + i,
// });
// await Stationary.deleteMany({
//   name: "fsd",
// });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// await addBooks();

export default async function Books(props) {
  revalidatePath("/");
  const { searchParams } = props;
  const page = searchParams.page ? searchParams.page : 1;
  const limit = 12;
  const data = await fetchBooks(page, limit);
  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-5 ">
      <div className="container flex flex-col gap-5  ">
        <h1 className="font-bold md:text-4xl text-2xl  ">
          {" "}
          Browser All Books{" "}
        </h1>
        <div className="grid grid-cols-12 gap-5 ">
          {data &&
            data.map((book) => {
              return (
                <Card
                  key={book?.id}
                  className="sm:h-64 h-52 bg-secondary  md:col-span-3 col-span-6 flex flex-col items-center transition-all duration-300 delay-0 hover:cursor-pointer  ease-in-out hover:scale-105"
                >
                  <div className="w-full h-4/6 bg-destructive rounded-t-md  overflow-visible"></div>
                  <CardFooter className="flex h-2/6 flex-col items-start space-y-2 p-0 pt-3   w-full overflow-clip pl-2 mb-1 ">
                    <CardTitle className=" max-sm:text-xl   overflow-clip  max-sm:w-11/12 flex sm:h-7   capitalize mr-2 ">
                      titolefsddsfds fgsdhbfdsbhsd nmfgsdfi
                    </CardTitle>
                    <div className="  overflow-clip w-10/12 flex items-center justify-start gap-7 text-muted-foreground   h-11 max-sm:hidden text-sm font-bold  ">
                      <div className="flex items-center gap-1">
                        <IndianRupee size={17} />
                        {book?.price}
                      </div>
                      <div className="flex items-center gap-1">
                        <ListTodo size={20} /> Education
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
      <PaginationDiv currentPage={page} />
    </div>
  );
}
