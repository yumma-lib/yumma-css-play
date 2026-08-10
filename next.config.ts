/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        /*
         * Only /embed is framable. The default for everything else stays
         * "not framed at all", so the full playground - which has the share
         * button and talks to the KV-backed shortener - cannot be wrapped by
         * a third-party page.
         */
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://yummacss.com https://*.yummacss.com https://*.vercel.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
