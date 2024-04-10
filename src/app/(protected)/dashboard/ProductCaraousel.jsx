import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollRight, ScrollLeft } from "./ScrollButton";
import profilereplacement from "../../../../public/profilereplacement.jpg";
import Image from "next/image";

export default function ProductCaraousel({ title }) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="   flex items-center max-sm:justify-between  space-x-4">
        {/* <CardContent className=" flex items-center"> */}
        <ScrollLeft />
        <div className="w-full overflow-x-scroll pb-3 scrolling-touch scrollbar-hide scroll-m-0  scroll-smooth  flex px-3  space-x-6 ">
          <Card className="flex-none md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent  ">
            <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible">
              <Image
                src={profilereplacement}
                className="h-56 rounded-t-lg object-cover"
              />
              <div className="h-14 flex px-2 justify-start rounded-md ">
                <CardDescription>
                  description of card ffsadsadsadsadsdas
                </CardDescription>
              </div>
            </div>
          </Card>
          <Card className="flex-none md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent  ">
            <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible">
              <Image
                src={profilereplacement}
                className="h-56 rounded-t-lg object-cover"
              />
              <div className="h-14 flex px-2 justify-start rounded-md ">
                <CardDescription>
                  description of card ffsadsadsadsadsdas
                </CardDescription>
              </div>
            </div>
          </Card>
          <Card className="flex-none md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent  ">
            <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible">
              <Image
                src={profilereplacement}
                className="h-56 rounded-t-lg object-cover"
              />
              <div className="h-14 flex px-2 justify-start rounded-md ">
                <CardDescription>
                  description of card ffsadsadsadsadsdas
                </CardDescription>
              </div>
            </div>
          </Card>
          <Card className="flex-none md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent  ">
            <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible">
              <Image
                src={profilereplacement}
                className="h-56 rounded-t-lg object-cover"
              />
              <div className="h-14 flex px-2 justify-start rounded-md ">
                <CardDescription>
                  description of card ffsadsadsadsadsdas
                </CardDescription>
              </div>
            </div>
          </Card>

          {/* <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card> */}
          {/* <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card>
          <Card className="flex-none w-60 h-72 bg-accent ">f</Card> */}
        </div>
        <ScrollRight />
        {/* <ChevronRight className="" /> */}
      </CardContent>
    </Card>
  );
}
