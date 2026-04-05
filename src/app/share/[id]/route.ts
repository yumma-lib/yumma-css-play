import { kv } from "@vercel/kv";
import { compressToEncodedURIComponent } from "lz-string";
import { redirect } from "next/navigation";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const code = await kv.get<string>(`share:${id}`);

  if (!code) redirect("/");

  const compressed = compressToEncodedURIComponent(code);
  redirect(`/#share/${compressed}`);
}