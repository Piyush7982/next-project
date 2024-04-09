import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchUserDataByUsername } from "@/actions/user.actions";

export default async function USerDataTable({ username }) {
  const userdetails = await fetchUserDataByUsername(username);
  const keys = Object.keys(userdetails?._doc);

  //   console.log(userdetails);
  return (
    <Table className="border">
      <TableCaption></TableCaption>
      <TableHeader className="pt-16">
        <TableRow className="">
          <TableHead className="w-1/2 border border-r font-bold">
            Field
          </TableHead>
          <TableHead className="w-1/2 font-bold">Data</TableHead>
          {/* <TableHead>ACTION</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userdetails &&
          keys.map((key) => (
            <TableRow key={key}>
              <TableCell className="border border-r capitalize font-medium ">
                {key}
              </TableCell>
              {/* {console.log(userdetails[key])} */}
              {/* <TableCell>{admin?.createdAt}</TableCell> */}
              <TableCell>{userdetails[key]}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
