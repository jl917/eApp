import path from "path";

import { MakerBase, MakerOptions } from "@electron-forge/maker-base";
import { ForgePlatform } from "@electron-forge/shared-types";
import { createWindowsInstaller, Options as ElectronWinstallerOptions } from "electron-winstaller";
import fs from "fs-extra";
import { getVersion } from "../../utils";

export type MakerSquirrelConfig = Omit<ElectronWinstallerOptions, "appDirectory" | "outputDirectory">;

const version = getVersion();

export default class MakerSquirrel extends MakerBase<MakerSquirrelConfig> {
  name = "squirrel";

  defaultPlatforms: ForgePlatform[] = ["win32"];

  isSupportedOnCurrentPlatform(): boolean {
    return this.isInstalled("electron-winstaller") && !process.env.DISABLE_SQUIRREL_TEST;
  }

  async make({ dir, makeDir, targetArch, packageJSON, appName, forgeConfig }: MakerOptions): Promise<string[]> {
    const outPath = path.resolve(makeDir, `squirrel.windows/${targetArch}`);
    await this.ensureDirectory(outPath);

    const winstallerConfig: ElectronWinstallerOptions = {
      name: typeof packageJSON.name === "string" ? packageJSON.name.replace(/-/g, "_") : undefined, // squirrel hates hyphens
      title: appName,
      noMsi: true,
      exe: `${forgeConfig.packagerConfig.executableName || appName}.exe`,
      setupExe: `${appName}-${version} Setup.exe`,
      ...this.config,
      appDirectory: dir,
      outputDirectory: outPath,
    };

    await createWindowsInstaller(winstallerConfig);

    const artifacts = [
      path.resolve(outPath, "RELEASES"),
      path.resolve(outPath, winstallerConfig.setupExe || `${appName}Setup.exe`),
      path.resolve(outPath, `${winstallerConfig.name}-${version}-full.nupkg`),
    ];
    const deltaPath = path.resolve(outPath, `${winstallerConfig.name}-${version}-delta.nupkg`);
    if (winstallerConfig.remoteReleases && !winstallerConfig.noDelta && (await fs.pathExists(deltaPath))) {
      artifacts.push(deltaPath);
    }
    const msiPath = path.resolve(outPath, winstallerConfig.setupMsi || `${appName}Setup.msi`);
    if (!winstallerConfig.noMsi && (await fs.pathExists(msiPath))) {
      artifacts.push(msiPath);
    }
    return artifacts;
  }
}

export { MakerSquirrel };
