import React from "react";

import XWingFont from "../Util/XWingFont";

import "./namebar.css";

export class NameBar extends React.Component {
  render() {
    const { name, unique } = this.props;

    return (
      <div className="namebar">
        <div className="namebar-text">
          {unique ? <XWingFont fontType={"font"} symbol={"unique"} /> : ""}
          {name}
        </div>
      </div>
    );
  }
}
