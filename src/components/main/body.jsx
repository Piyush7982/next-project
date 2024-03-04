import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeEuro } from "lucide-react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function Mainbody() {
  return (
    <div className="flex flex-col container space-y-40">
      <Card className="w-10/12 min-h-96 bg-secondary   mx-auto flex items-center  ">
        <div className="mx-auto h-4/5 rounded-xl   w-11/12 grid md:grid-cols-4 grid-cols-1 gap-3">
          <div className="bg-primary h-72 rounded-xl md:col-span-1  ">
            image
          </div>
          <div className="md:col-span-3 text-wrap ml-2   h-full ">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            non repellendus illum neque rerum eius error inventore, dolorum
            voluptatum ullam repellat eveniet voluptas, mollitia recusandae
            aspernatur ad ea tenetur assumenda. Quasi quod fuga voluptatem
            pariatur tempore provident! Porro amet voluptatem rerum perspiciatis
            veritatis numquam quis. Blanditiis magnam necessitatibus ex unde
            libero doloremque natus consectetur, ut obcaecati voluptatum veniam
            in laboriosam! Odio tenetur aperiam est inventore autem
            reprehenderit? Nam est facere itaque a id maxime, animi quasi cumque
            beatae consequatur debitis tenetur corrupti dicta excepturi maiores,
            nihil voluptate quae numquam dolore voluptatem repellendus facilis
            molestias quibusdam ipsum? Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Nisi ut cupiditate ipsa tempora, voluptates fugiat
            unde ipsam vero magnam. Atque fuga, velit omnis alias repudiandae,
            animi labore tenetur inventore asperiores odit nostrum incidunt iste
            quaerat tempora ab numquam quidem.
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 w-full ">
        <Card className="h-80 w-80 mx-auto flex flex-col justify-between">
          <div className="flex items-center justify-between ">
            <CardHeader>
              <CardTitle>Heading 1</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <BadgeEuro
              color="#000000"
              className="mr-16 -mt-3 "
              fill="gray"
              size={50}
            />
          </div>
          <CardContent>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
              rem minus, fuga numquam nihil dolores quae deserunt. Earum aut
              tenetur facilis culpa, consequatur, dolorem enim ab commodi quam
              magni a velit.
            </p>
          </CardContent>
          <CardFooter>
            <CardDescription>Description</CardDescription>
          </CardFooter>
        </Card>
        <Card className="h-80 w-80 mx-auto flex flex-col justify-between">
          <div className="flex items-center justify-between ">
            <CardHeader>
              <CardTitle>Heading 1</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <BadgeEuro
              color="#000000"
              className="mr-16 -mt-3 "
              fill="gray"
              size={50}
            />
          </div>
          <CardContent>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
              rem minus, fuga numquam nihil dolores quae deserunt. Earum aut
              tenetur facilis culpa, consequatur, dolorem enim ab commodi quam
              magni a velit.
            </p>
          </CardContent>
          <CardFooter>
            <CardDescription>Description</CardDescription>
          </CardFooter>
        </Card>
        <Card className="h-80 w-80 mx-auto flex flex-col justify-between">
          <div className="flex items-center justify-between ">
            <CardHeader>
              <CardTitle>Heading 1</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <BadgeEuro
              color="#000000"
              className="mr-16 -mt-3 "
              fill="gray"
              size={50}
            />
          </div>
          <CardContent>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
              rem minus, fuga numquam nihil dolores quae deserunt. Earum aut
              tenetur facilis culpa, consequatur, dolorem enim ab commodi quam
              magni a velit.
            </p>
          </CardContent>
          <CardFooter>
            <CardDescription>Description</CardDescription>
          </CardFooter>
        </Card>
      </div>

      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-background text-foreground  justify-evenly relative overflow-hidden">
        <h1 className="text-4xl capitalize font-bold flex ml-10 mb-10 ">
          Success Stories
        </h1>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="-mt-10"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
