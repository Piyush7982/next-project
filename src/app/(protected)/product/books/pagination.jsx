import { getTotalBooks } from "@/actions/items.actions";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function PaginationDiv({ currentPage }) {
  //   console.log(currentPage);
  const totalItem = await getTotalBooks();
  const totalPage = Math.ceil(totalItem / 12);
  const arr = loop(totalPage);
  return (
    <Pagination>
      <div></div>
      <PaginationContent>
        <PaginationItem hidden={currentPage == 1}>
          <PaginationPrevious
            href={
              currentPage != 1
                ? `/product/books/?page=${currentPage - 1}`
                : "/product/books/?page=1"
            }
          />
        </PaginationItem>
        {arr &&
          arr.map((i) => {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i == currentPage}
                  href={`/product/books/?page=${i}`}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          })}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem hidden={currentPage == totalPage}>
          <PaginationNext
            href={
              currentPage != totalPage
                ? `/product/books/?page=${currentPage * 1 + 1}`
                : `/product/books/?page=${totalPage}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function loop(total) {
  let array = [];
  for (let i = 1; i <= total; i++) {
    array.push(i);
  }
  return array;
}
