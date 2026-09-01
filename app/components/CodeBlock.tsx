import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

export async function CodeBlock({
  title,
  code,
  lang = "tsx",
}: {
  title?: string;
  code: string;
  lang?: string;
}) {
  const html = await codeToHtml(code, { lang, theme: "github-dark" });

  return (
    <div className="space-y-2">
      {title && <p className="text-xs font-semibold text-zinc-600">{title}</p>}
      <div className="relative">
        <div
          className="rounded-lg overflow-hidden text-xs [&>pre]:p-4 [&>pre]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <CopyButton code={code} />
      </div>
    </div>
  );
}
