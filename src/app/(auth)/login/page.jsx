"use client";
import CustomForm from "@/components/Form";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const [formError, setformError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [password, setPassword] = useState("");

  const [validForm, setvalidForm] = useState(false);

  function handleUsernameChange(event) {
    event.target.value = event.target.value.replace(/\s/g, "");
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  useEffect(() => {
    if (username.length > 0 && password.length > 0) {
      setvalidForm(true);
    } else {
      setvalidForm(false);
    }
  }, [username, password]);
  useEffect(() => {
    setformError("");
  }, [username]);

  const inputs = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Username",
      value: username,
      onChange: handleUsernameChange,
      maxLength: 20,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: handlePasswordChange,
      maxLength: 20,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const user = {
          username: username,

          password: password,
        };
        const data = JSON.stringify(user);

        const result = await axios.post("/api/register/login", data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setformError("");
        router.replace("/dashboard");
        router.refresh("/dashboard");
        // redirect("/dashboard");
        location.reload();
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
    <div className="flex justify-center w-full items-center h-screen bg-accent ">
      <CustomForm
        formError={formError}
        className=" py-5 "
        formName="Login"
        buttonText="Submit"
        inputs={inputs}
        isValidForm={validForm}
        handleSubmit={handleSubmit}
        // action={LoginAction}
        disabled={isPending}
        footerText="Not a user ? Join Us"
        footerTextButtonType="Signup"
        footerNavigationLink="/signup"
      />
    </div>
  );
}

export default Login;
