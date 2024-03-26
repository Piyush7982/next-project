import Link from "next/link";
import { Button } from "../ui/button";
import { LampContainer } from "../ui/lamp";

export default function Herosection() {
  return (
    // <LampContainer className=" ">
    <div className="container  flex flex-col  items-center min-h-[60vh] justify-center gap-7   text-4xl py-3 my-3">
      <h1 className="capitalize text-7xl font-extrabold  ">
        This is hero Section
      </h1>
      <p className="text-2xl font-bold opacity-80  max-w-4xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim cumque
        soluta quasi similique explicabo magni pariatur vel voluptas, omnis
        eligendi neque minima. Quod praesentium eum laudantium saepe deserunt
        facere inventore. Magni. lorem-100 Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Voluptate, tempora nesciunt. Quos enim
        error voluptatibus quasi dolorum distinctio reprehenderit veritatis,
        earum saepe. Officiis quia a ipsum repellat voluptatum consequatur ex
        laboriosam rem neque, doloribus praesentium enim eos et! Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Beatae, ab aliquid at
      </p>
      <div className="flex gap-10 items-center justify-center">
        <Link href="/signup">
          <Button
            size="lg"
            variant="secondary"
            className="scale-125 bg-secondary capitalize font-bold"
          >
            Sign Up{" "}
          </Button>
        </Link>
        <Link href="/login">
          <Button
            size="lg"
            variant=""
            className="scale-125 capitalize font-bold"
          >
            {" "}
            Login{" "}
          </Button>
        </Link>
      </div>
    </div>
    // </LampContainer>
  );
}
