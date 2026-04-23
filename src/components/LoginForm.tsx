"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginSchema, type LoginValues } from "@/lib/validations";
import { useAuth } from "@/context/AuthContext";
import type { PublicUser } from "@/types/user";

export function LoginForm() {
  const { setUser, refresh } = useAuth();
  const search = useSearchParams();
  const router = useRouter();
  const next = search.get("next");
  const safeNext = next && next.startsWith("/") ? next : "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: yupResolver(loginSchema) });

  return (
    <form
      onSubmit={handleSubmit(async (v) => {
        try {
          const r = await fetch("/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: v.email, password: v.password }),
          });
          const d = (await r.json()) as {
            user?: PublicUser;
            error?: string;
          };
          if (!r.ok) {
            toast.error(d.error ?? "Could not sign in");
            return;
          }
          if (d.user) setUser(d.user);
          else await refresh();
          router.push(safeNext);
          router.refresh();
        } catch {
          toast.error("Could not sign in");
        }
      })}
      className="max-w-md space-y-4"
    >
      <div>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-rose-700">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-rose-700">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-12 rounded-md bg-cyan-600 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-60"
      >
        {isSubmitting ? "Signing in…" : "Log in"}
      </button>
    </form>
  );
}
