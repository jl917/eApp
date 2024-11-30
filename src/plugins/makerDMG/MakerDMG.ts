import path from "path";

import { MakerBase, MakerOptions } from "@electron-forge/maker-base";
import { ForgePlatform } from "@electron-forge/shared-types";
import fs from "fs-extra";
import { createDMG } from "electron-installer-dmg";

import { MakerDMGConfig } from "./Config";

export default class MakerDMG extends MakerBase<MakerDMGConfig> {
  name = "dmg";

  defaultPlatforms: ForgePlatform[] = ["darwin", "mas"];

  isSupportedOnCurrentPlatform(): boolean {
    return process.platform === "darwin";
  }

  async make({ dir, makeDir, appName }: MakerOptions): Promise<string[]> {
    const name = this.config.name || appName;
    const outPath = path.resolve(makeDir, `${name}.dmg`);
    const forgeDefaultOutPath = path.resolve(makeDir, `${name}.dmg`);

    await this.ensureFile(outPath);
    const dmgConfig = {
      overwrite: true,
      name,
      ...this.config,
      appPath: path.resolve(dir, `${name}.app`),
      out: path.dirname(outPath),
    };
    await createDMG(dmgConfig);
    if (!this.config.name) {
      await this.ensureFile(forgeDefaultOutPath);
      await fs.rename(outPath, forgeDefaultOutPath);
      return [forgeDefaultOutPath];
    }

    return [outPath];
  }
}

export { MakerDMG, MakerDMGConfig };
