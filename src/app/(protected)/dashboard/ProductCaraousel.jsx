import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import profilereplacement from "../../../../public/profilereplacement.jpg";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function ProductCaraousell({ title, role }) {
  return (
    <Card className="border-muted">
      <CardHeader className="flex  flex-row px-7 items-center max-sm:justify-between gap-3">
        <CardTitle className="flex  text-4xl items-center gap-6 ml-2">
          {title}
          {role === "Lender" && (
            <span className="ml-2 ">
              <Link href="/register-item">
                <Button variant="secondary" className=" font-bold">
                  Add Item
                </Button>
              </Link>
              {/* <TriggerButton />{" "} */}
            </span>
          )}
        </CardTitle>
        <Link href="/product/books">
          <Button className="font-bold " variant="secondary">
            See More
          </Button>
        </Link>
      </CardHeader>
      <Carousel className="   rounded-md sm:w-11/12 sm:mx-auto       ">
        <CarouselContent className="-ml-1 mr-1 ">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="  max-sm:w-8/12     max-sm:mx-3 mx-2     lg:basis-[20%]  "
            >
              {/* <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div> */}

              <Link href="/product/storybook  ">
                <Card className="flex-none max-sm:mx-auto max-sm:w-9/12   md:w-60 w-52  shadow-sm  my-4  shadow-muted-foreground h-72 bg-accent hover:shadow-md hover:shadow-muted-foreground   hover:cursor-pointer transition-all duration-200 delay-0  ease-in-out  ">
                  <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
                    <Image
                      src={
                        "https://th.bing.com/th/id/OIP.RYDmKYNwd0vEueh_4VLRdAAAAA?rs=1&pid=ImgDetMain"
                      }
                      className="h-56 rounded-t-lg object-cover"
                      // objectFit="contain"
                      height={224}
                      width={250}
                    />
                    <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
                      <CardTitle className=" w-11/12 capitalize ">
                        The Book
                      </CardTitle>
                      <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
                        The Description{" "}
                      </h1>
                    </div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
          <CarouselItem className="  max-sm:w-8/12     max-sm:ml-3 mx-2     lg:basis-[20%]  ">
            <Link href="/product/books">
              <Card className=" flex flex-col justify-center gap-3  items-center  max-sm:w-9/12 hover:shadow-md hover:shadow-primary hover:cursor-pointer   md:w-60 w-52  shadow-sm  my-4  shadow-muted-foreground h-72 bg-accent     ">
                <ExternalLink className="  rounded-full" size={35} />
                <h1>Browse All</h1>
              </Card>{" "}
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  );
}

// <CardContent className="   flex items-center max-sm:justify-between  space-x-4">
//         {/* <CardContent className=" flex items-center"> */}
//         <ScrollLeft />
//         <div className="w-full overflow-x-scroll pb-3 scrolling-touch scrollbar-hide scroll-m-0  scroll-smooth  flex px-3  space-x-6 ">
//           {title === "Books" && (
//             <>
// <Link href="/product/storybook">
//   <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//     <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//       <Image
//         src={
//           "https://th.bing.com/th/id/OIP.RYDmKYNwd0vEueh_4VLRdAAAAA?rs=1&pid=ImgDetMain"
//         }
//         className="h-56 rounded-t-lg object-cover"
//         // objectFit="contain"
//         height={224}
//         width={250}
//       />
//       <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//         <CardTitle className=" w-11/12 capitalize ">
//           The Book
//         </CardTitle>
//         <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//           The Description{" "}
//         </h1>
//       </div>
//     </div>
//   </Card>
// </Link>

//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th/id/OIP._RRp1wkg0_T38gt4oXAEvQAAAA?w=406&h=609&rs=1&pid=ImgDetMain"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       The Book
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       The Description{" "}
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th/id/OIP.TiQ8qlrFpzf-n7zuy2xJbwHaLP?rs=1&pid=ImgDetMain"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       The Book
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       The Description{" "}
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th/id/R.f130ff77f75101067d9cc5818e307ca7?rik=Fw6L%2bImNwU%2bSaw&riu=http%3a%2f%2ftesseraguild.com%2fwp-content%2fuploads%2f2018%2f06%2fHobbit.jpg&ehk=0xpERpQ3Zvv7CZHZts86OPPva7nqdaM33H9h%2b932pG0%3d&risl=&pid=ImgRaw&r=0"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       The Book
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       The Description{" "}
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th/id/OIP.JhS7t3AY8qGPY8OUsu2j0gAAAA?pid=ImgDet&w=324&h=499&rs=1"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       The Book
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       The Description{" "}
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//             </>
//           )}
//           {title === "Flats/P.G." && (
//             <>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th?id=OIP.-4ZLwzTQcVjm_rnfZS2UegHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       Jain P.G.
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       2 rooms available
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th?id=OIP.7fu8vT2hS5I9SjC547HMqQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       Sunshine P.G.
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       1 rooms available
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th/id/OIP.CxX6EjmUl1Gh8zXHKNs_uAHaFj?w=181&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       Raman P.G.
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       5 rooms available
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th/id/OIP.ZEGXXgPCVH7dX6hKiioJBgHaE8?w=275&h=183&c=7&r=0&o=5&dpr=1.4&pid=1.7"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       Ahuja Flats
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       5 rooms available
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//               <Card className="flex-none   md:w-60 w-52 shadow-md  mb-4  shadow-primary h-72 bg-accent hover:translate-y-2 hover:cursor-pointer transition-all duration-200 delay-100  ease-in-out  ">
//                 <div className="flex flex-col items-center h-full w-full justify-between rounded-md overflow-visible ">
//                   <Image
//                     src={
//                       "https://th.bing.com/th/id/OIP.rOZDLuD-wV1oo8dOLq7pjwHaE7?w=301&h=199&c=7&r=0&o=5&dpr=1.4&pid=1.7"
//                     }
//                     className="h-56 rounded-t-lg object-cover"
//                     // objectFit="contain"
//                     height={224}
//                     width={250}
//                   />
//                   <div className=" flex h-14 px-2  rounded-md w-full py-1   flex-col overflow-clip ">
//                     <CardTitle className=" w-11/12 capitalize ">
//                       Mittal Heights
//                     </CardTitle>
//                     <h1 className="w-10/12 mt-1 overflow-clip font-light text-sm opacity-70 flex">
//                       5 rooms available
//                     </h1>
//                   </div>
//                 </div>
//               </Card>
//             </>
//           )}
//         </div>
//         <ScrollRight />
//         {/* <ChevronRight className="" /> */}
//       </CardContent>
