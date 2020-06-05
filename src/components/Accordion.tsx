import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'
import RnAccordion from 'react-native-collapsible/Accordion'
import { CardHeader, CardFooter } from './Card'


export interface IAccordionProps {
  cardBodyHeight?: number
  data: Array<any>
  activeSections: Array<number>
  renderHeader: (content: any, index?: number, isActive?: boolean, sections?: any[]) => React.ReactElement<{}>
  renderContent: (content: any, index?: number, isActive?: boolean, sections?: any[]) => React.ReactElement<{}>
  onChange: (activeSections: Array<number>) => void
}

export const Accordion: React.SFC<IAccordionProps> = observer(({
  cardBodyHeight = 115,
  data,
  activeSections,
  renderHeader,
  renderContent,
  onChange,
}) => {
  const _renderHeader = useCallback(content => {
    return (
      <CardHeader border>
        {renderHeader(content)}
      </CardHeader>
    )
  }, [])

  const _renderContent = useCallback(content => {
    return (
      <CardFooter border style={{ height: cardBodyHeight, marginBottom: 10, alignItems: `flex-end` }}>
        {renderContent(content)}
      </CardFooter>
    )
  }, [])

  return (
    <RnAccordion
      sections={data.slice()}
      activeSections={activeSections}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={onChange}
      touchableComponent={TouchableOpacity}
      containerStyle={{ marginTop: 10 }}
    />
  )
})

const styles = StyleSheet.create({
  root: {
  },
})