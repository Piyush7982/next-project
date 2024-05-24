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

export default async function ProductPage({ params }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const role = session?.user?.role === "Buyer" ? "Borrower" : "Lender";
  //   return <div>{params.productid}</div>;
  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-10">
      <Card className="container bg-secondary py-4 ">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-2   ">
          {/* <div className="flex items-center justify-center min-h-96 gap-3"> */}
          <Image
            className="bg-white h-96    rounded-md md:col-span-3 col-span-1 md:col-start-1 "
            src={
              "https://th.bing.com/th/id/OIP.RYDmKYNwd0vEueh_4VLRdAAAAA?rs=1&pid=ImgDetMain"
            }
            alt="image"
            height={400}
            width={440}
          />

          <div className="flex flex-col -ml-4    min-h-80  md:col-span-9 col-span-1 col-start-4 pl-16 pt-1 gap-4 ">
            <div className="font-bold text-5xl">Story Book</div>
            <div className="font-medium text-muted-foreground opacity-90">
              #story,#adventure,#tale,#jeanlumier
            </div>
            <div className="container mx-0 px-0  h-32">
              {" "}
              <span className="font-bold text-xl">Recommended For : </span> “The
              Little Story Book” by Jean Lumier is an excellent choice for
              children aged 5 to 12 years. Its simple language, engaging
              narratives, and vibrant characters make it accessible and
              enjoyable for young readers. The book is also perfect for parents
              and educators who want to introduce children to the joy of
              reading. The stories are not only entertaining but also instill
              important values and lessons, making it a great tool for teaching
              and learning. Moreover, it’s a wonderful pick for those who love
              adventure and fantasy. The thrilling quests and magical elements
              in the stories will surely captivate the hearts of young
              adventurers and dreamers.
            </div>
            <div className="py-7 flex flex-col  gap-2">
              <h1 className="text-2xl font-bold ">
                $30 <span className="font-light text-sm"> per item</span>{" "}
              </h1>
              {role === "Borrower" && (
                <div className="text-xl font-bold">
                  Request to buy:{" "}
                  <span>
                    <ClientItemRequest
                      userId={session?.user?.id}
                      itemId="664b288faa2b65f48990af42"
                      itemQuery="storybook"
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
        <div className="pt-7 flex flex-col gap-2   min-h-56">
          <h1 className="font-bold text-3xl tracking-wide">Description</h1>
          <div className="font-light">
            “The Little Story Book” by Jean Lumier is a captivating collection
            of adventurous tales designed to ignite the imagination of young
            readers. Each story is a journey into a world of excitement and
            wonder, where children can explore, learn, and grow. The book is
            filled with vibrant characters, thrilling plots, and valuable life
            lessons. From daring quests in enchanted forests to exciting voyages
            across the seven seas, Lumier’s stories are not just entertaining,
            but also foster creativity, courage, and curiosity. Lumier’s unique
            storytelling style is engaging and easy to understand, making it
            perfect for children. The stories are short enough to keep a child’s
            attention, yet rich enough to be enjoyed over and over again.
          </div>
        </div>
      </Card>
    </div>
  );
}
