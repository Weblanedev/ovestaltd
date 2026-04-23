"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerSchema, type RegisterValues } from "@/lib/validations";
import { useAuth } from "@/context/AuthContext";
import type { PublicUser } from "@/types/user";

export function RegisterForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: yupResolver(registerSchema) });

  return (
    <form
      onSubmit={handleSubmit(async (v) => {
        try {
          const r = await fetch("/api/auth/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: v.name,
              email: v.email,
              password: v.password,
            }),
          });
          const d = (await r.json()) as {
            user?: PublicUser;
            error?: string;
          };
          if (!r.ok) {
            toast.error(d.error ?? "Could not register");
            return;
          }
          if (d.user) setUser(d.user);
          router.push("/dashboard");
          router.refresh();
        } catch {
          toast.error("Could not register");
        }
      })}
      className="max-w-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-rose-700">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="email">
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
        <label className="block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-rose-700">
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-12 rounded-md bg-cyan-600 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-60"
      >
        {isSubmitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
