import Mainbody from "@/components/main/body";
import Herosection from "@/components/main/herosection";

export default async function Home() {
  return (
    <div className="flex flex-col items-center  justify-evenly space-y-24 sm:pt-20 pt-40 mb-10 ">
      <Herosection />
      <Mainbody />
    </div>
  );
}
