/**
 * Fixed, page-wide ambient background: slowly drifting blurred color blobs
 * over a faded dot grid. Pure CSS (see globals.css) — no JS cost.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
      <div className="dot-grid absolute inset-0" />
    </div>
  );
}
