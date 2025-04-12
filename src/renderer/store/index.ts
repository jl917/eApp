import { atom } from 'jotai';

export const displaysAtom = atom<ChannelDisplay[]>([]);
export const versionAtom = atom<string>('');
export const systemInfoAtom = atom<any>({});
