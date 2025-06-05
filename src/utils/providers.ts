import { fetchUtilities } from "./fetchUtilities";

let cachedSuggestions: any[] | null = null;
let lastFetchTime = 0;

export function registerProviders(monaco: any) {
  monaco.languages.registerCompletionItemProvider("html", {
    provideCompletionItems: async function (model: any, position: any) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const match = textUntilPosition.match(/class\s*=\s*"([^"]*)$/);
      if (!match) return { suggestions: [] };

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Cache management (5 minute cache)
      const now = Date.now();
      if (!cachedSuggestions || now - lastFetchTime > 300000) {
        try {
          cachedSuggestions = await fetchUtilities(monaco);
          lastFetchTime = now;
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          return { suggestions: [] };
        }
      }

      // Apply current range to all suggestions
      const suggestionsWithRange = cachedSuggestions.map((suggestion) => ({
        ...suggestion,
        range: range,
      }));

      return { suggestions: suggestionsWithRange };
    },
  });
}
