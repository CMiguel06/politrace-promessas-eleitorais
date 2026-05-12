import { STATUS_LABEL, STATUS_TOKEN, type PromiseStatus } from "@/lib/politrace-data";

export function StatusBadge({ status }: { status: PromiseStatus }) {
  const token = STATUS_TOKEN[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border"
      style={{
        color: `var(--${token})`,
        borderColor: `color-mix(in oklab, var(--${token}) 40%, transparent)`,
        backgroundColor: `color-mix(in oklab, var(--${token}) 10%, transparent)`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: `var(--${token})` }} />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function AreaBadge({ area }: { area: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-border">
      {area}
    </span>
  );
}
