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
import { notFound, redirect } from "next/navigation";
import { modifyDate } from "@/lib/helper/dataModifier";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";

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
  const session = await auth();
  const user = session?.user;
  // if (user?.registrationCompleted === "false") {
  //   redirect("/profile");
  // }
  const { searchParams } = props;
  const { params } = props;
  if (params.productType !== "flat" && params.productType !== "stationary") {
    notFound();
  }
  const page = searchParams.page ? searchParams.page : 1;
  const limit = 12;
  const data = await fetchBooks(page, limit, params.productType);
  if (data?.length == 0) {
    notFound();
  }
  return (
    <div className="min-h-screen  flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-5 ">
      <div className="container flex flex-col gap-5  ">
        <h1 className="font-bold md:text-4xl text-2xl  ">
          {" "}
          Browser All {params.productType === "flat"
            ? "Flats"
            : "Stationary"}{" "}
          <span className="text-sm font-normal ">
            (results showing for
            {<span className="font-bold"> {user?.college}</span>})
          </span>
        </h1>
        <div className="grid grid-cols-12 gap-5 ">
          {data &&
            data.map((book) => {
              return (
                <div key={book?.id} className=" md:col-span-3 col-span-6">
                  <Link
                    href={`/search/?type=${
                      params.productType === "flat" ? "Flat" : "Stationary"
                    }&name=${book?.name}&id=${book?._id}`}
                  >
                    <Card className="sm:h-72 h-52 bg-secondary mx-1  flex flex-col items-center transition-all duration-300 delay-0 hover:cursor-pointer  ease-in-out hover:scale-105">
                      {/* <div className="w-full h-4/6 bg-destructive rounded-t-md  overflow-visible"></div> */}
                      <Image
                        src={
                          book?.image
                            ? book.image
                            : "https://th.bing.com/th/id/OIP.RYDmKYNwd0vEueh_4VLRdAAAAA?rs=1&pid=ImgDetMain"
                        }
                        className=" h-[88%]  pb-0 rounded-t-lg object-cover "
                        // objectFit="contain"
                        height={60}
                        width={320}
                        alt="product"
                        priority="false"
                      />
                      <CardFooter className="flex h-[12%]  items-center justify-between m-0 p-0 sm:pl-5      w-full overflow-clip pl-2  ">
                        <CardTitle className=" text-xl sm:text-2xl   text-accent-foreground w-9/12   overflow-clip  max-sm:w-11/12 flex    capitalize mr-2 ">
                          {book?.name}
                        </CardTitle>

                        <div className="flex max-sm:hidden items-center text-sm font-semibold text-muted-foreground gap-1 w-3/12">
                          <IndianRupee size={17} />
                          {book?.price}
                        </div>
                        {/* <div className="flex items-center gap-1">
                            <ListTodo size={20} /> {modifyDate(book?.createdAt)}
                          </div> */}
                      </CardFooter>
                      {/* <CardFooter className="flex h-[18%] flex-col items-start p-0 sm:pl-5     w-full overflow-clip pl-2 sm:mb-1 ">
                        <CardTitle className=" text-xl  text-accent-foreground   overflow-clip  max-sm:w-11/12 flex    capitalize mr-2 ">
                          {book?.name}
                        </CardTitle>
                        <div className="  overflow-clip w-10/12 flex items-center justify-start gap-7 text-muted-foreground    max-sm:hidden text-xs font-bold  ">
                          <div className="flex items-center gap-1">
                            <IndianRupee size={17} />
                            {book?.price}
                          </div>
                          <div className="flex items-center gap-1">
                            <ListTodo size={20} /> {modifyDate(book?.createdAt)}
                          </div>
                        </div>
                      </CardFooter> */}
                    </Card>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <PaginationDiv currentPage={page} type={params.productType} />
    </div>
  );
}
