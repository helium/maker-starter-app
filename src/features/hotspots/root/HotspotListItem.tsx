import React, { memo } from 'react'
import animalName from 'angry-purple-tiger'
import Text from '../../../components/Text'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import Chevron from '../../../assets/images/chevron-right.svg'
import { useColors } from '../../../theme/themeHooks'

type Props = { onPress: () => void; address: string }
const HotspotListItem = ({ onPress, address }: Props) => {
  const colors = useColors()
  return (
    <TouchableOpacityBox
      padding="l"
      backgroundColor="secondaryBackground"
      flexDirection="row"
      alignItems="center"
      borderBottomColor="white"
      borderBottomWidth={2}
      onPress={onPress}
    >
      <Text variant="body1" color="secondaryText" flex={1}>
        {animalName(address)}
      </Text>
      <Chevron color={colors.graySteel} />
    </TouchableOpacityBox>
  )
}

export default memo(HotspotListItem)
