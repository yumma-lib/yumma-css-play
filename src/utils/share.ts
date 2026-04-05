import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export async function createShareUrl(code: string): Promise<string> {
  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) throw new Error("Shorten failed");

    const { id } = await res.json();
    return `${window.location.origin}/share/${id}`;
  } catch {
    // Fallback to hash-based URL if KV is unavailable
    const compressed = compressToEncodedURIComponent(code);
    return `${window.location.origin}/#share/${compressed}`;
  }
}

export function getCodeFromUrl(): string | null {
  if (typeof window === "undefined") return null;

  const hash = window.location.hash.slice(1);
  if (!hash.startsWith("share/")) return null;

  const compressed = hash.slice(6);
  if (!compressed) return null;

  try {
    return decompressFromEncodedURIComponent(compressed) || null;
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