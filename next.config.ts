import { createRequire } from "node:module";

/*
 * The preview iframe pulls the runtime off a CDN, so its version is not a
 * dependency and nothing bumps it. Reading it off the `yummacss` devDependency
 * makes Dependabot's PR move the playground as well as the site around it.
 * Still a pin, so the runtime cannot change under a deployed build.
 */
const { devDependencies } = createRequire(import.meta.url)("./package.json");
const runtimeVersion = devDependencies.yummacss.replace(/^\D*/, "");
if (!/^\d+\.\d+\.\d+/.test(runtimeVersion)) {
  throw new Error(
    `Cannot read a runtime version from "${devDependencies.yummacss}".`,
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_RUNTIME_VERSION: runtimeVersion,
  },

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
