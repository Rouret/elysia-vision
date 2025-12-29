//From https://github.com/elysiajs/elysia-cors/blob/main/build.ts
import { $ } from "bun";
import { build, type Options } from "tsup";

const buildDistPath = "dist";

await $`rm -rf ${buildDistPath}`;

const tsupConfig: Options = {
  entry: ["src/**/*.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  bundle: true,
} satisfies Options;

await Promise.all([
  // ? tsup esm
  build({
    outDir: buildDistPath,
    format: "esm",
    target: "node20",
    cjsInterop: false,
    ...tsupConfig,
  }),
  // ? tsup cjs
  build({
    outDir: `${buildDistPath}/cjs`,
    format: "cjs",
    target: "node20",
    dts: true,
    ...tsupConfig,
  }),
]);

await Promise.all([$`cp dist/cjs/*.d.ts dist`]);

process.exit();
