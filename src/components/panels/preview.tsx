"use client";

import { forwardRef, useMemo } from "react";

interface PreviewProps {
  code: string;
}

const Preview = forwardRef<HTMLIFrameElement, PreviewProps>(({ code }, ref) => {
  const srcdoc = useMemo(
    () => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/@yummacss/runtime"></script>
  </head>
  <style> html, body { background: white; } </style>
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
