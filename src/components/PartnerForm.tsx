"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Form = {
  company: string;
  interest: string;
  notes: string;
};

export function PartnerForm() {
  const { register, handleSubmit, reset } = useForm<Form>({
    defaultValues: { company: "", interest: "retail", notes: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(() => {
        toast.success(
          "Thanks, we will follow up. This demo does not send a real request."
        );
        reset();
      })}
      className="max-w-lg space-y-4"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          {...register("company", { required: true })}
        />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="interest">
          Interest
        </label>
        <select
          id="interest"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          {...register("interest")}
        >
          <option value="retail">Retail partnership</option>
          <option value="distribution">Distribution</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          className="text-base mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
          {...register("notes")}
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
      >
        Submit
      </button>
    </form>
  );
}
