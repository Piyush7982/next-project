import * as React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";
import Link from "next/link";

export default function MobileHamburger({ isAdmin, isLoggedin }) {
  return (
    <div className="sm:hidden ml-4 mr-1 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <HamburgerMenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 mt-1 flex flex-col space-y-1 items-center    ">
          {isAdmin && (
            <>
              <Link href="/admin/update">
                <Button className="" size="" variant="secondary">
                  Admin Duties{" "}
                </Button>
              </Link>
            </>
          )}
          {!isAdmin && isLoggedin && (
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
                <Button className="" size="" variant="ghost">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
