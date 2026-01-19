import { coreUtils } from "@yummacss/api";

interface UtilityInfo {
  cssValue: string;
  slug: string;
  properties: string[];
}

// build a lookup map for all utilities
function buildUtilityMap(): Map<string, UtilityInfo> {
  const map = new Map<string, UtilityInfo>();
  const allUtils = coreUtils();

  Object.values(allUtils).forEach((util: any) => {
    const slug = util.slug || "";
    const properties = util.properties || [];

    Object.entries(util.values).forEach(([suffix, cssValue]) => {
      const fullPrefix =
        suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;

      map.set(fullPrefix, {
        cssValue: String(cssValue),
        slug,
        properties,
      });
    });
  });

  return map;
}

const utilityMap = buildUtilityMap();

// variant prefixes
const mediaVariants: Record<string, string> = {
  sm: "@media (min-width: 40rem)",
  md: "@media (min-width: 48rem)",
  lg: "@media (min-width: 64rem)",
  xl: "@media (min-width: 80rem)",
  xxl: "@media (min-width: 96rem)",
};

const pseudoVariants: Record<string, string> = {
  hover: ":hover",
  focus: ":focus",
  active: ":active",
};

// parse a utility class and extract variant and base utility
function parseUtility(className: string): {
  variants: string[];
  baseUtility: string;
} {
  const parts = className.split(":");
  const baseUtility = parts.pop() || className;
  return { variants: parts, baseUtility };
}

// get hover content for a utility
function getHoverContent(className: string): string | null {
  const { variants, baseUtility } = parseUtility(className);
  const info = utilityMap.get(baseUtility);

  if (!info) return null;

  let content = "";

  // build the CSS representation
  const cssDeclaration = info.properties
    .map((prop) => `${prop}: ${info.cssValue};`)
    .join("\n");

  // add variant context
  if (variants.length > 0) {
    const variantDescriptions: string[] = [];

    variants.forEach((v) => {
      if (mediaVariants[v]) {
        variantDescriptions.push(`**Media:** \`${mediaVariants[v]}\``);
      } else if (pseudoVariants[v]) {
        variantDescriptions.push(`**Pseudo:** \`${pseudoVariants[v]}\``);
      } else {
        variantDescriptions.push(`**Variant:** \`${v}\``);
      }
    });

    content += `${variantDescriptions.join("\n\n")}\n\n---\n\n`;
  }

  // add CSS
  content += `\`\`\`css\n${cssDeclaration}\n\`\`\``;

  // add doc link
  if (info.slug) {
    content += `\n\n[Yumma CSS Reference](https://yummacss.com/docs/${info.slug})`;
  }

  return content;
}

// find utilities in text
function findUtilities(
  text: string,
  _lineNumber: number,
): Array<{ utility: string; startColumn: number; endColumn: number }> {
  const results: Array<{
    utility: string;
    startColumn: number;
    endColumn: number;
  }> = [];

  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  let classMatch: RegExpExecArray | null = null;

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

export function registerHoverProvider(monaco: any) {
  return monaco.languages.registerHoverProvider("html", {
    provideHover: (model: any, position: any) => {
      const lineContent = model.getLineContent(position.lineNumber);
      const utilities = findUtilities(lineContent, position.lineNumber);

      for (const { utility, startColumn, endColumn } of utilities) {
        // check if cursor is within this utility
        if (position.column >= startColumn && position.column <= endColumn) {
          const content = getHoverContent(utility);
          if (content) {
            return {
              range: new monaco.Range(
                position.lineNumber,
                startColumn,
                position.lineNumber,
                endColumn,
              ),
              contents: [{ value: content, isTrusted: true }],
            };
          }
        }
      }

      return null;
    },
  });
}
