import { useLayoutEffect } from 'react'


export const useCollapse = (store: any) => {
  const { isLoading, setIsCollapsed } = store

  useLayoutEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsCollapsed(true)
      }, 500)
    }

    return () => {
      setIsCollapsed(false)
    }
  }, [isLoading])
}