"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

export default function BooksForm() {
  const [name, setname] = useState("");
  const [description, setdescrition] = useState("");
  const [recommendedFor, setrecommendedFor] = useState("");
  const [tags, settags] = useState([]);
  const [price, setprice] = useState("");

  const [formError, setformError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [validForm, setvalidForm] = useState(false);

  function handlenameChange(event) {
    setname(event.target.value);
  }
  function handledescriptionChange(event) {
    setdescrition(event.target.value);
  }
  function handlerecommendedForChange(event) {
    setrecommendedFor(event.target.value);
  }
  function handletagsChange(event) {
    settags(event.target.value);
  }
  function handlePriceChange(event) {
    event.target.value = event.target.value.replace(/[+-]/g, "");
    setprice(event.target.value);
  }
  async function handleOnSubmit(e) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const payload = {
          name: name,
          description: description,
          recommendedFor: recommendedFor,
          price: price - 0,
          tags: tags,
          model: "Stationary",
        };
        const data = JSON.stringify(payload);
        // console.log(data);

        const result = await axios.post("/api/Seller", data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        // console.log(result);
        toast.info("Please wait for admin approval", {});
        setformError("");
        setname("");
        setdescrition("");
        setrecommendedFor("");
        setprice("");
        settags([]);
        //   router.replace("/dashboard");
        //   router.refresh("/dashboard");
      } catch (error) {
        if (
          error?.response?.data?.Type === "authorisation error" ||
          error?.response?.data?.Type === "ZodValidationError"
        ) {
          setformError(error?.response?.data?.Message);
        } else {
          setformError("Unexpected Error Happened");
          console.log(error);
        }

        return;
      }
    });
  }

  useEffect(() => {
    if (
      name.length > 3 &&
      description.length > 200 &&
      price > 0 &&
      recommendedFor.length > 100
    ) {
      setvalidForm(true);
    } else {
      setvalidForm(false);
    }
  }, [name, description, price, recommendedFor]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Books / Stationary</CardTitle>
          <CardDescription>
            {formError?.length > 0 ? (
              <div className="text-destructive">{formError}</div>
            ) : (
              "All fields are mandatory to fill."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              value={name}
              name="name"
              type="text"
              id="name"
              minLength={3}
              maxLength={30}
              placeholder="Enter Item Name (3-30)*"
              onChange={handlenameChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">
              Description
              <span className=" items-center font-light opacity-80 text-xs ml-3 gap-2 ">
                {" "}
                {description.length}/400
              </span>
            </Label>
            <Textarea
              className="resize-none"
              draggable={false}
              value={description}
              name="description"
              type="text"
              id="description"
              minLength={200}
              maxLength={400}
              placeholder="Enter Item Description (200-400)*"
              onChange={handledescriptionChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="recommendedFor">
              Target Audience{" "}
              <span className=" items-center font-light opacity-80 text-xs ml-3 gap-2 ">
                {" "}
                {recommendedFor.length}/200
              </span>
            </Label>
            <Textarea
              className="resize-none"
              draggable={false}
              value={recommendedFor}
              name="recommendedFor"
              type="text"
              id="recommendedFor"
              minLength={100}
              maxLength={200}
              placeholder="Enter descrition about target audience (100-200)*"
              onChange={handlerecommendedForChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              value={price}
              min={0}
              name="price"
              type="number"
              id="price"
              placeholder="Enter desired price"
              onChange={handlePriceChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="tags">Tags</Label>
            <Input
              value={tags}
              name="tags"
              type="text"
              id="tags"
              placeholder="Enter tags seperated by  comma(' , ') "
              onChange={handletagsChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={!validForm || isPending}
            className="disabled:bg-muted-foreground"
            type="submit"
          >
            {isPending ? <Loader /> : "Upload"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
