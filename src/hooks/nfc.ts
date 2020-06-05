import NfcManager, { Ndef, NfcEvents, TagEvent, NfcTech } from 'react-native-nfc-manager'
import { useEffect } from './effect'
import { useToast } from './toast'

/* 
 * Use nfc hook-----
 */


export const useNfc = () => {
  const toast = useToast()

  useEffect(() => {
    NfcManager.start()
    NfcManager.registerTagEvent()
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
      console.log(`tag`, tag)
      toast(JSON.stringify(tag))
    })

    return () => {
      NfcManager.unregisterTagEvent().catch(() => 0)
      NfcManager.cancelTechnologyRequest().catch(() => 0)
    }
  })

  const buildUrlPayload = (valueToWrite: any) => {
    return Ndef.encodeMessage([
      Ndef.uriRecord(valueToWrite),
    ])
  }

  const write = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef)
      console.log(`write resp`, resp)
      let ndef = await NfcManager.getNdefMessage()
      console.log(`write ndef`, ndef)
      // let bytes = buildUrlPayload(`https://www.revteltech.com`)
      const bytes = Ndef.encodeMessage([ Ndef.textRecord(`hello`) ])
      console.log(`bytes`, bytes)
      NfcManager.writeNdefMessage(bytes)
    } catch (err) {
      console.log(`write err`, err)
      NfcManager.cancelTechnologyRequest().catch(() => 0)
    }
  }

  return {
    write,
  }
}
