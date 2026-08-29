"use client";

import { forwardRef, useMemo } from "react";

interface PreviewProps {
  code: string;
}

// Pinned deliberately. Unversioned, this tracked `latest`, so the playground's
// behaviour could change with no deploy and no commit. `next.config.ts` reads
// the number off the `yummacss` devDependency, so the pin moves with it.
const RUNTIME_VERSION = process.env.NEXT_PUBLIC_RUNTIME_VERSION;

const Preview = forwardRef<HTMLIFrameElement, PreviewProps>(({ code }, ref) => {
  const srcdoc = useMemo(
    () => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/@yummacss/runtime@${RUNTIME_VERSION}"></script>
  </head>
  <style> html, body { background-color: white; } </style>
  <body>${code}</body>
</html>`,
    [code],
  );

  return (
    <iframe
      ref={ref}
      srcDoc={srcdoc}
      title="Preview"
      className="b-0 w-100% h-100%"
    />
  );
});

Preview.displayName = "Preview";

export default Preview;
