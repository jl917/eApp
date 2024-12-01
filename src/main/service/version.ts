import { rendererToMain, mainToRenderer } from "@main/common/bridge";

export const getMainVersion = () => {
  rendererToMain("version", () => {
    mainToRenderer("version", MAIN_VERSION);
  });
};
