import React from "react";
import PropTypes from "prop-types";

import XWingFont from "../Util/XWingFont";
import XWingShip from "../Util/XWingShip";
import XWingSymbols from "../Util/XWingSymbols";

import "./icon.css";

export class Icon extends React.Component {
  render() {
    const { iconType, symbol } = this.props;
    const fontType = iconType === "ship" ? "ship" : "font";
    return (
      <div className={"icon icon-" + iconType + "-background"}>
        <div className={"icon icon-" + iconType}>
          <XWingFont fontType={fontType} symbol={symbol} />
        </div>
      </div>
    );
  }
}

Icon.proptypes = {
  iconType: PropTypes.oneOf(["ship", "upgrade"]).isRequired,
  symbol: PropTypes.oneOf(
    Object.values(XWingShip).concat(Object.values(XWingSymbols))
  ).isRequired
};
