import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { LegalPageShell } from "@/components/LegalPageShell";
import { MarkdownArticle } from "@/components/MarkdownArticle";

export default async function PrivacyPage() {
  const path = join(
    process.cwd(),
    "src",
    "content",
    "legal",
    "privacy-policy.md"
  );
  const source = await readFile(path, "utf8");
  return (
    <LegalPageShell title="Privacy policy">
      <MarkdownArticle source={source} />
    </LegalPageShell>
  );
}
