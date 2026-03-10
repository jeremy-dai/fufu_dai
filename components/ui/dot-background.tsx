import { cn } from "@/lib/utils";

export function DotBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(161, 161, 170, 0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {children}
    </div>
  );
}
