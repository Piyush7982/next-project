import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CustomForm = ({
  formName,
  buttonText,
  inputs,
  className,
  isValidForm,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <Card className={`sm:w-[30rem]  w-9/12 flex flex-col  ${className}`}>
      <CardHeader className="items-center">
        <CardTitle>{formName}</CardTitle>
      </CardHeader>
      <div className="sm:w-8/12 w-11/12 flex flex-col mx-auto">
        {inputs.map((input, index) => (
          <CardContent key={index} className=" pb-0 mb-1">
            <h1 className="text-xs mb-[0.1rem] opacity-70 h-5 max-sm:w-72 text-foreground font-light sm:flex sm:items-center sm:justify-center">
              {input.error ? input.error : ""}
            </h1>
            <Input
              value={input.value}
              onChange={input.onChange}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
            />
          </CardContent>
        ))}

        <CardFooter className="flex items-center justify-center sm:pt-5">
          <Button disabled={!isValidForm} className="w-5/12  ">
            {buttonText}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CustomForm;
