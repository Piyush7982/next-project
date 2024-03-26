"use client";
import { LoginAction } from "@/actions/actions";
import { signIn } from "@/auth";
import CustomForm from "@/components/Form";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [validForm, setvalidForm] = useState(false);

  function handleUsernameChange(event) {
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

  const inputs = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Username",
      value: username,
      onChange: handleUsernameChange,
      error: usernameError,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: handlePasswordChange,
      error: passwordError,
    },
  ];

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("username", username);
  //   formData.append("password", password);

  //   try {
  //     await signIn("credentials", {
  //       username: formData.get("username"),
  //       password: formData.get("password"),
  //       // callbackUrl: "/dashboard",
  //       // redirect: "/dashboard",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="flex justify-center w-full items-center h-screen bg-accent ">
      <CustomForm
        className=" py-5 "
        formName="Login"
        buttonText="Submit"
        inputs={inputs}
        isValidForm={validForm}
        // handleSubmit={handleSubmit}
        action={LoginAction}
        footerText="Not a user ? Join Us"
        footerTextButtonType="Signup"
        footerNavigationLink="/signup"
      />
    </div>
  );
}

export default Login;
