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
  // console.log(session?.user);
  const username = session?.user?.username;
  const role = session?.user?.role === "Buyer" ? "Borrower" : "Lender";
  const isRegistered =
    session?.user?.registrationCompleted === "false" ? false : true;
  const userId = session?.user?.id;

  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-10">
      {/* {JSON.stringify(session)} */}
      <div className="container flex flex-col  items-center gap-5">
        <div className="w-full grid md:grid-cols-8 grid-cols-1 md:gap-4 gap-10">
          <Card className="md:border-0  shadow-none  md:h-40   md:col-span-3 max-sm:items-center    md:mb-10 max-sm:h-[10rem]   flex max-sm:flex-col ">
            <div className=" md:items-start   md:flex  md:flex-col sm:w-[60%] w-full ">
              {" "}
              <CardHeader className="sm:w-full   ">
                <CardTitle className="break-words sm:w-full">
                  Welcome {username}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>You are signed in as a {role}. </p>
                {isRegistered && (
                  <p>
                    Location :{" "}
                    <span className="font-bold ">
                      {session?.user?.college}{" "}
                    </span>
                  </p>
                )}
              </CardContent>
            </div>
            <Image
              src={profilereplacement}
              alt="image"
              priority
              className=" w-[40%] max-sm:hidden  object-cover rounded-md opacity-85 my-2"
            />
          </Card>
          {!isRegistered && (
            <Card className="md:min-h-40 h-24 max-sm:text-center  md:mb-10 items-center justify-center  flex flex-col  md:col-start-6 md:col-span-3">
              Profile Incomplete ! Complete profile registration first{" "}
              <Link
                href="/profile"
                className="text-sm font-semibold hover:underline transition-all duration-100 text-blue-600 text-start"
              >
                {" "}
                click here
              </Link>
            </Card>
          )}

          {isRegistered && (
            <Card className=" border-none shadow-none  md:min-h-40  md:mb-10  flex flex-col items-center md:col-start-6 md:col-span-3 ">
              {/* {<SellerPurchaseRequest/>} */}
              {role === "Lender" && <SellerPurchaseRequest userId={userId} />}
              {role === "Borrower" && (
                <BorrowerPurchaseRequests userId={userId} />
              )}
            </Card>
          )}
        </div>
      </div>

      <div className="container flex flex-col gap-16">
        <ProductCaraousel
          model="Stationary"
          role={role}
          title="Books"
          isRegistered={isRegistered}
        />
        <ProductCaraousel
          model="Flat"
          role={role}
          title="Flats/P.G."
          isRegistered={isRegistered}
        />
      </div>
    </div>
  );
}
