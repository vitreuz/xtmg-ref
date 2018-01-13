import React from "react";
import PropTypes from "prop-types";

import XWingSymbols from "./XWingSymbols";

import "xwing-miniatures-font/dist/xwing-miniatures.css";

export default function XWingFont(props) {
  return (
    <i
      className={"xwing-miniatures-font xwing-miniatures-font-" + props.symbol}
    />
  );
}

XWingFont.propTypes = {
  symbol: PropTypes.oneOf(Object.values(XWingSymbols))
};
