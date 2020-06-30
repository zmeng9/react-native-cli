import { useEffect } from 'react'
import { useRoute, useNavigationState } from '@react-navigation/native'
import { resetTo, IResetState } from '@/utils'

/* 
 * route hook
 */

export const useResetRoute = (state: IResetState) => {
  useEffect(() => {
    resetTo(state)
  }, [])
}

export {
  useRoute,
  useNavigationState,
}