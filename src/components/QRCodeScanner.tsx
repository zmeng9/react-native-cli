import React, { useCallback, useState } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { observer } from 'mobx-react-lite'
import { QRscanner, QRreader } from 'react-native-qr-scanner'
import { useToast, useImagePicker, useNormalize } from '@/hooks'
import { Icon } from './Icon'
import { BackIcon } from './BackIcon'


export interface IQRCodeScannerProps {
  onSuccess: (e: any) => void
}

export const QRCodeScanner: React.FC<IQRCodeScannerProps> = observer(({
  onSuccess,
}) => {
  const toast = useToast()
  const { normalizeSize } = useNormalize()
  const { pickImageFromAlbum } = useImagePicker()
  const [isOpenFlashlight, setIsOpenFlashlight] = useState(false)

  const handleOpenFlashlight = useCallback(() => {
    setIsOpenFlashlight(!isOpenFlashlight)
  }, [isOpenFlashlight])

  const onRead = (e: any) => {
    try {
      onSuccess(e)
    } catch (err) {
      console.log(`QRCodeRead err`, err)
      toast(`请扫描正确的二维码`)
    }
  }

  const handlePickImage = async () => {
    console.log(`QRreader`, QRreader)
    pickImageFromAlbum(async (response) => {
      if (response.uri) {
        let path = response.path

        if (!path)
          path = response.uri

        try {
          const data = await QRreader(path)
          console.log(`QRreader data`, data)

          onSuccess({ data })
        } catch (err) {
          console.log(`QRreader err`, err)
          toast(`识别失败`)
        }
      }
    })
  }

  const renderFooter = useCallback(() => (
    <View style={styles.footer}>
      <BackIcon type='down' alwaysWhite size={30} />
      <Icon
        name='ios-flashlight'
        alwaysWhite={!isOpenFlashlight} color={isOpenFlashlight ? `primary` : undefined}
        size={30}
        onPress={handleOpenFlashlight}
      />
      <Icon name='ios-image' alwaysWhite size={30} onPress={handlePickImage} />
    </View>
  ), [isOpenFlashlight])

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor='transparent' />
      <QRscanner
        onRead={onRead}
        maskColor='transparent'
        renderBottomView={renderFooter}
        flashMode={isOpenFlashlight}
        finderY={50}
        zoom={0}
        rectWidth={220}
        cornerColor='#fff'
        rectHeight={220}
        hintText='查找二维码以扫描'
        isShowScanBar={false}
        hintTextStyle={{
          fontSize: normalizeSize(18),
          color: `#fff`,
          backgroundColor: `transparent`,
        }}
        bottomViewStyle={{
          backgroundColor: `transparent`,
        }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: `#000`,
  },
  footer: {
    flex: 1,
    flexDirection: `row`,
    justifyContent: `space-between`,
    paddingHorizontal: 10,
  },
})