import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { LegalPageShell } from "@/components/LegalPageShell";
import { MarkdownArticle } from "@/components/MarkdownArticle";

export default async function ReturnsPage() {
  const path = join(
    process.cwd(),
    "src",
    "content",
    "legal",
    "return-policy.md"
  );
  const source = await readFile(path, "utf8");
  return (
    <LegalPageShell title="Return policy">
      <MarkdownArticle source={source} />
    </LegalPageShell>
  );
}
