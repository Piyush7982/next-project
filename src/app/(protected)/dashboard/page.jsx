import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import profilereplacement from "../../../../public/profilereplacement.jpg";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductCaraousel from "./ProductCaraousel";
import SellerPurchaseRequest from "./SellerPurchaseRequest";
import BorrowerPurchaseRequests from "./BorrowerPurchaseRequests";
export default async function Page() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const username = session?.user?.username;
  const role = session?.user?.role === "Buyer" ? "Borrower" : "Lender";
  const isRegistered =
    session?.user?.registrationCompleted === "false" ? false : true;
  const userId = session?.user?.id;
  // console.log(userId);
  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-10">
      {/* {JSON.stringify(session)} */}
      <div className="container flex flex-col  items-center gap-5">
        {/* <div className="border fixed bottom-5 right-5 p-4 z-[1  ]">hello</div> */}
        {/* {role === "Lender" && (
          <div className="hidden">
            <SellerAddItem />
          </div>
        )} */}
        <div className="w-full grid md:grid-cols-8 grid-cols-1 md:gap-4 gap-10">
          <Card className="  bg-accent md:h-40 md:col-span-3    md:mb-10 max-sm:h-[10rem]   flex max-sm:flex-col  justify-around">
            <div className="  md:flex md:flex-col md:justify-center">
              {" "}
              <CardHeader>
                {/* <CardHeader className=" flex-row items-center justify-between"> */}
                <CardTitle>Welcome {username}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>You are signed in as a {role} </p>
              </CardContent>
            </div>
            <Image
              src={profilereplacement}
              alt="image"
              className=" w-2/6 invisible md:visible object-cover rounded-md opacity-85 my-2"
            />
          </Card>
          <Card className=" border-none shadow-none  md:min-h-40  md:mb-10  flex flex-col items-center md:col-start-6 md:col-span-3 ">
            {/* {<SellerPurchaseRequest/>} */}
            {role === "Lender" && <SellerPurchaseRequest userId={userId} />}
            {role === "Borrower" && (
              <BorrowerPurchaseRequests userId={userId} />
            )}
          </Card>
        </div>
      </div>

      <div className="container flex flex-col gap-16">
        <ProductCaraousel role={role} title="Books" />
        <ProductCaraousel role={role} title="Flats/P.G." />
      </div>
    </div>
  );
}
