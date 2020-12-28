export interface VersionManifest {
  latest: {
    release: string;
    snapshot: string;
  };
  versions: {
    id: string;
    type: "release" | "snapshot" | "old_beta" | "old_alpha";
    url: string;
    time: string;
    releaseTime: string;
  }[];
}

export default async function getVersions(): Promise<VersionManifest> {
  const res = await fetch(
    "https://launchermeta.mojang.com/mc/game/version_manifest.json"
  );
  const data: VersionManifest = await res.json();

  data.versions.filter(({ type, releaseTime }) => {
    if (type === "release" || type === "snapshot") return true;
    if (releaseTime >= "2012-02-29T22:00:00+00:00") return true; // 1.2.1 release

    return false;
  });

  return data;
}
