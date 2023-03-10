import { BoxProps } from '@shopify/restyle'
import React from 'react'
import { Theme } from '../theme/theme'
import Box from './Box'

const ListSeparator = (props: BoxProps<Theme>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box height={1} backgroundColor="graySteel" {...props} />
)

export default ListSeparator
