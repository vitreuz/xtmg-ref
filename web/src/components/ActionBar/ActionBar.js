import React from "react";

import XWingFont from "../Util/XWingFont";

export function Action(props) {
  return (
    <div className="action">
      <XWingFont symbol={props.action} />
    </div>
  );
}
export class ActionBar extends React.Component {
  render() {
    const actions = this.props.actions.map(action =>
      action.replace(" ", "").toLowerCase()
    );

    return (
      <div className="action-bar">
        {actions.map((action, i) => <Action action={action} key={i} />)}
      </div>
    );
  }
}
