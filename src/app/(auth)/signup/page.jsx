"use client";
import CustomForm from "@/components/Form";
import { useEffect, useState } from "react";
export default function Signup() {
  const username_regex = "^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$";
  const email_regex =
    /^(?=.*[a-zA-Z])[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  const [validForm, setvalidForm] = useState(false);

  const [username, setUsername] = useState("");
  const [isValidUsername, setisValidUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [isValidEmail, setisValidEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [isValidPassword, setisValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function validateUsername() {
    if (username.length < 5 || username.length > 20) {
      setUsernameError("Username must be 5-20 characters long");
      setisValidUsername(false);
    } else if (!username.match(username_regex)) {
      setUsernameError("Username must be alphanumeric");
      setisValidUsername(false);
    } else {
      setUsernameError("");
      setisValidUsername(true);
    }
  }
  function validateEmail() {
    if (email.length < 5 || email.length > 30) {
      setEmailError("Email should be  5-35 characters Long");
      setisValidEmail(false);
    } else if (!email.match(email_regex)) {
      setEmailError("Email must be valid");
      setisValidEmail(false);
    } else {
      setEmailError("");
      setisValidEmail(true);
    }
  }
  function validatePassword() {
    if (password.length < 8 || password.length > 20) {
      setPasswordError("Password must be  8-20 characters long");
      setisValidPassword(false);
    } else {
      setPasswordError("");
      setisValidPassword(true);
    }
  }

  useEffect(() => {
    validateUsername();
  }, [username]);
  useEffect(() => {
    validateEmail();
  }, [email]);
  useEffect(() => {
    validatePassword();
  }, [password]);

  useEffect(() => {
    if (isValidEmail && isValidUsername && isValidPassword) {
      setvalidForm(true);
    } else {
      setvalidForm(false);
    }
  }, [isValidEmail, isValidUsername, isValidPassword]);
  useEffect(() => {
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
  }, []);

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
      id: "email",
      type: "text",
      placeholder: "email",
      value: email,
      onChange: handleEmailChange,
      error: emailError,
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
        className=""
        formName="Signup"
        buttonText="Signup"
        inputs={inputs}
        isValidForm={validForm}
      />
    </div>
  );
}

//DONOT READ
// "use client";
// import { useState, useEffect } from "react";
// const { Button } = require("@/components/ui/button");
// const {
//   Card,
//   CardTitle,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } = require("@/components/ui/card");
// const { Input } = require("@/components/ui/input");

// export default function Signup() {
//   const username_regex = "^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$";
//   const email_regex =
//     /^(?=.*[a-zA-Z])[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

//   const [validForm, setvalidForm] = useState(false);

//   const [username, setUsername] = useState("");
//   const [isValidUsername, setisValidUsername] = useState(false);
//   const [usernameError, setUsernameError] = useState("");

//   const [email, setEmail] = useState("");
//   const [isValidEmail, setisValidEmail] = useState(false);
//   const [emailError, setEmailError] = useState("");

//   const [password, setPassword] = useState("");
//   const [isValidPassword, setisValidPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState("");

//   function handleUsernameChange(event) {
//     setUsername(event.target.value);
//   }
//   function handleEmailChange(event) {
//     setEmail(event.target.value);
//   }
//   function handlePasswordChange(event) {
//     setPassword(event.target.value);
//   }

//   function validateUsername() {
//     if (username.length < 5 || username.length > 20) {
//       setUsernameError("Username must be 5-20 characters long");
//       setisValidUsername(false);
//     } else if (!username.match(username_regex)) {
//       setUsernameError("Username must be alphanumeric");
//       setisValidUsername(false);
//     } else {
//       setUsernameError("");
//       setisValidUsername(true);
//     }
//   }
//   function validateEmail() {
//     if (email.length < 5 || email.length > 30) {
//       setEmailError("Email should be  5-35 characters Long");
//       setisValidEmail(false);
//     } else if (!email.match(email_regex)) {
//       setEmailError("Email must be valid");
//       setisValidEmail(false);
//     } else {
//       setEmailError("");
//       setisValidEmail(true);
//     }
//   }
//   function validatePassword() {
//     if (password.length < 8 || password.length > 20) {
//       setPasswordError("Password must be  8-20 characters long");
//       setisValidPassword(false);
//     } else {
//       setPasswordError("");
//       setisValidPassword(true);
//     }
//   }

//   useEffect(() => {
//     validateUsername();
//   }, [username]);
//   useEffect(() => {
//     validateEmail();
//   }, [email]);
//   useEffect(() => {
//     validatePassword();
//   }, [password]);

//   useEffect(() => {
//     if (isValidEmail && isValidUsername && isValidPassword) {
//       setvalidForm(true);
//     } else {
//       setvalidForm(false);
//     }
//   }, [isValidEmail, isValidUsername, isValidPassword]);
//   useEffect(() => {
//     setEmailError("");
//     setUsernameError("");
//     setPasswordError("");
//   }, []);
//   return (
//     <div className="flex justify-center w-full items-center h-screen  ">
//       <Card className=" sm:w-[30rem] w-9/12 flex  flex-col bg-accent">
//         <CardHeader className="items-center">
//           <CardTitle>Signup</CardTitle>
//         </CardHeader>
//         <div className="sm:w-8/12 w-11/12 flex flex-col  mx-auto">
//           <CardContent className="pb-0 mb-1">
//             {/* <Label htmlFor="email">Email</Label> */}

//             <h1 className="text-xs mb-[0.1rem] opacity-70  h-5 max-sm:w-72 text-foreground font-light  sm:flex sm:items-center sm:justify-center ">
//               {emailError}
//             </h1>
//             <Input
//               value={email}
//               onChange={handleEmailChange}
//               type="email"
//               id="email"
//               placeholder="Email"
//             />
//           </CardContent>
//           <CardContent className="pb-0 mb-1">
//             <h1 className="text-xs mb-[0.1rem] opacity-70  h-5 max-sm:w-72 text-foreground font-light  sm:flex sm:items-center sm:justify-center ">
//               {usernameError}
//             </h1>

//             <Input
//               value={username}
//               onChange={handleUsernameChange}
//               type="username"
//               id="username"
//               placeholder="username"
//             />
//           </CardContent>
//           <CardContent className="pb-0 mb-3">
//             <h1 className="text-xs mb-[0.1rem] opacity-70  h-5 max-sm:w-72 text-foreground font-light  sm:flex sm:items-center sm:justify-center ">
//               {passwordError}
//             </h1>
//             <Input
//               value={password}
//               onChange={handlePasswordChange}
//               type="password"
//               id="password"
//               placeholder="password"
//             />
//           </CardContent>
//         </div>
//         <CardFooter className="flex items-center justify-center     sm:pt-5">
//           <Button className="w-5/12   "> Signup</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
