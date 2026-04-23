import { getSiteDomain, getSiteName, getSiteUrl } from "@/lib/site";

/** Registered legal entity (Nigeria). */
export const BUSINESS = {
  legalName: "Ovesta Integrated Services Limited",
  activity: "Sales of Computers/Softwares",
} as const;

export const contactInfo = {
  /** Storefront / brand name (from env, e.g. Ovesta Store). */
  siteName: getSiteName(),
  /** Same as siteName for display where a short trading name is used. */
  tradingName: getSiteName(),
  legalName: BUSINESS.legalName,
  businessActivity: BUSINESS.activity,
  domain: getSiteDomain(),
  siteUrl: getSiteUrl(),
  address: "3 Hassan Close, Benson, Ikorodu, Lagos, Nigeria",
  phone: "09088199082",
  /** Use in tel: and wa.me links. */
  phoneTel: "+2349088199082",
  /** Primary email for services, support, and orders. */
  servicesEmail: "services@ovestastore.com",
  supportEmail: "services@ovestastore.com",
  paymentsEmail: "services@ovestastore.com",
} as const;
