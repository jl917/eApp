import si from 'systeminformation';
// import Store from 'electron-store';

// const store = new Store();

const sortObjectByKeys = (obj: Record<string, any>) => {
  const sortedKeys = Object.keys(obj).sort(); // 키를 알파벳 순으로 정렬
  const sortedObj: Record<string, any> = {};

  // 정렬된 키 순서대로 새 객체 생성
  // eslint-disable-next-line no-restricted-syntax
  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
};

export const systemInfo = async () => {
  // if (store.has('systemInfo')) {
  //   return store.get('systemInfo');
  // }

  const defaultData = await si.getAllData();
  const audio = await si.audio();
  const usb = await si.usb();
  const printer = await si.printer();
  const networkInterfaces = await si.networkInterfaces();
  const bluetoothDevices = await si.bluetoothDevices();

  const result = {
    ...defaultData,
    audio,
    usb,
    printer,
    networkInterfaces,
    bluetoothDevices,
  };

  // store.set('systemInfo', result);
  return sortObjectByKeys(result);
};
