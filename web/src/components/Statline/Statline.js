import React from "react";
import XWingFont from "../Util/XWingFont";
import XWingSymbols from "../Util/XWingSymbols";

import "./statline.css";

function Stat(props) {
  return (
    <div className={"stat " + props.statType + "-stat"}>
      {props.value}
      <XWingFont symbol={props.symbol} />
    </div>
  );
}
export function AgilityStat(props) {
  return (
    <Stat
      statType="agility"
      symbol={XWingSymbols.Agility}
      value={props.value}
    />
  );
}

export function AttackStat(props) {
  return (
    <Stat statType="attack" symbol={XWingSymbols.Attack} value={props.value} />
  );
}

export function HullStat(props) {
  return (
    <Stat statType="hull" symbol={XWingSymbols.Hull} value={props.value} />
  );
}

export function ShieldStat(props) {
  return (
    <Stat statType="shield" symbol={XWingSymbols.Shield} value={props.value} />
  );
}

export class Statline extends React.Component {
  render() {
    return (
      <div className="statline">
        <AttackStat value={this.props.attack} />
        <AgilityStat value={this.props.agility} />
        <HullStat value={this.props.hull} />
        <ShieldStat value={this.props.shields} />
      </div>
    );
  }
}
