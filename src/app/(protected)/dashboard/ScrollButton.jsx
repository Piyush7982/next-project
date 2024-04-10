"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";

function scrollRight() {
  const container = document.querySelector(".overflow-x-scroll");

  container.scrollLeft += 250;
}
function scrollLeft() {
  const container = document.querySelector(".overflow-x-scroll");
  if (container.scrollLeft > 0) {
    container.scrollLeft -= 200;
  }
}
export function ScrollRight() {
  return <ChevronRight onClick={scrollRight} />;
}
export function ScrollLeft() {
  return <ChevronLeft onClick={scrollLeft} />;
}
