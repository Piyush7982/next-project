import ThemeCustomizer from "./theme/theme-customizer";
import { ThemeToggle } from "./theme/themetoggle";
import { Button } from "./ui/button";
import { SparklesCore } from "./ui/sparkels";

export default function Navbar() {
  return (
    <div className="min-h-[7vh] border border-b-[1px] px-3 py-1 bg-background z-10   text-foreground w-full sm:sticky  absolute  top-0 left-0 right-0 items-center sm:flex justify-between">
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
        <h1 className="text-2xl mx-2 gap-1 px-6"> Logo </h1>
        <Button className="font-bold" size="" variant="ghost">
          Hello
        </Button>
        <Button className="" size="" variant="ghost">
          Hello
        </Button>
      </div>
      <div className="flex items-center mr-2 gap-2 px-6">
        <Button className="" size="" variant="ghost">
          Hello
        </Button>
        <Button className="" size="" variant="ghost">
          Hello
        </Button>
        <Button className="" size="" variant="secondary">
          Signup
        </Button>
        <Button className="" size="" variant="">
          Login
        </Button>
        <ThemeToggle className=" ml-3 " />
        {/* <ThemeCustomizer /> */}
      </div>
    </div>
  );
}
