import React from "react";
import { useTranslation } from "react-i18next";
import { SvgProps } from "react-native-svg";
import { useColors } from "theme/themeHooks";
import Box from "./Box";
import Card from "./Card";
import Text from "./Text";

export type CarouselItemData = {
  title: string;
  desc: string;
  Icon: React.FC<SvgProps>;
};

const CarouselItem = ({ item: { Icon, title, desc } }: { item: CarouselItemData }) => {
  const { surfaceContrast } = useColors();
  const { t } = useTranslation();
  return (
    <Card marginHorizontal="s" variant="elevated" flex={1} overflow="hidden" height={500}>
      <Box
        width="100%"
        flex={1}
        backgroundColor="surfaceSecondary"
        justifyContent="center"
        borderRadius="l"
      >
        <Icon color={surfaceContrast} height={90} />
      </Box>
      <Box backgroundColor="surface" paddingHorizontal="m" justifyContent="center" height={175}>
        <Text
          variant="body1"
          paddingBottom={{ smallPhone: "xs", phone: "m" }}
          color="surfaceText"
          textAlign="center"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {t(title)}
        </Text>
        <Text
          numberOfLines={5}
          variant="body2"
          textAlign="center"
          color="surfaceText"
          adjustsFontSizeToFit
        >
          {t(desc)}
        </Text>
      </Box>
    </Card>
  );
};

export default CarouselItem;
