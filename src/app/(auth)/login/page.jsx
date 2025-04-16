"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/Auth/AuthLayout";
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          username,
          password,
        });

        if (result?.error) {
          if (result.error === "CredentialsSignin") {
            setFormError("Invalid username or password.");
          } else {
            setFormError(result.error);
          }
          toast.error(
            formError || "Login failed. Please check your credentials.",
            {
              autoClose: 3000,
              theme: "colored",
            }
          );
        } else if (result?.ok) {
          toast.success("Successfully logged in", {
            autoClose: 2000,
            theme: "colored",
          });
          router.push(callbackUrl);
          router.refresh();
        } else {
          setFormError("An unexpected error occurred during login.");
          toast.error("Login failed. Please try again later.", {
            autoClose: 3000,
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        setFormError("An error occurred. Please try again.");
        toast.error("Login failed due to a network or server issue.", {
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  };

  return (
    <AuthLayout type="login">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {searchParams.get("error") && (
          <p className="text-sm text-destructive">
            {searchParams.get("error") === "CredentialsSignin"
              ? "Invalid username or password."
              : "Login failed. Please try again."}
          </p>
        )}
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={formError ? "border-destructive" : ""}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={formError ? "border-destructive" : ""}
            required
          />
        </div>

        {formError && <p className="text-sm text-destructive">{formError}</p>}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
