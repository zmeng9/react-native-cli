import { useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll'
import { captureRef } from 'react-native-view-shot'
import { useToast } from './toast'
import { usePermissions } from './permissions'


/* 
 * File opt hook
 */


export const useFs = () => {
  const toast = useToast()
  const { requestWirteFile } = usePermissions()
  const [isFsExecOpting, setIsFsExecOpting] = useState(false)

  const saveToAlbum = async (uri: any) => {
    await requestWirteFile()
    try {
      setIsFsExecOpting(true)
      await CameraRoll.save(uri)
      toast(`已保存`)
    } catch (err) {
      console.log(`saveToAlbum err`, err)
      toast(`保存失败`)
    } finally {
      setIsFsExecOpting(false)
    }
  }

  const shotAndSaveToAlbum = async (ref: any) => {
    try {
      setIsFsExecOpting(true)
      const uri = await captureRef(ref)
      saveToAlbum(uri)
    } catch (err) {
      console.error(`snapshot failed`, err)
    }
  }

  return {
    isFsExecOpting,
    saveToAlbum,
    shotAndSaveToAlbum,
  }
}