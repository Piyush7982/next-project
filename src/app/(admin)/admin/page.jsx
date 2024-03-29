import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MousePointerSquare } from "lucide-react";
function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center   space-y-24 sm:pt-20 pt-40 mb-10">
      <div className="container flex flex-col  gap-10 md:gap-20 ">
        <div className="w-full grid md:grid-cols-8 grid-cols-1 gap-4">
          <Card className=" bg-accent md:h-40 md:col-span-3   md:mb-10  flex flex-col justify-around">
            <CardHeader>
              <CardTitle>Welcome Admin</CardTitle>
            </CardHeader>

            {/* </div> */}
            <CardContent>
              <p>You are an Admin and can perform admin permitted duty.</p>
            </CardContent>
          </Card>
          <Card className=" bg-accent md:min-h-40  md:mb-10  flex flex-col justify-around md:col-start-5 md:col-span-3 ">
            <CardHeader>
              <CardTitle>Your Credentials</CardTitle>
            </CardHeader>

            {/* </div> */}
            <CardContent>
              <div className="w-full flex flex-col items-center ">
                <div className="flex  justify-between w-11/12 md:w-9/12">
                  <h1 className="font-medium ">Username:</h1>
                  <h1 className="text-md font-light opacity-90">iamadmin3</h1>
                </div>
                <div className="flex  justify-between w-11/12 md:w-9/12">
                  <h1 className="font-medium ">Email:</h1>
                  <h1 className="text-md font-light opacity-90">
                    admin@admin.admin
                  </h1>
                </div>
                <div className="flex  justify-between w-11/12 md:w-9/12">
                  <h1 className="font-medium ">Pending Approvals:</h1>
                  <h1 className="text-md font-light opacity-90">10</h1>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-accent flex flex-col  container md:w-4/6 py-5 md:gap-4">
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
        </Card>
        <Card className="bg-accent flex flex-col  container md:w-4/6 py-5 md:gap-7 ">
          <CardHeader>
            <CardTitle className="font-bold md:text-3xl mb-3">
              The Avengers Initiative: Admin Code of Conduct
            </CardTitle>
            <CardDescription>
              Just as the Avengers are entrusted with the power to protect the
              universe, you, as an admin, are entrusted with the power to
              maintain the balance of this website. With great power comes great
              responsibility.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col ">
            <CardTitle className="mb-2">
              1. The Power of Thor's Hammer: Admin Rights
            </CardTitle>
            <CardDescription className="mb-6">
              You wield the power of Mjolnir, Thor's hammer. You can grant admin
              rights, demote admins to regular users, or ban users. But
              remember, "Whosoever holds this hammer, if he be worthy, shall
              possess the power of Thor." Use your powers wisely and justly.
            </CardDescription>

            <CardTitle className="mb-2">
              2. The Wisdom of Vision: Fair Judgment
            </CardTitle>
            <CardDescription className="mb-6">
              Vision was created for the betterment of the universe. As an
              admin, you are expected to approve pending requests that require
              admin verification. Use the Mind Stone's wisdom to make fair and
              unbiased decisions.
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
              Remember Peter Parker's lesson: "With great power comes great
              responsibility." Do not misuse your admin powers for personal gain
              or amusement.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
