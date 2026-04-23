"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Form = {
  company: string;
  productSummary: string;
  interest: string;
  notes: string;
};

export function SellToCustomersForm() {
  const { register, handleSubmit, reset } = useForm<Form>({
    defaultValues: {
      company: "",
      productSummary: "",
      interest: "direct",
      notes: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(() => {
        toast.success(
          "Thanks. We will get back to you about listing on Ovesta."
        );
        reset();
      })}
      className="max-w-lg space-y-4"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="company">
          Company or brand name
        </label>
        <input
          id="company"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          {...register("company", { required: true })}
        />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="productSummary">
          What you sell
        </label>
        <input
          id="productSummary"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          placeholder="e.g. tablet cases, audio gear"
          {...register("productSummary", { required: true })}
        />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="interest">
          How you want to reach our customers
        </label>
        <select
          id="interest"
          className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
          {...register("interest")}
        >
          <option value="direct">Sell direct to Ovesta shoppers</option>
          <option value="wholesale">Wholesale to our buying team</option>
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
        Send inquiry
      </button>
    </form>
  );
}
