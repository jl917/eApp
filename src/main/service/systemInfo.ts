import si from 'systeminformation';

export const systemInfo = () => {
  return si.getStaticData();
};
