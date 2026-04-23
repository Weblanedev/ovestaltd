export function getSiteName(): string {
  return process.env.NEXT_PUBLIC_SITE_NAME ?? "Ovesta";
}

export function getSiteDomain(): string {
  return process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "ovesta.com";
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
