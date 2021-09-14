import React, { memo } from 'react'
import Cog from '@assets/images/cog.svg'
import Hotspot from '@assets/images/hotspotIcon.svg'
import Box from '../../components/Box'
import { MainTabType, TabBarIconType } from './tabTypes'
import { useColors } from '../../theme/themeHooks'

type Props = {
  name: MainTabType
} & TabBarIconType

const Icon = ({
  size,
  color,
  name,
}: {
  color: string
  size: number
  name: MainTabType
}) => {
  if (name === 'Hotspots') {
    return <Hotspot height={size} width={size} color={color} />
  }
  return <Cog color={color} height={size} width={size} />
}

const TabBarIcon = ({ name, focused, size }: Props) => {
  const { primary, error } = useColors()
  const color = focused ? error : primary

  return (
    <Box
      alignItems="center"
      flex={1}
      justifyContent="center"
      padding="xxxs"
      paddingTop="s"
    >
      <Icon size={size} color={color} name={name} />
    </Box>
  )
}

export default memo(TabBarIcon)
