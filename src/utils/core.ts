import { coreUtils } from "@yummacss/core";

export function getUtils(monaco: any): any[] {
  try {
    const allUtils = coreUtils();
    const suggestions: any[] = [];

    // iterate through each utility category
    Object.values(allUtils).forEach((util: any) => {
      // iterate through each value in the utility
      Object.entries(util.values).forEach(([suffix, cssValue]) => {
        const fullPrefix =
          suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const cssProperty = util.properties[0]; // take the first property for display

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
