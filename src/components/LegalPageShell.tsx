import { PageHeader } from "@/components/PageHeader";

type Props = {
  title: string;
  children: React.ReactNode;
};

export function LegalPageShell({ title, children }: Props) {
  return (
    <main>
      <PageHeader
        title={title}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "#", label: title },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">{children}</div>
    </main>
  );
}
