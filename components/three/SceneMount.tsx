"use client";

import dynamic from "next/dynamic";

const UniverseScene = dynamic(() => import("./UniverseScene"), {
  ssr: false,
  loading: () => null,
});

export default function SceneMount() {
  return <UniverseScene />;
}
