import React from "react";
import XWingFont from "../Util/XWingFont";
import XWingSymbols from "../Util/XWingSymbols";

function Stat(props) {
  return (
    <div className="ship-stat" style={{ color: props.color }}>
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
