"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/PageHeader";
import { contactInfo } from "@/lib/contact-info";

type Form = {
  name: string;
  email: string;
  topic?: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm<Form>();

  return (
    <main>
      <PageHeader
        title="Contact"
        description="Reach the Ovesta team. This form is a demo and does not send email by default."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="text-slate-700">
            <strong>Phone:</strong> {contactInfo.phone}
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Email:</strong> {contactInfo.supportEmail}
          </p>
          <p className="mt-4 text-sm text-slate-600">{contactInfo.address}</p>
        </div>
        <form
          onSubmit={handleSubmit(() => {
            toast.success("Thanks. This demo does not send a real message.");
            reset();
          })}
          className="space-y-3"
        >
          <div>
            <label className="text-sm" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="topic">
              Topic (optional)
            </label>
            <input
              id="topic"
              className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
              {...register("topic")}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="text-base mt-1 w-full rounded border border-slate-200 px-3 py-2"
              {...register("message", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
