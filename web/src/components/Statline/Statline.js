import React from "react";
import XWingFont from "../Util/XWingFont";
import XWingSymbols from "../Util/XWingSymbols";

import "./statline.css";

function Stat(props) {
  return (
    <div className="stat" style={{ color: props.color }}>
      {props.value}
      <XWingFont symbol={props.symbol} />
    </div>
  );
}
export function AgilityStat(props) {
  return (
    <Stat color="#6DBF43" symbol={XWingSymbols.Agility} value={props.value} />
  );
}

export function AttackStat(props) {
  return (
    <Stat color="#D7163D" symbol={XWingSymbols.Attack} value={props.value} />
  );
}

export function HullStat(props) {
  return (
    <Stat color="#E8E418" symbol={XWingSymbols.Hull} value={props.value} />
  );
}

export function ShieldStat(props) {
  return (
    <Stat color="#68AAB8" symbol={XWingSymbols.Shield} value={props.value} />
  );
}

export default class Statline extends React.Component {
  render() {
    return (
      <div className="statline">
        <AttackStat value={this.props.attack} />
        <AgilityStat value={this.props.agility} />
        <HullStat value={this.props.hull} />
        <ShieldStat value={this.props.shield} />
      </div>
    );
  }
}
