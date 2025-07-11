import { getAllUtils } from "@yummacss/api";

export function getUtilities(monaco: any): any[] {
  try {
    const allUtils = getAllUtils();
    const suggestions: any[] = [];

    // Iterate through each utility category
    Object.values(allUtils).forEach((util: any) => {
      // Iterate through each value in the utility
      Object.entries(util.values).forEach(([suffix, cssValue]) => {
        const fullPrefix = suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const cssProperty = util.properties[0]; // Take the first property for display

        suggestions.push({
          label: fullPrefix,
          insertText: fullPrefix,
          detail: `${cssProperty}: ${cssValue};`,
          kind: monaco.languages.CompletionItemKind.Constant,
        });
      });
    });

    return suggestions;
  } catch (error) {
    console.error("Error getting utilities:", error);
    return [];
  }
}
