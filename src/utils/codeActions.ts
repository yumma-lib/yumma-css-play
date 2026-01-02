import { coreUtils } from "@yummacss/api";

// Build a map of utilities to their CSS properties (for conflict detection)
function buildPropertyMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const allUtils = coreUtils();

  Object.values(allUtils).forEach((util: any) => {
    Object.entries(util.values).forEach(([suffix]) => {
      const fullPrefix =
        suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
      map.set(fullPrefix, util.properties);
    });
  });

  return map;
}

const propertyMap = buildPropertyMap();

interface Conflict {
  utilities: string[];
  property: string;
  range: any;
}

// Find conflicting utilities in a class attribute
function findConflicts(
  text: string,
  lineNumber: number,
  monaco: any,
): Conflict[] {
  const conflicts: Conflict[] = [];

  // Match class="..." or class='...'
  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  let classMatch: RegExpExecArray | null;

  while ((classMatch = classRegex.exec(text)) !== null) {
    const classContent = classMatch[1];
    const classStartIndex =
      classMatch.index + classMatch[0].indexOf(classContent);

    const utilities = classContent.split(/\s+/).filter((u) => u.trim() !== "");

    // Track which properties are set by which utilities
    const propertyToUtilities = new Map<string, string[]>();

    utilities.forEach((utility) => {
      const properties = propertyMap.get(utility);
      if (!properties) return;

      properties.forEach((prop) => {
        const existing = propertyToUtilities.get(prop) || [];
        existing.push(utility);
        propertyToUtilities.set(prop, existing);
      });
    });

    // Find properties with multiple utilities (conflicts)
    propertyToUtilities.forEach((utils, property) => {
      if (utils.length > 1) {
        // Find the range of the class attribute
        const startColumn = classStartIndex + 1;
        const endColumn = classStartIndex + classContent.length + 1;

        conflicts.push({
          utilities: utils,
          property,
          range: new monaco.Range(
            lineNumber,
            startColumn,
            lineNumber,
            endColumn,
          ),
        });
      }
    });
  }

  return conflicts;
}

export function registerCodeActionsProvider(monaco: any) {
  monaco.languages.registerCodeActionProvider("html", {
    provideCodeActions: (model: any, range: any, context: any) => {
      const actions: any[] = [];
      const markers = context.markers || [];

      // Only provide actions for our conflict markers
      const conflictMarkers = markers.filter(
        (m: any) => m.source === "yumma-css",
      );

      for (const marker of conflictMarkers) {
        const lineContent = model.getLineContent(marker.startLineNumber);

        // Parse the utilities from the marker message
        const match = marker.message.match(
          /Conflicting utilities: (.+) \(all set/,
        );
        if (!match) continue;

        const utilities = match[1].split(", ");

        // Create a quick fix for each utility (remove the others)
        utilities.forEach((keepUtil: string) => {
          const othersToRemove = utilities.filter(
            (u: string) => u !== keepUtil,
          );

          actions.push({
            title: `Keep "${keepUtil}", remove ${othersToRemove.map((u: string) => `"${u}"`).join(", ")}`,
            kind: "quickfix",
            diagnostics: [marker],
            edit: {
              edits: [
                {
                  resource: model.uri,
                  textEdit: {
                    range: marker,
                    text: (() => {
                      const original = model.getValueInRange(marker);
                      let result = original;
                      othersToRemove.forEach((util: string) => {
                        result = result.replace(
                          new RegExp(`\\b${util}\\b\\s*`, "g"),
                          "",
                        );
                      });
                      return result.replace(/\s+/g, " ").trim();
                    })(),
                  },
                },
              ],
            },
          });
        });
      }

      return { actions, dispose: () => {} };
    },
  });
}

// Set markers for conflicts
export function updateConflictMarkers(editor: any, monaco: any) {
  const model = editor.getModel();
  if (!model) return;

  const markers: any[] = [];

  for (let lineNumber = 1; lineNumber <= model.getLineCount(); lineNumber++) {
    const lineContent = model.getLineContent(lineNumber);
    const conflicts = findConflicts(lineContent, lineNumber, monaco);

    for (const conflict of conflicts) {
      markers.push({
        severity: monaco.MarkerSeverity.Warning,
        message: `Conflicting utilities: ${conflict.utilities.join(", ")} (all set "${conflict.property}")`,
        startLineNumber: conflict.range.startLineNumber,
        startColumn: conflict.range.startColumn,
        endLineNumber: conflict.range.endLineNumber,
        endColumn: conflict.range.endColumn,
        source: "yumma-css",
      });
    }
  }

  monaco.editor.setModelMarkers(model, "yumma-css", markers);
}

export function setupCodeActions(editor: any, monaco: any) {
  // Register the code actions provider
  registerCodeActionsProvider(monaco);

  // Set initial markers
  updateConflictMarkers(editor, monaco);

  // Update markers on content change
  editor.onDidChangeModelContent(() => {
    updateConflictMarkers(editor, monaco);
  });
}
