import React from "react";
import PropTypes from "prop-types";

import XWingSymbols from "./XWingSymbols";

import "./xwingfont.css";
import "xwing-miniatures-font/dist/xwing-miniatures.css";
import XWingShip from "./XWingShip";

export default function XWingFont(props) {
  const { fontType, symbol } = props;

  return (
    <i
      className={
        "xwing-" + fontType + " xwing-miniatures-" + fontType + "-" + symbol
      }
    />
  );
}

XWingFont.propTypes = {
  fontType: PropTypes.oneOf(["font", "ship"]).isRequired,
  symbol: PropTypes.oneOf(
    Object.values(XWingSymbols).concat(Object.values(XWingShip))
  ).isRequired
};
