import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";

import Image from "next/image";
import { ClientItemRequest } from "./clientcomponents";
import { fetchProductPage } from "@/actions/items.actions";
import { notFound, redirect } from "next/navigation";

export default async function ProductPage(props) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  const user = session?.user;
  // if (user?.registrationCompleted === "false") {
  //   redirect("/profile");
  // }
  const { searchParams } = props;
  const data = await fetchProductPage(searchParams?.type, searchParams?.id);
  if (!data) {
    notFound();
  }
  const role = session?.user?.role === "Buyer" ? "Borrower" : "Lender";

  return (
    <div className="min-h-screen flex flex-col  items-center   space-y-24 sm:pt-20 pt-24 mb-10">
      <Card className="container  border-0 shadow-none md:py-4   ">
        <div className="grid  md:grid-cols-12 grid-cols-1 gap-2 max-sm:gap-8    ">
          {/* <div className="flex items-center justify-center min-h-96 gap-3"> */}
          <Image
            className="bg-white h-80  shadow-primary shadow-md     rounded-md md:col-span-3 col-span-1 md:col-start-1 "
            src={
              data?.image
                ? data.image
                : "https://th.bing.com/th/id/OIP.RYDmKYNwd0vEueh_4VLRdAAAAA?rs=1&pid=ImgDetMain"
            }
            alt="image"
            height={400}
            width={440}
          />

          <div className="flex flex-col md:-ml-4     min-h-80  md:col-span-9 col-span-1 md:col-start-4 md:pl-16 pt-1 sm:gap-5 max-sm:gap-9 ">
            <div className="font-bold text-5xl capitalize">{data?.name}</div>
            <div className="font-medium text-muted-foreground max-sm:-mt-7 -mt-4 opacity-90">
              {data?.tags &&
                data?.tags.map((tag) => {
                  return tag + " ";
                })}
              {!data?.tags && <>#story,#adventure,#tale,#jeanlumier</>}
            </div>
            {searchParams?.type === "Flat" && (
              <div className="container mx-0 px-0 min-h-10 max-h-32 break-words capitalize">
                {" "}
                <span className="font-bold text-xl ">Location :</span>{" "}
                {data?.location}
              </div>
            )}
            {searchParams?.type === "Stationary" && (
              <div className="container mx-0 px-0  min-h-10 max-h-32 break-words capitalize">
                {" "}
                <span className="font-bold text-xl ">
                  Recommended For :
                </span>{" "}
                {data?.recommendedFor}
              </div>
            )}
            <div className="py-7  flex flex-col  gap-2">
              <h1 className="text-2xl font-bold ">
                ${data?.price}{" "}
                <span className="font-light text-sm"> per item</span>{" "}
              </h1>
              {role === "Borrower" && (
                <div className="text-xl max-sm:mt-4 font-bold">
                  Request to buy:{" "}
                  <span>
                    <ClientItemRequest
                      userId={session?.user?.id + ""}
                      itemId={data?._id + ""}
                      type={
                        searchParams?.type === "Flat" ? "Flats" : "stationaries"
                      }
                    />
                  </span>
                </div>
              )}
              {role === "Lender" && (
                <div className="text-red-500 pt-3 opacity-90 ">
                  {" "}
                  You are not allowed to purchase
                </div>
              )}
            </div>
            {/* <div className="text-xl font-medium">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates, quo delectus! Ipsam obcaecati necessitatibus officia
                optio laudantium iure reiciendis sed similique sunt. Illum, odit.
                Saepe commodi blanditiis, repellat facere doloremque quis
                inventore accusamus assumenda qui? Tempore ratione impedit fugiat
                exercitationem.
              </div> */}
          </div>
        </div>
        <div className="pt-7 flex flex-col gap-2   min-h-56 break-words">
          <h1 className="font-bold text-3xl tracking-wide ">Description :</h1>
          <div className="font-light  px-1       w-full break-words capitalize  ">
            {/* “The Little Story Book” by Jean Lumier is a captivating collection
            of adventurous tales designed to ignite the imagination of young
            readers. Each story is a journey into a world of excitement and
            wonder, where children can explore, learn, and grow. The book is
            filled with vibrant characters, thrilling plots, and valuable life
            lessons. From daring quests in enchanted forests to exciting voyages
            across the seven seas, Lumier’s stories are not just entertaining,
            but also foster creativity, courage, and curiosity. Lumier’s unique
            storytelling style is engaging and easy to understand, making it
            perfect for children. The stories are short enough to keep a child’s
            attention, yet rich enough to be enjoyed over and over again. */}
            {data?.description}
          </div>
        </div>
      </Card>
    </div>
  );
}
