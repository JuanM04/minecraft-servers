import { NextApiHandler } from "next";
import getVersions from "lib/get-versions";

const handler: NextApiHandler = async (req, res) => {
  const id = req.query?.id;

  if (typeof id !== "string") {
    return res.status(400).send("Missing ID");
  }

  const { versions } = await getVersions();

  const versionIndex = versions.findIndex((version) => version.id === id);
  if (versionIndex === -1) {
    return res.status(404).send("Version not found");
  }

  if (id === "1.2.1" || id === "1.2.2" || id === "1.2.3") {
    res.redirect("https://assets.minecraft.net/1_2/minecraft_server.jar");
  } else if (id === "1.2.4") {
    res.redirect("https://assets.minecraft.net/1_2_5/minecraft_server.jar");
  } else {
    try {
      const versionData = await fetch(versions[versionIndex].url).then((res) =>
        res.json()
      );
      const url = versionData?.downloads?.server?.url;

      if (typeof url === "string") res.redirect(url);
      else throw new Error();
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
};

export default handler;
