import { useEffect, useState } from 'react'
import { init, Geolocation } from 'react-native-amap-geolocation'
import { logger } from '@/utils'
import { getLocation } from '@/services'
import { useStores } from './stores'
import { usePermissions } from './permissions'


/* 
 * Get location hook
 */

export interface ILocationReturnType {
  isSelfLoading: boolean
}


export const useLocation = (): ILocationReturnType => {
  const { requestLocation } = usePermissions()
  const { globalStore } = useStores()
  const [isSelfLoading, setIsSelfLoading] = useState(true)

  const { setLocation } = globalStore

  const fetchLocation = async () => {
    setIsSelfLoading(true)

    await requestLocation()

    await init({
      ios: `78b53ab371db6e5c20e091bc032873ee`,
      android: `4b29080d1f0b17b4ab39ecfbb32fb57a`
    })

    Geolocation.getCurrentPosition(async ({ coords }) => {
      logger.success(`--> getCurrentPosition`, coords)

      if (coords) {
        const { longitude, latitude } = coords

        if (!longitude) {
          setLocation({ city: `深圳` })
          return
        }

        const result = await getLocation({
          location: `${longitude.toFixed(6)}, ${latitude.toFixed(6)}`
        })

        logger.success(`--> /v3/geocode/regeo`, result)

        if (result) {
          const { status, regeocode } = result.data

          if (status) {
            const { city, district } = regeocode.addressComponent
            setLocation({
              city: typeof city === `object` ? `深圳` : city.slice(0, -1),
              district: typeof district === `object` ? `` : district.slice(0, -1),
            })
            setIsSelfLoading(false)
          }
        }
      }
    }, error => {
      console.log(`err`, error.message)
    })
  }

  useEffect(() => {
    // fetchLocation()
  }, [])

  return {
    isSelfLoading,
  }
}