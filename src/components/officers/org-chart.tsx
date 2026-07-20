import type { OrgNode } from "@/lib/types";
import { initials } from "@/lib/format";

function OrgNodeCard({ node }: { node: OrgNode }) {
  const hasChildren = !!node.children?.length;
  return (
    <li>
      <div className="inline-flex w-40 flex-col items-center gap-1.5 rounded-xl border bg-card px-3 py-3 shadow-sm transition-colors hover:border-primary/40">
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary"
        >
          {initials(node.name)}
        </span>
        <span className="text-sm font-semibold leading-tight">{node.name}</span>
        <span className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
          {node.position}
        </span>
      </div>
      {hasChildren && (
        <ul>
          {node.children!.map((child) => (
            <OrgNodeCard key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Renders the officer hierarchy as a pure-CSS connector tree. */
export function OrgChart({ root }: { root: OrgNode }) {
  return (
    <div className="org-tree overflow-x-auto pb-2">
      <div className="mx-auto w-max px-4">
        <ul>
          <OrgNodeCard node={root} />
        </ul>
      </div>
    </div>
  );
}
