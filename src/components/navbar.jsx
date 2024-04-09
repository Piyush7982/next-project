import Link from "next/link";

import ThemeCustomizer from "./theme/theme-customizer";
import { ThemeToggle } from "./theme/themetoggle";
import { Button } from "./ui/button";
import { SparklesCore } from "./ui/sparkels";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const isLoggedin = Boolean(session);
  const isAdmin = session?.user?.role === "Admin";

  return (
    <div className="min-h-[7vh] border border-b-[1px] px-3 py-1 bg-background z-20   text-foreground w-full sm:sticky  absolute  top-0 left-0 right-0 items-center sm:flex justify-between">
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
      <div className="flex  items-center ml-2">
        <Link href="/" replace={true}>
          <h1 className="text-2xl mx-2 gap-1 px-6"> Logo </h1>
        </Link>
        <Button className="font-bold" size="" variant="ghost">
          Hello
        </Button>
        <Button className="" size="" variant="ghost">
          Hello
        </Button>
      </div>
      <div className="flex items-center mr-2 gap-2 px-6">
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
            <Button className="" size="" variant="ghost">
              Hello
            </Button>
            <Button className="" size="" variant="ghost">
              Hello
            </Button>
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

        <ThemeToggle className=" ml-3 " />
        {/* <ThemeCustomizer /> */}
      </div>
    </div>
  );
}
