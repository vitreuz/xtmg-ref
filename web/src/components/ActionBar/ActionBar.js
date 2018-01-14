import React from "react";

import XWingFont from "../Util/XWingFont";

export function Action(props) {
  return (
    <div className="action">
      <XWingFont symbol={props.action} />
    </div>
  );
}
export default class ActionBar extends React.Component {
  render() {
    return (
      <div className="action-bar">
        {this.props.actions.map((action, i) => (
          <Action action={action} key={i} />
        ))}
      </div>
    );
  }
}
