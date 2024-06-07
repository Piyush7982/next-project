import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { MousePointerSquare } from "lucide-react";
import avenger from "../../../../public/avenger.jpg";
import superman from "../../../../public/superman.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { fetchAdminDetails } from "@/actions/admin.actions";
async function Page() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const id = session?.user?.id;
  const data = await fetchAdminDetails(id);

  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-10">
      <div className="container flex flex-col  gap-10 md:gap-20 ">
        <div className="w-full grid md:grid-cols-8 grid-cols-1 gap-4">
          <Card className=" relative border-0 shadow-none md:h-40 md:col-span-3    md:mb-10  flex flex-col justify-around">
            <div className="relative z-10 text-primary">
              {" "}
              <CardHeader>
                {/* <CardHeader className=" flex-row items-center justify-between"> */}
                <CardTitle className="text-3xl">Welcome Admin</CardTitle>
                {/* <Image src={avenger} /> */}
              </CardHeader>
              <CardContent>
                <p>You are an Admin and can perform admin permitted duty.</p>
              </CardContent>
            </div>
          </Card>
          <Card className="relative  md:min-h-40  md:mb-10  flex flex-col justify-around md:col-start-5 md:col-span-3 ">
            <div className="relative z-10  ">
              <CardHeader>
                <CardTitle>Your Credentials</CardTitle>
              </CardHeader>

              {/* </div> */}
              <CardContent className="">
                <div className="w-full flex flex-col items-center ">
                  <div className="flex  justify-between w-11/12 md:w-9/12">
                    <h1 className="font-medium">Username:</h1>
                    <h1 className=" text-md">{data?.username}</h1>
                  </div>
                  <div className="flex  justify-between w-11/12 md:w-9/12">
                    <h1 className="font-medium ">Email:</h1>
                    <h1 className="text-md  ">{data?.email}</h1>
                  </div>
                  <div className="flex  justify-between w-11/12 md:w-9/12">
                    <h1 className="font-medium ">Pending Approvals:</h1>
                    <h1 className="text-md  ">10</h1>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
        <Card className="bg-accent relative flex flex-col  container md:w-4/6 py-5 md:gap-4">
          <Image
            src={superman}
            objectFit="cover"
            fill={true}
            className="  opacity-40 "
            alt="cover"
          />
          <div className="z-10 relative text-primary">
            <CardHeader>
              <CardTitle className="font-bold md:text-3xl">
                Your Responsiblities
              </CardTitle>
            </CardHeader>
            <CardContent className="md:text-lg  flex flex-col items-start gap-5 md:pl-16 ">
              <p className="flex items-center gap-4 ">
                {" "}
                <span>
                  <MousePointerSquare size={20} className="opacity-80" />
                </span>{" "}
                You are authorized to promote/demote an individual as an
                Admin/User.
              </p>
              <p className="flex items-center gap-4">
                {" "}
                <span>
                  <MousePointerSquare size={20} className="opacity-80" />
                </span>{" "}
                You have authority to approve/decline user requests that are
                needed to be verified by an admin .
              </p>
              <p className="flex items-center gap-4">
                {" "}
                <span>
                  <MousePointerSquare size={20} className="opacity-80" />
                </span>{" "}
                You have authority to remove/ban inappropriate content.
              </p>
            </CardContent>
          </div>
        </Card>
        {/* <Image src={avenger} /> */}
        <Card className="relative bg-accent flex flex-col  container md:w-4/6 py-5 md:gap-7 ">
          <Image
            src={avenger}
            objectFit="cover"
            fill={true}
            alt="cover"
            // className="  invisible dark:visible dark:opacity-30 "
            className=" backdrop-brightness-50 dark:brightness-100 opacity-30 "
          />
          <div className="z-10 relative ">
            <CardHeader>
              <CardTitle className="font-bold md:text-3xl mb-3">
                The Avengers Initiative: Admin Code of Conduct
              </CardTitle>
              <CardDescription>
                Just as the Avengers are entrusted with the power to protect the
                universe, you, as an admin, are entrusted with the power to
                maintain the balance of this website. With great power comes
                great responsibility.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col relative ">
              {" "}
              <CardTitle className="mb-2">
                1. The Power of Thor&apos;s Hammer: Admin Rights
              </CardTitle>
              <CardDescription className="mb-6 ">
                You wield the power of Mjolnir, Thor&apos;s hammer. You can
                grant admin rights, demote admins to regular users, or ban
                users. But remember, &quot;Whosoever holds this hammer, if he be
                worthy, shall possess the power of Thor.&quot; Use your powers
                wisely and justly.
              </CardDescription>
              <CardTitle className="mb-2">
                2. The Wisdom of Vision: Fair Judgment
              </CardTitle>
              <CardDescription className="mb-6">
                Vision was created for the betterment of the universe. As an
                admin, you are expected to approve pending requests that require
                admin verification. Use the Mind Stone&apos;s wisdom to make
                fair and unbiased decisions.
              </CardDescription>
              <CardTitle className="mb-2">
                3. The Tenacity of Captain America: Respect and Dignity
              </CardTitle>
              <CardDescription className="mb-6">
                Captain America stands for respect and dignity. Treat all users
                with the same respect and dignity that Steve Rogers shows to
                everyone, regardless of their status on the website.
              </CardDescription>
              <CardTitle className="mb-2">
                4. The Responsibility of Spider-Man: No Misuse of Power
              </CardTitle>
              <CardDescription className="mb-6">
                Remember Peter Parker&apos;s lesson: &quot;With great power
                comes great responsibility.&quot; Do not misuse your admin
                powers for personal gain or amusement.
              </CardDescription>
            </CardContent>
            {/* <CardFooter> */}
            <div className="flex items-center justify-center">
              <Link href="/admin/update">
                <Button>Avengers Assemble</Button>
              </Link>
            </div>
            {/* </CardFooter> */}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;
