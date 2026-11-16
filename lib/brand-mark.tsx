import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The site mark lives in public/mark.svg (glyphs outlined, no font needed).
const svg = readFile(join(process.cwd(), "public/mark.svg"));

/** Rasterizes public/mark.svg for icon routes that must be PNG. */
export async function brandMark(size: number) {
  const src = `data:image/svg+xml;base64,${(await svg).toString("base64")}`;
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} width={size} height={size} alt="" />,
    { width: size, height: size },
  );
}
