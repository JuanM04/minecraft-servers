import { GetStaticProps } from "next";
import getVersions, { VersionManifest } from "lib/get-versions";

const DownlaodIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

export const getStaticProps: GetStaticProps<VersionManifest> = async () => ({
  props: await getVersions(),
  revalidate: 60 * 10, // 10 Minutes
});

export default function Homepage({ latest, versions }: VersionManifest) {
  return (
    <main>
      <section className="hero pt-20 pb-12 flex justify-center items-center flex-col gap-8">
        <h1 className="text-white text-4xl font-semibold">Minecraft Servers</h1>
        <div className="rounded-md bg-lime-300 border border-lime-600 py-2 px-4">
          <p className="text-sm font-medium">Public API</p>
          <code className="text-xs">
            https://minecraft-servers.vercel.app/api/download/1.16.4
          </code>
        </div>
      </section>
      <div className="divide-x w-full grid grid-cols-2">
        <section className="px-4 text-right">
          <h2 className="font-medium text-lg mt-2">Releases</h2>
          {versions
            .filter(({ type }) => type === "release")
            .map(({ id }) => (
              <a
                key={id}
                className="block font-mono text-sm text-gray-900 hover:text-gray-600 cursor-pointer transition-colors my-2"
                href={`/api/download/${id}`}
              >
                {id}
              </a>
            ))}
        </section>
        <section className="px-4 text-left">
          <h2 className="font-medium text-lg mt-2">Snapshots</h2>
          {versions
            .filter(({ type }) => type === "snapshot")
            .map(({ id }) => (
              <a
                key={id}
                className="block font-mono text-sm text-gray-900 hover:text-gray-600 cursor-pointer transition-colors my-2"
                href={`/api/download/${id}`}
              >
                {id}
              </a>
            ))}
        </section>
      </div>
    </main>
  );
}
