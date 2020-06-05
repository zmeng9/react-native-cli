import { usePlatform } from './platform'


/* 
 * Responsive size hook
 */

export const useNormalize = () => {
  const { isAndroid } = usePlatform()

  const normalizeSize = (size: number) => {
    return isAndroid ? size - 2 : size
  }
  
  return {
    normalizeSize,
  }
}