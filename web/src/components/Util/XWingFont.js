import React from "react";
import PropTypes from "prop-types";
import "xwing-miniatures-font/dist/xwing-miniatures.css";

export default function XWingFont(props) {
  return (
    <i
      className={"xwing-miniatures-font xwing-miniatures-font-" + props.symbol}
    />
  );
}
