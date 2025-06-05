export async function fetchUtilities(monaco: any): Promise<any[]> {
  try {
    const response = await fetch("https://get.yummacss.com/api/all-utilities");
    if (!response.ok) throw new Error("Failed to fetch suggestions");

    const data = await response.json();

    return data.map((util: any) => ({
      detail: util.property.join(" "),
      insertText: util.utility,
      kind: monaco.languages.CompletionItemKind.Constant,
      label: util.utility,
    }));
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}
