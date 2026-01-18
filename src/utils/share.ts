import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export function createShareUrl(code: string): string {
  const compressed = compressToEncodedURIComponent(code);
  const url = new URL(window.location.origin);
  url.hash = `share/${compressed}`;
  return url.toString();
}

export function getCodeFromUrl(): string | null {
  if (typeof window === "undefined") return null;

  const hash = window.location.hash.slice(1);
  if (!hash.startsWith("share/")) return null;

  const compressed = hash.slice(6);
  if (!compressed) return null;

  try {
    const decompressed = decompressFromEncodedURIComponent(compressed);
    return decompressed || null;
  } catch {
    console.error("Failed to decompress code from URL");
    return null;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}
