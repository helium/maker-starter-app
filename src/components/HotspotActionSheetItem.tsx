import React, { memo } from 'react'
import { SvgProps } from 'react-native-svg'
import { useColors } from '../theme/themeHooks'
import Text from './Text'
import TouchableOpacityBox from './TouchableOpacityBox'

export type HeliumActionSheetItemType = {
  label: string
  labelShort?: string
  value: string | number
  Icon?: React.FC<SvgProps>
  action?: () => void
  disabled?: boolean
}
type Props = HeliumActionSheetItemType & {
  onPress: () => void
  selected: boolean
}

export const HeliumActionSheetItemHeight = 50

const HotspotActionSheetItem = ({
  label,
  onPress,
  selected,
  Icon,
  disabled,
}: Props) => {
  const { primary, grayHighlight } = useColors()

  if (disabled) {
    return (
      <TouchableOpacityBox
        height={HeliumActionSheetItemHeight}
        onPress={onPress}
        alignItems="center"
        flexDirection="row"
        disabled={disabled}
      >
        {!!Icon && <Icon color={grayHighlight} height={16} width={16} />}

        <Text
          marginLeft={Icon ? 'ms' : 'none'}
          color="purpleGrayLight"
          variant={selected ? 'medium' : 'regular'}
          fontSize={18}
          maxFontSizeMultiplier={1.2}
        >
          {label}
        </Text>
      </TouchableOpacityBox>
    )
  }

  return (
    <TouchableOpacityBox
      height={HeliumActionSheetItemHeight}
      onPress={onPress}
      alignItems="center"
      flexDirection="row"
      disabled={disabled}
    >
      {!!Icon && (
        <Icon color={selected ? primary : primary} height={16} width={16} />
      )}

      <Text
        marginLeft={Icon ? 'ms' : 'none'}
        color={selected ? 'primaryText' : 'black'}
        variant={selected ? 'medium' : 'regular'}
        fontSize={18}
        maxFontSizeMultiplier={1.2}
      >
        {label}
      </Text>
    </TouchableOpacityBox>
  )
}

export default memo(HotspotActionSheetItem)
