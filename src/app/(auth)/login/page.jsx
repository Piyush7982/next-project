"use client";
import CustomForm from "@/components/Form";
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
      type: "text",
      placeholder: "Username",
      value: username,
      onChange: handleUsernameChange,
      error: usernameError,
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: handlePasswordChange,
      error: passwordError,
    },
  ];

  return (
    <div className="flex justify-center w-full items-center h-screen bg-accent ">
      <CustomForm
        className=" py-5 "
        formName="Login"
        buttonText="Submit"
        inputs={inputs}
        isValidForm={validForm}
      />
    </div>
  );
}

export default Login;
