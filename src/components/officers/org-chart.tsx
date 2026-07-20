import type { OrgNode } from "@/lib/types";
import { initials } from "@/lib/format";

function OrgNodeItem({ node }: { node: OrgNode }) {
  const hasChildren = !!node.children?.length;
  return (
    <li>
      <div className="inline-flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2 shadow-sm transition-colors hover:border-primary/40">
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-[0.7rem] font-bold text-primary"
        >
          {initials(node.name)}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{node.name}</span>
          <span className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
            {node.position}
          </span>
        </span>
      </div>
      {hasChildren && (
        <ul>
          {node.children!.map((child) => (
            <OrgNodeItem key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Renders the officer hierarchy as a vertical indented tree. It reads
 * top-to-bottom and fits any container width, so it never scrolls horizontally.
 */
export function OrgChart({ root }: { root: OrgNode }) {
  return (
    <div className="org-tree mx-auto max-w-2xl">
      <ul>
        <OrgNodeItem node={root} />
      </ul>
    </div>
  );
}
