import React, { useCallback, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import RnAccordion from 'react-native-collapsible/Accordion'
import { useWindowSize } from '@/hooks'
import { ListItem } from './ListItem'
import { CardHeader, CardFooter } from './Card'


const { width } = useWindowSize()

export interface IAccordionProps {
  title: string
  cardBodyHeight?: number
  data: Array<any>
  activeSections: Array<number>
  renderHeader: (content: any, index?: number, isActive?: boolean, sections?: any[]) => React.ReactElement<{}>
  renderContent: (content: any, index?: number, isActive?: boolean, sections?: any[]) => React.ReactElement<{}>
  onChange: (activeSections: Array<number>) => void
}

export const Accordion: React.FC<IAccordionProps> = observer(({
  title,
  cardBodyHeight = 115,
  data,
  activeSections,
  renderHeader,
  renderContent,
  onChange,
}) => {
  useEffect(() => {
    if (data)
      onChange([data.length - 1])
  }, [])

  const _renderHeader = useCallback(content => {
    return (
      <CardHeader border>
        {renderHeader(content)}
      </CardHeader>
    )
  }, [])

  const _renderContent = useCallback(content => {
    return (
      <CardFooter border style={{ width: width - 10,  aspectRatio: 2.5, marginBottom: 10, alignItems: `flex-end` }}>
        {renderContent(content)}
      </CardFooter>
    )
  }, [])

  const handleAllActived = useCallback(() => {
    onChange(data.map((_, idx) => idx))
  }, [])

  const handleAllUnActive = useCallback(() => {
    onChange([data.length - 1])
  }, [])

  const isAllAactived = activeSections.length === data.length

  return (
    <View style={styles.root}>
      <ListItem
        leftText={title}
        leftTextStyle={{ fontWeight: `bold` }}
        rightText={(data.length < 3) ? undefined : (isAllAactived ? `折叠` : `全部展开`)}
        onPressRightText={isAllAactived ? handleAllUnActive : handleAllActived}
        style={{ marginHorizontal: 0, marginBottom: 10 }}
      />
      <RnAccordion
        sections={data.slice()}
        activeSections={activeSections.slice()}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={onChange}
        touchableComponent={TouchableOpacity}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    marginTop: 5
  },
})