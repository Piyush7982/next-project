import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <Link replace={true} href="/">
        <div>Go back home</div>
      </Link>
    </>
  );
}
