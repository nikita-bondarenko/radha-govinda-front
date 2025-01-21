

import { Metadata } from "next";
import React from "react";

export default function getDynamicMetadata({
  title,
  description,
  smallImageUrl,
  bigImageUrl,
  favicon
}: {
  title?: string | null;
  description?: string | null;
  smallImageUrl?: string | null;
  bigImageUrl?: string | null;
  favicon?: string | null;
}) {
  return {
    title: title,
    description: description,
    icons: {
      icon: (favicon || '')
    },
    meta: {
      property: "vk:image",
      content: (smallImageUrl || ''),
    },
    openGraph: {
      type: "website",
      title: title,
      description: description,
      siteName: "Radha Govinda Dasa",
      images: [
        {
          url: (bigImageUrl || ''),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@site",
      creator: "@creator",
      images: [
        {
          url: (bigImageUrl + ''),
          width: 1200,
          height: 630,
        },
      ],
    },
  } as Metadata;
}
