import { useTheme } from "@emotion/react";

const useThemeColors = () => {
  const theme = useTheme();

  return {
    background: theme.palette.background.paper,
    field: theme.palette.background.default,
    border: theme.palette.border.secondary,
    border1: theme.palette.border.primary,
    divider: theme.palette.divider,
    text: theme.palette.text.primary,
    text1: theme.palette.text.secondary,
    active: theme.palette.text.isActive,
    icon: theme.palette.icon.primary,
  };
};

export default useThemeColors;
