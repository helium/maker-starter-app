import React, { memo, ReactText, useMemo } from "react";
import { Linking, Switch } from "react-native";
import Text, { TextProps } from "components/Text";
import TouchableOpacityBox from "components/TouchableOpacityBox";
import { useColors } from "theme/themeHooks";
import CarotRight from "assets/images/carot-right.svg";
import LinkImg from "assets/images/link.svg";
import HeliumActionSheet from "components/HeliumActionSheet";
import { HeliumActionSheetItemType } from "components/HeliumActionSheetItem";

export type SelectProps = {
  onDonePress?: () => void;
  onValueSelect: (value: ReactText, index: number) => void;
  items: HeliumActionSheetItemType[];
};

export type SettingListItemType = {
  title: string;
  destructive?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  value?: boolean | string | number;
  select?: SelectProps;
  openUrl?: string;
};

const SettingListItem = ({
  item: { title, value, destructive, onToggle, onPress, select, openUrl },
  isTop = false,
  isBottom = false,
}: {
  item: SettingListItemType;
  isTop?: boolean;
  isBottom?: boolean;
}) => {
  const colors = useColors();

  const handlePress = () => {
    if (openUrl) {
      Linking.openURL(openUrl);
    }

    if (onPress) {
      onPress();
    }
  };

  const trackColor = useMemo(
    () => ({
      false: colors.ghost,
      true: colors.linkText,
    }),
    [colors],
  );

  const actionSheetTextProps = useMemo(
    () =>
      ({
        variant: "body2",
      } as TextProps),
    [],
  );

  return (
    <TouchableOpacityBox
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="secondaryBackground"
      alignItems="center"
      height={48}
      paddingHorizontal="ms"
      marginBottom="xxxs"
      onPress={handlePress}
      disabled={!(onPress || openUrl)}
      borderTopLeftRadius={isTop ? "m" : "none"}
      borderTopRightRadius={isTop ? "m" : "none"}
      borderBottomLeftRadius={isBottom ? "m" : "none"}
      borderBottomRightRadius={isBottom ? "m" : "none"}
    >
      <Text variant="body2" color={destructive ? "error" : "primaryText"}>
        {title}
      </Text>
      {!onToggle && !select && onPress && <CarotRight color={colors.primaryText} />}
      {openUrl && <LinkImg />}
      {onToggle && (
        <Switch
          value={value as boolean}
          onValueChange={onToggle}
          trackColor={trackColor}
          thumbColor={colors.white}
        />
      )}
      {select && (
        <HeliumActionSheet
          data={select.items}
          selectedValue={value as string}
          onValueSelected={select.onValueSelect}
          title={title}
          textProps={actionSheetTextProps}
          iconVariant="none"
        />
      )}
    </TouchableOpacityBox>
  );
};

export default memo(SettingListItem);
