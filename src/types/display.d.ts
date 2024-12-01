interface DisplayInfoBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface DisplayInfo {
  id: number;
  name: string;
  bounds: DisplayInfoBounds;
  isPrimary: boolean;
}
