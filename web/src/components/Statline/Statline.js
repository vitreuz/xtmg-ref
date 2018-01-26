import React from "react";
import PropTypes from "prop-types";
import AltStyle from "../Util/AlternateStyles";
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
    const { altStyle, attack, agility, hull, shields } = this.props;

    return (
      <div className={"statline " + altStyle + "-statline"}>
        <AttackStat value={attack} />
        <AgilityStat value={agility} />
        <HullStat value={hull} />
        <ShieldStat value={shields} />
      </div>
    );
  }
}

Statline.propTypes = {
  altStyle: PropTypes.oneOf(Object.values(AltStyle)),
  attack: PropTypes.number,
  agility: PropTypes.number,
  hull: PropTypes.number,
  shields: PropTypes.number
};

Statline.defaultProps = {
  altStyle: AltStyle.Horiztonal
};
