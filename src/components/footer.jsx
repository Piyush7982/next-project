import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { SparklesCore } from "./ui/sparkels";
import { Facebook, GithubIcon, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" border-t-2 py-4  relative inset-x-0 gap-10 sm:gap-0   bottom-0   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6  w-full  bg-background ">
      <div className="     flex items-center justify-center md:justify-start ml-3 gap-3  md:col-span-2 ">
        <Button
          className="font-bold bg-background text-foreground  "
          variant="outline"
          asChild
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button
          className="font-bold bg-background text-foreground "
          variant="outline"
          asChild
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button
          className="font-bold bg-background text-foreground "
          variant="outline"
          asChild
        >
          <Link href="/login">Login</Link>
        </Button>
      </div>
      <div className=" flex md:justify-start justify-between items-center md:col-start-4  ">
        <h1 className="opacity-60 text-sm sm:mx-0 mx-auto">©Copyright 2024</h1>
      </div>
      <div className=" sm:border-[3px] mr-2  md:col-start-6 hover:cursor-pointer transition-all delay-300 ease-in-out rounded-lg opacity-80  text-foreground gap-3 md:gap-0  flex items-center md:justify-around justify-center md:px-10 ">
        <GithubIcon
          fill="rgb(156 163 175)"
          color="#000000"
          strokeWidth={1}
          className="  text-foreground rounded-md hover:bg-foreground hover:text-background "
          size={30}
        />
        <Linkedin
          fill="rgb(156 163 175)"
          color="#000000"
          strokeWidth={1}
          className="text-foreground rounded-md  hover:bg-foreground hover:text-background "
          size={30}
        />
      </div>
    </footer>
  );
}
