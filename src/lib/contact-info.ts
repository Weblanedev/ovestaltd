import { getSiteDomain, getSiteName, getSiteUrl } from "@/lib/site";

export const contactInfo = {
  siteName: getSiteName(),
  businessName: getSiteName(),
  domain: getSiteDomain(),
  siteUrl: getSiteUrl(),
  address: "120 Commerce Way, Suite 400, San Francisco, CA 94102, USA",
  phone: "+1 (415) 555-0198",
  paymentsEmail: "payments@ovesta.com",
  supportEmail: "support@ovesta.com",
} as const;
