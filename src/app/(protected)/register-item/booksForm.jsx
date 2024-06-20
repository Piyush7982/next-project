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
import groot from "../../../../public/groot.jpg";
import Image from "next/image";

export default function BooksForm() {
  const [name, setname] = useState("");
  const [description, setdescrition] = useState("");
  const [recommendedFor, setrecommendedFor] = useState("");
  const [tags, settags] = useState("");
  const [price, setprice] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(groot);
  const [useDefaultImage, setUseDefaultImage] = useState(true);

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
  function handleImage(e) {
    if (!e.target.files[0]) return;

    if (e.target.files[0].size > 1000000) {
      toast.error("File size should be less than 1MB", {
        autoClose: 2000,
        theme: "colored",
      });

      return;
    }
    if (
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png"
    ) {
      toast.error("Only jpeg and png files are allowed", {
        autoClose: 2000,
        theme: "colored",
      });

      return;
    }
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setUseDefaultImage((value) => (value === true ? !value : value));
  }
  async function handleOnSubmit(e) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("recommendedFor", recommendedFor);
        formData.append("price", Number(price));
        formData.append("model", "Stationary");
        formData.append("image", image);
        formData.append("tags", tags);
        // const payload = {
        //   name: name,
        //   description: description,
        //   recommendedFor: recommendedFor,
        //   price: price - 0,
        //   tags: tags,
        //   model: "Stationary",
        // };
        // const data = JSON.stringify(payload);
        // console.log(data);

        const result = await axios.post("/api/Seller", formData, {
          headers: { "Content-Type": "multipart/form-data" },
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
        setImage(null);
        setPreview(groot);

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
      recommendedFor.length > 100 &&
      image !== null &&
      tags.length > 1
    ) {
      setvalidForm(true);
    } else {
      setvalidForm(false);
    }
  }, [name, description, price, recommendedFor, image, tags]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Books / Stationary</CardTitle>
          <div className="text-sm text-muted-foreground">
            {formError?.length > 0 ? (
              <p className="text-destructive">{formError}</p>
            ) : (
              "All fields are mandatory to fill."
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1">
            <Label className="flex items-center  gap-2" htmlFor="image">
              Image{" "}
              <span className=" items-center font-light opacity-80 text-xs   ">
                {" "}
                (Click below to upload an image)
              </span>{" "}
            </Label>

            <div className="flex pt-2  items-center justify-center mb-1  ">
              <Image
                width={470}
                height={270}
                alt="coverPhoto"
                src={preview}
                onClick={() => {
                  document.getElementById("imageSelector").click();
                  // document.querySelector("imageSelector").click();
                }}
                style={{ objectFit: "cover" }}
                className="w-10/12 h-40  sm:h-56 rounded-lg border shadow-sm hover:cursor-pointer hover:opacity-80 transition-all duration-200 "
              />
              <input
                type="file"
                onChange={handleImage}
                id="imageSelector"
                name="image"
                className="hidden"
              />
              {/* <Button asChild> */}
              <button
                className="  bg-destructive text-destructive-foreground hover:bg-destructive/90 text-center h-10 px-2 py-1 ml-2  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors  "
                hidden={useDefaultImage}
                type="button"
                // for="checkbox"
                onClick={() => {
                  if (!useDefaultImage) {
                    setImage(null);
                    setPreview(groot);
                  }
                  setUseDefaultImage((value) => !value);
                }}
              >
                Remove
              </button>
              {/* </Button> */}
            </div>
          </div>
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
              Target Audience / Recommended For{" "}
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
              placeholder=" #book, #adventure, #science"
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
            {isPending ? <Loader className="animate-spin" /> : "Upload"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
