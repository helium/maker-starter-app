/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { BoxProps } from '@shopify/restyle'
import CarotDown from '@assets/images/carot-down.svg'
import Kabob from '@assets/images/kabob.svg'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Colors, Theme } from '../theme/theme'
import HotspotActionSheetItem, {
  HeliumActionSheetItemHeight,
  HeliumActionSheetItemType,
} from './HotspotActionSheetItem'
import { useColors } from '../theme/themeHooks'
import Text, { TextProps } from './Text'
import Box from './Box'
import TouchableOpacityBox from './TouchableOpacityBox'
import HeliumBottomSheet from './HeliumBottomSheet'

type Props = BoxProps<Theme> & {
  data: Array<HeliumActionSheetItemType>
  selectedValue?: string | number
  onValueSelected?: (itemValue: string | number, itemIndex: number) => void
  title?: string
  prefix?: string
  minWidth?: number
  textProps?: TextProps
  prefixTextProps?: TextProps
  buttonProps?: BoxProps<Theme>
  iconColor?: Colors
  initialValue?: string
  iconVariant?: 'carot' | 'kabob' | 'none'
  closeOnSelect?: boolean
  maxModalHeight?: number
  modalVisibility?: boolean
  onclose?: any
}
type ListItem = { item: HeliumActionSheetItemType; index: number }

const HotspotActionSheet = ({
  data: propsData,
  selectedValue,
  onValueSelected,
  title,
  prefix,
  iconVariant = 'carot',
  iconColor: carotColor = 'purpleMain',
  buttonProps,
  initialValue,
  textProps,
  prefixTextProps,
  closeOnSelect = true,
  maxModalHeight,
  modalVisibility,
  onclose,
  ...boxProps
}: Props) => {
  const insets = useSafeAreaInsets()
  const [modalVisible, setModalVisible] = useState(modalVisibility)
  const [sheetHeight, setSheetHeight] = useState(0)
  const [data, setData] = useState<Array<HeliumActionSheetItemType>>([])
  const { t } = useTranslation()
  const colors = useColors()

  useEffect(() => {
    setData(propsData)
    setModalVisible(modalVisibility)
  }, [propsData, setModalVisible, modalVisibility])

  useEffect(() => {
    let nextSheetHeight =
      data.length * HeliumActionSheetItemHeight + 200 + (insets?.bottom || 0)
    if (maxModalHeight && nextSheetHeight > maxModalHeight) {
      nextSheetHeight = maxModalHeight
    }
    setSheetHeight(nextSheetHeight)
  }, [data.length, insets?.bottom, maxModalHeight])

  const handlePresentModalPress = useCallback(async () => {
    setModalVisible(true)
  }, [])

  const handleClose = useCallback(async () => {
    setModalVisible(false)
    onclose(false)
  }, [onclose])

  const keyExtractor = useCallback((item) => item.value, [])

  const buttonTitle = useMemo(() => {
    if (initialValue && !selectedValue) {
      return initialValue
    }
    const item = data.find((d) => d.value === selectedValue)
    return item?.labelShort || item?.label || ''
  }, [data, initialValue, selectedValue])

  const selected = useCallback(
    (value: string | number) => value === selectedValue,
    [selectedValue],
  )

  const handleItemSelected = useCallback(
    (value: string | number, index: number, action?: () => void) =>
      async () => {
        if (closeOnSelect) {
          handleClose()
        }

        if (action) {
          action()
        }
        if (onValueSelected) {
          onValueSelected?.(value, index)
        }
      },
    [closeOnSelect, handleClose, onValueSelected],
  )

  const renderItem = useCallback(
    ({ index, item: { label, value, Icon, action, disabled } }: ListItem) => {
      return (
        <HotspotActionSheetItem
          label={label}
          value={value}
          onPress={handleItemSelected(value, index, action)}
          selected={selected(value)}
          Icon={Icon}
          disabled={disabled}
        />
      )
    },
    [handleItemSelected, selected],
  )

  const footer = useMemo(() => {
    return (
      <Box marginBottom="xl">
        <TouchableOpacityBox
          onPress={handleClose}
          style={{ backgroundColor: colors.primary }}
          height={49}
          marginVertical="m"
          alignItems="center"
          justifyContent="center"
          borderRadius="ms"
        >
          <Text
            variant="medium"
            fontSize={18}
            style={{ color: colors.secondaryText }}
            maxFontSizeMultiplier={1.2}
          >
            {t('generic.cancel')}
          </Text>
        </TouchableOpacityBox>
      </Box>
    )
  }, [handleClose, t, colors])

  const icon = useMemo(() => {
    if (iconVariant === 'none') return

    if (iconVariant === 'kabob') return <Kabob color={colors[carotColor]} />

    return <CarotDown color={colors[carotColor]} />
  }, [carotColor, colors, iconVariant])

  const displayText = useMemo(() => {
    return (
      <TouchableOpacityBox
        onPress={handlePresentModalPress}
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        {...buttonProps}
      >
        <Box flexDirection="row">
          {!!prefix && (
            <Text
              color="black"
              maxFontSizeMultiplier={1}
              marginRight="xs"
              variant="bold"
              fontSize={20}
              {...prefixTextProps}
            >
              {prefix}
            </Text>
          )}
          {!!buttonTitle && (
            <Text
              maxFontSizeMultiplier={1}
              marginRight="s"
              variant="bold"
              fontSize={20}
              color="purpleMain"
              {...textProps}
            >
              {buttonTitle}
            </Text>
          )}
        </Box>
        {icon}
      </TouchableOpacityBox>
    )
  }, [
    handlePresentModalPress,
    buttonProps,
    prefix,
    prefixTextProps,
    buttonTitle,
    textProps,
    icon,
  ])

  return (
    <Box {...boxProps}>
      {displayText}
      <HeliumBottomSheet
        isVisible={modalVisible}
        onClose={handleClose}
        sheetHeight={sheetHeight}
        title={title}
      >
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
        {footer}
      </HeliumBottomSheet>
    </Box>
  )
}

export default memo(HotspotActionSheet)
