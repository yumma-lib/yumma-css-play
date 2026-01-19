import { coreUtils } from "@yummacss/api";
import * as vscode from "vscode";

export interface UtilityInfo {
  cssValue: string;
  slug: string;
  properties: string[];
  prefix: string;
}

// build a lookup map for all utilities
export function buildUtilityMap(): Map<string, UtilityInfo> {
  const map = new Map<string, UtilityInfo>();
  const allUtils = coreUtils();

  for (const util of Object.values(allUtils)) {
    const slug = util.slug || "";
    const properties = util.properties || [];
    const prefix = util.prefix || "";

    for (const [suffix, cssValue] of Object.entries(util.values)) {
      const fullPrefix =
        suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;

      map.set(fullPrefix, {
        cssValue: String(cssValue),
        slug,
        properties,
        prefix,
      });
    }
  }

  return map;
}

// parse utility to extract variants and base utility
export interface ParsedUtility {
  variants: string[];
  baseUtility: string;
}

export function parseUtility(className: string): ParsedUtility {
  const parts = className.split(":");
  if (parts.length === 1) {
    return { variants: [], baseUtility: className };
  }

  return {
    variants: parts.slice(0, -1),
    baseUtility: parts[parts.length - 1],
  };
}

// get all completion items for Yumma CSS utilities
export function getCompletionItems(): vscode.CompletionItem[] {
  try {
    const allUtils = coreUtils();
    const items: vscode.CompletionItem[] = [];

    for (const util of Object.values(allUtils)) {
      for (const [suffix, cssValue] of Object.entries(util.values)) {
        const fullPrefix =
          suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const cssProperty = util.properties[0]; // take the first property for display

        const item = new vscode.CompletionItem(
          fullPrefix,
          vscode.CompletionItemKind.Constant,
        );
        item.detail = `${cssProperty}: ${cssValue};`;
        item.documentation = new vscode.MarkdownString(
          `\`\`\`css\n${cssProperty}: ${cssValue};\n\`\`\``,
        );
        item.insertText = fullPrefix;

        items.push(item);
      }
    }

    return items;
  } catch (error) {
    console.error("Error getting utilities:", error);
    return [];
  }
}

// find utilities in a line of text
export interface UtilityMatch {
  utility: string;
  startColumn: number;
  endColumn: number;
}

export function findUtilitiesInLine(
  text: string,
  _lineNumber: number,
): UtilityMatch[] {
  const results: UtilityMatch[] = [];
  const utilityMap = buildUtilityMap();

  // match class attributes: class="..." or className="..."
  const classRegex = /(?:class|className)\s*=\s*"([^"]*)"/g;
  let classMatch: RegExpExecArray | null;

  while ((classMatch = classRegex.exec(text)) !== null) {
    const classContent = classMatch[1];
    const classStartIndex =
      classMatch.index + classMatch[0].indexOf(classContent);

    const utilities = classContent.split(/\s+/);
    let currentIndex = 0;

    for (const utility of utilities) {
      if (utility.trim() === "") {
        currentIndex++;
        continue;
      }

      const utilityIndex = classContent.indexOf(utility, currentIndex);
      const { baseUtility } = parseUtility(utility);

      if (utilityMap.has(baseUtility)) {
        results.push({
          utility,
          startColumn: classStartIndex + utilityIndex + 1,
          endColumn: classStartIndex + utilityIndex + utility.length + 1,
        });
      }

      currentIndex = utilityIndex + utility.length;
    }
  }

  return results;
}
