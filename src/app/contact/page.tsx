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
        description="Reach Ovesta Integrated Services Limited. We usually reply within one business day."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div className="space-y-3 text-slate-700">
          <p className="text-sm font-semibold text-slate-900">
            {contactInfo.legalName}
          </p>
          <p className="text-sm">{contactInfo.businessActivity}</p>
          <p className="text-sm text-slate-600">{contactInfo.address}</p>
          <p className="pt-2">
            <strong>Phone:</strong>{" "}
            <a
              className="text-cyan-800 underline"
              href={`tel:${contactInfo.phoneTel}`}
            >
              {contactInfo.phone}
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              className="text-cyan-800 underline"
              href={`mailto:${contactInfo.servicesEmail}`}
            >
              {contactInfo.servicesEmail}
            </a>
          </p>
          <p className="text-sm text-slate-600">
            Web:{" "}
            <a className="text-cyan-800 underline" href={contactInfo.siteUrl}>
              {contactInfo.domain}
            </a>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(() => {
            toast.success("Thanks, we have received your message.");
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
