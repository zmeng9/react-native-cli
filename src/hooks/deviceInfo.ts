import { useIsEmulator } from 'react-native-device-info'


export const useDeviceInfo = () => {
  const isEmulator  = useIsEmulator()


  return {
    isEmulator,
  }
}