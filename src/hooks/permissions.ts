import { PermissionsAndroid } from 'react-native'
import { useToast } from './toast'
import { usePlatform } from './platform'


/* 
 * Permissions hook
 */


export const usePermissions = () => {
  const toast = useToast()
  const { isAndroid } = usePlatform()

  const requestWirteFile = async () => {
    try {
      if (isAndroid)
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    } catch (err) {
      toast(`您已拒绝授权，将无法读存文件`)
    }
  }

  const requestLocation = async () => {
    try {
      if (isAndroid)
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
    } catch (err) {
      toast(`您已拒绝授权，将无法获取确切位置`)
    }
  }


  return {
    requestWirteFile,
    requestLocation,
  }
}