/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react'
import Close from '@assets/images/closeModal.svg'
import {
  DebouncedTouchableOpacityBox,
  TouchableOpacityBoxProps,
} from './TouchableOpacityBox'
import { useColors } from '../theme/themeHooks'

const CloseButton = (props: TouchableOpacityBoxProps) => {
  const { primaryText } = useColors()
  return (
    <DebouncedTouchableOpacityBox padding="xs" {...props}>
      <Close color={primaryText} />
    </DebouncedTouchableOpacityBox>
  )
}

export default memo(CloseButton)
