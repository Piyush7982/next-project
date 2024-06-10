"use client";

import axios from "axios";

const { atom, useRecoilState } = require("recoil");

const registration = atom({
  key: "registration",
  default: false,
});

export const isRegisteredState = () => {
  const [register, setregister] = useRecoilState(registration);
  async function check() {
    var result = await axios.get("/api/user", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setregister(Boolean(result?.data?.Data?.status));
    return;
  }
  check();
  return register;
};
