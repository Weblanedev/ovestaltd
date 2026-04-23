export function getSiteName(): string {
  return process.env.NEXT_PUBLIC_SITE_NAME ?? "Ovesta Store";
}

export function getSiteDomain(): string {
  return process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "ovestastore.com";
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://ovestastore.com";
}
