import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight={"500"}>
          Sponsored
        </Typography>
      </FlexBetween>
      <Typography color={medium}>
        <FlexBetween>
          <img
            width={"100%"}
            height={"auto"}
            src="https://img.freepik.com/free-psd/3d-interface-website-presentation-mockup-isolated_359791-202.jpg?size=626&ext=jpg&ga=GA1.2.597980246.1659293170"
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
          />
        </FlexBetween>
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
