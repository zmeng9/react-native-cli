import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker'


/* 
 * Image picker hook
 */


export const useImagePicker = () => {
  const pickImage = (title: string, cb: (response: any) => void) => {
    ImagePicker.showImagePicker({
      title,
      takePhotoButtonTitle: `拍照`,
      chooseFromLibraryButtonTitle: `从相册中选取`,
      cancelButtonTitle: `取消`,
    }, response => {
      console.log(`pickImage response`, response)

      if (response.error)
        console.log(`pickImage Error: `, response.error)
      else
        cb(response)
    })
  }

  const pickImageFromAlbum = (cb: (response: any) => void) => {
    ImagePicker.launchImageLibrary({}, response => {
      console.log(`pickImageFromAlbum response`, response)

      if (response.error)
        console.log(`pickImageFromAlbum Error: `, response.error)
      else
        cb(response)
    })
  }


  return {
    pickImage,
    pickImageFromAlbum,
  }
}