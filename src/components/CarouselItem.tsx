import React from 'react'
import { useTranslation } from 'react-i18next'
import { ImageSourcePropType } from 'react-native'
import Box from './Box'
import Card from './Card'
import ImageBox from './ImageBox'
import Text from './Text'

export type CarouselItemData = {
  title: string
  desc: string
  image: ImageSourcePropType
}

const CarouselItem = ({ item }: { item: CarouselItemData }) => {
  const { t } = useTranslation()
  return (
    <Card
      marginHorizontal="s"
      variant="elevated"
      flex={1}
      overflow="hidden"
      height={500}
    >
      <ImageBox source={item.image} width="100%" flex={1} />
      <Box
        backgroundColor="primaryBackground"
        paddingHorizontal="m"
        justifyContent="center"
        height={175}
      >
        <Text
          variant="body1"
          paddingBottom={{ smallPhone: 'xs', phone: 'm' }}
          color="surfaceText"
          textAlign="center"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {t(item.title)}
        </Text>
        <Text
          numberOfLines={5}
          variant="body2"
          textAlign="center"
          color="surfaceText"
          adjustsFontSizeToFit
        >
          {t(item.desc)}
        </Text>
      </Box>
    </Card>
  )
}

export default CarouselItem
