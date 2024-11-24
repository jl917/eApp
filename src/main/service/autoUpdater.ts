import { updateElectronApp } from "update-electron-app";

export function setupAutoUpdater() {
  updateElectronApp({
    repo: "jl917/eApp",
    updateInterval: "5 minutes",
    notifyUser: true,
  });
}
