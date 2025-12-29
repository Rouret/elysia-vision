import rootPackageJson from "../package.json";
import visionPackageJson from "../packages/vision/package.json";
import webappPackageJson from "../packages/webapp/package.json";

visionPackageJson.version = rootPackageJson.version;
webappPackageJson.version = rootPackageJson.version;

Bun.write(
  "packages/vision/package.json",
  JSON.stringify(visionPackageJson, null, 2)
);
Bun.write(
  "packages/webapp/package.json",
  JSON.stringify(webappPackageJson, null, 2)
);
