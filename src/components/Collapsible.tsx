import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import RnCollapsible, { CollapsibleProps } from 'react-native-collapsible'


export interface ICollapsibleProps extends CollapsibleProps {

}

export const Collapsible: React.SFC<ICollapsibleProps> = observer(({
  children,
  ...collapsibleProps
}) => {
  return (
    <RnCollapsible {...collapsibleProps}>
      {children}
    </RnCollapsible>
  )
})

const styles = StyleSheet.create({
  root: {

  },
})