"use client";
import { RecoilRoot } from "recoil";
export default function StateProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
