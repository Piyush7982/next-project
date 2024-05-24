import Link from "next/link";

import ThemeCustomizer from "./theme/theme-customizer";
import { ThemeToggle } from "./theme/themetoggle";
import { Button } from "./ui/button";
import { SparklesCore } from "./ui/sparkels";
import { auth, signOut } from "@/auth";
import { DropdownMenuRadioGroupDemo } from "./PendingRequest";
import MobileHamburger from "./MobileHamburger";

export default async function Navbar() {
  const session = await auth();
  const isLoggedin = Boolean(session);
  const isAdmin = session?.user?.role === "Admin";
  const role = session?.user?.role === "Buyer" ? "Borrower" : "Lender";

  return (
    <div className="md:min-h-[7vh] min-h-8 border border-b-[1px]   py-1 bg-background z-20   text-foreground w-full sm:sticky  absolute  top-0 left-0 right-0 items-center sm:flex justify-between">
      <div className="w-full absolute inset-0 h-full -z-10  ">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={200}
          className="w-full h-full  "
          particleColor={"#ffffff"}
        />
      </div>
      <div className="flex  items-center max-sm:justify-between ml-2">
        <Link href="/" replace={true}>
          <h1 className="text-2xl mx-2  px-6 font-bold "> EduStation </h1>
        </Link>
        {/* <Button className="font-bold" size="" variant="ghost">
          Hello
        </Button> */}

        {/* {role === "Borrower" && isLoggedin && (
          <DropdownMenuRadioGroupDemo role="Borrower" />
        )}
        {role === "Lender" && isLoggedin && (
          <DropdownMenuRadioGroupDemo role="Lender" />
        )} */}
        <ThemeToggle className=" ml-3 " />
        <MobileHamburger isAdmin={isAdmin} isLoggedin={isLoggedin} />
      </div>

      <div className="flex items-center mr-2 gap-2 px-6 max-sm:hidden">
        {isAdmin && (
          <>
            <Link href="/admin/update">
              <Button className="" size="" variant="secondary">
                Admin Duties{" "}
              </Button>
            </Link>
          </>
        )}
        {!isAdmin && (
          <>
            <Link href="/profile">
              <Button className="" size="" variant="ghost">
                Profile
              </Button>
            </Link>
            <Link replace={true} href="/dashboard">
              <Button className="" size="" variant="ghost">
                Dashboard
              </Button>
            </Link>
          </>
        )}
        {!isLoggedin && (
          <>
            <Link href="/signup">
              <Button className="" size="" variant="secondary">
                Signup
              </Button>
            </Link>
            <Link href="/login">
              <Button className="" size="" variant="">
                Login
              </Button>
            </Link>
          </>
        )}
        {isLoggedin && (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button className="" size="" variant="">
              Logout
            </Button>
          </form>
        )}

        {/* <ThemeCustomizer /> */}
      </div>
    </div>
  );
}
