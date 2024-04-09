"use client";
import CustomForm from "@/components/Form";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function UpdateProfileForm({ userdetails }) {
  const router = useRouter();

  const { mobile, address, username, college } = userdetails;
  const [mobileNumber, setmobileNumber] = useState(mobile != 0 ? mobile : "");

  const [formError, setformError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [adress, setadress] = useState(address.length > 1 ? address : "");
  const [collegee, setcollegee] = useState(college.length > 1 ? college : "");

  const [validForm, setvalidForm] = useState(false);

  function handlemobileNumberChange(event) {
    event.target.value = event.target.value.replace(/\s/g, "");
    setmobileNumber(event.target.value);
  }
  function handleadressChange(event) {
    setadress(event.target.value);
  }

  useEffect(() => {
    if (
      mobileNumber.length === 10 &&
      adress.length > 5 &&
      collegee.length > 1
    ) {
      setvalidForm(true);
    } else {
      setvalidForm(false);
    }
  }, [mobileNumber, adress, collegee]);
  useEffect(() => {
    setformError("");
  }, [mobileNumber, adress]);

  const inputs = [
    {
      id: "mobileNumber",
      name: "mobileNumber",
      type: "text",
      placeholder: "Enter 10 digit number",
      value: mobileNumber,
      onChange: handlemobileNumberChange,
      maxLength: 10,
    },
    {
      id: "adress",
      name: "adress",
      type: "adress",
      placeholder: "Enter Address",
      value: adress,
      onChange: handleadressChange,
      maxLength: 30,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const user = {
          mobileNumber: mobileNumber,
          username: username,
          adress: adress,
          college: collegee,
        };
        const data = JSON.stringify(user);

        const result = await axios.put("/api/user", data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setformError("");
        toast.success("Successfully Updated", {
          autoClose: 2000,
          theme: "colored",
        });
        router.refresh("/profile");
      } catch (error) {
        if (
          error?.response?.data?.Type === "authorisation error" ||
          error?.response?.data?.Type === "ZodValidationError"
        ) {
          setformError(error?.response?.data?.Message);
        } else {
          console.error(error);
        }

        return;
      }
    });
  };
  return (
    <div className="flex  items-center justify-center ">
      <CustomForm
        formError={formError}
        className="bg-none "
        formName="Update Profile"
        buttonText="Submit"
        inputs={inputs}
        isValidForm={validForm}
        handleSubmit={handleSubmit}
        disabled={isPending}
      >
        <Select
          onValueChange={(value) => setcollegee(value)}
          defaultValue={collegee}
          value={collegee}
          name="college"
        >
          <SelectTrigger className="mt-4">
            <SelectValue placeholder="Select a College" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NSUT">NSUT</SelectItem>
            <SelectItem value="DTU">DTU</SelectItem>
            <SelectItem value="IGDTU">IGDTU</SelectItem>
            <SelectItem value="IIITD">IIITD</SelectItem>
            <SelectItem value="IPU">IPU</SelectItem>
          </SelectContent>
        </Select>
      </CustomForm>
    </div>
  );
}
