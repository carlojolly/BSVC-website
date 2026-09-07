import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BSVC — Bocconi Students for Venture Capital",
    short_name: "BSVC",
    description: "Creating a VC and startup ecosystem for Bocconi",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#262626",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      // Opaque, with the glyph pulled into the mask safe zone, so Android can
      // crop it to a circle/squircle without clipping the chevron.
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
