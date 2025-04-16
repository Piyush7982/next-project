"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/Auth/AuthLayout";
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await axios.post(
          "/api/auth/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success("Successfully logged in", {
            autoClose: 2000,
            theme: "colored",
          });
          router.push("/dashboard");
        }
      } catch (error) {
        if (error.response?.data?.message) {
          setFormError(error.response.data.message);
        } else {
          setFormError("An error occurred. Please try again.");
        }
      }
    });
  };

  return (
    <AuthLayout type="login">
      <form onSubmit={handleSubmit} className="space-y-6">
        {formError && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {formError}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
