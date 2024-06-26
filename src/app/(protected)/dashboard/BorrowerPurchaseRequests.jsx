import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { fetchBorrowRequests } from "@/actions/borrower.actions";

export default async function BorrowerPurchaseRequests({ userId }) {
  const requests = await fetchBorrowRequests(userId);
  // console.log(requests);
  // console.log(requests);
  return (
    <div className="flex flex-col  items-center  w-full">
      <div className="flex items-start w-9/12">
        <h4 className="mb-4 text-2xl font-bold leading-none ">
          Borrow Requests{" "}
          <span className="ml-2 font-light text-sm max-sm:hidden">
            ({requests?.length})
          </span>
        </h4>
      </div>

      <ScrollArea className="md:h-44  h-40  md:w-9/12 w-10/12 rounded-md border shadow ">
        <div className="py-2 pt-4  flex flex-col items-center my-auto ">
          {requests.length > 0 &&
            requests.map((request) => {
              return (
                <div className="w-full my-1 " key={request?._id}>
                  <div className="flex   flex-row justify-between  mx-auto md:px-8 px-3 py-1 items-center hover:bg-accent  transition-all delay-0 duration-200 ease-in-out">
                    <div className="font-semibold  tracking-wide text-sm capitalize overflow-clip  ">
                      {request?.Model?.name}
                      {/* sajbdkjsandjksandjksandkjsnjk */}
                    </div>
                    <div className="flex  flex-row gap-1">
                      <Badge
                        variant={
                          request?.approvalStatus === "Declined"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {request?.approvalStatus}
                      </Badge>
                    </div>
                  </div>
                  <Separator className=" w-full" />
                </div>
              );
            })}

          {requests.length == 0 && (
            <div className="  text-start font-light pl-3 mt-6 ">
              All customer borrow request will be shown here. Currently borrow
              request is made.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
