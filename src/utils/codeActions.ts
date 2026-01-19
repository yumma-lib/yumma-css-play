import { coreUtils } from "@yummacss/api";

// build a map of utilities to their CSS properties (for conflict detection)
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

// find conflicting utilities in a class attribute
function findConflicts(
  text: string,
  lineNumber: number,
  monaco: any,
): Conflict[] {
  const conflicts: Conflict[] = [];

  // match class="..." or class='...'
  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  let classMatch: RegExpExecArray | null;

  while ((classMatch = classRegex.exec(text)) !== null) {
    const classContent = classMatch[1];
    const classStartIndex =
      classMatch.index + classMatch[0].indexOf(classContent);

    const utilities = classContent.split(/\s+/).filter((u) => u.trim() !== "");

    // build a map of utility positions within the class content
    const utilityPositions = new Map<
      string,
      { start: number; end: number }[]
    >();
    let searchStart = 0;
    for (const utility of utilities) {
      const idx = classContent.indexOf(utility, searchStart);
      if (idx !== -1) {
        const positions = utilityPositions.get(utility) || [];
        positions.push({
          start: classStartIndex + idx + 1, // +1 for 1-indexed columns
          end: classStartIndex + idx + utility.length + 1,
        });
        utilityPositions.set(utility, positions);
        searchStart = idx + utility.length;
      }
    }

    // track which properties are set by which utilities
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

    // find properties with multiple utilities (conflicts)
    propertyToUtilities.forEach((utils, property) => {
      if (utils.length > 1) {
        // calculate range that covers just the conflicting utilities
        let minStart = Number.MAX_SAFE_INTEGER;
        let maxEnd = 0;

        for (const util of utils) {
          const positions = utilityPositions.get(util);
          if (positions && positions.length > 0) {
            // use the first occurrence of each utility
            minStart = Math.min(minStart, positions[0].start);
            maxEnd = Math.max(maxEnd, positions[0].end);
          }
        }

        conflicts.push({
          utilities: utils,
          property,
          range: new monaco.Range(lineNumber, minStart, lineNumber, maxEnd),
        });
      }
    });
  }

  return conflicts;
}

export function registerCodeActionsProvider(monaco: any) {
  monaco.languages.registerCodeActionProvider("html", {
    provideCodeActions: (model: any, _range: any, context: any) => {
      const actions: any[] = [];
      const markers = context.markers || [];

      // only provide actions for our conflict markers
      const conflictMarkers = markers.filter(
        (m: any) => m.source === "yummacss",
      );

      for (const marker of conflictMarkers) {
        const _lineContent = model.getLineContent(marker.startLineNumber);

        // parse the utilities from the marker message
        const match = marker.message.match(
          /Conflicting utilities: (.+) \(all set/,
        );
        if (!match) continue;

        const utilities = match[1].split(", ");

        // create a quick fix for each utility (remove the others)
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

// set markers for conflicts
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
        source: "yummacss",
      });
    }
  }

  monaco.editor.setModelMarkers(model, "yummacss", markers);
}

export function setupCodeActions(editor: any, monaco: any) {
  // set initial markers
  updateConflictMarkers(editor, monaco);

  // update markers on content change
  editor.onDidChangeModelContent(() => {
    updateConflictMarkers(editor, monaco);
  });
}
