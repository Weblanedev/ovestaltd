import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const registerSchema = yup.object({
  name: yup.string().max(100).optional(),
  email: yup.string().email("Enter a valid email.").required("Email is required."),
  password: yup
    .string()
    .min(8, "Use at least 8 characters.")
    .required("Password is required."),
});

export const checkoutSchema = yup.object({
  name: yup.string().required("Name is required."),
  phone: yup.string().max(32).optional(),
  line1: yup.string().max(200).optional(),
  line2: yup.string().max(200).optional(),
  city: yup.string().max(100).optional(),
  region: yup.string().max(100).optional(),
  postal: yup.string().max(20).optional(),
  country: yup.string().max(100).optional(),
});

export type LoginValues = yup.InferType<typeof loginSchema>;
export type RegisterValues = yup.InferType<typeof registerSchema>;
export type CheckoutValues = yup.InferType<typeof checkoutSchema>;
