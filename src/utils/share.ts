import ky from "ky";

const idLength = 10;
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateShareId(): string {
  let result = "";
  for (let i = 0; i < idLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createShareUrl(code: string): Promise<string | null> {
  try {
    const shareId = generateShareId();

    await ky.post("/api/share", {
      json: { id: shareId, code },
    });

    const url = new URL(window.location.href);
    url.searchParams.set("share", shareId);

    return url.toString();
  } catch (error) {
    console.error("Error creating share URL:", error);
    return null;
  }
}

export async function getCodeFromUrl(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const shareId = params.get("share");

  if (!shareId) return null;

  try {
    const data = await ky
      .get("/api/share", {
        searchParams: { id: shareId },
      })
      .json<{ code: string }>();

    return data.code;
  } catch (error) {
    console.error("Error fetching shared code:", error);
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
